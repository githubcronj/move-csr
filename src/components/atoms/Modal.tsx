import React from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";

type iprops = {
  isShowModal: boolean;
  onCloseModal?: () => void;
  onCloseModal2?: () => void;
  showClose: boolean;
  children: any;
  style?: any;
  preview?: boolean;
  borderRadius?: string;
  width?: string;
  padding?: string;
  left?: string;
  top?: string;
  className?: any;
  styleIcon?: any;
  icon?: any;
};
// const useStyles = makeStyles(() => ({
//     paper: {
//         position: 'absolute',
//         width: 700,
//         backgroundColor: '#ffffff',
//         borderRadius: '15px',
//         // boxShadow: theme.shadows[2],
//         padding: '45px 50px',
//         left: '30%',
//         top: '10%',
//     },
//     nopadding: {
//         position: 'absolute',
//         width: 700,
//         backgroundColor: '#ffffff',
//         borderRadius: '15px',
//         // boxShadow: theme.shadows[2],
//         padding: '20px',
//         left: '30%',
//         top: '20%',
//     },
// }));

export default function SimpleModal(props: iprops) {
  // const classes = useStyles();
  return (
    <div>
      <Modal
        open={props.isShowModal}
        onClose={props.onCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onBackdropClick={props.onCloseModal}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus={true}
        style={{
          zIndex: 200,
          position: "absolute",
          top: "10%",
          margin: "auto",
          overflow: "scroll",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          // /*style={modalStyle}*/ className={props.preview ? classes.nopadding : classes.paper}

          className={props.className ? props.className : null}
        >
          {props.showClose && (
            <div
              // className="close"
              onClick={props.onCloseModal2}
              style={
                props.styleIcon
                  ? props.styleIcon
                  : {
                      position: "absolute",
                      right: "10px",
                      cursor: "pointer",
                      top: "10px",
                    }
              }
            >
              {/* <img src={Cancel} width="20px" alt={""} /> */}
              {props.icon ? (
                <img src={props.icon} width="20px" alt={""} />
              ) : (
                <CloseIcon style={{ color: "#6B6C6F", fontSize: "large" }} />
              )}
            </div>
          )}
          {props.children}
        </div>
      </Modal>
    </div>
  );
}
