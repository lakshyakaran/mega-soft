import {
  getTheme,
  IconButton,
  IIconProps,
  IModalStyles,
  Modal,
  PrimaryButton,
} from "office-ui-fabric-react";
import React, { useState } from "react";

const cancelIcon: IIconProps = { iconName: "Cancel" };
const theme = getTheme();

const iconButtonStyles = {
  root: {
    color: "#FFF",
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const modalStyle: Partial<IModalStyles> = {
  root: {},
  main: {
    height: "20%",
    width: "20%",
    backgroundColor: "#FFF",
  },
};

const handleApplicationError = (resp: any) => {
  console.log("inside handleApplicationError");
  //   const [apllicationError, setApplicationError] = useState(false);
  let errorMessage = "Something went wrong. Please contact system support.";

  if (resp.status >= 400 && resp.status <= 499) {
    errorMessage = "Please correct the input data & try again.";
  } else if (resp.status >= 500 && resp.status <= 599) {
    errorMessage =
      "Server error. Please contact system support or try again later.";
  }

  //   setApplicationError(true);
  return alert("inside application error");

  // <div>
  //   <Modal
  //     titleAriaId={"ERROR"}
  //     isOpen={true}
  //     isBlocking={false}
  //     styles={modalStyle}
  //     // containerClassName={contentStyles.container}
  //   >
  //     <div className="modal-header-local">
  //       <div className="modal-title">Error</div>
  //       <IconButton
  //         styles={iconButtonStyles}
  //         iconProps={cancelIcon}
  //         ariaLabel="Close popup modal"
  //         //   onClick={() => {
  //         //     setApplicationError(false);
  //         //   }}
  //       />
  //     </div>
  //     <div className="modal-content-failed">{errorMessage}</div>
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <PrimaryButton
  //         text="appraisal_form.buttons.back"
  //         allowDisabledFocus
  //         //   onClick={() => {
  //         //     setApplicationError(false);
  //         //   }}
  //         disabled={false}
  //         checked={false}
  //       />
  //     </div>
  //   </Modal>
  // </div>
};

export default handleApplicationError;
