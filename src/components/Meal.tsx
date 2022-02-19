import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import Card from "../UI/Card";
import {IngredientSimple, Recipe} from "../fetches/interfaces";
import "./Meal.css";
import IngredientSimpleComponent from "./IngredientSimpleComponent";
import {useUrl} from "../general/general";
import {useRecipeFetch} from "../util/useRecipeFetch";

const Meal = (mealFromBE: any) => {
    const [message, setMessage] = useState<string>("")
    const inputRecipeSearchRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputRecipeSaveRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [ingredients, setIngredients] = useState<IngredientSimple[]>(mealFromBE.ingredients)
    const [name, setName] = useState<string>("");
    const [searchRecipe, setSearchRecipe] = useState<Recipe[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const recipes = useRecipeFetch();

    const handleAddingIngredient = () => {
        const size = ingredients.length;
        setIngredients([...ingredients, {
            name: "new ingredient",
            grams: 0,
            number: size + 1,
        }])
        setMessage("")
        focusOnAddedIngredient(size +1)
    }

    const focusOnAddedIngredient = (id: number) =>{
        return id;
    }



    const handleRemoveIngredient = (ingredientA: IngredientSimple) => {
        const newIngredients = ingredients.filter(ingredient => ingredient.number !== ingredientA.number);
        newIngredients.forEach(ingredient => {
            if (ingredient.number > ingredientA.number) {
                ingredient.number = ingredient.number - 1;
            }
        })
        setIngredients(newIngredients)
        setMessage("")
    }

    const fetchSaveMeal = async () => {
        let url = `${useUrl}/meal/update`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mealId: mealFromBE.id,
                ingredients: ingredients,
                mealTag: mealFromBE.mealTag
            })
        }
        await fetch(url, options).then(res => {
            if (res.ok) {
                mealFromBE.onMealSave();
                setMessage("Meal saved!")
            } else setMessage("some error")
        })
    }

    const handleSave = () => {
        let isIngredientsCorrect = true;
        if (ingredients.length === 0) {
            setMessage("Empty Meal Saved!")
            isIngredientsCorrect = true
        }
        ingredients.forEach(ingredient => {
            if (ingredient.name === undefined) {
                setMessage("You cannot have ingredient with name 'new ingredient'")
                isIngredientsCorrect = false
            // } else if (ingredient.name.toLowerCase().includes("ingredient")) {
            //     setMessage("You cannot have ingredient with name 'ingredient'")
            //     isIngredientsCorrect = false
            } else if (ingredient.name.length <= 2) {
                setMessage("this ingredient has to short name: " + ingredient.number)
                isIngredientsCorrect = false
            }
            if (ingredient.grams === 0 || ingredient.grams === undefined) {
                setMessage(ingredient.name + " has 0 grams")
                isIngredientsCorrect = false
            }
        })
        if (isIngredientsCorrect) {
            fetchSaveMeal()
        }
    }

    const updateIngredient = (data: IngredientSimple) => {
        let ingredient = ingredients.find((ingredient => ingredient.number === data.number));
        if (ingredient !== undefined) {
            ingredient.name = data.name;
            ingredient.grams = data.grams;
        }
        setMessage("")
    }

    const removeIngredient = (data: number) => {
        const newIngredients = ingredients.filter(ingredient => ingredient.number !== data);
        newIngredients.forEach(ingredient => {
            if (ingredient.number > data) {
                ingredient.number = ingredient.number - 1;
            }
        })
        setIngredients(newIngredients)
        setMessage("")
    }

    const handleShearingMeal = async () => {
        let url = `${useUrl}/user/copyMeal`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: mealFromBE.date,
                userId: mealFromBE.userId,
                mealTag: mealFromBE.mealTag
            })
        }
        const response = await fetch(url, options);
        const data = await response.json();
        setIngredients(data.ingredients);
        setMessage("Copied!")
    }

    const nameChangeHandler = (event: any) => {
        setMessage("")
        setName(event.target.value);
    }

    const saveAsRecipeHandler = async () => {
        let url = `${useUrl}/recipe/add`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                ingredients: ingredients
            })
        }
        await fetch(url, options).then(res => {
            if (res.ok) {
                setMessage("Recipe '" + name + "' saved!")
                setIsOpen(false)
                inputRecipeSaveRef.current.value="";
            } else setMessage("some error")
        })
    }

    const onCloseWindow = () => {
        setIsOpen(false)
    }

    const onOpenWindow = () => {
        if (name.length === 0) {
            setMessage("Cannot have nameless recipe")
        } else if (name.length <= 2) {
            setMessage("to short name")
        } else {
            setMessage("")
            setIsOpen(!isOpen)
        }
    }

    const savingRecipeWindow = () => {
        if (isOpen)
            return (<div className="savingWindow">
                <span>Are you sure?</span>
                <br/>
                <span>This recipe name will be: "{name}"</span>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn-danger" onClick={onCloseWindow}>Close</button>
                    <button type="button" className="btn-primary" onClick={saveAsRecipeHandler}>Save</button>
                </div>
            </div>)
    }

    const searchRecipeNameChangeHandler = (event: any) => {
        setMessage("")
        const newRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(event.target.value))
        if (event.target.value === "") {
            setSearchRecipe([])
        } else if (searchRecipe.filter(recipe => recipe.name === event.target.value).length === 1) {
            setSearchRecipe([])
        } else
            setSearchRecipe(newRecipes);
    }
    const buttons = () => {
        if (mealFromBE.userName === "Bartek") {
            return (<div className="d-flex justify-content-between mealButtons">
                <button className="btn-outline-success" type="button" onClick={handleShearingMeal}>Copy
                    Gosia's {mealFromBE.mealTag}</button>
                <button className="btn-primary saveButton" type="button" onClick={handleSave}> Save</button>
            </div>)
        } else {
            return (<div className="d-flex justify-content-between">
                <button className="btn-outline-success" type="button" onClick={handleShearingMeal}>Copy
                    Bartek's {mealFromBE.mealTag}</button>
                <button className="btn-primary" type="button" onClick={handleSave}> Save</button>
            </div>)
        }
    }

    const displayMessage = () => {
        if (message.toLowerCase().includes("save") || message.toLowerCase().includes("copied")) {
            return <Card className="saveMessage">
                <span>{message}</span>
            </Card>
        } else if (message === "") {

        } else {
            return <Card className="wrongMessage">
                <span>{message}</span>
            </Card>
        }
    }

    const displayIngredients = () => {
        return(
            ingredients.map((ingredient) =>
                    <div className="d-flex" key={ingredient.number}>
                        <IngredientSimpleComponent onIngredientRemove={removeIngredient} onIngredientChange={updateIngredient}
                                                   key={ingredient.number} name={ingredient.name} grams={ingredient.grams}
                                                   number={ingredient.number} onIngreddientAdd={focusOnAddedIngredient}/>
                        <button className="btn-danger" onClick={() =>handleRemoveIngredient(ingredient)}>X</button>
                    </div>
                )
        )
    }

    const displayMealInfo = () => {
        if(ingredients.length > 0){
            return (
    <p className="calories">Cal: {Math.round(mealFromBE.calories)} P:{Math.round(mealFromBE.protein)} F:{Math.round(mealFromBE.fat)} C:{Math.round(mealFromBE.carbohydrate)}</p>
            )
        }

    }

    return (<div><Card className="wholeMeal">
        <h2>{mealFromBE.mealTag}</h2>
        <div>
            <input ref={inputRecipeSearchRef} className="recipeSearch" autoComplete="off" id="search-bar" type="text" placeholder={"Recipe Search"}
                   onChange={searchRecipeNameChangeHandler}/>
            <ul id='results' className="list-group">
                {searchRecipe.map((recipe, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                inputRecipeSearchRef.current.value = recipe.name
                                setIngredients(recipe.ingredients)
                                setSearchRecipe([])
                            }}
                            className="list-group-item btn-outline-success">
                            {recipe.name + " Cal:" + recipe.calories + " P:" + recipe.protein + " F:" + recipe.fat + " C:" + recipe.carbohydrate}
                        </button>)
                })}
            </ul>
        </div>
        {displayIngredients()}
        <div>
            {ingredients.length===0 && <button className="btn-outline-success addFirstIngredient" type="button" onClick={handleAddingIngredient}>
                Start the meal!
            </button>}
            {ingredients.length !==0 &&  <button className="btn-outline-success addNewIngredientButton" type="button" onClick={handleAddingIngredient}>Add new ingredient</button>}

        </div>
        {buttons()}
        {displayMealInfo()}
        {displayMessage()}
    </Card>
        <div className="recipeAdd">
            <button className="btn-primary" onClick={onOpenWindow}>Add as a new Recipe</button>
            <input ref={inputRecipeSaveRef} placeholder="recipe name" autoComplete="off" onChange={nameChangeHandler}/>
            {savingRecipeWindow()}
        </div>

    </div>)
}

export default Meal;