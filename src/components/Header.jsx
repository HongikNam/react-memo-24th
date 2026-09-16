import React from 'react';
import SearchBar from '../../../react-memo-24th/src/components/header/SearchBar';
import Button from '../../../react-memo-24th/src/components/header/Button';
import Profile from '../assets/icons/Profile.svg'
import addBtn from '../assets/icons/AddMemo.svg'

export default function Header({ 
  searchQuery, 
  onSearchChange, 
  selectedTag, 
  onTagChange,
  onAddMemo, 
  onProfileClick 
}) {
  const handleTagClick = () => {
    console.log('태그 선택 클릭');
  };

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
        <img src={addBtn} alt='add memo' height='80px' width='80px' />
      </Button>

      <Button 
        size="scb" 
        className="bg-white shadow-sm hover:bg-gray-50 shrink-0 font-bold rounded-full"
        onClick={onProfileClick}
      >
        <img src={Profile} alt='profile' height='40px' width='40px' />
      </Button>
    </header>
  );
}