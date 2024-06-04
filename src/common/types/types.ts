export enum TaskStatus {
  EXPIRED = 'expired',
  TODAY = 'today',
  ACTUAL = 'actual',
}

export interface ITask {
  id: string;
  date: string;
  title: string;
  image: string | null;
  important: boolean;
  status?: TaskStatus;
}
