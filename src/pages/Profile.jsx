import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-page">
      <Outlet />
    </div>
  );
}

export default Profile;
