import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MemoGrid from './components/memo/MemoGrid';
import MemoDetailModal from './components/modal/Modal_detail'; 
import MemoEditModal from './components/modal/Modal_edit'; 
import ModalPopup from './components/modal/Modal_popup'; 
import type { Memo, Tag } from './types/memo';

const STORAGE_KEY = 'memo_app_data'; 

export type PopupType = 'alert' | 'confirm';

export interface PopupConfig {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: PopupType;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function App() {
  const [memos, setMemos] = useState<Memo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as Memo[];
      } catch (e) {
        console.error('로컬스토리지 데이터를 파싱하지 못했습니다.', e);
      }
    }
    return [
      {
        id: '1',
        title: '이것은 제목입니다',
        content: '이것은 본문입니다 이것은 본문입니다 이것은 본문입니다.',
        category: 'Daily',
        createdAt: '2026.09.15',
        isFavorite: false,
      },
    ];
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<Tag>('전체');

  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [editingMemo, setEditingMemo] = useState<Partial<Memo> | null>(null);
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const filteredMemos = memos
    .filter((memo) => {
      const matchesTag =
        selectedTag === '전체' || memo.category === selectedTag;
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        memo.title.toLowerCase().includes(query) ||
        memo.content.toLowerCase().includes(query);

      return matchesTag && matchesQuery;
    })
    .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

  const handleSelectMemo = (id: string) => {
    const memo = memos.find((m) => m.id === id);
    if (memo) setSelectedMemo(memo);
  };

  const handleSaveMemo = (savedMemo: Memo) => {
    const isEdit = memos.some((m) => m.id === savedMemo.id);

    if (isEdit) {
      setMemos((prev) =>
        prev.map((memo) => (memo.id === savedMemo.id ? savedMemo : memo))
      );
    } else {
      setMemos((prev) => [savedMemo, ...prev]);
    }
    
    setEditingMemo(null);

    setPopupConfig({
      title: isEdit ? '메모가 수정되었습니다.' : '새 메모가 등록되었습니다.',
      description: '메모 리스트에서 확인하실 수 있습니다.',
      confirmText: '확인',
      type: 'alert',
      onConfirm: () => setPopupConfig(null),
    });
  };

  const handleDeleteMemoRequest = (id: string) => {
    setPopupConfig({
      title: '메모를 삭제 하시겠습니까?',
      description: '삭제된 메모는 휴지통에서 확인 가능합니다.',
      confirmText: '삭제',
      cancelText: '취소',
      type: 'confirm',
      onConfirm: () => executeDelete(id), 
      onCancel: () => setPopupConfig(null),
    });
  };

  const executeDelete = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
    setSelectedMemo(null); 

    setPopupConfig({
      title: '해당 메모가 삭제되었습니다',
      description: '삭제된 메모는 휴지통에서 확인 가능합니다.',
      confirmText: '확인',
      type: 'alert',
      onConfirm: () => setPopupConfig(null),
    });
  };

  const handleToggleFavorite = (id: string) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) =>
        memo.id === id ? { ...memo, isFavorite: !memo.isFavorite } : memo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        onAddMemo={() => setEditingMemo({})}
        onProfileClick={() => console.log('프로필 클릭')} 
      />

      <main className="w-full px-[120px] py-4 bg-[#EBF2FF] flex-1 flex flex-col">
        <MemoGrid 
          memoList={filteredMemos} 
          searchQuery={searchQuery}
          onSelectMemo={handleSelectMemo} 
          onToggleFavorite={handleToggleFavorite} 
        />
      </main>

      <MemoDetailModal
        isOpen={!!selectedMemo}
        memo={selectedMemo}
        onClose={() => setSelectedMemo(null)}
        onEdit={(memo) => setEditingMemo(memo)}
        onDelete={handleDeleteMemoRequest} 
      />

      <MemoEditModal
        isOpen={!!editingMemo}
        memo={editingMemo as Memo}
        onClose={() => setEditingMemo(null)}
        onSave={handleSaveMemo}
      />

      {popupConfig && (
        <ModalPopup
          isOpen={!!popupConfig}
          title={popupConfig.title}
          description={popupConfig.description}
          confirmText={popupConfig.confirmText}
          cancelText={popupConfig.cancelText}
          type={popupConfig.type}
          onConfirm={popupConfig.onConfirm}
          onCancel={popupConfig.onCancel}
        />
      )}
    </div>
  );
}