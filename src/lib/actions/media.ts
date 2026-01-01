'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getMediaMentions(page: number = 1, limit: number = 4) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('media_mentions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching media:', error)
    return { data: [], hasMore: false }
  }

  return { 
    data, 
    hasMore: count ? to < count - 1 : false 
  }
}

export async function addMediaMention(formData: FormData) {
  const publication = formData.get('publication') as string
  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const url = formData.get('url') as string
  const date = formData.get('date') as string

  const { error } = await supabase
    .from('media_mentions')
    .insert({ publication, title, excerpt, url, date })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/media')
  revalidatePath('/') // Update homepage
}

export async function deleteMediaMention(id: number) {
  const { error } = await supabase
    .from('media_mentions')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/media')
  revalidatePath('/')
}