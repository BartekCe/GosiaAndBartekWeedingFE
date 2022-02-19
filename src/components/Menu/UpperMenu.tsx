import React from "react";
import "./UpperMenu.css"
import MenuItem from "./MenuItem";

const UpperMenu = (props:any) => {
  return(
      <div className="d-flex">
            <MenuItem text="Add Ingredient"/>
            <MenuItem text="Update Ingredient"/>
      </div>
  )
}

export default UpperMenu;