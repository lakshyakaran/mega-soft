import logo_text from "../../src/assets/img/logo-text.png";
import logo_icon from "../../src/assets/img/logo-icon.png";
import user1 from "../../src/assets/img/1.jpg";
import { useEffect } from "react";
import { initSideBar } from "./sideBar";
import { customSideBar } from "./custom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link, Text } from "office-ui-fabric-react";
import { logout } from "../redux/actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";

import logo_ms from "../assets/img/logo_ms.png";
import logo_nuage from "../assets/img/logo_nuage.png";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/reducers";
import { setMenuType } from "../redux/actions/roleType";

function MainHeader(props: any) {
  useEffect(() => {
    customSideBar();
    initSideBar();
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCustomSidebar = () => {
    customSideBar();
    initSideBar();
  };

  const history = useHistory();

  const menuType = useSelector((state: RootState) => state.menuType.menuType);

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;

  const renderMenuLogo = () => {
      return(
        <span className="logo-text">
          <img src={logo_text} alt="homepage" className="light-logo" />
        </span>
      )
    
  }


  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header" data-logobg="skin5">
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="#"
          >
            <i className="ti-menu ti-close"></i>
          </a>
          <a
            className="navbar-brand"
            href=""
            onClick={() => {
              dispatch(setMenuType(0))
              history.push("/home");
            }}
          >
            <b className="logo-icon p-l-10">
              <img src={logo_icon} alt="homepage" className="light-logo" />
            </b>
            {renderMenuLogo()}
            {/* {menuType !== 0 ? (
              <span className="logo-text">
                <img src={logo_text} alt="homepage" className="light-logo" />
              </span>
            ) : null} */}
          </a>
          <a
            className="topbartoggler d-block d-md-none waves-effect waves-light"
            href=""
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="ti-more"></i>
          </a>
        </div>
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          <ul className="navbar-nav float-left mr-auto">
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link sidebartoggler waves-effect waves-light"
                href="#"
                data-sidebartype="mini-sidebar"
                onClick={handleCustomSidebar}
              >
                <i className="mdi mdi-chevron-left font-24"></i>
              </a>
            </li>
            <div className="main-logo">
              <img src={logo_nuage} />
            </div>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-none d-md-block">
                  Create New <i className="fa fa-angle-down"></i>
                </span>
                <span className="d-block d-md-none">
                  <i className="fa fa-plus"></i>
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item search-box">
              {" "}
              <a className="nav-link waves-effect waves-dark" href="#">
                <i className="ti-search"></i>
              </a>
              <form className="app-search position-absolute">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search &amp; enter"
                />{" "}
                <a className="srh-btn">
                  <i className="ti-close"></i>
                </a>
              </form>
            </li> */}
          </ul>

          <div className="mx-auto text-white-50">
            <Text style={{ marginRight: "10px" }}>
              Welcome {userName} ({userId})
            </Text>

            <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
              Logged In:
            </Text>
            <Text style={{ marginRight: "5px" }}>
              {dateNow} {timeNow}
            </Text>
          </div>
          <ul className="navbar-nav float-right ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="mdi mdi-bell font-24"></i>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href=""
                id="2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="font-24 mdi mdi-comment-processing"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown"
                aria-labelledby="2"
              >
                <ul className="list-style-none">
                  <li>
                    <div className="">
                      <a href="#" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-success btn-circle">
                            <i className="ti-calendar"></i>
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Event today</h5>
                            <span className="mail-desc">
                              Just a reminder that event
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-info btn-circle">
                            <i className="ti-settings"></i>
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Settings</h5>
                            <span className="mail-desc">
                              You can customize this template
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-primary btn-circle">
                            <i className="ti-user"></i>
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-danger btn-circle">
                            <i className="fa fa-link"></i>
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Luanch Admin</h5>
                            <span className="mail-desc">
                              Just see the my new admin!
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <Link
              className="link-icons px-2 nav-link"
              onClick={() => {
                handleLogout();
              }}
            >
              <PowerSettingsNewIcon />
            </Link>
            <img src={logo_ms} className="ms-logo-center" />
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={user1}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-right user-dd animated">
                <a className="dropdown-item" href="#">
                  <i className="ti-user m-r-5 m-l-5"></i> My Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti-wallet m-r-5 m-l-5"></i> My Balance
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti-email m-r-5 m-l-5"></i> Inbox
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="ti-settings m-r-5 m-l-5"></i> Account Setting
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="fa fa-power-off m-r-5 m-l-5"></i> Logout
                </a>
                <div className="dropdown-divider"></div>
                <div className="p-l-30 p-10">
                  <a href="#" className="btn btn-sm btn-success btn-rounded">
                    View Profile
                  </a>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default connect((state) => ({
  ...state,
}))(MainHeader);
