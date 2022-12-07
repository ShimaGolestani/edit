import React, { createContext, useState } from "react";
import PopupModal from "../components/PopupModal/PopupModal";

const PopUpContext = createContext({ setPopUpAttributes: ({ hidden }) => {} });
const PopupProvider = ({ children }) => {
  const [PopUpAttributes, setPopUpAttributes] = useState({
    hidden: true,
  });

  return (
    <PopUpContext.Provider value={{ setPopUpAttributes }}>
      <PopupModal {...PopUpAttributes} />
      {children}
    </PopUpContext.Provider>
  );
};

export { PopUpContext, PopupProvider };
