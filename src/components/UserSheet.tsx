import React, {useState} from "react";
import {User} from "../fetches/interfaces";
import Card from "../UI/Card";
import DayOfEatingComponent from "./DayOfEatingComponent";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./UserSheet.css"
import UserData from "./UserData";

const UserSheet = (user: User) => {
    let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    const dayId = user.id + utc;

    return (
        <Card className="userSheet">
            <h1>{user.name}</h1>
            <div className="container">
                <UserData
                        key={user.id}
                          id={user.id}
                          name={user.name}
                          startingWeight={user.startingWeight}
                          currentWeight={user.currentWeight}
                          goalWeight={user.goalWeight}
                          weeklyCaloriesIntake={user.weeklyCaloriesIntake}
                          dailyCaloriesIntake={user.dailyCaloriesIntake}
                          dailyProtein={user.dailyProtein}
                          dailyFat={user.dailyFat}
                          dailyCarbohydrate={user.dailyCarbohydrate}/>
                <DayOfEatingComponent className="dayCard" userId={user.id} dayId={dayId}
                                      dailyCalories={user.dailyCaloriesIntake} userName={user.name}/>
            </div>
        </Card>
    )
}

export default UserSheet;