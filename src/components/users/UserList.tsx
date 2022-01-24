import React, { useEffect, useState } from "react";
import api from "../../repositories";
import IUser from "../models/user";

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

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <h3 key={user.login}>{user.login}</h3>
      ))}
    </div>
  );
}

export default UserList;
