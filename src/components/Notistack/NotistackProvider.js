import React, { useRef } from "react";
import { SnackbarProvider } from "notistack";
import { Icon } from "@iconify/react";
import { GlobalStyles } from "@mui/material";

function SnackbarStyles() {
  return (
    <GlobalStyles
      styles={{
        "#root": {
          "& .rtl-uwcd5u.SnackbarContainer-root": {
            zIndex: 20000,
          },
          "& .SnackbarContent-root": {
            width: "100%",
            height: "3rem",
            display: "flex",
            // padding: "20px",
            // backgroundColor: "white",
            // color: "red",
            borderRadius: "10px",
            // padding: theme.spacing(1),
            // margin: theme.spacing(0.25, 0),
            // boxShadow: theme.customShadows.z8,
            // borderRadius: theme.shape.borderRadius,
            // color: theme.palette.grey[isLight ? 0 : 800],
            // backgroundColor: theme.palette.grey[isLight ? 900 : 0],
            "&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo":
              {
                // color: "black",
                // backgroundColor: theme.palette.background.paper,
              },
            // [theme.breakpoints.up("md")]: {
            //   minWidth: 240,
            // },
          },
          "& .SnackbarItem-message": {
            // padding: "2 !important",
            // fontWeight: theme.typography.fontWeightMedium,
          },
          "& .SnackbarItem-action": {
            marginRight: 100,
            // color: theme.palette.action.active,
            "& svg": { width: 0, height: 0 },
          },
        },
      }}
    />
  );
}

const NotistackProvider = ({ children }) => {
  const notistackRef = useRef(null);
  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />
      <SnackbarProvider
        style={{ direction: "rtl" }}
        ref={notistackRef}
        dense
        variant="danger"
        maxSnack={5}
        autoHideDuration={5000}
        preventDuplicate
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        iconVariant={{
          info: <Icon icon={"eva:info-fill"} width={20} color="info" />,
          success: (
            <Icon
              icon={"eva:checkmark-circle-2-fill"}
              width={20}
              color="fail"
            />
          ),
          warning: (
            <Icon icon={"eva:alert-triangle-fill"} width={20} color="warning" />
          ),
          error: (
            <Icon icon={"eva:alert-circle-fill"} width={20} color="error" />
          ),
        }}
        action={(key) => (
          <Icon
            style={{ color: "white" }}
            width={20}
            onClick={onClose(key)}
            icon={"eva:close-fill"}
          />
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};

export default NotistackProvider;
