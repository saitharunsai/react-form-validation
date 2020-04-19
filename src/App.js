import React, { useState, useEffect } from "react";
import "./app.scss";

/* eslint-disable */
const nameRE = /^[A-Z]{2,10}$/i;
const passRE = /^[A-Za-z0-9_\.\-\@\#\!\%\^\$]{4}$/;
const emailRE = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,5})$/;
const mobileRE = /^[0-9]{10}$/;

function App() {
  const [user, setUser] = useState({
    name: "",
    nameErr: "",
    password: "",
    passwordErr: "",
    email: "",
    emailErr: "",
    mobile: "",
    mobileErr: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser((prevData) => {
        return {
          ...prevData,
          nameErr: "",
          emailErr: "",
          passwordErr: "",
          mobileErr: "",
        };
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [user.nameErr, user.emailErr, user.mobileErr, user.passwordErr]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const userValidation = (re, checkUser, err) => {
    if (!re.test(checkUser)) {
      setUser((prevData) => {
        return { ...prevData, [err]: `Input is not valid` };
      });
    } else {
      setUser((prevData) => {
        return {
          ...prevData,
          [err]: "",
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userValidation(nameRE, user.name, "nameErr");
    userValidation(passRE, user.password, "passwordErr");
    userValidation(emailRE, user.email, "emailErr");
    userValidation(mobileRE, user.mobile, "mobileErr");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {user.nameErr && <h5>{user.nameErr}</h5>}

        <input
          type="text"
          value={user.name}
          onChange={(e) => handleChange(e)}
          placeholder="Name"
          name="name"
          className={user.nameErr ? "err" : null}
        />
        {user.passwordErr && <h5>{user.passwordErr}</h5>}

        <input
          type="text"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          name="password"
          className={user.passwordErr ? "err" : null}
        />
        {user.emailErr && <h5>{user.emailErr}</h5>}

        <input
          type="text"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          name="email"
          className={user.emailErr ? "err" : null}
        />
        {user.mobileErr && <h5>{user.mobileErr}</h5>}

        <input
          type="text"
          value={user.mobile}
          onChange={(e) => handleChange(e)}
          placeholder="Mobile"
          name="mobile"
          className={user.mobileErr ? "err" : null}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
