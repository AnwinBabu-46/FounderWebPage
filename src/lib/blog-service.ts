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
      date: post.published_at, // Map DB column to UI
      teaser: post.excerpt,    // Map DB column to UI
      readTime: post.read_time // Map DB column to UI
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
        excerpt: postData.teaser,      // UI sends 'teaser', DB wants 'excerpt'
        read_time: postData.readTime,  // UI sends 'readTime', DB wants 'read_time'
        published_at: postData.date,
      }])
      .select()
    
    if (error) throw error
    return data
  },

  // UPDATE
  update: async (slug: string, postData: any) => {
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
      .eq('slug', slug)
      .select()

    if (error) throw error
    return data
  },

  // DELETE
  delete: async (slug: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('slug', slug)

    if (error) throw error
    return true
  }
}