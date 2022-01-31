import React from "react";
import Ingredient from "../components/Ingredient";
import UsersList from "../components/UsersList"
import CountDownTimer from "../components/CountDownTimer";
import "./MainPage.css"

const MainPage = () => {

    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'');
    return (<div className="mainPage">
            <div><Ingredient/></div>
            <div><CountDownTimer/></div>
        <div><UsersList/></div>
    </div>
    )
}

export default MainPage;

