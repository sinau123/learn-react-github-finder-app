import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useGithub from "../../context/GithubContext";

function UserSearch() {
  const [text, setText] = useState("");
  const { searchUsers, fetchUsers, setQuery } = useGithub();
  const [searchParams, setSearchParams] = useSearchParams();
  const setCurrentQuery = (q: string) => {
    setQuery(q);
    setText(q);
  };
  useEffect(() => {
    setCurrentQuery(searchParams.get("query") || "");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length > 0) {
      setSearchParams({ query: text });
      searchUsers(text);
    } else {
      setSearchParams({ query: "" });
      fetchUsers();
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentQuery(e.currentTarget.value);
  };

  const handleClear = () => {
    setCurrentQuery("");
    fetchUsers();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pr-40 bg-gray-200 input input-md text-black"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-24 btn btn-md"
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button className="btn btn-ghost btn-md" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default UserSearch;
