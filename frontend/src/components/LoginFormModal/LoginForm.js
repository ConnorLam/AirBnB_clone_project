import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  // const history = useHistory()
  const dispatch = useDispatch();
//   const user = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

//   if (user) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
    //   console.log(data);
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div>
      <div className="header">
        <h4>Log In</h4>
      </div>
      <form className="login-form" onSubmit={onSubmit}>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button 
          type="submit" 
          onClick={e => {
            setCredential('Demo-lition')
            setPassword('password')
          }}>
        Demo User
        </button>
      </form>

    </div>
  );
};

export default LoginForm;
