import React from 'react';
import './App.css'
import VideoChatContainer from './VideoChatContainer'

const App = ()=> {
  return (
    <div className='app'>
      <h1>Video Chat App</h1>
      <h2>WebRTC + Firebase</h2>
      <VideoChatContainer/>
    </div>
  );
};

export default App;
