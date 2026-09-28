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
    <header className="flex items-center gap-2 sm:gap-3 bg-blue-01 px-4 md:px-12 lg:px-[120px] py-3 sm:py-4 w-full">
      <SearchBar
        selectedTag={selectedTag}
        onSelectTag={onTagChange}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={() => {}} // 후에 엔터키를 눌러야 렌더링 되게 바꾸고 싶을 때 적용
        className="flex-1 min-w-0" 
      />

      <Button
        size="scb" 
        className="bg-white shadow-sm hover:bg-gray-50 shrink-0 font-bold rounded-full p-2 sm:p-2.5"
        onClick={onAddMemo}
      >
        <img
          src={addBtn}
          alt="addmemo"
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
      </Button>

      <Button
        size="scb"
        className="bg-white shadow-sm hover:bg-gray-50 shrink-0 font-bold rounded-full p-2 sm:p-2.5"
        onClick={onProfileClick}
      >
        <img
          src={Profile}
          alt="profile"
          className="w-6 h-6 sm:w-8 sm:h-8" 
        />
      </Button>
    </header>
  );
}