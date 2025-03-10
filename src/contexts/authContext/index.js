import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentuser, setCurrentuser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentuser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentuser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = { currentuser, userLoggedIn, loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
