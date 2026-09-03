import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Expenses from './Expenses.tsx';
import Chores from './Chores.tsx';
import Home from './Home.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="expenses" element={<Expenses />} />
        <Route path="chores" element={<Chores />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
