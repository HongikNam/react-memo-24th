import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import searchBtn from '../../assets/icons/Search.svg';
import type { Tag } from '../../types/memo';

interface SearchBarProps {
  selectedTag?: Tag;
  onSelectTag?: (tag: Tag) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  selectedTag,
  onSelectTag,
  value,
  onChange,
  onSearch,
  placeholder = "원하는 메모를 검색하세요",
  className = ""
}: SearchBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const TAG_OPTIONS : Tag[] = ['전체', 'Daily', 'Work', 'Others'];

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === 'Enter') {
      onSearch();
      }
    };

  const handleTagSelect = (tag : Tag) => {
    onSelectTag && onSelectTag(tag);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`flex items-center bg-white rounded-full px-4 shadow-sm w-full ${className}`}>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1.5 bg-blue-01 hover:bg-blue-200 text-blue-06 font-bold text-xs px-3 py-2 rounded-full transition-colors shrink-0 mr-2"
        >
          <span>{selectedTag ?? '태그 선택'}</span>
          <span className="text-[10px]">▶</span>
        </button>

        {isDropdownOpen && (
          <ul className="absolute left-0 mt-2 w-28 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 py-1.5 text-xs overflow-hidden">
            {TAG_OPTIONS.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  className={`w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors ${
                    selectedTag === tag ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-gray-700'
                  }`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-02 placeholder-gray-400 outline-none px-2"
      />

      <Button size="scb" onClick={onSearch} className="font-bold">
        <img src={searchBtn} alt='search-btn' height='40px' width='40px' />
      </Button>
    </div>
  );
}