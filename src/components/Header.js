import React, { useEffect } from 'react'
// import NetflixLogo from "../assets/images/netflix-logo.png"
import Logo from "../assets/images/logo.svg"
import logoutIcon from "../assets/images/netflix-logut-icon.png";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import {LOGO} from "../utils/constant";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        // ... sign in
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between z-10'>
      <img className='w-44' src={LOGO} alt='logo' />
      {user && (
        <div className='flex'>
          <img src={user?.photoURL} alt='logoutIcon' className='w-[70px]' style={{ mixBlendMode: "multiply", clipPath: "circle()" }} />
          <button className='font-bold' onClick={handleSignOut}>(Sign Out)</button>
        </div>
      )}
    </div>
  )
}

export default Header