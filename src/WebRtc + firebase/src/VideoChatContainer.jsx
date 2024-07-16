// VideoChatContainer.jsx

import React from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import VideoChat from './VideoChat';
import config from './config';
import { addCandidate, createOffer, initiateConnection, listenToConnectionEvents, sendAnswer, startCall } from './modules/RTCModule';
import { doAnswer, doCandidate, doLogin, doOffer } from './modules/FirebaseModule';
import 'webrtc-adapter';

class VideoChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null,
      connectedUser: null,
      localStream: null,
      localConnection: null,
    };
    this.localVideoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
  }

  componentDidMount = async () => {
    const app = initializeApp(config);
    const database = getDatabase(app);
    this.setState({ database });

    const localStream = await this.getLocalStream();
    if (this.localVideoRef.current) {
      this.localVideoRef.current.srcObject = localStream;
    }

    const localConnection = await initiateConnection();
    this.setState({ localConnection });
  };

  getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.setState({ localStream: stream });
      return stream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
      return null;
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.database !== nextState.database ||
      this.state.localStream !== nextState.localStream ||
      this.state.localConnection !== nextState.localConnection
    );
  }

  startCall = async (username, userToCall) => {
    const { database, localConnection, localStream } = this.state;

    if (!localConnection) {
      console.error("Local connection is not established.");
      return;
    }

    listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate);
    createOffer(localConnection, localStream, userToCall, doOffer, database, username);
  };

  onLogin = async (username) => {
    await doLogin(username, this.state.database, this.handleUpdate);
  };

  setLocalVideoRef = (ref) => {
    this.localVideoRef.current = ref;
  };

  setRemoteVideoRef = (ref) => {
    this.remoteVideoRef.current = ref;
  };

  handleUpdate = (notif, username) => {
    const { database, localConnection, localStream } = this.state;

    if (notif) {
      switch (notif.type) {
        case 'offer':
          this.setState({ connectedUser: notif.from });
          listenToConnectionEvents(localConnection, username, notif.from, database, this.remoteVideoRef, doCandidate);
          sendAnswer(localConnection, localStream, notif, doAnswer, database, username);
          break;

        case 'answer':
          this.setState({ connectedUser: notif.from });
          startCall(localConnection, notif);
          break;

        case 'candidate':
          addCandidate(localConnection, notif.candidate);
          break;

        default:
          break;
      }
    }
  };

  render() {
    return (
      <VideoChat
        startCall={this.startCall}
        onLogin={this.onLogin}
        setLocalVideoRef={this.setLocalVideoRef}
        setRemoteVideoRef={this.setRemoteVideoRef}
        connectedUser={this.state.connectedUser}
      />
    );
  }
}

export default VideoChatContainer;
