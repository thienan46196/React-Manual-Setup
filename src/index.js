import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import BestPractices from 'Pages/best-practices/best-practices';
import Home from 'Pages/home/home';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Home />} />
      <Route path="/best-practices" element={<BestPractices />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
