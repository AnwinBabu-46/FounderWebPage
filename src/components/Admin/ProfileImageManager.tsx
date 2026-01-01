'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, User, Camera, X, Check, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function ProfileImageManager() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Cropper States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // 1. Fetch current avatar on load
  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase
        .from('admin_profile')
        .select('avatar_url')
        .eq('id', 1)
        .single();
      
      if (data?.avatar_url) setAvatarUrl(data.avatar_url);
    }
    getProfile();
  }, []);

  // Helper: Show Toast
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // 2. Handle File Selection
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 3. Handle Save (Upload Cropped Image)
  const saveCroppedImage = async () => {
    try {
      setUploading(true);
      if (!imageSrc || !croppedAreaPixels) return;

      // A. Crop Image
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImageBlob) throw new Error('Could not crop image');

      // B. Delete OLD image if exists (Cleanup)
      if (avatarUrl) {
        const oldFileName = avatarUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('images').remove([oldFileName]);
        }
      }

      // C. Upload NEW Image
      const fileName = `profile-avatar-${Math.random()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, croppedImageBlob);

      if (uploadError) throw uploadError;

      // D. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      // E. Update Database
      const { error: updateError } = await supabase
        .from('admin_profile')
        .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', 1);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      setImageSrc(null); // Close cropper
      showToast('Profile picture updated successfully!');

    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // 4. Handle Delete (DB + Storage)
  const confirmRemoveAvatar = async () => {
    try {
      setUploading(true);
      setShowDeleteModal(false);

      // A. Get current URL to find filename
      if (avatarUrl) {
        const fileName = avatarUrl.split('/').pop(); // Extract "profile-avatar-0.123.jpg"
        
        if (fileName) {
          // B. Remove from Storage
          const { error: storageError } = await supabase.storage
            .from('images')
            .remove([fileName]);
            
          if (storageError) console.error('Storage delete error:', storageError);
        }
      }

      // C. Update Database to NULL
      const { error: dbError } = await supabase
        .from('admin_profile')
        .update({ avatar_url: null })
        .eq('id', 1);

      if (dbError) throw dbError;
      
      setAvatarUrl(null);
      showToast('Profile picture removed.', 'success');

    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full relative">
      
      {/* SUCCESS/ERROR TOAST */}
      {toast.show && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap animate-in slide-in-from-top-2 fade-in ${
          toast.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'
        }`}>
           {toast.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
           <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <h3 className="font-bold text-gray-900 mb-6 w-full text-left">Profile Picture</h3>
      
      {imageSrc ? (
        // --- CROPPER UI ---
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden shadow-inner border-2 border-teal-500">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
            />
          </div>
          
          <div className="w-64 flex items-center gap-2">
            <span className="text-xs text-gray-500">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={cancelCrop} variant="outline" size="sm">
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button onClick={saveCroppedImage} size="sm" disabled={uploading} className="bg-teal-600 hover:bg-teal-700">
              {uploading ? <Loader2 className="animate-spin mr-1" size={16} /> : <Check size={16} className="mr-1" />} 
              Save
            </Button>
          </div>
        </div>
      ) : (
        // --- NORMAL UI ---
        <>
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100 flex items-center justify-center shadow-inner relative">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-gray-300" />
              )}
            </div>

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-transform hover:scale-110"
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={onFileChange}
              ref={fileInputRef}
              className="hidden"
              disabled={uploading}
            />

            {avatarUrl && (
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(true)} 
                disabled={uploading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
              >
                <Trash2 size={16} className="mr-2" /> Remove Photo
              </Button>
            )}
            
            <p className="text-xs text-gray-400 mt-2">
              Select an image and adjust to fit the circle.
            </p>
          </div>
        </>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                   <AlertTriangle size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900">Remove picture?</h2>
                   <p className="text-gray-500 mt-2 text-sm">
                     This will remove your profile picture from the website permanently.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                   <Button 
                     variant="outline" 
                     onClick={() => setShowDeleteModal(false)}
                     disabled={uploading}
                   >
                     Cancel
                   </Button>
                   <Button 
                     className="bg-red-600 hover:bg-red-700 text-white"
                     onClick={confirmRemoveAvatar}
                     disabled={uploading}
                   >
                     {uploading ? 'Removing...' : 'Remove'}
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}