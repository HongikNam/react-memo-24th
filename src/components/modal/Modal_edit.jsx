import React, { useEffect, useState, useRef } from 'react';

const TAG_COLORS = {
  Daily: "bg-[#7BA7FF] text-[#7BA7FF]" ,
  Work: "bg-[#0037A3] text-[#0037A3]",
  Others: "bg-[#A6B7CB] text-[#A6B7CB]",
};

const CATEGORIES = ['Daily', 'Work', 'Others'];

export default function MemoEditModal({ isOpen, onClose, onSave, memo }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Daily');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (memo && memo.id) {
      setTitle(memo.title || '');
      setContent(memo.content || '');
      setCategory(memo.category || 'Daily');
    } else {
      setTitle('');
      setContent('');
      setCategory('Daily');
    }
  }, [memo, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({ ...memo, title, content, category });
    onClose();
  };

  const isEditMode = Boolean(memo && memo.id);
  const currentBgClass = TAG_COLORS[category] || "bg-[#7BA7FF]";
  const currentDate = memo?.createdAt || '2026.09.15';

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