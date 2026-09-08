import Header from "./components/Header";
import HouseholdCard from "./components/HouseholdCard";
import RecentTasks from "./components/tasks/RecentTasks";

import { navItems } from "./navigation/navItems";

const Home = () => {
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

        <div className="space-y-6">
          <HouseholdCard />

          <RecentTasks />
        </div>
      </main>
    </div>
  );
};

export default Home;
