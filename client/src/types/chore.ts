export type Chore = {
  id: string;
  title: string;
  assignedToId: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  recurring: boolean;
};