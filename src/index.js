import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from 'Pages/home/home';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
