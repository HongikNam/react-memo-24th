import React, { useEffect, useState, useRef } from 'react';
import type { Memo, Tag } from '../../types/memo';

const TAG_COLORS: Record<Exclude<Tag, '전체'>, string> = 
  {  
    Daily: "bg-blue-03 text-blue-03", 
    Work: "bg-blue-06 text-blue-06",
    Others: "bg-gray-02 text-gray-02",
  }; 

  const CATEGORIES: Exclude<Tag, '전체'>[] = [
    'Daily',
    'Work', 
    'Others', 
  ];
  interface MemoEditModalProps { 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (memo: Memo) => void; 
    memo?: Memo | null; 
  }

export default function MemoEditModal({ isOpen, onClose, onSave, memo }: MemoEditModalProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<Exclude<Tag, '전체'>>('Daily');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (memo && memo.id) {
      setTitle(memo.title || '');
      setContent(memo.content || '');
      setCategory(memo.category === '전체' ? 'Daily' : memo.category);
    } else {
      setTitle('');
      setContent('');
      setCategory('Daily');
    }
  }, [memo, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if ( dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) 
      ) { 
        setIsDropdownOpen(false); } 
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const savedMemo: Memo = {
      id: memo?.id ?? crypto.randomUUID(), 
      title: title.trim(), 
      content: content.trim(), 
      category, 
      createdAt: memo?.createdAt ?? new Date().toISOString(), 
      isFavorite: memo?.isFavorite ?? false, 
    }; 
    onSave(savedMemo); 
    onClose(); 
  };

  const isEditMode = Boolean(memo && memo.id);
  const currentBgClass = TAG_COLORS[category];
  const currentDate = memo?.createdAt
    ? memo.createdAt
    : new Date().toISOString().slice(0, 10).replaceAll('-', '.');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose} />

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-lg flex flex-col gap-6">
        <div className={`w-full rounded-[32px] ${currentBgClass} p-8 text-white shadow-2xl flex flex-col min-h-[420px]`}>
          
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold text-white placeholder-white/60 focus:outline-none mb-4"
            autoFocus
          />

          <div className="flex items-center gap-3 mb-6 text-sm font-semibold">
            
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center bg-white ${currentBgClass} rounded-full px-4 py-1.5 shadow-sm text-[#7BA7FF] font-bold text-xs hover:bg-gray-50`}
              >
                <span>{category}</span>
                <span className="ml-1 text-[10px]">
                  ▶
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-20">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between ${
                        category === cat ? 'text-[#1B56FD] bg-blue-50/50' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/60 font-light text-xl">|</span>
            <span className="text-white/90 font-medium text-sm">
              {currentDate}
            </span>
          </div>

          <textarea
            placeholder="내용을 입력하세요..."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 bg-transparent text-white/95 placeholder-white/60 text-sm font-light leading-relaxed resize-none focus:outline-none overflow-y-auto pr-1"
          />
        </div>

        <div className="flex items-center gap-4 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-[#E2E4E8] text-[#5A6474] font-bold text-base hover:bg-gray-300 transition-colors shadow-sm text-center"
          >
            {isEditMode ? '수정 취소' : '작성 취소'}
          </button>
          
          <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className={`flex-1 py-4 rounded-2xl font-bold text-base transition-colors shadow-md text-center ${
                title.trim() && content.trim()
                  ? 'bg-[#1B56FD] text-white hover:bg-blue-700 cursor-pointer' 
                  : 'bg-[#0055F5] text-white/70 cursor-not-allowed'
              }`}
            >
            {isEditMode ? '수정 완료' : '작성 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}