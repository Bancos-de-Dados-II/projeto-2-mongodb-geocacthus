import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import path from "path";


const myRefreshToken = "./service-account-file.json";


initializeApp({
    credential: cert(require(path.resolve(__dirname, "./service-account-file.json"))),
})

const auth = getAuth()

export { auth };