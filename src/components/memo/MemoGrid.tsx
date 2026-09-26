import React from 'react';
import MemoCard from './MemoCard';
import SearchIcon from '../../assets/icons/search_b.svg';
import type { Memo } from '../../types/memo';

interface MemolistProps{
  memoList : Memo[];
  searchQuery : string;
  onSelectMemo : (id: string) => void;
  onToggleFavorite : (id: string) => void;
}

export default function MemoList({ 
  memoList = [], 
  searchQuery = '', 
  onSelectMemo, 
  onToggleFavorite 
}:MemolistProps) {

  if (memoList.length === 0) {
    if (searchQuery.trim() !== '') {
      return (
        <div className="m-0 border-2 border-dashed rounded-3xl border-blue-07/30 w-full flex-1 flex flex-col items-center justify-center p-6 py-12">
          <div className="w-16 h-16 rounded-full bg-blue-07 flex items-center justify-center mb-3 shadow-sm">
            <img src={SearchIcon} alt="search-icon" className="w-8 h-8"/>
          </div>
          <div className="text-center flex flex-col gap-1">
            <p className="text-blue-07 font-semibold text-sm">
              검색 결과가 없습니다
            </p>
            <p className="text-blue-07/60 text-xs">
              다른 검색어로 다시 시도해보세요
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="m-0 border-2 border-dashed rounded-3xl border-blue-02 w-full flex-1 flex flex-col items-center justify-center p-6 py-16">
        <div className="w-16 h-16 rounded-full bg-[#AAC8FF] text-white flex items-center justify-center mb-4 shadow-sm">
          <span className="text-3xl font-light leading-none -mt-1">+</span>
        </div>
        <p className="text-blue-02 font-medium text-sm">
          새로운 메모를 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {memoList.map((memo) => (
        <MemoCard
          key={memo.id}
          title={memo.title}
          content={memo.content}
          category={memo.category}
          createdAt={memo.createdAt}
          isFavorite={memo.isFavorite}
          onClick={() => onSelectMemo && onSelectMemo(memo.id)}
          onFavoriteToggle={() => onToggleFavorite && onToggleFavorite(memo.id)}
        />
      ))}
    </div>
  );
}
