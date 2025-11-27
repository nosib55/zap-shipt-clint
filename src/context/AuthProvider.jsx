import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};


  // 🔥 Correctly placed useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
