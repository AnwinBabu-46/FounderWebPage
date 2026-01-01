'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  Loader2, Search, Plus, Calendar, ChevronLeft, ChevronRight, 
  Edit, Eye, Trash2, CheckSquare, Square, X, AlertTriangle, CheckCircle2 
} from 'lucide-react';

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  created_at: string;
  published_at?: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selection & Deletion States
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | 'BATCH' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false); // Success popup

  // 1. Fetch Data
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      const mappedPosts = (data || []).map((p) => ({
        ...p,
        date: p.published_at || p.created_at,
        category: p.category || 'General',
      }));
      setPosts(mappedPosts);
    }
    setLoading(false);
  };

  // 2. Filter & Pagination
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  // 3. Selection Logic
  const handleSelectAll = () => {
    if (selectedIds.length === currentPosts.length) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(currentPosts.map(p => p.id)); // Select all on current page
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  // 4. Deletion Logic
  const openDeleteModal = (target: number | 'BATCH') => {
    setDeleteTarget(target);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    
    // Determine what to delete
    const idsToDelete = deleteTarget === 'BATCH' ? selectedIds : [deleteTarget];
    
    // Supabase Delete Call
    const { error } = await supabase
      .from('posts')
      .delete()
      .in('id', idsToDelete);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      // Success: Remove from local state immediately
      setPosts(prev => prev.filter(p => !idsToDelete.includes(p.id)));
      setSelectedIds([]); // Clear selection
      setIsDeleteModalOpen(false);
      
      // Show Success Toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide after 3s
    }
    setIsDeleting(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-0 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your stories and publications</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-black text-white hover:bg-gray-800 transition-all shadow-md gap-2 rounded-full px-6">
            <Plus size={18} /> Create New Post
          </Button>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by title or category..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm bg-white"
        />
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
        
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white/80 z-10">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium">No posts found</p>
            <p className="text-sm">Try changing your search or create a new post.</p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 w-12">
                       <button onClick={handleSelectAll} className="text-gray-400 hover:text-gray-600">
                          {selectedIds.length > 0 && selectedIds.length === currentPosts.length ? (
                            <CheckSquare size={20} className="text-teal-600" />
                          ) : (
                            <Square size={20} />
                          )}
                       </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title / Slug</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {currentPosts.map((post) => {
                    const isSelected = selectedIds.includes(post.id);
                    return (
                      <tr key={post.id} className={`hover:bg-gray-50/80 transition-colors group ${isSelected ? 'bg-teal-50/30' : ''}`}>
                        <td className="px-6 py-4">
                           <button onClick={() => handleSelectOne(post.id)} className="text-gray-400 hover:text-gray-600">
                              {isSelected ? <CheckSquare size={20} className="text-teal-600" /> : <Square size={20} />}
                           </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900 line-clamp-1">{post.title}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{post.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <Link href={`/admin/blog/${post.slug}`} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-teal-600" title="Edit">
                                  <Edit size={18} />
                              </Link>
                              <button 
                                onClick={() => openDeleteModal(post.id)}
                                className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-600" 
                                title="Delete"
                              >
                                  <Trash2 size={18} />
                              </button>
                           </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden divide-y divide-gray-100">
              {currentPosts.map((post) => {
                const isSelected = selectedIds.includes(post.id);
                return (
                  <div key={post.id} className={`p-5 flex gap-4 transition-colors ${isSelected ? 'bg-teal-50/30' : 'hover:bg-gray-50'}`}>
                     {/* Checkbox */}
                     <button onClick={() => handleSelectOne(post.id)} className="text-gray-400 pt-1">
                        {isSelected ? <CheckSquare size={20} className="text-teal-600" /> : <Square size={20} />}
                     </button>
                     
                     <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                           <div>
                             <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide bg-teal-50 px-2 py-0.5 rounded-sm">
                                 {post.category}
                             </span>
                             <h3 className="font-bold text-gray-900 mt-1.5 leading-tight">{post.title}</h3>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                           <div className="flex items-center text-xs text-gray-400 gap-1">
                             <Calendar size={12} />
                             {new Date(post.date).toLocaleDateString()}
                           </div>
                           
                           <div className="flex gap-4">
                             <Link href={`/admin/blog/${post.slug}`} className="text-sm font-bold text-teal-600">
                                 Edit
                             </Link>
                             <button onClick={() => openDeleteModal(post.id)} className="text-sm font-bold text-red-500">
                                 Delete
                             </button>
                           </div>
                        </div>
                     </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* PAGINATION FOOTER */}
        {!loading && filteredPosts.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING BULK ACTIONS BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-6 z-50 animate-in fade-in slide-in-from-bottom-4">
          <span className="font-medium text-sm">{selectedIds.length} selected</span>
          <div className="h-4 w-[1px] bg-gray-700"></div>
          <button 
             onClick={() => openDeleteModal('BATCH')}
             className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2"
          >
            <Trash2 size={16} /> Delete Selected
          </button>
          <button onClick={() => setSelectedIds([])} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                   <AlertTriangle size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900">Are you sure?</h2>
                   <p className="text-gray-500 mt-2">
                     {deleteTarget === 'BATCH' 
                        ? `You are about to delete ${selectedIds.length} posts. ` 
                        : "You are about to delete this post. "
                     }
                     This action cannot be undone.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                   <Button 
                     variant="outline" 
                     onClick={() => setIsDeleteModalOpen(false)}
                     disabled={isDeleting}
                   >
                     Cancel
                   </Button>
                   <Button 
                     className="bg-red-600 hover:bg-red-700 text-white"
                     onClick={executeDelete}
                     disabled={isDeleting}
                   >
                     {isDeleting ? 'Deleting...' : 'Delete Forever'}
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed top-6 right-6 z-[100] bg-white border-l-4 border-green-500 shadow-xl rounded-lg p-4 flex items-center gap-3 animate-in slide-in-from-right-10 fade-in duration-300">
           <CheckCircle2 className="text-green-500" size={24} />
           <div>
              <h4 className="font-bold text-gray-900 text-sm">Success!</h4>
              <p className="text-gray-500 text-xs">Deleted successfully.</p>
           </div>
        </div>
      )}

    </div>
  );
}