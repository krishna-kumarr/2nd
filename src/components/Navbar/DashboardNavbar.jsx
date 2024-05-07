import React, { useContext, useEffect, useRef, useState } from "react";
import Images from "../../utils/images.js";
import { MdNotificationsActive } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CommonContext from "../../hooks/CommonContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const DashboardNavbar = ({ dashboadMenus }) => {
  let notifyRef = useRef();

  const { gettingResponse, profilePicture, setProfilePicture } =
    useContext(CommonContext);
  const [userNavbarinfo, setUserNavinfo] = useState([]);
  const pageRender = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const homePaths = [
    "/professional/home/all_jobs",
    "/professional/home/recommended_jobs",
    "/professional/home/applied_jobs",
    "/professional/home/saved_jobs",
  ];
  const [profile, setProfile] = useState("");
  const token = localStorage.getItem("Token");
  const [notificationCount,setNotificationCount]=useState(0)

  useEffect(() => {
    var cancelgetNavbarData = false;
    const getNavbarDatas = async () => {
      try {
        await axios
          .get("https://devapi.2ndcareers.com/professional_notifications", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (!cancelgetNavbarData) {
             
              if (res.data.error_code === 0) {
                setMessage(res.data.data);
              }else if(res.data.error_code === 401){
                pageRender("/")
                toast.error(res.data.message);
                localStorage.removeItem("Token")
              }else{
                toast.error(res.data.message);
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    getNavbarDatas();

    return ()=>{
      cancelgetNavbarData=true
    }
  },[notificationCount]);

  useEffect(() => {
    var cancelUserNavinfo = false;

    const getUserDetails = async () => {
      try {
        await axios
          .get("https://devapi.2ndcareers.com/user_dashboard_details", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
           
            if (res.data.error_code === 0) {
              setProfilePicture(
                `https://devcdn.2ndcareers.com/${res.data.data.user_details[0].profile_image}`
              );
              setUserNavinfo([res.data.data]);
              setNotificationCount(res.data.data.notification_count)
            }else if(res.data.error_code === 401){
              pageRender("/")
              toast.error(res.data.message);
              localStorage.removeItem("Token")
            }else{
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



    // notification box closing fuction
    const handler = (e) => {
      if (!e.target.closest(".notify-closet")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      cancelUserNavinfo=true
    };
  }, []);


  const doLogout = () => {
    localStorage.removeItem("Token");
  };




  return (
    <div className="navbar-height placeholder-glow">
      <nav className="navbar navbar-light bg-white fixed-top navbar-expand-md shadow-sm p-2 justify-content-center ">
        <div className="container-fluid">
          <a className="navbar-brand d-flex w-50 me-auto " href="#">
            <img
              src={Images.logo}
              alt="No Logo"
              className="img-responsive logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <ul className="navbar-nav w-100 justify-content-center">
              <li className="nav-item navigation-header-link-active">
                <NavLink
                  to="/professional/home/all_jobs"
                  className="nav-link px-4"
                  data-testid="Home"
                >
                  {dashboadMenus[0]}
                </NavLink>
              </li>
              <li
                className="nav-item navigation-header-link-active"
                data-testid="Learning"
              >
                <NavLink
                  to="/professional/learning"
                  className="nav-link px-4"
                  data-testid="learning"
                >
                  {dashboadMenus[1]}
                </NavLink>
              </li>
              <li
                className="nav-item navigation-header-link-active"
                data-testid="Community"
              >
                <NavLink
                  to="/professional/community"
                  className="nav-link px-4"
                  data-testid="community"
                >
                  {dashboadMenus[2]}
                </NavLink>
              </li>
            </ul>

            <ul className="nav navbar-nav ms-auto w-100 justify-content-end align-items-center">
              <li
                className="nav-item position-relative pe-4 notify-closet"
                ref={notifyRef}
              >
                {gettingResponse === false && userNavbarinfo.length === 0 ? (
                  <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                ) : (
                  <>
                    <span
                      className="nav-link position-relative bell-icon notify-closet"
                      data-testid="Bell"
                      onClick={() => setOpen(!open)}
                    >
                      <MdNotificationsActive className="fs-4 notify-closet" />
                      <span className="notify-closet notification-bell-count position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {userNavbarinfo.length > 0
                          ? userNavbarinfo[0].notification_count !== undefined
                            ? userNavbarinfo[0].notification_count
                            : null
                          : null}
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
                                <p className="text-center">
                                  Your inbox is empty
                                </p>
                              </div>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>

              <li className="nav-item dropdown navbar-dropdown ">
                {gettingResponse === false && userNavbarinfo.length === 0 ? (
                  <label className=" w-100">
                    <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                  </label>
                ) : (
                  <>
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={profilePicture}
                        alt="mdo"
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                        data-testid="Profile"
                      />
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
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarScrollingDropdown"
                      data-testid="ProfileCard"
                    >
                      <li>
                        <NavLink
                          to="/professional/profile"
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
                      <li>
                        <NavLink
                          to="/professional/pricing_plan"
                          className="dropdown-item header-dropdown"
                          data-testid="upgrade"
                        >
                          Upgrade
                        </NavLink>
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
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
