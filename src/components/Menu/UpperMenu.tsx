import React from "react";
import "./UpperMenu.css"
import MenuItem from "./MenuItem";

const UpperMenu = (props:any) => {
  return(
      <div className="upperMenu">
        <ul className="upperMenu-nav">
            <MenuItem text="Add Ingredient"/>
        </ul>
      </div>
  )
}

export default UpperMenu;