import { useContext } from "react";
import { PopUpContext } from "../context/PopupProvider";

const usePopup = () => useContext(PopUpContext);
export default usePopup;
