import React, { useEffect } from 'react';

interface ModalPopupProps { 
  isOpen: boolean; 
  title: string; 
  description?: string; 
  confirmText?: string; 
  cancelText?: string; 
  onConfirm: () => void; 
  onCancel?: () => void; 
  type?: 'confirm' | 'alert'; 
}
export default function ModalPopup({
  isOpen,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  type = 'confirm',
}: ModalPopupProps) 
{
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (type === 'confirm' && onCancel) onCancel();
        else if (onConfirm) onConfirm();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel, onConfirm, type]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity" 
        onClick={type === 'confirm' ? onCancel : onConfirm} 
      />

      <div className="relative z-10 w-full max-w-[360px] bg-white rounded-[24px] p-6 shadow-2xl flex flex-col items-center text-center">
        
        <h3 className="text-lg font-bold text-blue-07 mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-gray-04 font-normal mb-6">
            {description}
          </p>
        )}


        {type === 'confirm' ? (
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-gray-01 text-gray-03 font-bold text-sm"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-blue-05 text-white font-bold text-sm shadow-sm"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-3 rounded-xl bg-blue-05 text-white font-bold text-sm shadow-sm"
          >
            {confirmText}
          </button>
        )}
      </div>
    </div>
  );
}