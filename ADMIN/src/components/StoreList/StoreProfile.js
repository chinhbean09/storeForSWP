import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BackButton } from "../BackButton/BackButton";
import axios from "axios";
import { config } from "../axios/auth-header";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import { useLocation } from "react-router-dom";

function StoreProfile() {
  let { id } = useParams();
  id = Number(id);
  const [thisStore, setThisStore] = useState([]);
  const { activeLink, setActiveLink } = useContext(AppContext);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === `/admin/store/${thisStore?.id}/bio`) {
      setActiveLink("Profile");
    }
  }, [location, thisStore]);
  React.useEffect(() => {
    axios
      .get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/store/get/${id}`,
        config
      )
      .then((response) => {
        setThisStore(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container profile-container">
      <BackButton
        // Root={thisStore.status === "pending" ? "storemanager" : "store"}
        Root={"store"}
      />

      <div style={{ display: "flex" }}>
        <div className="col-md-3 profile-nav">
          <div className="card profile-card">
            <div className="card-body text-center profile-heading">
              <h5 className="card-title profile-title">{thisStore?.name}</h5>
            </div>
            <ul className="list-group list-group-flush profile-list">
              <li
                className={`list-group-item ${
                  activeLink === "Profile" ? "active" : ""
                }`}
              >
                <Link
                  to={`/admin/store/${thisStore?.id}/bio`}
                  onClick={() => setActiveLink("Profile")}
                >
                  <i className="fa fa-user"></i> Information
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  activeLink === "Service" ? "active" : ""
                }`}
              >
                <Link
                  to={`/admin/store/${thisStore?.id}/service`}
                  onClick={() => setActiveLink("Service")}
                >
                  <i className="fa fa-calendar"></i> Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default StoreProfile;
