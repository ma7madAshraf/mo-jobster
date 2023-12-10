import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormRow } from "../../components";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={onChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={onChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={onChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={onChange}
          />
          <button type="submit" className="btn ntn-block" disabled={isLoading}>
            {isLoading ? "please wait ..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
