import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import BestPractices from 'Pages/best-practices/best-practices';
import BootStrap from './pages/bootstrap-v5/bootstrap';
import Home from 'Pages/home/home';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from 'Pages/test/test';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Home />} />
      <Route path="/best-practices" element={<BestPractices />}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/bootstrap" element={<BootStrap />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
