import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (!isMember) {
      dispatch(registerUser({ name, email, password }));
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {values.isMember ? <h3>Login</h3> : <h3>register</h3>}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "..." : "submit"}
        </button>
        {!values.isMember && (
          <button
            type="button"
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={() => {
              dispatch(
                loginUser({ email: "testUser@test.com", password: "secret" })
              );
            }}
          >
            {isLoading ? "loading..." : "demo"}
          </button>
        )}
        {values.isMember ? (
          <p>
            Not a member yet?
            <button
              className="member-btn"
              onClick={() => setValues({ ...values, isMember: false })}
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already a member?
            <button
              className="member-btn"
              onClick={() => setValues({ ...values, isMember: true })}
            >
              Login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
