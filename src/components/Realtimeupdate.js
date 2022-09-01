import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import "./Style.css";

function Realtimeupdate() {
  const [email, setemail] = useState("");
  const [last, setpass] = useState("");
  const [roll, setroll] = useState("");
  const [reg, setreg] = useState("");
  const [item, setitem] = useState();

  const [emailup, setemailup] = useState("");
  const [lastup, setpassup] = useState("");
  const [rollup, setrollup] = useState("");
  const [regup, setregup] = useState("");
  const [update,setupdate] = useState()

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
    // getDocs(collectionref).then((res) => {
    //   console.log(
    //     res.docs.map((item) => {
    //       return { ...item.data(), id: item.id };
    //     })
    //   );
    // });
    onSnapshot(collectionref, (data) => {
      setitem(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);


  const updatefun =(id)=>{
    setupdate(id)
    const up = item.filter((t)=>t.id===id)
    setemailup(up[0].first)
    setpassup(up[0].last)
    setrollup(up[0].roll)
    setregup(up[0].reg)
  }

  const updateData = (id) => {
    const dostoupdate = doc(db, "users", id);
    updateDoc(dostoupdate, {
      first: emailup,
      last: lastup,
      roll: regup,
      reg: rollup,
    })
      .then((res) => alert("data update"))
      .catch((err) => alert(err.message));
  };

  const deleteItem = (id) => {
    deleteDoc(doc(db, "users", id))
      .then((res) => alert("data delete"))
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

        <div className="student">
          {item &&
            item.map((tt, index) => {
              return (
                <ul key={index}>
                  <li>Fast Name: {tt.first}</li>
                  <li>Lasr Name: {tt.last}</li>
                  <li>Roll: {tt.roll}</li>
                  <li>Reg: {tt.reg}</li>
                  {update===tt.id && (
                    <div className="input_box">
                      <input
                        type="text"
                        name=""
                        value={emailup}
                        placeholder="Fast Name"
                        onChange={(e) => setemailup(e.target.value)}
                      />
                      <input
                        type="text"
                        name=""
                        value={lastup}
                        placeholder="Last Name"
                        onChange={(e) => setpassup(e.target.value)}
                      />
                      <input
                        type="text"
                        name=""
                        value={rollup}
                        placeholder="Roll...."
                        onChange={(e) => setrollup(e.target.value)}
                      />
                      <input
                        type="text"
                        name=""
                        value={regup}
                        placeholder="Reg..."
                        onChange={(e) => setregup(e.target.value)}
                      />
                      <div>
                      <button type="submit" onClick={()=>updateData(tt.id)}>
                        submit
                      </button>
                      <button onClick={() => setupdate("")}>close</button>
                      </div>
                    </div>
                  )}
                  {update!==tt.id && <div>
                    <button onClick={() => updatefun(tt.id)}>update</button>
                    <button onClick={() => deleteItem(tt.id)}>delete</button>
                  </div>}
                </ul>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Realtimeupdate;
