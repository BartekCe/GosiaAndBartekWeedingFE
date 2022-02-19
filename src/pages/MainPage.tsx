import React from "react";
import UsersList from "../components/UsersList"
import "./MainPage.css"

const MainPage = () => {

    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'');
    return (<div className="mainPage">
        <div><UsersList/></div>
    </div>
    )
}

export default MainPage;

