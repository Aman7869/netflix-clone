import React from 'react'
// import NetflixLogo from "../assets/images/netflix-logo.png"
import Logo from "../assets/images/logo.svg"
import logoutIcon from "../assets/images/netflix-logut-icon.png";
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  console.log('user: ', user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between z-10'>
      <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo' />
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