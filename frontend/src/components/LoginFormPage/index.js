import React, { useState } from "react";
import {login} from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css'



const LoginFormPage = () => {

    // const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])

    if (user) return <Redirect to="/" />;

    const onSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        return dispatch(login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if (data && data.errors) setErrors(data.errors);
          }
        );
    }

  return(
    <form onSubmit={onSubmit}>
        <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label>
            Username or Email
            <input type='text' onChange={e => setCredential(e.target.value)} required />
        </label>
        <label>
            Password
            <input type='text' onChange={e => setPassword(e.target.value)} required />
        </label>
    <button type="submit">Log In</button>
    </form>
  );
};

export default LoginFormPage
