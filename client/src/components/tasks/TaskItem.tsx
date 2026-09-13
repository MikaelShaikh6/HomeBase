import type { Task } from "../../api/tasks";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {

  const formattedTime = new Date(
    `1970-01-01T${task.time}`
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (

    
    <div
      className={`group flex items-center gap-4 border-b border-dusk-blue-500/20 px-5 py-4 transition-colors last:border-b-0 hover:bg-dusk-blue-500/20 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          task.completed
            ? "border-lavender-grey-500 bg-lavender-grey-500 text-ink-black-500"
            : "border-dusk-blue-500 hover:border-lavender-grey-500 hover:bg-lavender-grey-500/20"
        }`}
      >
        {task.completed && (
          <span className="text-xs font-bold">✓</span>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            task.completed
              ? "text-lavender-grey-500 line-through"
              : "text-alabaster-grey-100"
          }`}
        >
          {task.title}
        </p>

        <p className="mt-0.5 text-xs text-lavender-grey-500">
          {task.assigned_to_email}
        </p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium text-lavender-grey-500">
          Due
        </p>

        <p className="mt-0.5 text-sm text-alabaster-grey-100">
          {formattedTime}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="text-xs text-lavender-grey-500 hover:text-alabaster-grey-100"
      >
        Delete
      </button>
    </div>
  );
}