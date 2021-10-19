import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '392222080442-l93p1pdct3ok3uovj909ri37eqju49l1.apps.googleusercontent.com',
});

export class Auth {
  instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Auth();
    }

    return this.instance;
  }

  getToken() {
    return auth().currentUser.getIdToken();
  }

  authStateChange(callback) {
    return auth().onAuthStateChanged(callback);
  }

  async handleLoginGoogle() {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
}
