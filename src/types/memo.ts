export type Tag = '전체' | 'Daily' | 'Work' | 'Others';

export interface Memo {
  id: string;
  title: string;
  content: string;
  category?: Tag;
  createdAt: string;
  isFavorite?: boolean;
}