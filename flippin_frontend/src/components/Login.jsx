import React from 'react';
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import ShareVideo from '../assets/share.mp4';
import logo from '../assets/logo-white.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log('Getting Response');
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const {name, googleId, imageUrl} = response.profileObj;
    const doc = {
      _id : googleId,
      _type: 'user',
      userName: name,
      image : imageUrl
    }
    client.createIfNotExists(doc).then(()=>{
      navigate('/', {replace:true});
    });

    
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video
                src={ShareVideo} 
                type= 'video/mp4'
                loop
                muted
                autoPlay
                controls = {false}
                className='h-full w-full object-cover'
            />
        </div>
        <div className='absolute flex flex-col justify-center items-center bg-blackOverlay top-0 left-0 right-0 bottom-0'>
          <div className="p-5">
    <img src={logo} alt="logo" width='160px' />
          </div>
          <div className='drop-shadow-2xl'>
<GoogleLogin
clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
render={(renderProps)=>(
  <button
    type='button' 
    className='bg-mainColor flex justify-center items-center p-3 rounded-lg'
    onClick={renderProps.onClick}
    disabled = {renderProps.disabled}
    >
     <FcGoogle className='mr-4' />
      Login with Google
  </button>
)}
onSuccess = {responseGoogle}
onFailure = {responseGoogle}
cookiePolicy = 'single_host_origin'

/>

          </div>
        </div>
    </div>
  )
}

export default Login