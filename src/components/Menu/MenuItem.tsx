import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./MenuItem.css"
import NewIngredient from "../NewIngredient";
import {useIngredientsFetch} from "../../util/useIngredientsFetch";
import {Ingredient} from "../../fetches/interfaces";

const MenuItem = (props:any) => {
    const[openAddIngredient, setOpenAddIngredient] = useState<boolean>(false)
    const[openIngredientSearch, setOpenIngredientSearch] = useState<boolean>(false)
    const buttonText = props.text
    const[selectedIngredient, setSelectedIngredient] = useState<Ingredient>({
        id: 0,
        name: "ingredient",
        protein: 0,
        fat: 0,
        carbohydrate:0,
        grams : 0,
        calories : 0
    })

    const ingredientList = useIngredientsFetch();
    const [searchIngredients, setSearchIngredients] = useState<Ingredient[]>([])
    const inputRef = useRef()as MutableRefObject<HTMLInputElement>;
    const nameChangeHandler = (event: any) => {
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

    const showCardForAdding = () => {
        if(openAddIngredient){return<NewIngredient id={0} name={"new ingredient"} protein={0} fat={0} carbohydrate={0} grams={100}/>
        }
    }

    const showCardForUpdate = () => {
            return<NewIngredient
                id={selectedIngredient.id}
                name={selectedIngredient.name}
                protein={Math.round(selectedIngredient.protein * 10000)/100}
                fat={Math.round(selectedIngredient.fat * 10000)/100}
                carbohydrate={Math.round(selectedIngredient.carbohydrate * 10000)/100}
                grams={100}
                calories={Math.round(Number(selectedIngredient.calories) *100)}/>
    }

    const showInputForUpdate = () => {
      if(openIngredientSearch){
          return(
              <div className="search-bar-dropdown ingredientList">
                  <div>
                      <input
                          autoComplete="off" ref={inputRef} id="search-bar" type="text" className="form-control dupa" placeholder="ingredient name" onChange={nameChangeHandler}/>
                      <ul id='results' className="list-group siamp">
                          {searchIngredients.map((ingredient, index) => {
                              if(index<5) {
                                  return (
                                      <button
                                          key={ingredient.id}
                                          type="button"
                                          onClick={() => {
                                              inputRef.current.value="";
                                              setSelectedIngredient(ingredient);
                                              setSearchIngredients([])
                                          }}
                                          className="list-group-item btn-outline-success search-ingredient">
                                          <b>{ingredient.name}</b>
                                      </button>)
                              }})}
                      </ul>
                  </div>
              </div>
          )
      }
    }

    if(buttonText === "Add Ingredient"){
        return (<div>
            <button onClick={()=>{
                setOpenAddIngredient(!openAddIngredient)
            }}>
                {buttonText}
            </button>
            {showCardForAdding()}
        </div>)
    }
    else{
        return (<div>
            <button onClick={()=>{
                setOpenIngredientSearch(!openIngredientSearch)
                if(inputRef.current){
                    setSearchIngredients([])
                }
                if(selectedIngredient.id !==0) {
                    setSelectedIngredient({
                        id: 0,
                        name: "ingredient",
                        protein: 0,
                        fat: 0,
                        carbohydrate:0,
                        grams : 0,
                        calories : 0
                    })
                }
            }}>
                {buttonText}
            </button>
            {showInputForUpdate()}
            {selectedIngredient.id !== 0 && showCardForUpdate()}
        </div>)
    }
}

export default MenuItem;