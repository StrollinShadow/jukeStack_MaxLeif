import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const user = window.location.href.split("?")[1];
console.log(user);

function App() {
  const [NFTSongList, setNFTSongList] = useState([]);
  const [userSongList, setUserSongList] = useState([]);

  const [userId, setUserId] = useState(0);
  const [songId, setSongId] = useState(0);

  useEffect(() => {
    showNFTSongList();
  }, []);

  const getId = () => {
    Axios.get("http://localhost:3001/getId?id=" + user).then((response) => {
      setUserId(response.data[0].UserId);
    });
  };

  useEffect(() => {
    getId();
  }, []);

  const showNFTSongList = () => {
    Axios.get("http://localhost:3001/NFTSongList").then((response) => {
      setNFTSongList(response.data);
      console.log(userSongList);
    });
  };

  const showUserSongList = () => {
    Axios.get("http://localhost:3001/userSongList?id=" + user).then(
      (response) => {
        setUserSongList(response.data);
        console.log(response);
      }
    );
  };

  function funcAusleihen(selectedSongId) {
    setSongId(selectedSongId);
    {
      songAusleihen();
    }
  }

  const songAusleihen = () => {
    console.log(songId);

    Axios.post("http://localhost:3001/ausleihen", {
      userId: userId,
      songId: songId,
    });
  };
  function funcZuruckgeben(selectedSongId) {
    setSongId(selectedSongId);
    {
      songZuruckgeben();
    }
  }

  const songZuruckgeben = () => {
    Axios.post("http://localhost:3001/zuruckgeben", {
      userId: userId,
      songId: songId,
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Songs:</label>
        {NFTSongList.map((val, key) => {
          return (
            <div key={key} className="list">
              <div>
                <h3>Songname: {val.NFTName}</h3>
                <h3>Songlänge: {val.NFTDuration}</h3>
                <h3>Künstler: {val.NFTArtist}</h3>
                <h3>Erscheinungsdatum: {val.NFTRelease}</h3>
                <button
                  onClick={() => {
                    funcAusleihen(val.NFTId);
                  }}
                >
                  Ausleihen
                </button>
              </div>
            </div>
          );
        })}
        <label>eigene Songs:</label>
        showUserSongList
        <button
          onClick={() => {
            showUserSongList();
          }}
        >
          userSongList
        </button>
        {userSongList ? (
          userSongList.map((val, key) => {
            console.log(userSongList);

            return (
              <div key={key} className="list">
                <div>
                  <h3>Songname: {val.NFTName}</h3>
                  <h3>Songlänge: {val.NFTDuration}</h3>
                  <h3>Künstler: {val.NFTArtist}</h3>
                  <h3>Erscheinungsdatum: {val.NFTRelease}</h3>
                  <button
                    onClick={() => {
                      funcZuruckgeben(val.NFTId);
                    }}
                  >
                    zurückgeben
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
