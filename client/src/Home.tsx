import { useState } from "react";

import WelcomeHeader from "./components/today/WelcomeHeader";
import ProgressCard from "./components/today/ProgressCard";
import StreakCard from "./components/today/StreakCard";
import ChoreList from "./components/today/ChoreList";
import ActivityFeed from "./components/today/ActivityFeed";
import WeeklyOverview from "./components/today/WeeklyOverview";
import UpcomingChores from "./components/today/UpcomingChores";
import Header from "./components/Header";

import { navItems } from "./navigation/navItems";
import { mockChores } from "./data/mockChores";
import type { Chore } from "./types/chore";
import AddChoreModal from "./components/today/AddChoreModal";

const Home = () => {
  const [chores, setChores] = useState<Chore[]>(mockChores);
  const [showAddChore, setShowAddChore] = useState(false);

  const handleAddChore = (newChore: Chore) => {
    setChores((currentChores) => [
      ...currentChores,
      newChore,
    ]);
  };

  const completedCount = chores.filter(
    (chore) => chore.completed
  ).length;

  const totalCount = chores.length;

  const toggleChore = (id: string) => {
    setChores((currChores) => 
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

  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <Header navItems={navItems} />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <WelcomeHeader onAddChore={() => setShowAddChore(true)}/>

        {/* Progress + Streak */}
        <section className="mb-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <ProgressCard completed={completedCount} total={totalCount}/>
          <StreakCard />
        </section>

        <ChoreList onToggle={toggleChore} chores={chores}/>

        {/* Activity + Weekly */}
        <section className="grid gap-5 lg:grid-cols-2">
          <ActivityFeed />
          <WeeklyOverview />
        </section>

        <UpcomingChores />
      </main>

      {showAddChore && (
        <AddChoreModal
          onAdd={handleAddChore}
          onClose={() => setShowAddChore(false)}
        />
      )}
    </div>
  )
}

export default Home