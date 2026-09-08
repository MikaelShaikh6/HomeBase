import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Tasks from './Tasks.tsx';
import Profile from './Profile.tsx';
import Home from './Home.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="tasks" element={<Tasks />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>,
)
