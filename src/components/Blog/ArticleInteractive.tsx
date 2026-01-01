'use client';

import { useState, useEffect } from 'react';
import { Share2, Linkedin, Twitter, Link as LinkIcon, Facebook, Check } from 'lucide-react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-100">
      <div 
        className="h-full bg-[#0D9488] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-[#4267B2] hover:bg-[#4267B2]/10'
    }
  ];

  return (
    <div className="flex flex-row md:flex-col gap-3 items-center p-2 md:p-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm">
      <div className="hidden md:block mb-2 text-gray-400">
        <Share2 size={16} />
      </div>
      
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-full text-gray-500 transition-all duration-200 ${link.color}`}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}

      <div className="w-px h-6 bg-gray-300 mx-1 md:hidden"></div>
      <div className="h-px w-6 bg-gray-300 my-1 hidden md:block"></div>

      <button
        onClick={handleCopy}
        className={`p-2.5 rounded-full transition-all duration-200 ${
          copied 
            ? 'bg-green-100 text-green-600' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`}
        title="Copy Link"
      >
        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}