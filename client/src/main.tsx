import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Tasks from './Tasks.tsx';
import Profile from './Profile.tsx';
import Home from './Home.tsx';
import Login from './Login.tsx'
import Register from './Register.tsx'
import HouseholdSetup from './HouseholdSetup.tsx';
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/household/setup"
          element={<HouseholdSetup />}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
)
