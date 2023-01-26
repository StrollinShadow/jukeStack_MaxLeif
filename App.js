import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  function redirect(userId, Admin) {
    console.log(Admin);
    if (Admin === 0) {
      window.location.href = "./User?" + userId;
    } else {
      window.location.href = "./Admin?" + userId;
    }
  }
  const [UserEmail, setEmail] = useState("");
  const [UserPassword, setPassword] = useState("");

  const [UserEmailLog, getEmail] = useState("");
  const [UserPasswordLog, getPassword] = useState("");


  const [usersList, setUsersList] = useState([]);

  const regist = () => {
    Axios.post("http://localhost:3001/regist", {
      UserEmail: UserEmail,
      UserPassword: UserPassword,
    }).then(() => {
      setUsersList([
        ...usersList,
        {
          Email: UserEmail,
          Password: UserPassword,
        },
      ]);
    });
  };
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      UserEmail: UserEmailLog,
      UserPassword: UserPasswordLog,
    }).then((response) => {
      if (response.data.login) {
        setUsersList([
          ...usersList,
          {
            Email: UserEmailLog,
            Password: UserPasswordLog,
          },
        ]);
        redirect(UserEmailLog, response.data.UserAdmin);
      }
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users%22").then((response) => {
      setUsersList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>Password:</label>
        <input
          type="text"
onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={regist}>Register</button>

        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            getEmail(event.target.value);
          }}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            getPassword(event.target.value);
          }}
        />

        <button onClick={login}>LogIn</button>
      </div>
    </div>
  );
}

export default App;