import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function App() {
  const [placeholder, setPlaceholder] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setPlaceholder(response.data);
    setFiltered(response.data);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFiltered(
      value === "Show All"
        ? placeholder
        : placeholder.filter((el) => el.name === value)
    );
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <select onChange={handleChange}>
        <option value="Show All">Show All</option>
        {placeholder.map((el) => (
          <option key={el.id} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <div className="user-container">
        {filtered.map((el) => {
          return (
            <div key={el.id} className="card">
              <div className="card-header">{el.name}</div>
              <div className="card-body">
                <span>
                  {el.address.street} {el.address.city}, {el.address.zipcode}
                </span>
                <span>{el.email}</span>
                <span>{el.phone}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
