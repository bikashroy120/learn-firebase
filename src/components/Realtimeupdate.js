import React, { useState,useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { app, db } from "../firebaseConfig";

function Realtimeupdate() {
  const [email, setemail] = useState("");
  const [last, setpass] = useState("");
  const [roll, setroll] = useState("");
  const [reg, setreg] = useState("");

  const collectionref = collection(db, "users");

  const submitdhandel = () => {
    addDoc(collection(db, "users"), {
      first: email,
      last: last,
      roll: roll,
      reg: reg,
    })
      .then(() => {
        alert("data add");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getData = () => {
    getDocs(collectionref).then((res) => {
      console.log(
        res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(()=>{
    getData();
  },[])

  const updateData = () => {
    const dostoupdate = doc(db, "users", "wpQTqb5ZQPBCc2O7biTK");
    updateDoc(dostoupdate, {
      first: email,
      last: last,
      roll: roll,
      reg: reg,
    })
      .then((res) => alert("data update"))
      .catch((err) => alert(err.message));
  };
  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          value={email}
          placeholder="Fast Name"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          name=""
          value={last}
          placeholder="Last Name"
          onChange={(e) => setpass(e.target.value)}
        />
        <input
          type="text"
          name=""
          value={roll}
          placeholder="Roll...."
          onChange={(e) => setroll(e.target.value)}
        />
        <input
          type="text"
          name=""
          value={reg}
          placeholder="Reg..."
          onChange={(e) => setreg(e.target.value)}
        />
        <button type="submit" onClick={submitdhandel}>
          submit
        </button>
      </div>
    </div>
  );
}

export default Realtimeupdate;
