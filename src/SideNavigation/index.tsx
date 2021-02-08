import { useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import { initSideBar } from "./sideBar";
import { customSideBar } from "./custom";
import { useHistory } from "react-router-dom";
import { sideNavigationData } from "../redux/actions/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const handleSideBar = () => {
  initSideBar();
};

function SideNavigation() {
  const [navData, setNavData]: any = useState();
  const [doctype, setDoctype] = useState("Appraisal");
  const [home_menu, setHomeMenu] = useState(0);
  const menuType = useSelector((state: RootState) => state.menuType.menuType);

  // useEffect(() => {
  //   initSideBar();
  //   customSideBar();
  // }, []);

  function route2page(path: any) {
    console.log("route==>", path);
    return true;
  }

  useEffect((): void => {
    const menu_type = sessionStorage.getItem("menuType")
    sideNavigationData(menu_type).then((response) => {
      // console.log("side nav response", response.message);
      setNavData(response.message);
      initSideBar();
      customSideBar();
    });
  }, [doctype]);

  const renderNavData = () => {
    // return <div dangerouslySetInnerHTML={{ __html: navData }} />;
    return { __html: navData };
  };

  const history = useHistory();
  const handleGoalPage = () => {
    history.push("/appraisal/goalsetting");
  };
  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      <div className="scroll-sidebar leftpanel-scrollbar" id="style-scrollbar">
        <nav className="sidebar-nav">
          <div dangerouslySetInnerHTML={renderNavData()} />

          {/* {renderNavData()} */}

          {/* <button className="btn btn-link btn-nav-left" id="nav_employee">
            Employee
          </button>
          <ul id="sidebarnav" className="p-t-30 nav_Employee">
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Appraisal</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/goalsetting');"
                    aria-expanded="false"
                  >
                    <i className="mdi ti-settings"></i>
                    <span className="hide-menu">Goal Setting</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/self-assessment');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-note-plus"></i>
                    <span className="hide-menu">Self Assessment</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Confirmation</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/confirmation-letter');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Confirmation Letter</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/probation');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Probation</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-link btn-nav-left" id="nav_hr contact">
            HR Contact
          </button>
          <ul id="sidebarnav" className="p-t-30 nav_HR Contact">
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Appraisal</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/goalsetting');"
                    aria-expanded="false"
                  >
                    <i className="mdi ti-settings"></i>
                    <span className="hide-menu">Goal Setting</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/self-assessment');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-note-plus"></i>
                    <span className="hide-menu">Self Assessment</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Confirmation</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/confirmation-letter');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Confirmation Letter</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/probation');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Probation</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-link btn-nav-left" id="nav_manager">
            Manager
          </button>
          <ul id="sidebarnav" className="p-t-30 nav_Manager">
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Appraisal</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/goalsetting');"
                    aria-expanded="false"
                  >
                    <i className="mdi ti-settings"></i>
                    <span className="hide-menu">Goal Setting</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/appraisal/self-assessment');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-note-plus"></i>
                    <span className="hide-menu">Self Assessment</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i className="mdi mdi-chart-bar"></i>
                <span className="hide-menu">Confirmation</span>
              </a>
              <ul aria-expanded="false" className="collapse  first-level">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/confirmation-letter');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Confirmation Letter</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link  waves-effect waves-dark"
                    href="#"
                    // onClick="return route2page('/probation');"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-chart-bar"></i>
                    <span className="hide-menu">Probation</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul> */}
        </nav>
      </div>
    </aside>

    // <aside className="left-sidebar" data-sidebarbg="skin5">
    //   <div className="scroll-sidebar">
    //     <nav className="sidebar-nav">
    //       <button className="btn btn-link btn-nav-left" id="nav_employee">
    //         Employee
    //       </button>
    //       <ul id="sidebarnav" className="p-t-30 nav_employee">
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             href="#"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-chart-bar"></i>
    //             <span className="hide-menu">Appraisal </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="ti-settings"></i>
    //                 <span className="hide-menu" onClick={handleGoalPage}>
    //                   Goal Settings
    //                 </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link" href="#">
    //                 <i className="mdi mdi-note-plus"></i>
    //                 <span className="hide-menu"> Self Assessment </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             href="#"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-face"></i>
    //             <span className="hide-menu">Confirmation </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link" href="#">
    //                 <i className="mdi mdi-emoticon"></i>
    //                 <span className="hide-menu"> Confirmation Status </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link" href="#">
    //                 <i className="mdi mdi-emoticon-cool"></i>
    //                 <span className="hide-menu"> Confirmation Letter </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </aside>

    //       <button className="btn btn-link btn-nav-left" id="nav_manager">
    //         Manager
    //       </button>
    //       <ul id="sidebarnav" className="p-t-30 nav_manager">
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-chart-bar"></i>
    //             <span className="hide-menu">Appraisal </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="ti-settings"></i>
    //                 <span className="hide-menu" onClick={handleGoalPage}>
    //                   Goal Settings
    //                 </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-note-plus"></i>
    //                 <span className="hide-menu"> Self Assessment </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-face"></i>
    //             <span className="hide-menu">Confirmation </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-emoticon"></i>
    //                 <span className="hide-menu"> Confirmation Status </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-emoticon-cool"></i>
    //                 <span className="hide-menu"> Confirmation Letter </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>

    //       <button className="btn btn-link btn-nav-left" id="nav_hr_contact">
    //         HR Contact
    //       </button>
    //       <ul id="sidebarnav" className="p-t-30 nav_hr_contact">
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-chart-bar"></i>
    //             <span className="hide-menu">Appraisal </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="ti-settings"></i>
    //                 <span className="hide-menu" onClick={handleGoalPage}>
    //                   Goal Settings
    //                 </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-note-plus"></i>
    //                 <span className="hide-menu"> Self Assessment </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="sidebar-item">
    //           <a
    //             className="sidebar-link has-arrow waves-effect waves-dark"
    //             aria-expanded="false"
    //           >
    //             <i className="mdi mdi-face"></i>
    //             <span className="hide-menu">Confirmation </span>
    //           </a>
    //           <ul aria-expanded="false" className="collapse  first-level">
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-emoticon"></i>
    //                 <span className="hide-menu"> Confirmation Status </span>
    //               </a>
    //             </li>
    //             <li className="sidebar-item">
    //               <a className="sidebar-link">
    //                 <i className="mdi mdi-emoticon-cool"></i>
    //                 <span className="hide-menu"> Confirmation Letter </span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </aside>
  );
}

export default SideNavigation;
