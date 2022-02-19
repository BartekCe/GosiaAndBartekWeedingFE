import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import Card from "../UI/Card";
import "./NewIngredient.css"
import {Ingredient} from "../fetches/interfaces";
import {useUrl} from "../general/general";

const NewIngredient = (props: Ingredient) => {
    const [id, setId] = useState<number>(props.id)
    const [enteredName, setEnteredName] = useState<string>(props.name);
    const [enteredProtein, setEnteredProtein] = useState<number>(props.protein);
    const [enteredFat, setEnteredFat] = useState<number>(props.fat);
    const [enteredCarbohydrate, setEnteredCarbohydrate] = useState<number>(props.carbohydrate);
    const [enteredGrams, setEnteredGrams] = useState<number>(props.grams);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const calories = props.calories;
    const inputIngredientNameRef = useRef()as MutableRefObject<HTMLInputElement>;

    useEffect(()=>{
        inputIngredientNameRef.current.focus()
    },[id])

    const handleSave = async (event: any) => {
        let url = `${useUrl}/ingredient/add`;
        event.preventDefault();
        await fetch(url, optionsPOST)
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

    const handleUpdate = async (event: any) => {
        let url = `${useUrl}/ingredient/update`;
        event.preventDefault();
        await fetch(url, optionsPUT)
            .then(res => {
                if(!res.ok){
                    setStatusMessage("some error :(")
                    throw Error(`could not update the data from that resource -> "${url}" `)
                } else {
                    setStatusMessage(`"${enteredName}" updated!`)
                }
            })
    }

    const handleDelete = async (event:any) => {
        event.preventDefault();
        let url = `${useUrl}/ingredient/delete/${props.id}`;
        await fetch(url, {
            method: 'DELETE',
        })
            .then(res => {
                if(!res.ok){
                    setStatusMessage("some error :(")
                    throw Error(`could not delete the data from that resource -> "${url}" `)
                } else {
                    setStatusMessage(`"${enteredName}" deleted!`)
                }
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
        id: id,
        name: enteredName,
        protein: enteredProtein,
        fat: enteredFat,
        carbohydrate: enteredCarbohydrate,
        grams: enteredGrams
    }

    const optionsPOST = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const optionsPUT = {
        method: 'PUT',
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

    if(id===0)
    return (<Card className="ingredientForm">
        <form autoComplete="off" id="ingredient">
            <ul className="col">
                <li className="d-flex justify-content-between">
                    <label>Name:</label>
                    <input ref={inputIngredientNameRef} className="form-control myInput" id="1" placeholder={enteredName} onChange={nameChangeHandler} type="text"/>
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
                <button onClick={handleSave} className="btn-primary">Save</button>
                <p>{statusMessage}</p>
            </ul>
        </form>

    </Card>)
    else return (
        <Card className="ingredientForm">
            <form autoComplete="off" id="ingredient">
                <ul className="col">
                    <li className="d-flex justify-content-between">
                        <label>Name:</label>
                        <input ref={inputIngredientNameRef} className="form-control myInput" id="1" defaultValue={enteredName} onChange={nameChangeHandler} type="text"/>
                    </li>
                    <li className="d-flex justify-content-between">
                        <label>grams:</label>
                        <input className="form-control myInput" id="6" onChange={gramsChangeHandler} value={enteredGrams} type="number"
                               step="1"/>
                    </li>
                    <li className="d-flex justify-content-between">
                        <label>Protein:</label>
                        <input className="form-control myInput" id="3" defaultValue={enteredProtein.toString()} onChange={proteinChangeHandler} type="number" step=".01"/>
                    </li>
                    <li className="d-flex justify-content-between">
                        <label>Fat:</label>
                        <input className="form-control myInput" id="4" defaultValue={enteredFat.toString()} onChange={fatChangeHandler} type="number" step=".01"/>
                    </li>
                    <li className="d-flex justify-content-between">
                        <label>Carbohydrate:</label>
                        <input className="form-control myInput" id="5" defaultValue={enteredCarbohydrate.toString()} onChange={carbohydrateChangeHandler} type="number" step=".01"/>
                    </li>
                    <li className="d-flex justify-content-between">
                        <label>Calories:</label>
                        <input  disabled={true} className="form-control myInput" id="5" value={Number(calories).toString()} type="number"/>
                    </li>
                    <div className="d-flex justify-content-between">
                        <button onClick={handleDelete} className="btn-danger">Delete</button>
                    <button onClick={handleUpdate} className="btn-primary">Update</button>
                    </div>
                    <p>{statusMessage}</p>
                </ul>
            </form>
        </Card>)
}

export default NewIngredient;