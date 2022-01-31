import React from "react";
import "./Navigation.css"

const Navigation = (props:any) => {

    let date = new Date().toJSON().slice(0, 10)

    const showCurrentDay = () => {
            if(date!==props.date){
                return(<div><button className="btn-secondary" onClick={handleCurrent} id="second">Back to current</button></div>)
            }
    }

    const handleRightClick = () => {
      props.onRightClick()
    }

    const handleLeftClick = () => {
        props.onLeftClick()
    }

    const handleCurrent = () => {
        props.onCurrentClick()
    }

    return <div className="navigation_Bar">
        <div id="first">
        <button className="btn-secondary" onClick={handleLeftClick}>{"<----"}</button>
        <h3>{props.date}</h3>
        <button className="btn-secondary" onClick={handleRightClick}> {"---->"} </button>
        </div>
        {showCurrentDay()}
    </div>

}

export default Navigation;