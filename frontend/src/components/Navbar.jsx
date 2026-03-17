import { useNavigate } from "react-router";
import { useStore } from "../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { userServise } from "../services/users.remote.service";

export function Navbar() {
  const navigate = useNavigate();
  const loggedinUser = useStore((state) => state.loggedinUser);

  const { data, error } = useQuery({
    queryKey: ["user", loggedinUser?._id],
    queryFn: () => userServise.getUser(loggedinUser?._id),
  });

  function showUser() {
    if (data[0]) {
      alert(JSON.stringify(data[0]));
    }
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="navbar">
      <ul>
        <li onClick={showUser}>get Loggedin User</li>
        <li onClick={() => navigate("/register-page")}>Register Page</li>
        <li onClick={() => navigate("/login-page")}>Login Page</li>
        <li>Home Page</li>
        <li>Add Launcher</li>
      </ul>
    </div>
  );
}
