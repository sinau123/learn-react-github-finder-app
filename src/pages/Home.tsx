import React from "react";
import UserList from "../components/users/UserList";
import UserSearch from "../components/users/UserSearch";

function Home() {
  return (
    <div>
      <div>
        <UserSearch />
        <UserList />
      </div>
    </div>
  );
}

export default Home;
