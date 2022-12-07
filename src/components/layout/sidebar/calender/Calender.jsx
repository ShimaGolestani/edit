import React, { useRef, useEffect } from "react";
import JCalendar from "reactjs-persian-calendar";
import {
  setShowCalender,
  setShowMessage,
} from "../../../../redux/home/home-action";
import { useDispatch, useSelector } from "react-redux";
import CalenderIcon from "../../../../assets/images/calender.svg";
import { useState } from "react";

const Calender = () => {
  const { showCalender } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);
  const showModalCalender = () => {
    dispatch(setShowCalender(!showCalender));
    dispatch(setShowMessage(false));
  };
  const refCalender = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <img
        id="calender"
        onClick={() => setShow((perv) => !perv)}
        style={{ cursor: "calender" }}
        className="w-8 invert"
        alt="alt"
        src={CalenderIcon}
      />
      {show && (
        <div ref={refCalender} id="calender" className="absolute right-14">
          <JCalendar
            locale={"fa"}
            color={"#000066"}
            size={30}
            onClick={console.log}
            itemRender={(key, item, children) => children}
          />
        </div>
      )}
    </>
  );
};

export default Calender;
