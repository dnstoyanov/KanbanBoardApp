import {firebase} from '../../firebase';

export const login = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const register = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
