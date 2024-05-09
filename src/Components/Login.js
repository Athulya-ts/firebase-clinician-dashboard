// SignIn.js
import React, { useState } from 'react';
import './auth.css';
import { Button } from '@mui/material';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { Navigate, Link } from 'react-router-dom';

const SignIn = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div className="containerr">
      {userLoggedIn && <Navigate to={'/App'} replace={true} />}
      <div className="login-box">
        <center>
          <h2>Sign In</h2>
        </center>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
          </div>
          <center>
            <Button type="submit" className="btnn btnn-primary" variant="contained" onClick={onSubmit}>
              Sign In
            </Button>
            <p className="log-signup">
              Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </p>
            <div className="separator">
              <hr className="line" />
              <span className="or">OR</span>
              <hr className="line" />
            </div>
            <button onClick={onGoogleSignIn} type="button" className="btnn btnn-google">
              Sign In with Google
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default SignIn;










// // SignIn.js
// import React,{useState} from 'react';
// import './auth.css';
// import { Button } from '@mui/material';
// // import { doSignInWithEmailAndPassword, doSignInWithGoogle} from '../firebase/auth'
// // import {useAuth} from '../contexts/authContext'
// import { Navigate, Link } from 'react-router-dom';

// const SignIn = () => {
// //   const {userLoggedIn} = useAuth()

//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [isSigningIn,setIsSigningIn] = useState(false)
//   const [errorMessage,setErrorMessage] = useState('')

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     window.location.href = "/App"
//     // if(!isSigningIn){
//     //   setIsSigningIn(true)
//     //   await doSignInWithEmailAndPassword(email, password)
//     // }
//   }
  
//   const onGoogleSignIn = (e) => {
//     e.preventDefault()
//     // if(!isSigningIn){
//     //   setIsSigningIn(true)
//     //   doSignInWithGoogle().catch(err => {
//     //     setIsSigningIn(false)
//     //   })
//     // }

//   }
//   return (
//     <div className="containerr">
//       {/* {userLoggedIn && (<Navigate to = {'/home'} replace = {true} />)} */}
//       <div className="login-box">
//         <center><h2>Sign In</h2></center>
//         <form>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" className="form-control" placeholder="Enter email" />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" className="form-control" placeholder="Enter password" />
//           </div>
//           <center>
//             <Button type="submit" className="btn btn-primary" variant="contained" onClick={onSubmit}>Sign In</Button>
//             <p className='log-signup'>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
//             <div className="separator">
//                 <hr className="line" />
//                 <span className="or">OR</span>
//                 <hr className="line" />
//             </div>
//             <button onClick={onGoogleSignIn} type="button" className="btn btn-google">
//             Sign In with Google
//             </button>
//           </center>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;