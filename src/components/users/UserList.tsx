import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import UserItem from "./UserItem";
import useGithub from "../../context/GithubContext";

function UserList() {
  const { users, loading, fetchUsers, searchUsers, query } = useGithub();

  const [searchParams] = useSearchParams();
  const paramQuery = searchParams.get("query") || "";
  const currentQuery = useRef(query);
  const usersRef = useRef(users);

  useEffect(() => {
    if (usersRef.current.length === 0 || paramQuery !== currentQuery.current) {
      paramQuery.length > 0 ? searchUsers(paramQuery) : fetchUsers();
    }
  }, [fetchUsers, paramQuery, searchUsers]);

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
