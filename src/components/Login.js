import React, { useRef, useState } from 'react';
import Header from './Header';
import BackgroundImage from "../assets/images/netflix-background.jpg"
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import avatarImage from "../assets/images/avatar-image.png";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSingInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  const handleButtonCLick = (e) => {

    // checkValidData();
    console.log(email);
    console.log(password);
    const message = checkValidData(email?.current?.value, password?.current?.value);
    console.log('message: ', message);
    setErrorMessage(message);

    if (message) return;
    // sign in sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value, photoURL: avatarImage
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            // ... sign in
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            // Profile updated!
            console.log('user: ', user);
            navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('user: ', user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    }

  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BackgroundImage} alt='background image' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {
          !isSignInForm && (
            <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
          )
        }
        <input type='text' placeholder='Email Address' ref={email} className='p-4 my-4 w-full bg-gray-700 rounded-lg' />


        <input type='password' placeholder='Password' maxLength="6" ref={password} className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
        <p className='text-red-500'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonCLick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSingInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In now"}</p>

      </form>
    </div>
  )
}

export default Login