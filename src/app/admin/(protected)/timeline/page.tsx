import TimelineManager from '@/components/Admin/TimelineManager';
import Link from 'next/link';
import { ChevronLeft, History } from 'lucide-react';

export default function AdminTimelinePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-teal-600 hover:underline flex items-center gap-1 mb-2">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="text-teal-600" /> Manage Journey
          </h1>
          <p className="text-gray-500 mt-1">Add or reorder the milestones on your homepage timeline.</p>
        </div>
      </div>

      <TimelineManager />
    </div>
  );
}