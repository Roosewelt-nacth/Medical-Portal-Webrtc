import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Signup from './Signup';
// import Webrtc from './App';
function home(){

    const Navigate = useNavigate();
    const navigateToSignup = () =>{
        Navigate('./Signup');
    }
    const navigateToWebrtc= ()=>{
        Navigate('./Webrtc');
    }
    return(
        <div>
            <button onClick={navigateToSignup}>SignUp</button>
            <button onClick={navigateToWebrtc}>WebRtc</button>
        </div>
    )
}

export default home;