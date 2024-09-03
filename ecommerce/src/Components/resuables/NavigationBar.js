import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "../style/Designs/homeapp.css";
import "../style/Responsives/ResponsiveHomeApp.css";
import { getLocalStorageUser } from "../../UTILS/localStorageUtils";

const NavBar = () => {
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const userId = getLocalStorageUser().user_id;
    
    UserService.getUserProfilePic(userId)

      .then((response) => {
        console.log("Profile picture path:", response.data.profilePic);
        console.log("Profile Picture URL:", `${profilePic}`);

        console.log(`profilepicx ${UserService.getUserProfilePic(userId)}`);
        setProfilePic(response.data.profilePic);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom_nav-container ">
      <NavLink className="navbar-brand" to="/">
        <span>LINGUALINC</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/HomeView">
                Home
              </a>
            </li>
            <li className="nav-item custom-menu-item ">
              <NavLink className="nav-link" to="/host-meeting">
                Create
              </NavLink>
            </li>
            <li className="nav-item custom-menu-item ">
              <NavLink className="nav-link" to="/host-view">
                Host
              </NavLink>
            </li>
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/MeetingView">
                Explore
              </a>
            </li>
            <li className="nav-item custom-menu-item">
              <a className="nav-link" href="/TranslateView">
                {" "}
                Translate
              </a>
            </li>
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/CSView">
                Feedback
              </a>
            </li>

            <li className="translate" style={{ paddingLeft: "16dvb" }}>
              {" "}
              <Image
                className="nav-Image"
                src={
                  profilePic
                      `${process.env.PUBLIC_URL}/Images/bw.jpeg`
                }
                roundedCircle
              />
              <span className="nav-items">
                {getLocalStorageUser().user_name}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
