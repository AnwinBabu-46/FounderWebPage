import { supabase } from '@/lib/supabase'

export const BlogService = {
  // GET ALL
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return []
    return data.map((post) => ({
      ...post,
      date: post.published_at, 
      teaser: post.excerpt,    
      readTime: post.read_time 
    }))
  },

  // GET ONE (For Edit Page)
  getBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) return null
    return {
      ...data,
      date: data.published_at,
      teaser: data.excerpt,
      readTime: data.read_time
    }
  },

  // CREATE
  create: async (postData: any) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: postData.title,
        slug: postData.slug,
        category: postData.category,
        content: postData.content,
        excerpt: postData.teaser,
        read_time: postData.readTime,
        published_at: postData.date,
      }])
      .select()
    
    if (error) throw error
    return data
  },

  // 🟢 UPDATED: Use ID instead of Slug
  update: async (id: string, postData: any) => {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: postData.title,
        slug: postData.slug,
        category: postData.category,
        content: postData.content,
        excerpt: postData.teaser,
        read_time: postData.readTime,
        published_at: postData.date,
      })
      .eq('id', id) // Find post by ID
      .select()

    if (error) throw error
    return data
  },

  // 🟢 UPDATED: Use ID instead of Slug
  delete: async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id) // Delete post by ID

    if (error) throw error
    return true
  }
}