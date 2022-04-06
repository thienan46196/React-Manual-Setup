import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ABC from 'Pages/test/test';
import App from './App';
import BestPractices from 'Pages/best-practices/best-practices';
import BootStrap from 'Pages/bootstrap-v5/bootstrap';
import DMXReport from './pages/bootstrap-v5/refactor';
import Home from 'Pages/home/home';
import React from 'react';
import ReactDOM from 'react-dom';
import Test2 from 'Pages/test/test2';

// import DMXReport from 'Pages/bootstrap-v5/refactor';

// import Home from 'Pages/home/home';

const fake = {
  systemId: '2156645d-2bb8-42cc-93f9-4cc32ec909f6',
  t: {}
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Home />} />
      <Route path="/best-practices" element={<BestPractices />}></Route>
      <Route path="/bootstrap" element={<BootStrap />}></Route>
      <Route path="/refactor" element={<DMXReport />} />
      <Route path="/test2" element={<Test2 />} />
      <Route path="/test" element={<ABC />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
