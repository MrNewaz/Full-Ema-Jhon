import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from './LoginManager';

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };

      newUserInfo[e.target.name] = e.target.value;

      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Firebase Auth by Newaz</h1>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Facebook Login</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email} </p>
          <img src={user.photo} alt={user.name} />
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type='checkbox'
        onChange={() => setNewUser(!newUser)}
        name='newUser'
        id=''
      />
      <label htmlFor='newUser'>New User Signup</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type='text'
            onBlur={handleBlur}
            name='name'
            placeholder='Your Name'
            required
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          type='text'
          name='email'
          placeholder='Your Email Address'
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type='password'
          name='password'
          placeholder='password'
          required
        />
        <br />
        <input type='submit' value='submit' />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && (
        <p style={{ color: 'green' }}>
          User {!newUser ? 'logged in' : 'created'} successfully
        </p>
      )}
    </div>
  );
};

export default Login;
