'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  Loader2, Plus, Trash2, Edit2, Save, History, GripVertical 
} from 'lucide-react';
import { toast } from 'sonner';

interface TimelineEvent {
  id?: number;
  title: string;
  description: string;
  event_order: number;
}

export default function TimelineManager() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null | 'new'>(null);
  
  const [formData, setFormData] = useState<TimelineEvent>({
    title: '',
    description: '',
    event_order: 1
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .order('event_order', { ascending: true });
    
    if (error) {
      toast.error("Failed to load timeline");
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }

  const handleEdit = (event: TimelineEvent) => {
    setEditingId(event.id!);
    setFormData(event);
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      description: '',
      event_order: events.length + 1
    });
    setEditingId('new');
  };

  const performDelete = async (id: number, title: string) => {
    // Standard browser confirmation since the Shadcn component is missing
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    const { error } = await supabase.from('timeline_events').delete().eq('id', id);
    if (error) {
      toast.error("Could not delete item");
    } else {
      toast.success("Milestone removed");
      fetchEvents();
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) return toast.warning("Please add a title");
    
    setSaving(true);
    try {
      let localArray = [...events];

      if (editingId === 'new') {
        localArray.splice(formData.event_order - 1, 0, { ...formData });
      } else {
        const filtered = localArray.filter(e => e.id !== editingId);
        filtered.splice(formData.event_order - 1, 0, { ...formData, id: editingId as number });
        localArray = filtered;
      }

      const payload = localArray.map((item, index) => ({
        ...item,
        event_order: index + 1
      }));

      const existingItems = payload.filter(item => item.id !== undefined && item.id !== null);
      const newItem = payload.find(item => item.id === undefined || item.id === null);

      if (existingItems.length > 0) {
        const { error: upsertError } = await supabase
          .from('timeline_events')
          .upsert(existingItems.map(({ id, title, description, event_order }) => ({
            id, title, description, event_order
          })));
        if (upsertError) throw upsertError;
      }

      if (editingId === 'new' && newItem) {
        const cleanInsert = {
          title: newItem.title,
          description: newItem.description,
          event_order: newItem.event_order
        };

        const { error: insertError } = await supabase
          .from('timeline_events')
          .insert([cleanInsert]);
          
        if (insertError) throw insertError;
      }

      setEditingId(null);
      await fetchEvents();
      toast.success("Timeline successfully updated!");
    } catch (error: any) {
      console.error("Save Error:", error);
      toast.error(error.message || "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const orderOptions = editingId === 'new' 
    ? Array.from({ length: events.length + 1 }, (_, i) => i + 1)
    : Array.from({ length: events.length }, (_, i) => i + 1);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-teal-600" size={40} />
      <p className="text-gray-500 animate-pulse font-medium">Loading your journey...</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-teal-50 p-2 rounded-lg">
            <History className="text-teal-600" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Journey Milestones</h2>
            <p className="text-xs text-gray-500">{events.length} total events</p>
          </div>
        </div>
        <Button onClick={handleAddNew} disabled={editingId === 'new'} size="sm" className="bg-teal-600 hover:bg-teal-700">
          <Plus size={16} className="mr-2" /> Add Milestone
        </Button>
      </div>

      <div className="p-6 space-y-4">
        {events.map((event) => (
          <div 
            key={event.id} 
            className={`group border rounded-xl p-4 transition-all ${
              editingId === event.id ? 'border-teal-500 bg-teal-50/30' : 'hover:border-teal-200 bg-white'
            }`}
          >
            {editingId === event.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold text-teal-600 uppercase">Title</label>
                    <input 
                      className="w-full p-2 border rounded-lg mt-1 outline-none focus:ring-2 focus:ring-teal-500"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-teal-600 uppercase">Position</label>
                    <select 
                      className="w-full p-2 border rounded-lg mt-1 outline-none"
                      value={formData.event_order}
                      onChange={e => setFormData({...formData, event_order: parseInt(e.target.value)})}
                    >
                      {orderOptions.map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <textarea 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving} size="sm">
                    {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />} 
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-600 text-white rounded-lg h-10 w-10 flex items-center justify-center font-bold">
                    {event.event_order}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <p className="text-xs text-gray-500">{event.description}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button onClick={() => handleEdit(event)} variant="ghost" size="icon">
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    onClick={() => performDelete(event.id!, event.title)} 
                    variant="ghost" 
                    size="icon" 
                    className="hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {editingId === 'new' && (
           <div className="border-2 border-dashed border-teal-300 rounded-xl p-6 bg-teal-50/30 space-y-4">
              <h3 className="font-bold text-teal-800">New Journey Milestone</h3>
              <input 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Title..."
              />
              <textarea 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Description..."
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving} size="sm">Add Milestone</Button>
                <Button onClick={() => setEditingId(null)} variant="ghost" size="sm">Cancel</Button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}