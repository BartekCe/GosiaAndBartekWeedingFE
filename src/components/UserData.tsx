import React, {useEffect, useState} from "react";
import Card from "../UI/Card";
import "./UserData.css"
import {WeekData} from "../fetches/interfaces";

const UserData = (user: any) => {

    const [currentWeight, setCurrentWeight] = useState<number>(user.currentWeight);
    const [weeklyCalories, setWeeklyCalories] = useState<number>(user.weeklyCaloriesIntake);
    const [dailyCalories, setDailyCalories] = useState<number>(user.dailyCaloriesIntake);
    const [protein, setProtein] = useState<number>(user.dailyProtein);
    const [fat, setFat] = useState<number>(user.dailyFat);
    const [carbohydrate, setCarbohydrate] = useState<number>(user.dailyCarbohydrate);
    const [message, setMessage] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [weekData, setWeekData] = useState<WeekData>({
        weeklyCaloriesIntake: user.weeklyCaloriesIntake,
        currentCalories: 0
    })

    const currentWeightChangeHandler = (event: any) => {
        setCurrentWeight(event.target.value)
    }
    const weeklyCaloriesChangeHandler = (event: any) => {
        setWeeklyCalories(event.target.value)
    }
    const dailyCaloriesChangeHandler = (event: any) => {
        setDailyCalories(event.target.value)
    }
    const proteinChangeHandler = (event: any) => {
        setProtein(event.target.value)
    }
    const fatChangeHandler = (event: any) => {
        setFat(event.target.value)
    }
    const carbohydrateChangeHandler = (event: any) => {
        setCarbohydrate(event.target.value)
    }

    const handleSubmit = async (event: any) => {
        let url = "http://localhost:8080/updateUser"
        const data = {
            id: user.id,
            name: user.name,
            startingWeight: user.startingWeight,
            goalWeight: user.goalWeight,
            currentWeight: currentWeight,
            weeklyCaloriesIntake: weeklyCalories,
            dailyCaloriesIntake: dailyCalories,
            dailyProtein: protein,
            dailyFat: fat,
            dailyCarbohydrate: carbohydrate
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        event.preventDefault();
        await fetch(url, options).then(res => {
            if (res.ok) {
                setMessage("Updated!")
                setOpen(false)
            } else setMessage("some error")
        })
    }

    const fetchWeekInfo = async () => {
        let url = "http://localhost:8080/getWeek/" + user.dayId;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setWeekData({
            currentCalories: data.currentCalories,
            weeklyCaloriesIntake: data.weeklyCaloriesIntake
        })
    }

    useEffect(() => {
        fetchWeekInfo();
    }, [])

    const handleBack = () => {
        setOpen(false);
    }

    const handleUpdate = () => {
        setOpen(true)
        fetchWeekInfo()
    }

    const display = () => {
        if (!open) {
            return (<Card className="userInfo">
                    <p>Goal Weight: {user.goalWeight}</p>
                    <p>Starting Weight: {user.startingWeight}  </p>
                    <p>Current Weight: {user.currentWeight}</p>
                    <p>Daily Calories: {dailyCalories}</p>
                    <p>Daily Proteins: {user.dailyProtein}</p>
                    <p>Daily Fat: {user.dailyFat}</p>
                    <p>Daily Carbohydrate: {user.dailyCarbohydrate}</p>
                    <button type="button" className="btn-outline-success" onClick={handleUpdate}>Update</button>
                <p>Weekly Calories: {weekData.currentCalories}/{weekData.weeklyCaloriesIntake}</p>
                    {message}
                </Card>)
        } else
            return (<Card className="userUpdate">
                <form autoComplete="off" onSubmit={handleSubmit}>

                    <p>Goal Weight: {user.goalWeight}</p>
                    <p>Starting Weight: {user.startingWeight}  </p>
                    <label>Current Weight:</label>
                    <input className="input-group" type="number" value={currentWeight}
                           onChange={currentWeightChangeHandler} step=".1"
                           name="Current Weight"/>
                    <label>Weekly Calories:</label>
                    <input className="input-group" type="number" value={weeklyCalories}
                           onChange={weeklyCaloriesChangeHandler} step="50"
                           name="Weekly Calories"/>

                    <label>Daily Calories:</label>
                    <input className="input-group" type="number" value={dailyCalories}
                           onChange={dailyCaloriesChangeHandler} step="50"
                           name="Daily Calories"/>

                    <label>Daily Protein:</label>
                    <input className="input-group" type="number" value={protein}
                           onChange={proteinChangeHandler} step="1"
                           name="Daily Protein"/>

                    <label>Daily Fat:</label>
                    <input className="input-group" type="number" value={fat} onChange={fatChangeHandler}
                           step="1" name="Daily Fat"/>

                    <label>Daily Carbohydrate:</label>
                    <input className="input-group" type="number" value={carbohydrate}
                           onChange={carbohydrateChangeHandler} step="1"
                           name="Daily Carbohydrate"/>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn-secondary" onClick={handleBack}>Back</button>
                        <button type="submit" className="btn-primary">Save</button>
                    </div>
                </form>
            </Card>)
    }


    return (display())
}

export default UserData;