import { useMutation } from "@tanstack/react-query";
import { userServise } from "../services/users.remote.service";
import { useRef, useState } from "react";
import { useStore } from "../store/userStore";

export function LoginPage() {
  const [isLoggedinSuccessfully, setIsLoggedinSuccessfully] = useState(false);
  const setLoggedinUser = useStore(state => state.setLoggedinUser)

  const { mutate , data} = useMutation({
    mutationFn: userServise.login,
    onSuccess: () =>  setIsLoggedinSuccessfully(true),
  });

  if (data) {
    setLoggedinUser(data)
  }

  const form = useRef(null);

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      const user = {
        username,
        password,
      };
      mutate(user)
      form.current.reset();
    }
  }

  return (
    <div className="login-container">
        {isLoggedinSuccessfully && 
        <div className="success-msg">
            <h4>logged in successfully</h4>
            <button onClick={() => setIsLoggedinSuccessfully(false)}>X</button>
        </div>}
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <label htmlFor="username">Enter Your Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="enter username"
        />
        <label htmlFor="password">Enter Your Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
