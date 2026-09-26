import React from 'react';
import type { Tag } from '../../types/memo'; 
import type { Memo } from '../../types/memo';

export interface MemoCardProps extends Omit<Memo, 'id'> {
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}

const TAG_COLORS: Record<Tag, string> = {
  Daily: "bg-blue-03 text-white",
  Work: "bg-blue-06 text-white",
  Others: "bg-gray-02 text-white",
  전체: "bg-blue-02 text-white",
};

export default function MemoCard({
  title,
  content,
  category = 'Daily',
  createdAt,
  isFavorite = false,
  onFavoriteToggle,
  onClick
}: MemoCardProps) {
  const cardStyle = TAG_COLORS[category] || "bg-blue-500 text-white";

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl flex flex-col justify-between h-52 cursor-pointer transition-transform hover:-translate-y-1 shadow-sm ${cardStyle}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="font-bold text-base truncate">{title}</h3>

          <button
            type="button"
            aria-label = "favorite button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onFavoriteToggle?.();
            }}
            className="p-1 hover:opacity-80 transition-opacity"
          >
            <span className={isFavorite ? 'text-alert-01' : 'text-white/40'}>★</span>
          </button>
        </div>

        <p className="text-xs opacity-90 leading-relaxed line-clamp-4 font-light whitespace-pre-wrap">
          {content}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] opacity-75 font-medium mt-4">
        <span>{category}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}