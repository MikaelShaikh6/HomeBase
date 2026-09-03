import WelcomeHeader from "./components/today/WelcomeHeader";
import ProgressCard from "./components/today/ProgressCard";
import StreakCard from "./components/today/StreakCard";
import ChoreList from "./components/today/ChoreList";
import ActivityFeed from "./components/today/ActivityFeed";
import WeeklyOverview from "./components/today/WeeklyOverview";
import UpcomingChores from "./components/today/UpcomingChores";
import Header from "./components/today/Header";

const Home = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/expenses", label: "Expenses" },
    { to: "/chores", label: "Chores" },
  ]


  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <Header navItems={navItems} />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <WelcomeHeader />

        {/* Progress + Streak */}
        <section className="mb-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <ProgressCard />
          <StreakCard />
        </section>

        <ChoreList />

        {/* Activity + Weekly */}
        <section className="grid gap-5 lg:grid-cols-2">
          <ActivityFeed />
          <WeeklyOverview />
        </section>

        <UpcomingChores />
      </main>
    </div>
  )
}

export default Home