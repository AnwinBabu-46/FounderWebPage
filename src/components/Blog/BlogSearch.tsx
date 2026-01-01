'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // npm install use-debounce OR just use standard timeout
import { Search } from 'lucide-react';

export default function BlogSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Simple debounce to prevent searching on every single keystroke immediately
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    // Reset to page 1 when searching
    params.set('page', '1');
    
    replace(`/blog?${params.toString()}`);
  };

  return (
    <div className="relative max-w-md mx-auto mb-12">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#0D9488] focus:border-transparent sm:text-sm shadow-sm transition-all"
        defaultValue={searchParams.get('q')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}