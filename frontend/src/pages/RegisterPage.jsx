import { useMutation, useQuery } from "@tanstack/react-query";
import { userServise } from "../services/users.remote.service";
import { queryClient } from "../App";
import { useRef } from "react";
import { useNavigate } from "react-router";

export function RegisterPage() {
  const { mutate, error } = useMutation({
    mutationFn: userServise.register,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const {
    mutate: deleteUser,
    error: deleteUserError,
    data: deleteUserData,
  } = useMutation({
    mutationFn: userServise.deleteUser,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const {
    data: users,
    isLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userServise.getUsers,
  });

  const form = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const username = formData.get("username");
    const userType = formData.get("userType");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof username === "string" &&
      typeof userType === "string" &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      const user = {
        username,
        userType,
        email,
        password,
      };
      mutate(user);
      form.current.reset();
    }
  }

  return (
    <div className="register-page-container">
      {error && <div>{error.response?.data}</div>}
      <h1>Add Launcher Page</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <label htmlFor="username">Enter User Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="ente username"
        />
        <label htmlFor="userType">Select the User Role</label>
        <select name="userType" id="userType">
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="airForce">Air Force</option>
          <option value="intelligence">Intelligence</option>
        </select>

        <label htmlFor="email">Enter User Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter user email"
        />

        <label htmlFor="password">Enter User Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Enter User Password"
        />

        <button type="submit">Register User</button>
      </form>

      <div className="users-list">
        <h2>users list</h2>
        {isLoading && <div>Loading...</div>}
        {users &&
          users.map((user) => (
            <div className="user-item" key={user._id}>
              <h3>Name: {user.username}</h3>
              <span>Type: {user.userType}</span>
              <span>Email: {user.email}</span>
              <span>Last Login: {user.lastLogin || "not login yet"}</span>

              <button onClick={() => deleteUser(user._id)}>Delete User</button>

              <button onClick={() => navigate(`/edit-user-page/${user._id}`)}>
                Edit User
              </button>
            </div>
          ))}
        {!users && <div>No User Found.</div>}
      </div>
    </div>
  );
}
