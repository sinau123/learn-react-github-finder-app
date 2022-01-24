import React from "react";
import { Link } from "react-router-dom";
import IUser from "../../models/user";

interface IUserItemProps {
  user: IUser;
}

const UserItem: React.FC<IUserItemProps> = ({ user }) => {
  return (
    <div className="card shadow-md compact card-side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={user.avatar_url} alt={user.avatar_url} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{user.login}</h2>
          <Link
            to={`/users/${user.login}`}
            className="text-base-content text-opacity-40"
          >
            See profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
