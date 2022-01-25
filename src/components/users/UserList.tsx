import React, { useContext, useEffect } from "react";
import Loader from "../Loader";
import UserItem from "./UserItem";
import GithubContext from "../../context/GithubContext";

function UserList() {
  const { users, loading, fetchUsers } = useContext(GithubContext);
  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  if (loading) return <Loader className="text-3xl mx-auto" />;

  if (users.length === 0)
    return (
      <em className="text-gray-600 text-xl">
        No user found. Please try another keyword!
      </em>
    );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {users.map((user) => (
        <UserItem key={user.login} user={user} />
      ))}
    </div>
  );
}

export default UserList;
