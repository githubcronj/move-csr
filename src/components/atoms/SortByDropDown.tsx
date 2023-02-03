import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./SortByDropdown.scss";

const SortByDropdown = (props: any) => {
  return (
    <div className="sortByDiv">
      <div
        className="avg-customer-review"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          // textDecoration: "underline",
        }}
      >
        {" "}
        Sort by: {props.sortByName ? props.sortByName : ""}{" "}
        {props.sortByOption ? props.sortByOption : ""}
      </div>
      <div className="down-arrow">
        <KeyboardArrowDownIcon className="icon" onClick={props.handleMenu} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {props.menuList &&
          props.menuList.map((menuItem: any) => {
            return (
              <MenuItem onClick={() => props.onMenuClick(menuItem)}>
                {menuItem.name}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default SortByDropdown;
