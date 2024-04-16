import {initializeApp, initiaszeApp} from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey:process.env.REACT_API_KEY,
    authDomaine:process.env.REACT_AUTH_DOMAIN,
    projectId:process.env.REACT_PROJECT_ID,
    storageBucket:process.env.REACT_STORAGE_BUCKET,
    messagineSenderId:process.env.REACT_MESSAGEING_SENDER_ID,
    appId:process.env.REACT_APP_ID
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_BUCKET_URL);
export default storage