import TaskItem from "./TaskItem";

import type { Task } from "../../api/tasks";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-xl font-semibold">
          All Tasks
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500">
        {tasks.length === 0 ? (
          <p className="p-6 text-lavender-grey-500">
            No tasks yet.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}