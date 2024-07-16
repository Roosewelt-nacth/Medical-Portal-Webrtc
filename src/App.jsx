import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Frontend/home';
import Signup from './Frontend/Signup';
import Webrtc from './WebRtc + firebase/src/App';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Webrtc" element={<Webrtc/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
