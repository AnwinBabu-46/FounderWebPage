'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer' // For infinite scroll
import { getMediaMentions } from '@/lib/actions/media'
import { Loader2, ExternalLink } from 'lucide-react'

// Initial data passed from server
export default function MediaList({ initialData, initialHasMore }: { initialData: any[], initialHasMore: boolean }) {
  const [items, setItems] = useState(initialData)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Observer for the "end of list" element
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 200px 0px 0px', // Trigger load 200px before end
  })

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore()
    }
  }, [inView, hasMore, loading])

  const loadMore = async () => {
    setLoading(true)
    const nextPage = page + 1
    const { data: newItems, hasMore: moreAvailable } = await getMediaMentions(nextPage, 4)
    
    setItems(prev => [...prev, ...newItems])
    setHasMore(moreAvailable)
    setPage(nextPage)
    setLoading(false)
  }

  return (
    <div className="relative">
      {/* CONTAINER STYLES:
        Desktop: grid layout
        Mobile: flex row + horizontal scroll + snap effects
      */}
      <div className="
        grid grid-cols-1 gap-6 
        
        // Mobile specific overrides for horizontal scroll
        sm:flex sm:overflow-x-auto sm:snap-x sm:snap-mandatory sm:pb-8 sm:gap-4 sm:grid-cols-none
        
        // Tablet/Desktop reset to grid
        md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0
        
        // Hide scrollbar but keep functionality
        scrollbar-hide
      ">
        {items.map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} />
        ))}

        {/* Loading Sentry / Spinner */}
        {hasMore && (
          <div 
            ref={ref} 
            className="flex items-center justify-center min-w-[200px] sm:min-w-[280px] md:col-span-full md:py-8"
          >
            {loading && <Loader2 className="animate-spin text-teal-600" />}
          </div>
        )}
      </div>
    </div>
  )
}

const MediaCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="
        bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all
        flex flex-col justify-between h-full group
        
        // Mobile Sizing (Fixed width for horizontal scroll cards)
        min-w-[85vw] sm:min-w-[300px] 
        snap-center
      "
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">
            {item.publication}
          </span>
          <ExternalLink size={16} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-4">
            {item.excerpt}
          </p>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
        <span>{item.date}</span>
        <span className="font-medium text-teal-600 group-hover:underline">Read Article</span>
      </div>
    </motion.a>
  )
}