export interface ITask {
  id: string;
  date: string;
  title: string;
  image?: string | null;
  important?: boolean;
}

export type TAvailableLanguages = 'en' | 'ru';
