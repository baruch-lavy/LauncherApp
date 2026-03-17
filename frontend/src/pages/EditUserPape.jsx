import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { userServise } from "../services/users.remote.service";
import { useEffect, useState } from "react";
import { queryClient } from "../App";

export function EditUserPage() {
  const { id } = useParams();
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();
  const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] = useState(false);

  const { mutate, error: editUserError } = useMutation({
    mutationFn: userServise.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsSuccessfullyUpdated(true);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => userServise.getUser(id),
  });

  useEffect(() => {
    if (!data) return;
    setUserToEdit(data[0]);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;

    setUserToEdit((prevUserToEdit) => ({
      ...prevUserToEdit,
      [name]: value,
    }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const username = formData.get("username");
    const userType = formData.get("userType");
    const email = formData.get("email");

    const user = {
      username,
      userType,
      email,
      originalName: data[0].username,
    };

    console.log(user);
    mutate(user);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.response?.data}</div>;
  }

  if (editUserError) {
    return <div>{editUserError.response?.data}</div>;
  }

  return (
    <div className="edit-user-container">
      {isSuccessfullyUpdated && (
        <div className="success-msg">
          <h4>Updated Successfully</h4>
          <button onClick={() => setIsSuccessfullyUpdated(false)}>X</button>
        </div>
      )}
      {userToEdit && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Enter User Name:</label>
          <input
            type="text"
            onChange={handleChange}
            value={userToEdit.username}
            name="username"
            id="username"
            placeholder="ente username"
            required
          />
          <label htmlFor="userType">Select the User Role</label>
          <select
            name="userType"
            id="userType"
            value={userToEdit.userType}
            onChange={handleChange}
          >
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
            value={userToEdit.email}
            onChange={handleChange}
            placeholder="enter user email"
          />
          <button type="submit">Edit User</button>
        </form>
      )}
    </div>
  );
}
