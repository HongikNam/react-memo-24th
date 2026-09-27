import React from 'react';
import SearchBar from './header/SearchBar';
import Button from './header/Button';
import Profile from '../assets/icons/Profile.svg';
import addBtn from '../assets/icons/AddMemo.svg';
import type { Tag } from '../types/memo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTag: Tag;
  onTagChange: (tag: Tag) => void;
  onAddMemo: () => void;
  onProfileClick: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  onAddMemo,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className="flex items-center gap-3 bg-[#EBF2FF] px-[120px] py-4 w-full">
      <SearchBar
        selectedTag={selectedTag}
        onSelectTag={onTagChange}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={() => {}}
        className="flex-1"
      />

      <Button
        size="scb"
        className="bg-white shadow-sm hover:bg-gray-50 shrink-0 font-bold rounded-full"
        onClick={onAddMemo}
      >
        <img
          src={addBtn}
          alt="add memo"
          height="80"
          width="80"
        />
      </Button>

      <Button
        size="scb"
        className="bg-white shadow-sm hover:bg-gray-50 shrink-0 font-bold rounded-full"
        onClick={onProfileClick}
        disabled 
      >
        <img
          src={Profile}
          alt="profile"
          height="40"
          width="40"
        />
      </Button>
    </header>
  );
}