import React, { useContext } from "react";
import { loggedInUserDataContext } from "../helpers/Context";

function Profile() {
  const { loggedInUser, setLoggedInUser } = useContext(loggedInUserDataContext);
  const backUpAvatar = (`https://avatars.dicebear.com/api/identicon/${loggedInUser.user.email}.svg`)
  
  return (
    <div className=" text-center">
    <img src={loggedInUser.user.photoURL ? loggedInUser.user.photoURL : backUpAvatar} alt="profile avatar" className="rounded-circle img-fluid "/>
      <h1>{loggedInUser.user.displayName}</h1>
      <h2>{loggedInUser.user.email}</h2>
      <aside>eventually add stats here?</aside>
    </div>
  );
}
export default Profile;