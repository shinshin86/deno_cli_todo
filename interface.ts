export interface Task {
  id: number;
  text: string;
  tags: string;
  createdAt: Date;
  completedAt: Date | null;
  isDone: boolean;
  isDelete: boolean;
}
