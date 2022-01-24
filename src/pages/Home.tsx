import React from "react";
import UserList from "../components/users/UserList";

function Home() {
  return (
    <div>
      <h1 className="text-6xl mb-4">Home</h1>
      <div>
        <UserList />
      </div>
    </div>
  );
}

export default Home;
