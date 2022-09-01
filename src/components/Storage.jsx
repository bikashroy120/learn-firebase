import React,{useState} from 'react'
import {app,storage} from "../firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Storage = () => {
    const [data, setemail] = useState()
    const submit = ()=>{
        const storageRef = ref(storage, data.name);
        const uploadTask = uploadBytesResumable(storageRef, data);
        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');    
        }, 
        (error) => {
        console.log(error.message)
         
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  return (
    <div>
        <input type="file" onChange={(e)=>setemail(e.target.files[0])}/>
        <button onClick={submit}>submite</button>
    </div>
  )
}

export default Storage