import React, {useEffect, useState} from "react";
import {ProgressBar} from "react-bootstrap"
import {DayOfEating, DayStats, DayTag} from "../fetches/interfaces";
import Meal from "./Meal";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./DayOfEatingComponent.css";
import Navigation from "./Navigation";

const DayOfEatingComponent = (props: any) => {
    const [dayOfEating, setDayOfEating] = useState<DayOfEating>({
        id: 0,
        date: "2010-04-10",
        meals: [],
        calories: 0,
        dayTag: DayTag.MONDAY
    });
    const [message, setMessage] = useState<string>("");
    const [dayStats, setDayStats] = useState<DayStats>({
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0
    })
    useEffect(() => {
        fetchIfDayExist(props.dayId);
    }, [])

    const fetchDayOfEatingHandler = async (dayId: number) => {
        let url = `http://localhost:8080/getDay/${dayId}`;
        const response = await fetch(url);
        const data = await response.json();
        setDayOfEating(data);
        let calories = 0;
        let protein = 0;
        let fat = 0;
        let carbohydrate = 0;
        for (let i = 0; i < data.meals.length; i++) {
            calories = calories + data.meals[i].calories
            protein = protein + data.meals[i].protein
            fat = fat + data.meals[i].fat
            carbohydrate = carbohydrate + data.meals[i].carbohydrate
        }
        setDayStats({
            calories: calories,
            protein: protein,
            fat: fat,
            carbohydrate: carbohydrate
        })
    }

    const fetchIfDayExist = async (dayId: number) => {
        let url = `http://localhost:8080/isDayExist/${dayId}`
        const response = await fetch(url);
        const data = await response.json();
        if (data === true) {
            fetchDayOfEatingHandler(dayId)
            setMessage("")
        } else setMessage("Upsii ")
    }

    const fetchCreateNewWeek = async () => {
        let url = "http://localhost:8080/createNewWeek/" + props.userId;
        const options = {
            method: 'POST'
        }

        const response = await fetch(url, options);
        const data = await response.json();
        if (data === true) {
            fetchDayOfEatingHandler(props.dayId)
            setMessage("")
        }
    }

    const changeDayOnTomorrow = () => {
        let tomorrow = new Date(dayOfEating.date)
        tomorrow.setDate(tomorrow.getDate() + 1)
        let nextDayId = props.userId.toString().concat(tomorrow.toJSON().slice(0, 10).replace(/-/g, ''))
        fetchIfDayExist(nextDayId);

    }
    const changeDayOnYesterday = async () => {
        let yesterday = new Date(dayOfEating.date)
        yesterday.setDate(yesterday.getDate() - 1)
        let beforeDayId = props.userId.toString().concat(yesterday.toJSON().slice(0, 10).replace(/-/g, ''))

        await fetchIfDayExist(beforeDayId)
    }


    const goBackToCurrent = () => {
        let toDay = new Date(Date.now());
        let toDayId = props.userId.toString().concat(toDay.toJSON().slice(0, 10).replace(/-/g, ''))
        fetchDayOfEatingHandler(toDayId)
        setMessage("");
    }


    const createNewWeek = () => {
        if (dayOfEating.id === 0) {
            return (<div>
                <button onClick={fetchCreateNewWeek}>Create new week</button>
                <span>Pleas note, that your current 'weekly calories' will be save as calorie goal for this week</span>
            </div>)
        }
    }

    const updateStats = () => {
        fetchIfDayExist(dayOfEating.id)
    }

    const getProgressBarVariant = (currentCalories: number, maxCalories: number) => {
        const ratio = currentCalories / maxCalories;
        if (ratio < 0.5) return "success"
        if (ratio < 0.75) return "info"
        if (ratio < 1) return "warning"
        if (ratio >= 1) return "danger"
    }

    const percentage = () => {
        return Math.round(dayStats.calories / props.dailyCalories * 100)
    }

    return (<div className="allMeals">
            {createNewWeek()}
            <Navigation
                onRightClick={changeDayOnTomorrow}
                onLeftClick={changeDayOnYesterday}
                onCurrentClick={goBackToCurrent} date={dayOfEating.date}/>
            <p>{message}</p>
            <h3>{dayOfEating.dayTag}</h3>
            <div className="container">
                {dayOfEating.meals.map((mealFromBE, index) =>
                    <div className="col">
                        <Meal
                            key={mealFromBE.id}
                            onMealSave={updateStats}
                            userName={props.userName}
                            id={mealFromBE.id}
                            date={dayOfEating.date}
                            userId={props.userId}
                            calories={mealFromBE.calories}
                            ingredients={mealFromBE.ingredients}
                            protein={mealFromBE.protein}
                            fat={mealFromBE.fat}
                            carbohydrate={mealFromBE.carbohydrate}
                            mealTag={mealFromBE.mealTag}/>
                    </div>
                )}
            </div>
            <span
                className="info">Calories: {dayStats.calories} / {props.dailyCalories} Proteins: {dayStats.protein} Fat: {dayStats.fat} Carbohydrate: {dayStats.carbohydrate}  </span>
            <ProgressBar
                className="rounded-pill"
                variant={getProgressBarVariant(dayStats.calories, props.dailyCalories)}
                min={0}
                max={props.dailyCalories}
                now={dayStats.calories}
                label={percentage() + "%"}
            />
        </div>
    )
}

export default DayOfEatingComponent;
