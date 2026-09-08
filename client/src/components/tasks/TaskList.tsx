import TaskItem from "./TaskItem";
import type { Task } from "../../types/task";

type TaskListProps = {
  tasks: Task[]; 
  onToggle: (id: string) => void;
};

export default function TaskList({tasks, onToggle}: TaskListProps) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between">
        <button className="text-sm font-medium text-lavender-grey-500 transition-colors hover:text-alabaster-grey-100">
          View all
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500">
        {tasks.map((task) => (
          <TaskItem
            task={task}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}