import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import womanSvg from "./assets/woman.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  const [icon, setIcons] = useState("");
  const [userValue, setUserValue] = useState("");

  const url = "https://randomuser.me/api/";

  const getRandomUser = async () => {
    const veri = await axios.get(url);
    console.log(veri.data.results[0]);
    setUsers(veri.data.results[0]);
    setIcons("name")
    setUserValue(veri.data.results[0].name?.first)
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  const update = () => {
    getRandomUser();
  };
  const deleteBilgi =  (sil) => {
    setUserList(userList.filter((a)=>a.email!==sil))
    getRandomUser();
    
  };

  return (
    <main key={users.email}>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={users?.picture?.large} alt="random user" className="user-img" />
          <p className="user-title">My {icon} is</p>
          <p className="user-value"> {userValue}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onClick={() => {
                setIcons("name");
                setUserValue(users?.name?.first);
              }}
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="email"
              onClick={() => {
                setIcons("email");
                setUserValue(users?.email);
              }}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onClick={() => {
                setIcons("age");
                setUserValue(users?.dob?.age);
              }}
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="street"
              onClick={() => {
                setIcons("street");
                setUserValue(users?.location?.city);
              }}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onClick={() => {
                setIcons("phone")
                setUserValue(users?.phone);
              }}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={() => {
                setIcons("password");
                setUserValue(users?.login?.password);
              }}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn"
              type="button"
              onClick={() => {
                update();
              }}
            >
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {setUserList( [...userList,users])
                
              }}
            >
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
                <th className="th">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(({ name, email, phone, dob }) => {
                return (
                  <tr key={users.email} className="body-tr">
                    <th>{name.first}</th>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{dob.age}</td>
                    <td><AiFillDelete
                    type="button"
                    size={22}
                    className="text-danger cursor-pointer"
                    onClick={() => deleteBilgi(email)}
                  /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
