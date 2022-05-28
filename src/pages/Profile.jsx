import React, { useContext } from "react";
import { loggedInUserDataContext, isAuthContext } from "../helpers/Context";
import { auth, db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

function Profile() {
  // This component will be used to pick and choose different databases the user wants to see

  const { loggedInUser, setLoggedInUser } = useContext(loggedInUserDataContext);
  const backUpAvatar = `https://avatars.dicebear.com/api/identicon/${loggedInUser.user.email}.svg`;

  return (
    <div className=" text-center mt-7">
      <img
        src={backUpAvatar}
        alt="profile avatar"
        className="rounded-circle img-fluid w-md-15"
      />
      <div>
        <h1>{loggedInUser.user.displayName}</h1>

        <p>display collections user has made</p>
        <p>add option to add authorized users</p>
        <p>create new collection</p>
      </div>
    </div>
  );
}
export default Profile;
