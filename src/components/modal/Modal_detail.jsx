import React, { useEffect } from 'react';
import Button from '../../../../react-memo-24th/src/components/header/Button';
import editBtn from '../../assets/icons/edit_w.svg';
import deleteBtn from '../../assets/icons/delete_w.svg';
import trashBtn from '../../assets/icons/trash_w.svg';

const TAG_COLORS = {
  Daily: "bg-[#7BA7FF] text-[#7BA7FF]", 
  Work: "bg-[#0037A3] text-[#0037A3]",
  Others: "bg-[#A6B7CB] text-[#A6B7CB]",
};

export default function MemoDetailModal({ isOpen, onClose, memo, onEdit, onDelete }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !memo) return null;

  const currentStyle = TAG_COLORS[memo.category] || TAG_COLORS.Daily;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className={`relative w-full max-w-md rounded-3xl ${currentStyle} p-6 text-white shadow-2xl flex flex-col justify-between min-h-[380px]`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/80 hover:text-white text-xl font-bold"
        >
          <img src={deleteBtn} alt='delete-btn'/>
        </button>

        <div>
          <h2 className="text-2xl font-bold mb-4 pr-8">{memo.title}</h2>

          <div className="flex items-center gap-3 mb-6 text-sm font-semibold">
            <span className={`bg-white ${currentStyle} px-4 py-1 rounded-full shadow-sm`}>
              {memo.category}
            </span>
            <span className="flex items-center text-3xl">|</span>
            <span className="text-white/90">{memo.createdAt}</span>
          </div>

          <p className="text-white/95 leading-relaxed whitespace-pre-wrap text-sm font-light max-h-60 overflow-y-auto pr-1">
            {memo.content}
          </p>
        </div>

        <div className="flex justify-end items-center gap-2 pt-4 mt-4">
          <Button
            size="md"
            className="bg-transparent hover:bg-white/30 text-white"
            onClick={() => {
              onClose();
              onEdit(memo);
            }}
            title="수정"
          >
            <img src={editBtn} alt='edit-btn' height='80px' width='80px' />
          </Button>

          <Button
            size="md"
            className="bg-transparent hover:bg-red-400 text-white"
            onClick={() => {
              onDelete(memo.id); 
            }}
            title="삭제"
          >
            <img src={trashBtn} alt='trash-btn' height='80px' width='80px' />
          </Button>
        </div>
      </div>
    </div>
  );
}