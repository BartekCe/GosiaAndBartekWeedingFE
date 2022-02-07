import React, {useState} from "react";
import Card from "../UI/Card";
import "./NewIngredient.css"
import {Ingredient} from "../fetches/interfaces";

const NewIngredient = (props: Ingredient) => {

    let url = "http://localhost:8080/addIngredient";
    const [id, setId] = useState<number>(props.id)
    const [enteredName, setEnteredName] = useState<string>(props.name);
    const [enteredProtein, setEnteredProtein] = useState<number>(props.protein);
    const [enteredFat, setEnteredFat] = useState<number>(props.fat);
    const [enteredCarbohydrate, setEnteredCarbohydrate] = useState<number>(props.carbohydrate);
    const [enteredGrams, setEnteredGrams] = useState<number>(props.grams);
    const [statusMessage, setStatusMessage] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await fetch(url, options)
            .then(res => {
                if (res.ok) {
                    setStatusMessage("'" + enteredName + "' Saved!")
                    event.target.reset();
                    newIngredient();
                } else if (res.status === 400) {
                    setStatusMessage("NewIngredient '" + enteredName + "' all ready exist in DB.")
                } else if (res.status === 403) {
                    setStatusMessage("Cannot save ingredient without all data")
                } else
                    setStatusMessage("some error")
            })
    }

    const newIngredient = () => {
        setId(0)
        setEnteredName("new ingredient");
        setEnteredGrams(100);
        setEnteredFat(0);
        setEnteredCarbohydrate(0);
        setEnteredProtein(0);

    }
    let data = {
        name: enteredName,
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
        <form autoComplete="off" id="ingredient" onSubmit={handleSubmit}>
            <ul className="col">
                <li className="d-flex justify-content-between">
                    <label>Name:</label>
                    <input className="form-control myInput" id="1" placeholder={enteredName} onChange={nameChangeHandler} type="text"/>
                </li>
                <li className="d-flex justify-content-between">
                    <label>grams:</label>
                    <input className="form-control myInput" id="6" onChange={gramsChangeHandler} value={enteredGrams} type="number"
                           step="1"/>
                </li>
                <li className="d-flex justify-content-between">
                    <label>Protein:</label>
                    <input className="form-control myInput" id="3" placeholder={enteredProtein.toString()} onChange={proteinChangeHandler} type="number" step=".01"/>
                </li>
                <li className="d-flex justify-content-between">
                    <label>Fat:</label>
                    <input className="form-control myInput" id="4" placeholder={enteredFat.toString()} onChange={fatChangeHandler} type="number" step=".01"/>
                </li>
                <li className="d-flex justify-content-between">
                    <label>Carbohydrate:</label>
                    <input className="form-control myInput" id="5" placeholder={enteredCarbohydrate.toString()} onChange={carbohydrateChangeHandler} type="number" step=".01"/>
                </li>

            </ul>
            <button type="submit" className="btn-primary">Save</button>
            <p>{statusMessage}</p>
        </form>

    </Card>)
}

export default NewIngredient;