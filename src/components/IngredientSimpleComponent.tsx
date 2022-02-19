import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./IngredientSimpleComponent.css";
import {Ingredient} from "../fetches/interfaces";
import {useIngredientsFetch} from "../util/useIngredientsFetch";

const IngredientSimpleComponent = (props: any) => {

    const [grams, setGrams] = useState<number>(props.grams);
    const [name, setName] = useState<string>(props.name);
    const [searchIngredients, setSearchIngredients] = useState<Ingredient[]>([])
    const inputIngredientNameRef = useRef()as MutableRefObject<HTMLInputElement>;
    const inputIngredientGramsRef = useRef()as MutableRefObject<HTMLInputElement>;
    const ingredientList = useIngredientsFetch();

    const gramsChangeHandler = (event: any) => {
        setGrams(event.target.value);
        props.onIngredientChange({
            name: name,
            grams: event.target.value,
            number: props.number
        })
    }

    useEffect(() => {
        inputIngredientNameRef.current.focus();
    },[props.onIngreddientAdd])

    const focusOnGrams = () => {
        inputIngredientGramsRef.current.focus();
    }

    const nameChangeHandler = (event: any) => {
        setName(event.target.value);
        props.onIngredientChange({
            name: event.target.value,
            grams: grams,
            number: props.number
        })
        const newIngredientList = ingredientList.filter(ingredient => ingredient.name.toLowerCase().includes(event.target.value.toLowerCase()))
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
                    ref={inputIngredientNameRef}
                    autoComplete="off" id="search-bar" type="text" className="form-control dupa" placeholder={name} onChange={nameChangeHandler}/>
                <ul id='results' className="list-group siamp">
                    {searchIngredients.map((ingredient, index) => {
                        if(index<5) {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        inputIngredientNameRef.current.value = ingredient.name;
                                        nameAfterClickHandler(ingredient.name);
                                        setSearchIngredients([]);
                                        focusOnGrams();
                                    }}
                                    className="list-group-item btn-outline-success search-ingredient">
                                    <b>{ingredient.name}</b> {ingredientInfo(ingredient)}
                                </button>)
                        }})}
                </ul>
                </div>
                <input id="grams" ref={inputIngredientGramsRef} type="number"  autoComplete="off" className="form-control dupa" placeholder={props.grams.toString() + "g"}
                              onChange={gramsChangeHandler} step="1"/>
            </div>
        }

    return display(props.name)
}

export default IngredientSimpleComponent;