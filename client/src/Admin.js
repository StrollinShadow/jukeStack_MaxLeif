import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  
  const [userList, setUserList] = useState([]);

  useEffect(()=>{showUserList()},[]);

  const showUserList = () => {
    Axios.get("http://localhost:3001/userList").then((response) => {
      setUserList(response.data);
    });
  };
  

  //<button onClick={songAusleihen(val.NFTId)}>Ausleihen</button>s
  return (
    <div className="App">
      <div className="information">
        {userList.map((val, key) => {
          return (
            <div key={key} className="list">
              <div>
                <h3>User ID: {val.UserId}</h3>
                <h3>User E-Mail: {val.UserEmail}</h3>
                <button>Ausgeliehene Songs</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

/*
   /*   <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.EName}</h3>
                <h3>Age: {val.EAge}</h3>
                <h3>Country: {val.ECountry}</h3>
                <h3>Position: {val.EPosition}</h3>
                <h3>Wage: {val.EWage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.EId);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.EId);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div> */
