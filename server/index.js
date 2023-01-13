const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "jukMaLe",
  host: "i-kf.ch",
  password: "Lk%R#1zd",
  database: "jukeStackDB_MaxLeif",
});

let UserIdindex = 1001;

app.post("/regist", (req, res) => {
  const UserEmail = req.body.UserEmail;
  const UserPassword = req.body.UserPassword;

  db.query(
    "INSERT INTO TUsers ( UserEmail, UserPassword) VALUES (?,?)",
    [UserEmail, UserPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const UserEmail = req.body.UserEmail;
  const UserPassword = req.body.UserPassword;
  console.log(req.body);
  db.query(
    "SELECT * FROM TUsers WHERE UserEmail = ? AND UserPassword = ?",
    [UserEmail, UserPassword],
    (err, result) => {
      console.log(result.lenght);
      if (err) {
        res.send({ err: err });
      }
      if (result[0]) {
        res.send({ login: true, UserAdmin: result[0].UserAdmin});
      } else {
        res.send({ message: "Invalid Email or Password" });
      }
    }
  );
});

app.get("/getId", (req, res) => {
  const user = req.query.id;
  console.log(user);

  db.query(
    "SELECT * FROM TUsers where UserEmail = ?",
    [user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create", (req, res) => {
  const UserEmail = req.body.UserEmail;
  const UserPassword = req.body.UserPassword;

  db.query(
    "INSERT INTO TUsers (UserEmail, UserPassword) VALUES (?,?)",
    [UserEmail, UserPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

/*
app.post("/login", (req, res) => {
  const UserIdindex = req.body.UserId;
});
*/

//UserListe anzeigen
app.get("/userList", (req, res) => {
  db.query(
    "SELECT * from TUsers;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SongListe anzeigen
app.get("/NFTSongList", (req, res) => {
  db.query(
    "SELECT TNFTSongs.* FROM TNFTSongs LEFT JOIN TAusleihen ON TNFTSongs.NFTId = TAusleihen.NFTId WHERE TAusleihen.NFTId IS NULL;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//userSongListe anzeigen
app.get("/userSongList", (req, res) => {
  const user = req.query.id;
  
  console.log(user);
  db.query(
    "SELECT TNFTSongs.* FROM TNFTSongs NNER JOIN TAusleihen ON TNFTSongs.NFTId = TAusleihen.NFTId WHERE TAusleihen.UserId = (SELECT UserId FROM TUsers WHERE UserEmail = ?);",
    [user],
    (err, result) => {
      if (err, result) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/start", (req, res) => {
  res.send(UserIdindex);
});
//

//Songs Ausleihen
app.post("/ausleihen", (req, res) => {
  const songId = req.body.songId;
  const userId = req.body.userId;

  db.query(
    "INSERT INTO TAusleihen (UserId, AusDate, NFTId) VALUES (?,now(),?)",
    [userId, songId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Song ausgeliehen");
      }
    }
  );
});

//zurückgen
app.post("/zurückgeben", (req, res) => {
  const songId = req.body.songId;
  const userId = req.body.userId;

  db.query(
    "DELETE FROM TAusleihrn WHERE UserId = ? and NFTId = ?",
    [userId, songId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Song zurückgegeben");
      }
    }
  );
});


//

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
