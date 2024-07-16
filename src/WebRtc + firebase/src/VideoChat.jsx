import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import classnames from 'classnames';

const VideoChat = ({ onLogin, startCall, setLocalVideoRef, setRemoteVideoRef, connectedUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userToCall, setUserToCall] = useState('');

  const handleLoginClicked = async () => {
    if (!username) {
      alert('Please enter a username');
      return;
    }
    
    await onLogin(username);
    setIsLoggedIn(true);
  };

  const handleStartCallClicked = () => {
    if (!userToCall) {
      alert('Please enter a user to call');
      return;
    }
    
    startCall(username, userToCall);
  };

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    setLocalVideoRef(localVideoRef.current);
    setRemoteVideoRef(remoteVideoRef.current);

    return () => {
      // Clean up the refs
      setLocalVideoRef(null);
      setRemoteVideoRef(null);
    };
  }, [setLocalVideoRef, setRemoteVideoRef]);

  const renderVideos = () => (
    <div className={classnames('videos', { active: isLoggedIn })}>
      {isLoggedIn && (
        <div>
          <label>{username}</label>
          <video ref={localVideoRef} autoPlay playsInline></video>
        </div>
      )}
      {connectedUser && (
        <div>
          <label>{connectedUser}</label>
          <video ref={remoteVideoRef} autoPlay playsInline></video>
        </div>
      )}
    </div>
  );

  const renderForms = () => (
    isLoggedIn ? (
      <div className="form">
        <label>Call to</label>
        <input
          value={userToCall}
          type="text"
          onChange={(e) => setUserToCall(e.target.value)}
        />
        <button
          onClick={handleStartCallClicked}
          id="call-btn"
          className="btn btn-primary"
        >
          Call
        </button>
      </div>
    ) : (
      <div className="form">
        <label>Type a name</label>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLoginClicked}
          id="login-btn"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    )
  );

  return (
    <section id="container">
      {connectedUser ? null : renderForms()}
      {renderVideos()}
    </section>
  );
};

export default VideoChat;
