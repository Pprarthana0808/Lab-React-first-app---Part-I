import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  function updateList(person) {
    postUser(person)
      .then(async (res) => {
        if (res.status !== 201) {
          console.log(`POST /users failed. Status: ${res.status}`);
          return;
        }
        const createdUser = await res.json();
        setCharacters((prev) => [...prev, createdUser]);
      })
      .catch((error) => console.log(error));
  }

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((c) => c._id !== id));
        } else if (res.status === 404) {
          console.log("DELETE failed: user not found (404).");
        } else {
          console.log(`DELETE failed. Status: ${res.status}`);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
