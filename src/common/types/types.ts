export enum TaskStatus {
  EXPIRED = 'expired',
  TODAY = 'today',
  ACTUAL = 'actual',
  DONE = 'done',
}

export interface ITask {
  id: string;
  date: string;
  title: string;
  image: string | null;
  important: boolean;
  isDone: boolean;
  status?: TaskStatus;
}
