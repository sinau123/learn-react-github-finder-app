import React, { useEffect, useState } from "react";
import api from "../../repositories";
import IUser from "../../models/user";
import Loader from "../Loader";
import UserItem from "./UserItem";

function UserList() {
  const [users, setUsers]: [IUser[], (users: IUser[]) => void] = useState<
    IUser[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/users");
    setUsers(data);
    setLoading(false);
  };

  if (loading) return <Loader className="text-3xl mx-auto" />;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {users.map((user) => (
        <UserItem key={user.login} user={user} />
      ))}
    </div>
  );
}

export default UserList;
