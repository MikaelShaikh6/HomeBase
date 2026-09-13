import Header from "./components/Header";
import HouseholdCard from "./components/HouseholdCard";
import RecentTasks from "./components/tasks/RecentTasks";

import { navItems } from "./navigation/navItems";
import { useEffect, useState } from "react";
import { getMyHousehold } from "./api/households";
import { getTasks, type Task } from "./api/tasks";

const Home = () => {
  const [household, setHousehold] = useState<{
    name: string;
    invite_code: string;
  } | null>(null);

  const [memberCount, setMemberCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getMyHousehold().then((data) => {
        setHousehold(data.household);
        setMemberCount(data.members.length);
      }),

      getTasks().then((data) => {
        setTasks(data);
      }),
    ])
      .catch((error) => {
        console.error(error);
        setError("Failed to load your household data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <Header navItems={navItems} />

      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Home
          </h1>

          <p className="mt-1 text-lavender-grey-500">
            See what's happening in your household.
          </p>
        </div>

        {loading ? (
          <p className="text-lavender-grey-500">
            Loading...
          </p>
        ) : error ? (
          <p className="text-sm text-red-400">
            {error}
          </p>
        ) : (
          <div className="space-y-6">
            {household && (
              <HouseholdCard
                name={household.name}
                inviteCode={household.invite_code}
                memberCount={memberCount}
              />
            )}

            <RecentTasks tasks={tasks} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;