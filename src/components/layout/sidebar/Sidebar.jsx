import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusIcon from "../../../assets/images/status.svg";
import UserIcon from "../../../assets/images/user.svg";
import MessageIcon from "../../../assets/images/messages.svg";
import CalenderIcon from "../../../assets/images/calender.svg";
import ApplicationIcon from "../../../assets/images/apps.svg";
import ExitIcon from "../../../assets/images/exit.svg";
import CommentsIcon from "../../../assets/images/CommentIcon.svg";
import {
  setShowApps,
  setShowMessage,
  setShowModalComments,
  setShowProfile,
  setShowStats,
} from "../../../redux/home/home-action";
import { Overlay, Tooltip } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import SidebarNav from "./SidebarNav";
import MainSideBarContent from "./MainSideBarContent";
import Profile from "./Profile";
import NavMenuContent from "./NavMenuContent";

const Sidebar = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [menuContent, setMenuContent] = useState("default");

  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const { side, showProfile, showMessage, showApps, showStats, chartArea } =
    useSelector((state) => state.home);

  const refProfile = useRef();
  const refMessage = useRef();
  const refApps = useRef();
  const refStats = useRef();

  const showModalProfile = () => {
    dispatch(setShowProfile(!showProfile));
    dispatch(setShowMessage(false));
  };

  const showModalApps = () => {
    dispatch(setShowApps(!showApps));
  };

  const showModalStats = () => {
    dispatch(setShowStats(!showStats));
  };

  const showModalMessage = () => {
    dispatch(setShowMessage(!showMessage));
    dispatch(setShowProfile(false));
  };

  const showModalComments = () => {
    dispatch(setShowModalComments(true));
  };

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
    setIsLoading(true);
  };

  const navigate = useNavigate();

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    bar: {
      dataLabels: {
        position: "top",
      },
    },
    title: {
      text: "",
      align: "center",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const options2 = {
    chart: {
      type: "area",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  // outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refProfile.current &&
        !refProfile.current.contains(event.target) &&
        !document.getElementById("profile").contains(event.target)
      ) {
        dispatch(setShowProfile(false));
      }
      if (
        refMessage.current &&
        !refMessage.current.contains(event.target) &&
        !document.getElementById("message").contains(event.target)
      ) {
        dispatch(setShowMessage(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refProfile, refMessage]);

  return (
    <>
      {/* <div className="flex justify-evenly relative h-12">
        <img
          onClick={showModalStats}
          ref={refStats}
          className="w-8 invert"
          alt="alt"
          src={StatusIcon}
        />
        <Overlay target={refStats.current} show={showStats} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              My Tooltip
            </Tooltip>
          )}
        </Overlay>
        <img className="w-8 invert" alt="alt" src={CalenderIcon} />
        <img
          onClick={showModalApps}
          ref={refApps}
          className="w-8 invert"
          alt="alt"
          src={ApplicationIcon}
        />
        <Overlay target={refApps.current} show={showApps} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              My Tooltip
            </Tooltip>
          )}
        </Overlay>
        <img
          onClick={showModalMessage}
          id="message"
          className="w-8 invert"
          alt="alt"
          src={MessageIcon}
        />
        {showMessage && (
          <div
            ref={refMessage}
            id="profile"
            className="absolute text-center w-36 bg-white p-3 -bottom-10 right-72
             flex flex-col items-center z-8 shadow-sm rounded-lg left-0 lg:left-4"
          >
            <div className="text-xs text-gray-400">پيامي در صندوق نداريد</div>
          </div>
        )}
        <img
          id="profile"
          onClick={showModalProfile}
          className="w-8 invert"
          alt="alt"
          src={UserIcon}
        />
        {showProfile && (
          <div
            ref={refProfile}
            id="profile"
            className="absolute w-36 bg-white p-3 -bottom-32 flex flex-col items-center z-10 shadow-sm rounded-lg left-0 lg:-left-12"
          >
            <img className="w-8 " alt="alt" src={UserIcon} />
            <div className="text-sm font-bold mt-3 invert-0 text-black">
              شیما گلستانی
            </div>
            <div className="text-zinc-400 text-xs mt-2 font-bold" onClick={()=>setMode("Profile")}>
              ویرایش پروفایل
            </div>
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={handleSignOut}
                className="text-black"
              >
                {isLoading ? loadingSvg : "خروج"}
              </span>
            </div>
          </div>
        )}
      </div> */}
      <SidebarNav setMode={setMenuContent} />
      <NavMenuContent
        mode={menuContent}
        side={side}
        chartArea={chartArea}
        setMode={setMenuContent}
      />
      {/* <MainSideBarContent  />
      <Profile /> */}

      <div className="mt-3 flex justify-center">
        <img
          alt="alt"
          src={ExitIcon}
          style={{ cursor: "pointer" }}
          onClick={handleSignOut}
          className="invert"
        />
        {/* <img
          onClick={showModalComments}
          alt="alt"
          className="mr-7 invert"
          src={CommentsIcon}
        /> */}
      </div>
    </>
  );
};

export default Sidebar;
