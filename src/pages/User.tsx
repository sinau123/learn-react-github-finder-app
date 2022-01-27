import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUsers, FaUserFriends, FaStore, FaBook } from "react-icons/fa";
import Loader from "../components/Loader";
import GithubContext from "../context/GithubContext";
import { isValidUrl } from "../utils";

function User() {
  const { getUser, user, loading } = useContext(GithubContext);
  const { login } = useParams<{ login: string }>();
  const userInfo: { name: string; value: string; link?: string }[] = [];
  const userFollow = [
    {
      name: "Follower",
      value: user?.followers || 0,
      icon: FaUsers,
    },
    {
      name: "Following",
      value: user?.following || 0,
      icon: FaUserFriends,
    },
    {
      name: "Project",
      value: user?.public_repos || 0,
      icon: FaBook,
    },
    {
      name: "Gist",
      value: user?.public_gists || 0,
      icon: FaStore,
    },
  ];
  useEffect(() => {
    if (login && user?.login !== login) {
      getUser(login);
    }
  }, []);

  if (user) {
    user.location && userInfo.push({ name: "Location", value: user.location });
    user.blog &&
      userInfo.push({
        name: "Website",
        value: user.blog,
        link: isValidUrl(user.blog) ? user.blog : `https://${user.blog}`,
      });
    user.twitter_username &&
      userInfo.push({
        name: "Twitter",
        value: user.twitter_username,
        link: `https://twitter.com/${user.twitter_username}`,
      });
  }

  if (loading) return <Loader className="text-3xl mx-auto" />;
  return (
    <div className="w-full mx-auto">
      <div className="mb-4">
        <Link to="/" className="btn btn-ghost">
          Back to Search
        </Link>
      </div>
      <div className="card glass lg:card-side">
        <figure className="bg-slate-400">
          <img
            src={user?.avatar_url}
            className="rounded-lg shadow-lg !w-80 mx-auto"
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <div>
            <div className="card-title flex items-center space-x-1">
              <h3>{user?.name}</h3>
              {user?.type && (
                <button className="badge badge-success rounded-full">
                  {user.type}
                </button>
              )}
              {user?.hireable && (
                <button className="badge badge-info rounded-full">
                  Hireable
                </button>
              )}
            </div>
            <p>{user?.bio}</p>
            <div className="my-4 shadow-md bg-base-100 stats w-full sm:w-auto grid-flow-row sm:grid-flow-col">
              {userInfo.map((stat) => {
                return (
                  <div key={stat.name} className="stat sm:!border-t-0 ">
                    <div className="stat-title text-md">{stat.name}</div>
                    <div className="stat-value text-lg truncate min-w-0">
                      {stat.link ? (
                        <a
                          className="hover:underline "
                          target="_blank"
                          rel="noreferrer"
                          href={stat.link}
                        >
                          {stat.value}
                        </a>
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card-actions">
            <a
              href={user?.html_url}
              className="btn btn-outline"
              rel="noreferrer"
              target="_blank"
            >
              Visit Github Profile
            </a>
          </div>
        </div>
      </div>
      <div className="my-4 shadow-md bg-base-100 stats w-full grid-flow-row sm:grid-flow-col">
        {userFollow.map((stat) => {
          return (
            <div key={stat.name} className="stat sm:!border-t-0">
              <div className="stat-figure text-blue-700">
                <stat.icon className="text-3xl md:text-5xl"></stat.icon>
              </div>
              <div className="stat-title text-md">{stat.name}</div>
              <div className="stat-value text-lg">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default User;
