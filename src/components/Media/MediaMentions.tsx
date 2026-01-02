import { getMediaMentions } from '@/lib/actions/media'
import MediaList from './MediaList'

export default async function MediaMentions() {
  // Fetch first 4 items on server side
  const { data, hasMore } = await getMediaMentions(1, 4)

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            In the Press
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Media coverage and stories about our journey, impact, and vision.
          </p>
        </div>

        {/* Pass data to Client Component */}
        <MediaList initialData={data} initialHasMore={hasMore} />
      </div>
    </section>
  )
}