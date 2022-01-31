import React, {useState} from "react";
import Card from "../UI/Card";
import "./Ingredient.css"

const Ingredient = () => {

    let url = "http://localhost:8080/addIngredient";
    const [enteredName, setEnteredName] = useState<any>();
    const [enteredProtein, setEnteredProtein] = useState<any>();
    const [enteredFat, setEnteredFat] = useState<any>();
    const [enteredCarbohydrate, setEnteredCarbohydrate] = useState<any>();
    const [enteredGrams, setEnteredGrams] = useState<any>();
    const [statusMessage, setStatusMessage] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(JSON.stringify(data.protein))
        await fetch(url, options)
            .then(res => {
                if (res.ok) {
                    setStatusMessage("'" + enteredName + "' Saved!")
                    event.target.reset();
                    newIngredient();
                } else if (res.status === 400) {
                    setStatusMessage("Ingredient '" + enteredName + "' all ready exist in DB.")
                } else if (res.status === 403) {
                    setStatusMessage("Cannot save ingredient without all data")
                } else
                    setStatusMessage("some error")
            })
    }

    const sumOfCalories = () => {
        return (enteredProtein * 4 * enteredGrams) + (enteredCarbohydrate * 4 * enteredGrams) + (enteredFat * 8 * enteredGrams)
    }

    const newIngredient = () => {
        setEnteredName(null);
        setEnteredGrams(null);
        setEnteredFat(null);
        setEnteredCarbohydrate(null);
        setEnteredProtein(null);

    }
    let data = {
        name: enteredName,
        calories: sumOfCalories(),
        protein: enteredProtein,
        fat: enteredFat,
        carbohydrate: enteredCarbohydrate,
        grams: enteredGrams
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const nameChangeHandler = (event: any) => {
        setEnteredName(event.target.value)
        setStatusMessage("")
    }
    const proteinChangeHandler = (event: any) => {
        setEnteredProtein(event.target.value)
        console.log(enteredProtein)
    }
    const fatChangeHandler = (event: any) => {
        setEnteredFat(event.target.value)
    }
    const carbohydrateChangeHandler = (event: any) => {
        setEnteredCarbohydrate(event.target.value)
    }
    const gramsChangeHandler = (event: any) => {
        setEnteredGrams(event.target.value)
    }
    return (<Card className="ingredientForm">
        <button className="ingredientButton">Add Ingredient</button>
        <form  autoComplete="off" id="ingredient" onSubmit={handleSubmit}>
            <ul className="drop-down">
                <li><label>Name:</label></li>
                <li><input className="inputLine" id="1" onChange={nameChangeHandler} type="text"/></li>

                <li><label>grams:</label></li>
                <li><input className="inputLine" id="6" onChange={gramsChangeHandler} type="number" step=".01"/></li>

                <li><label>Protein:</label></li>
                <li><input className="inputLine" id="3" onChange={proteinChangeHandler} type="number" step=".01"/></li>

                <li><label>Fat:</label></li>
                <li><input className="inputLine" id="4" onChange={fatChangeHandler} type="number" step=".01"/></li>

                <li><label>Carbohydrate:</label></li>
                <li><input className="inputLine" id="5" onChange={carbohydrateChangeHandler} type="number" step=".01"/></li>

                    <button type="submit">Save</button>
                <p>{statusMessage}</p>
                </ul>
        </form>

    </Card>)
}

export default Ingredient;