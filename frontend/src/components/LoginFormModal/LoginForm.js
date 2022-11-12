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
    <>
      <div className="signup">
        <h4>Log In</h4>
      </div>
      <div className="signup-form-modal overflow-container">
        <div className="welcome-signup">
          <h2 className="welcome-header">Welcome to FakeBnB</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="signup-info">
            <div className="input-box">
              <input
                className="input"
                placeholder="Username or Email"
                type="text"
                onChange={(e) => setCredential(e.target.value)}
                value={credential}
                required
              />
            </div>
            <div className="input-box">
              <input
                className="input"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>
          <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>
          <div className="signup-button-div">
            {/* <div className="login"> */}
              <button className="signup-button" type="submit">
                Log In
              </button>
            {/* </div> */}
            {/* <div> */}
              {/* <div className="login"> */}
                <button
                  className="signup-button"
                  type="submit"
                  onClick={(e) => {
                    setCredential("Demo-lition");
                    setPassword("password");
                  }}
                >
                  Demo User
                </button>
              {/* </div> */}
            {/* </div> */}
          </div>
        </form>

      </div>
    </>
  );
};

export default LoginForm;
