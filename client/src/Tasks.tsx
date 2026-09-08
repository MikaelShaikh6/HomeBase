import { useState } from "react";

import Header from "./components/Header";
import TaskList from "./components/tasks/TaskList";
import AddTaskModal from "./components/tasks/AddTaskModal";

import { navItems } from "./navigation/navItems";
import type { Task } from "./types/task";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((currChores) => 
      currChores.map((chore) => 
        chore.id == id
          ? {
            ...chore,
            completed: !chore.completed
          }
          : chore
      )
    );
  }

  const handleAddTask = (task: Task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
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

        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <TaskList tasks={tasks} onToggle={toggleTask}/>
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