import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_USERS } from "./queries";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/graphql", {
          query: GET_USERS,
        });
        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {data.users.map(({ id, name, email }) => (
          <li key={id}>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
