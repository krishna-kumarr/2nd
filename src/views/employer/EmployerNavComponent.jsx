import React, { useContext, useEffect, useRef, useState } from "react";
import Images from "../../utils/images.js";
import { MdNotificationsActive } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const EmployerNavComponent = ({ dashboadMenus }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [userNavbarinfo, setUserNavinfo] = useState([]);
  const [profile, setProfilePicture] = useState("");
  const token = localStorage.getItem("Token");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getNavbarDatas = async () => {
      try {
        await axios
          .get("https://devapi.2ndcareers.com/professional_notifications", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {             
              console.log(res,'professional_notifications')
              if (res.data.error_code === 0) {
                setMessage(res.data.data);
              }else{
                toast.error(res.data.message);
              }
          });
      } catch (err) {
        console.log(err);
      }
    };
    getNavbarDatas();

    // notification box closing fuction
    const handler = (e) => {
      if (!e.target.closest(".notify-closet")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        await axios
          .get("https://devapi.2ndcareers.com/user_dashboard_details", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res,'user_dashboard_details');
            if (res.data.error_code === 0) {
              setProfilePicture(
                `https://devcdn.2ndcareers.com/${res.data.data.user_details[0].profile_image}`
              );
              setUserNavinfo([res.data.data]);
              setNotificationCount(res.data.data.notification_count);
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, []);


  const doLogout = () => {
    localStorage.removeItem("Token");
  };

  
  return (
    <div className="navbar-height placeholder-glow">
      <nav className="navbar navbar-light bg-white fixed-top navbar-expand-md shadow-sm justify-content-center dashboard-height-inherit">
        <div className="container-fluid">
          <a className="navbar-brand d-flex col-3" href="#">
            <img src={Images.logo} alt="No Logo" className="img-fluid logo" />
          </a>

          <div
            className="offcanvas-lg offcanvas-start"
            tabindex="-1"
            id="offcanvasResponsive"
            aria-labelledby="offcanvasResponsiveLabel"
          >
            <div className="offcanvas-header">
              <a className="navbar-brand d-flex col-5" href="#">
                <img
                  src={Images.logo}
                  alt="2nd logo"
                  className="img-fluid logo"
                />
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-inline d-lg-none">
              <ul className="navbar-nav text-center row">
                <li
                  className="nav-item navigation-header-link-active py-1 "
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/employer_dashboard/home"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[0]}
                  </NavLink>
                </li>
                <li
                  className="nav-item navigation-header-link-active py-1"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/employer_dashboard/candidates"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[1]}
                  </NavLink>
                </li>
                <li
                  className="nav-item navigation-header-link-active py-1"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/employer_dashboard/pool"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[2]}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="row col-9">
            <ul className="navbar-nav col-lg-8 justify-content-center d-none d-lg-inline-flex">
              <li className="nav-item navigation-header-link-active">
                <NavLink
                  to="/employer_dashboard/home"
                  className="nav-link px-4"
                >
                  {dashboadMenus[0]}
                </NavLink>
              </li>
              <li className="nav-item navigation-header-link-active">
                <NavLink
                  to="/employer_dashboard/candidates"
                  className="nav-link px-4"
                >
                  {dashboadMenus[1]}
                </NavLink>
              </li>
              <li
                className="nav-item navigation-header-link-active"
                data-testid="pool"
              >
                <NavLink
                  to="/employer_dashboard/pool"
                  className="nav-link px-4"
                >
                  {dashboadMenus[2]}
                </NavLink>
              </li>
            </ul>

            <ul className="col-12 col-lg-4 d-inline-flex list-unstyled mb-0 justify-content-end align-items-center">
              <li>
                <div className="position-relative pe-4 notify-closet">
                  <span
                    className="nav-link position-relative bell-icon notify-closet"
                    data-testid="Bell"
                    onClick={() => setOpen(!open)}
                  >
                    <MdNotificationsActive className="fs-4 notify-closet" />
                    {/* notification count  */}
                    <span className="notify-closet notification-bell-count position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notificationCount}
                    </span>
                  </span>

                  <div
                    className={`${
                      open
                        ? "notification-box rounded-4 shadow-lg notify-closet"
                        : "d-none"
                    }`}
                  >
                    <div className="container h-100">
                      {/* notification header */}
                      <div className="notification-header row align-items-center sticky-top p-3">
                        <div className="col">
                          <h6 className="m-0 fw-bold">Notification</h6>
                        </div>
                        <div className="col text-end">
                          <button className="btn btn-sm border-0">
                            <IoIosCloseCircleOutline
                              className="fs-4"
                              onClick={() => setOpen(!open)}
                            />
                          </button>
                        </div>
                      </div>

                      {/* notification body */}
                      <div className="notification-body  row g-2 p-3">
                        <ul className="list-unstyled">
                          {message.length > 0 ? (
                            message.map((v, i) => {
                              return (
                                <div
                                  className="notification-content-box p-3 rounded-4 mb-2"
                                  key={i}
                                >
                                  <div className="notification-content-text py-1">
                                    <p className="m-0">
                                      {/* We are seeking talented and innovative Web developers proficient in FlutterFlow to join our team. */}
                                      {v.msg}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="row align-items-center h-100">
                              <p className="text-center">Your inbox is empty</p>
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="dropdown navbar-dropdown px-2 pe-4">
                  <a
                    className="nav-link dropdown-toggle "
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={profile}
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                      data-testid="Profile"
                    />
                    <span className="d-none d-sm-inline pe-2">
                      {userNavbarinfo.length > 0
                        ? userNavbarinfo[0].user_details !== undefined
                          ? userNavbarinfo[0].user_details[0].first_name
                          : null
                        : ""}
                      &nbsp;
                      {userNavbarinfo.length > 0
                        ? userNavbarinfo[0].user_details !== undefined
                          ? userNavbarinfo[0].user_details[0].last_name
                          : null
                        : ""}
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarScrollingDropdown"
                    data-testid="ProfileCard"
                  >
                    <li>
                      <NavLink
                        to="/employer_dashboard/profile"
                        className="dropdown-item header-dropdown"
                        data-testid="profile"
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item header-dropdown" href="#">
                        Contact 2nd Careers
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={doLogout}>
                      <NavLink
                        to="/"
                        className="dropdown-item header-dropdown"
                        data-testid="logout"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <button
                  className="btn btn-transparent border d-lg-none"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                  aria-controls="offcanvasResponsive"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default EmployerNavComponent;
