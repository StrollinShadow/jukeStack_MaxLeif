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

app.post("/create", (req, res) => {
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
/*
app.get("/TEmployees", (req, res) => {
  db.query("SELECT * FROM TEmployees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE TEmployees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM TEmployees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
*/
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
