export interface Task {
  id: number;
  text: string;
  tags: string;
  createdAt: string;
  completedAt: string | null;
  isDone: boolean;
  isDelete: boolean;
  // TODO
  [key: string]: string | number | boolean | Date | null;
}

export type KeyName = keyof Task;
export type WidthData = { [Key in KeyName]: number };
