import { useEffect, useState } from "react";

import Header from "./components/Header";
import TaskList from "./components/tasks/TaskList";
import AddTaskModal from "./components/tasks/AddTaskModal";
import { navItems } from "./navigation/navItems";

import {
  getTasks,
  updateTask,
  deleteTask,
  type Task,
} from "./api/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load tasks.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    try {
      const updatedTask = await updateTask(
        id,
        !task.completed
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update task.");
    }
  };

  const handleAddTask = (task: Task) => {
    setTasks((currentTasks) => [task, ...currentTasks]);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete task.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <Header navItems={navItems} />

      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              Tasks
            </h1>

            <p className="mt-1 text-lavender-grey-500">
              Manage your household tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-dusk-blue-500 px-4 py-2.5 text-sm font-medium text-alabaster-grey-100 transition-colors hover:bg-lavender-grey-500"
          >
            Add task
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          {loading ? (
            <p className="text-lavender-grey-500">
              Loading tasks...
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>

        {isModalOpen && (
          <AddTaskModal
            onAdd={handleAddTask}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
};

export default Tasks;