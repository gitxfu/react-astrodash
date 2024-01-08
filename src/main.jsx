import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import './App.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx';
import NotFound from './routes/NotFound.jsx';
import About from './routes/About.jsx';
import DetailView from './routes/DetailView';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App/>} />
          <Route index={false} path="/date/:symbol" element={<DetailView />} />
          <Route index={false} path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
