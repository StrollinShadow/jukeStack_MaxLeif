import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [userList, setUserList] = useState([]);
  const [userSongList, setUserSongList] = useState([]);
  const [out, changeOut] = useState(<></>);
  const [userId, setUserId] = useState(0);
  const [songId, setSongId] = useState(0);

  const [selectedUser, changeSelectedUser] = useState("");

  const user = window.location.href.split("?")[1];

  const getId = () => {
    Axios.get("http://localhost:3001/getId?id=" + user).then((response) => {
      setUserId(response.data[0].UserId);
    });
  };

  useEffect(() => {
    getId();
  }, []);

  const funcZuruckgeben = (songId, userId) => {
    console.log(userId);
    Axios.get("http://localhost:3001/getId?id=" + userId).then((response) => {
      Axios.post("http://localhost:3001/zuruckgeben", {
        userId: response.data[0].UserId,
        songId: songId,
      });
      console.log(response.data[0].UserId);
    });
  };

  useEffect(() => {
    showUserList();
  }, []);

  useEffect(() => {
    changeOut(
      userSongList ? (
        userSongList.map((val, key) => {
          return (
            <div key={key} className="list">
              <div>
                <h3>Songname: {val.NFTName}</h3>
                <h3>Songlänge: {val.NFTDuration}</h3>
                <h3>Künstler: {val.NFTArtist}</h3>
                <h3>Erscheinungsdatum: {val.NFTRelease}</h3>
                <button
                  onClick={() => {
                    funcZuruckgeben(val.NFTId, selectedUser);
                  }}
                >
                  zurückgeben
                </button>{" "}
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )
    );
  }, [userSongList]);

  const showUserList = () => {
    Axios.get("http://localhost:3001/userList").then((response) => {
      setUserList(response.data);
    });
  };

  const showUserSongList = (UserEmail) => {
    Axios.get("http://localhost:3001/userSongList?id=" + UserEmail).then(
      (response) => {
        changeSelectedUser(UserEmail);
        setUserSongList(response.data);
        console.log(response.data);
      }
    );
  };

  return (
    <div className="App">
      <div className="information">
        {userList.map((val, key) => {
          return (
            <div key={key} className="list">
              <div>
                <h3>User ID: {val.UserId}</h3>
                <h3>User E-Mail: {val.UserEmail}</h3>
                <button
                  onClick={() => {
                    showUserSongList(val.UserEmail);
                  }}
                >
                  Ausgeliehene Songs
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {out}
    </div>
  );
}

export default App;
