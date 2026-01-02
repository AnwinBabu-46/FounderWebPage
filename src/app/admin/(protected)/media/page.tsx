'use client'

import { useState, useEffect, useCallback } from 'react' // 1. Added useCallback
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { addMediaMention, deleteMediaMention } from '@/lib/actions/media'
import { Trash2, Plus, Loader2, Edit, Calendar, X, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

// Define the shape of our data
interface MediaItem {
  id: number
  publication: string
  title: string
  excerpt: string
  url: string
  date: string
}

// Move constant outside component to avoid dependency issues
const ITEMS_PER_PAGE = 5

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Pagination State
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Editing State
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)

  // Custom Alert State
  const [alert, setAlert] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' })
  
  // Delete Modal State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // 2. Wrap showAlert in useCallback to stabilize it
  const showAlert = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setAlert({ show: true, msg, type })
    // Use functional update (prev => ...) so we don't depend on 'alert' state
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000)
  }, [])

  // 3. Wrap fetchItems in useCallback so it can be a dependency
  const fetchItems = useCallback(async (pageNum: number) => {
    setLoading(true)
    
    // 1. Get total count
    const { count } = await supabase.from('media_mentions').select('*', { count: 'exact', head: true })
    if (count) setTotalPages(Math.ceil(count / ITEMS_PER_PAGE))

    // 2. Get data for current page
    const from = (pageNum - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    const { data, error } = await supabase
      .from('media_mentions')
      .select('*')
      .order('date', { ascending: false }) // Sort by Newest Date
      .range(from, to)

    if (error) {
      showAlert('Error fetching data', 'error')
    } else if (data) {
      setItems(data)
    }
    setLoading(false)
  }, [showAlert]) // Dependency: showAlert

  // 4. Add fetchItems to dependency array
  useEffect(() => {
    fetchItems(page)
  }, [page, fetchItems])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Capture form before await
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      if (editingItem) {
        // --- UPDATE LOGIC ---
        const updates = {
          publication: formData.get('publication'),
          title: formData.get('title'),
          excerpt: formData.get('excerpt'),
          url: formData.get('url'),
          date: formData.get('date'),
        }

        const { error } = await supabase
          .from('media_mentions')
          .update(updates)
          .eq('id', editingItem.id)

        if (error) throw error
        showAlert('Media updated successfully!')
        setEditingItem(null) // Exit edit mode
      } else {
        // --- ADD LOGIC ---
        await addMediaMention(formData)
        showAlert('Media added successfully!')
      }

      form.reset()
      fetchItems(page) // Refresh list
    } catch (err: any) {
      showAlert(err.message || 'Something went wrong', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditClick = (item: MediaItem) => {
    setEditingItem(item)
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingItem(null)
    const form = document.querySelector('form') as HTMLFormElement
    if(form) form.reset()
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    
    try {
      await deleteMediaMention(deleteId)
      setItems(items.filter(i => i.id !== deleteId))
      showAlert('Item deleted successfully')
      
      // If page is empty after delete, go back one page
      if (items.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        fetchItems(page)
      }
    } catch (error) {
      showAlert('Failed to delete item', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Media</h1>
      </div>

      {/* CUSTOM ALERT TOAST */}
      {alert.show && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right fade-in ${
          alert.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-teal-700 border border-teal-100'
        }`}>
          {alert.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          <span className="font-medium">{alert.msg}</span>
        </div>
      )}

      {/* FORM SECTION */}
      <div className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 ${
        editingItem ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-bold flex items-center gap-2 ${editingItem ? 'text-amber-700' : 'text-gray-900'}`}>
            {editingItem ? <Edit size={20} /> : <Plus size={20} className="text-teal-600" />} 
            {editingItem ? 'Edit Media Mention' : 'Add New Mention'}
          </h2>
          
          {editingItem && (
            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
              <X size={16} className="mr-1" /> Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Publication Name</label>
            <input 
              name="publication" 
              defaultValue={editingItem?.publication}
              required 
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all" 
              placeholder="e.g. Times of India" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <div className="relative">
              <input 
                name="date" 
                type="date"
                defaultValue={editingItem?.date}
                required 
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all" 
              />
              <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Article Headline</label>
            <input 
              name="title" 
              defaultValue={editingItem?.title}
              required 
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all" 
              placeholder="Enter the article title..." 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Short Summary</label>
            <textarea 
              name="excerpt" 
              defaultValue={editingItem?.excerpt}
              rows={2} 
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all" 
              placeholder="Brief description of the coverage..." 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Link URL</label>
            <input 
              name="url" 
              type="url" 
              defaultValue={editingItem?.url}
              required 
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all" 
              placeholder="https://..." 
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <Button 
              type="submit" 
              disabled={submitting} 
              className={`w-full text-white font-medium py-6 rounded-xl shadow-md transition-transform active:scale-[0.98] ${
                editingItem ? 'bg-amber-600 hover:bg-amber-700' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {submitting ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Saving...</span>
              ) : (
                editingItem ? 'Update Media Mention' : 'Add Media Mention'
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* LIST SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p>Loading records...</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-5 font-semibold text-gray-500 uppercase tracking-wider text-xs">Publication / Date</th>
                  <th className="p-5 font-semibold text-gray-500 uppercase tracking-wider text-xs">Title</th>
                  <th className="p-5 font-semibold text-gray-500 uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">No media mentions found.</td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${editingItem?.id === item.id ? 'bg-amber-50/50' : ''}`}>
                      <td className="p-5">
                        <div className="font-bold text-gray-900">{item.publication}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar size={12} /> {item.date}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="text-gray-700 font-medium line-clamp-1">{item.title}</div>
                        <a href={item.url} target="_blank" className="text-xs text-teal-600 hover:underline mt-0.5 block truncate max-w-xs">
                          {item.url}
                        </a>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(item)} 
                            className="p-2 rounded-full text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => setDeleteId(item.id)} 
                            className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                   <Trash2 size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900">Delete Mention?</h2>
                   <p className="text-gray-500 mt-2 text-sm">
                     Are you sure you want to remove this media mention? This action cannot be undone.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                   <Button variant="outline" onClick={() => setDeleteId(null)}>
                     Cancel
                   </Button>
                   <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>
                     Delete
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  )
}