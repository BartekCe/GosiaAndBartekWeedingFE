import React from "react";
import UsersList from "../components/UsersList"
import CountDownTimer from "../components/CountDownTimer";
import "./MainPage.css"
import DropDownMenu from "../components/DropDownMenu";
import UpperMenu from "../components/Menu/UpperMenu";

const MainPage = () => {

    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'');
    return (<div className="mainPage">
            <UpperMenu>
                    X
                </UpperMenu>
            {/*<div><CountDownTimer/></div>*/}
        <div><UsersList/></div>
    </div>
    )
}

export default MainPage;

