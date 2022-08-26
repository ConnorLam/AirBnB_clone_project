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
    <div className="whole-modal">
      <div className="header">
        <h4>Log In</h4>
      </div>
      <div className="welcome">
        <p>Welcome to Walmart-AirBnB</p>
      </div>
      <form className="login-form" onSubmit={onSubmit}>
        {/* <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
        <div className="login-info">
          <label className="username-email">
            <p className="label">
              Username or Email
            </p>
            <input
              className="input-box"
              type="text"
              onChange={(e) => setCredential(e.target.value)}
              value={credential}
              required
            />
          </label>
          <label className="password">
            <p className="label">
              Password
            </p>
            <input
              className="input-box"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
        </div>
        <ul className="error-messages">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="login-buttons">
          <div className="login">
            <button className="actual-button"type="submit">Log In</button>
          </div>
          <div>
            <div className="login">
              <button
              className="actual-button"
                type="submit"
                onClick={(e) => {
                  setCredential("Demo-lition");
                  setPassword("password");
                }}
              >
                Demo User
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
