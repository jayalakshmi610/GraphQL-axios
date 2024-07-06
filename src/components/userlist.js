import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_USERS } from "../queries";

function UserList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://your-graphql-api-endpoint.com/graphql",
          {
            query: GET_USERS,
          }
        );

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setUsers(response.data.data.users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
