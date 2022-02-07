import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./IngredientSimpleComponent.css";
import {Ingredient} from "../fetches/interfaces";

const IngredientSimpleComponent = (props: any) => {

    const [grams, setGrams] = useState<number>(props.grams);
    const [name, setName] = useState<string>(props.name);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([{
        id: 0,
        name: "",
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        grams: 0
    }])
    const [searchIngredients, setSearchIngredients] = useState<Ingredient[]>([])
    const inputRef = useRef()as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        fetchIngredientsList();
    }, [])

    const fetchIngredientsList = async () => {
        let url = "http://localhost:8080/getIngredients"
        const response = await fetch(url);
        const data = await response.json();
        setIngredientList(data);
    }

    const gramsChangeHandler = (event: any) => {
        setGrams(event.target.value);
        props.onIngredientChange({
            name: name,
            grams: event.target.value,
            number: props.number
        })
    }
    const nameChangeHandler = (event: any) => {
        console.log(event.target.value)
        setName(event.target.value);
        props.onIngredientChange({
            name: event.target.value,
            grams: grams,
            number: props.number
        })
        const newIngredientList = ingredientList.filter(ingredient => ingredient.name.toLowerCase().includes(event.target.value))
        if (event.target.value === "") {
            setSearchIngredients([])
        }
        else if(ingredientList.filter(ingredient => ingredient === event.target.value).length === 1){
            setSearchIngredients([])
        }
        else {
            setSearchIngredients(newIngredientList)
        }
    }

    const nameAfterClickHandler = (name:any) => {
        console.log(name)
        setName(name)
        props.onIngredientChange({
            name: name,
            grams: grams,
            number: props.number
        })
    }

    const ingredientInfo = (ingredient:Ingredient) => {
        return (
            <span>
               <span className="ingredient-info"> (100g - Cal: {Math.round(ingredient.calories as number * 100)}</span>
               <span className="ingredient-info"> P: {Math.round(ingredient.protein as number * 10000)/100}</span>
               <span className="ingredient-info"> F: {Math.round(ingredient.fat as number * 10000)/100}</span>
              <span className="ingredient-info">  C:{Math.round(ingredient.carbohydrate * 100)/100})</span>
            </span>
        )
    }

    const display = (name: string) => {
            return <div className="search-bar-dropdown">
                <div>
                <input
                    ref={inputRef}
                    autoComplete="off" id="search-bar" type="text" className="form-control dupa" placeholder={name} onChange={nameChangeHandler}/>
                <ul id='results' className="list-group siamp">
                    {searchIngredients.map((ingredient, index) => {
                        if(index<5) {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        inputRef.current.value = ingredient.name;
                                        nameAfterClickHandler(ingredient.name);
                                        setSearchIngredients([])
                                    }}
                                    className="list-group-item btn-outline-success search-ingredient">
                                    <b>{ingredient.name}</b> {ingredientInfo(ingredient)}
                                </button>)
                        }})}
                </ul>
                </div>
                <input id="grams" type="number"  autoComplete="off" className="form-control dupa" placeholder={props.grams.toString() + "g"}
                              onChange={gramsChangeHandler} step="1"/>
            </div>
        }

    return display(props.name)
}

export default IngredientSimpleComponent;