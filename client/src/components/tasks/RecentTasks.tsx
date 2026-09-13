import type { Task } from "../../api/tasks";

type RecentTasksProps = {
  tasks: Task[];
};

const RecentTasks = ({ tasks }: RecentTasksProps) => {
  const recentTasks = tasks.slice(0, 3);

  return (
    <div>
      <h2 className="text-xl font-semibold">
        Recent Tasks
      </h2>

      <div className="mt-4 space-y-3">
        {recentTasks.length === 0 ? (
          <p className="text-lavender-grey-500">
            No tasks yet.
          </p>
        ) : (
          recentTasks.map((task) => {
            const formattedTime = new Date(
              `1970-01-01T${task.time}`
            ).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <div
                key={task.id}
                className="rounded-lg outline outline-lavender-grey-700 p-4"
              >
                <p
                  className={
                    task.completed
                      ? "line-through text-lavender-grey-500"
                      : ""
                  }
                >
                  {task.title}
                </p>

                <p className="mt-1 text-sm text-lavender-grey-500">
                  {formattedTime}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
