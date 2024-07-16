// RTCModule.js

// Notify function for logging
const notify = (message) => {
  console.log(message);
};

// Create offer function
export const createOffer = async (connection, localStream, userToCall, doOffer, database, username) => {
  try {
    connection.addStream(localStream);

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    doOffer(userToCall, offer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

// Initiate local stream
export const initiateLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return stream;
  } catch (exception) {
    console.error(exception);
  }
};

// Initiate connection
export const initiateConnection = async () => {
  try {
    const configuration = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "turn:your-turn-server.com:3478",
          username: "your-username",
          credential: "your-password",
        },
      ],
    };

    const connection = new RTCPeerConnection(configuration);
    return connection;
  } catch (exception) {
    console.error(exception);
  }
};

// Listen to connection events
export const listenToConnectionEvents = (conn, username, remoteUsername, database, remoteVideoRef, doCandidate) => {
  // listen for ice candidates
  conn.onicecandidate = function(event) {
    if (event.candidate) {
      doCandidate(remoteUsername, event.candidate, database, username);
    }
  };

  // when a remote user adds stream to the peer connection, we display it
  conn.ontrack = function(e) {
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== e.streams[0]) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  };
};


// Send answer
export const sendAnswer = async (conn, localStream, notif, doAnswer, database, username) => {
  try {
    conn.addStream(localStream);

    const offer = JSON.parse(notif.offer);
    await conn.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await conn.createAnswer();
    await conn.setLocalDescription(answer);

    doAnswer(notif.from, answer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

// Start call
export const startCall = (conn, notif) => {
  const answer = JSON.parse(notif.answer);
  conn.setRemoteDescription(new RTCSessionDescription(answer));
};

// Add candidate
export const addCandidate = async (conn, candidate) => {
  try {
    const iceCandidate = new RTCIceCandidate(JSON.parse(candidate));
    await conn.addIceCandidate(iceCandidate);
  } catch (exception) {
    console.error(exception);
  }
};
