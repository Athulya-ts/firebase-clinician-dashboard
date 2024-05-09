import { Navigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './auth.css';
import { Button } from '@mui/material';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebase';

const SignUp = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-up (e.g., redirect user to another page)
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error('Google sign-up error:', error);
    }
  };
  

  return (
    <div className="containerr">
      {userLoggedIn && <Navigate to={'/App'} replace={true} />}
      <div className="signup-box">
        <center>
          <h2>Sign Up</h2>
        </center>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <center>
            <Button variant="contained" type="submit" className="btnn btnn-primary" onClick={onSubmit}>
              Sign Up
            </Button>
            <p className="log-signup">
              Already have an account? <Link to="/Login">Sign In</Link>
            </p>
            <div className="separator">
              <hr className="line" />
              <span className="or">OR</span>
              <hr className="line" />
            </div>
            <button onClick={signUpWithGoogle} type="button" className="btnn btnn-google">
              Sign Up with Google
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default SignUp;











// // SignUp.js
// import { Navigate,Link } from 'react-router-dom';
// import React,{useState} from 'react';
// import './auth.css'
// import { Button } from '@mui/material';
// // import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
// // import {useAuth} from '../contexts/authContext'


// const SignUp = () => {
//   // const {userLoggedIn} = useAuth()

//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [confirmPassword,setConfirmPassword] = useState('')
//   // const [isRegistering,setIsRegistering] = useState(false)
//   // const [errorMessage,setErrorMessage] = useState('')

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     window.location.href = "/Login";
//     // if(!isRegistering) {
//     //   setIsRegistering(true)
//     //   await doCreateUserWithEmailAndPassword(email, password)
//     // }
//   }

//   return (
//     <div className="containerr">
//       {/* {userLoggedIn && (<Navigate to = {'/App'} replace = {true} />)} */}
//       <div className="signup-box">
//       <center><h2>Sign Up</h2></center>
//         <form>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" className="form-control" placeholder="Enter email" />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" className="form-control" placeholder="Enter password" />
//           </div>
//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input type="password" className="form-control" placeholder="Confirm password" />
//           </div>
//           <center>
//             <Button variant = "contained" type = "submit" className="btn btn-primary" onClick={onSubmit}>Sign Up</Button>
//             <p className='log-signup'>Already have an account? <Link to = "/Login">Sign In</Link></p>
//           </center>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
