import logo from "./logo.svg";
import "./App.css";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
function App() {


  //firebase integration
  // Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqH_SMBrN0-CEJ7H1AclPsFvtbB6o4YMo",
  authDomain: "useform-aa23d.firebaseapp.com",
  projectId: "useform-aa23d",
  storageBucket: "useform-aa23d.appspot.com",
  messagingSenderId: "398743057480",
  appId: "1:398743057480:web:79f433ae02aa440873d47d",
  measurementId: "G-1ZG7M6NW1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/***************Send Data***************/
const handleSendData = async(values)=>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName:values.fname
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
/***************Add Data***************/
const handleGetData = async()=>{
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}
handleGetData();
  //schema for validation
  let userSchema = yup.object({
    fname: yup.string().required('This is Required').max(15,"limit exceed").min(3,"name too small").trim("spaces not allow at begining and and"),
  });



  //useForm Work
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(userSchema)
  })
  const submit = (values)=>{
    handleSendData(values)
    console.log(values)
  }

  return <div className="App">
    <Typography variant="h2">Form</Typography>
    <Container maxWidth = "sm">
    <form action="" style={{display:"flex",flexDirection:"column",gap:"10px"}} onSubmit={handleSubmit(submit)}>
    <TextField id="outlined-basic" label="First Name" variant="outlined"   {...register("fname")} error = {!!errors.fname} helperText={errors.fname?.message}/>
    <Button variant="contained" type="submit">Submit</Button>
    </form>
    </Container>
  </div>;
}

export default App;
