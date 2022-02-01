import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import Card from "../UI/Card";
import {IngredientSimple, Recipe} from "../fetches/interfaces";
import "./Meal.css";
import IngredientSimpleComponent from "./IngredientSimpleComponent";

const Meal = (mealFromBE: any) => {
    const [message, setMessage] = useState<string>("")
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [ingredients, setIngredients] = useState<IngredientSimple[]>(mealFromBE.ingredients)
    const [name, setName] = useState<string>("");
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [searchRecipeName, setSearchRecipeName] = useState<string>("")
    const [searchRecipe, setSearchRecipe] = useState<Recipe[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        fetchRecipes();
    }, [])

    const fetchRecipes = async () => {
        let url = "http://localhost:8080/getRecipes"
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data);
    }

    const handleAddingIngredient = () => {
        const size = ingredients.length;
        setIngredients([...ingredients, {
            name: "new ingredient",
            grams: 0,
            number: size + 1,
        }])
    }

    const fetchSaveMeal = async () => {
        let url = "http://localhost:8080/updateMeal";
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
            setMessage("Cannot save empty meal")
            isIngredientsCorrect = false
        }
        ingredients.forEach(ingredient => {
            if (ingredient.name === undefined) {
                setMessage("You cannot have ingredient with name 'new ingredient'")
                isIngredientsCorrect = false
            } else if (ingredient.name.toLowerCase().includes("ingredient")) {
                setMessage("You cannot have ingredient with name 'ingredient'")
                isIngredientsCorrect = false
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
            console.log("tutaj?")
            fetchSaveMeal()
        }
    }

    const updateIngredient = (data: IngredientSimple) => {
        let ingredient = ingredients.find((obj => obj.number === data.number));
        if (ingredient !== undefined) {
            ingredient.name = data.name;
            ingredient.grams = data.grams;
        }
        setMessage("")
    }

    const removeIngredient = (data: number) => {
        const newIngredients = ingredients.filter(ingredient => ingredient.number !== data);
        setIngredients(newIngredients)
        setMessage("")
    }

    const handleShearingMeal = async () => {
        let url = "http://localhost:8080/copyMeal";
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
        setName(event.target.value);
        console.log((event.target.value))
    }

    const saveAsRecipeHandler = async () => {
        let url = "http://localhost:8080/addRecipe"
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
                setMessage(`Recipe $name saved!`)
                setIsOpen(false)
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
        setSearchRecipeName(event.target.value);
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
            return (<div className="d-flex justify-content-between">
                <button className="btn-outline-success" type="button" onClick={handleShearingMeal}>Copy
                    Gosia's {mealFromBE.mealTag}</button>
                <button  className="btn-primary" type="button" onClick={handleSave}> Save</button>
            </div>)
        } else {
            return (<div className="d-flex justify-content-between">
                <button className="btn-outline-success" type="button" onClick={handleShearingMeal}>Copy
                    Bartek's {mealFromBE.mealTag}</button>
                <button  className="btn-primary" type="button" onClick={handleSave}> Save</button>
            </div>)
        }
    }

    const displayMessage = () => {
      if(message.toLowerCase().includes("save")){
          return <Card className="saveMessage">
              <span>{message}</span>
          </Card>
      } else {
          return <Card className="wrongMessage">
              <span>{message}</span>
          </Card>
      }
    }

    return <Card className="wholeMeal">
        <h2>{mealFromBE.mealTag}</h2>
        <div>
            <input ref={inputRef} autoComplete="off" id="search-bar" type="text" placeholder={"Recipe Search"}
                   onChange={searchRecipeNameChangeHandler}/>
            <ul id='results' className="list-group">
                {searchRecipe.map((recipe, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                inputRef.current.value = recipe.name
                                setIngredients(recipe.ingredients)
                                setSearchRecipe([])
                            }}
                            className="list-group-item btn-outline-success">
                            {recipe.name + " Cal:" + recipe.calories + " P:" + recipe.protein + " F:" + recipe.fat + " C:" + recipe.carbohydrate}
                        </button>)
                })}
            </ul>
        </div>
        {ingredients.map((ingredient, index) =>
            <div>
                <IngredientSimpleComponent onIngredientRemove={removeIngredient} onIngredientChange={updateIngredient}
                                           key={index} name={ingredient.name} grams={ingredient.grams}
                                           number={ingredient.number}/>
            </div>
        )}
        <div>
            <button className="btn-outline-success" type="button" onClick={handleAddingIngredient}>Add</button>
        </div>
        {buttons()}
        <div className="recipeAdd">
            <button className="btn-primary" onClick={onOpenWindow}>Add as a new Recipe</button>
            <input placeholder="recipe name" autoComplete="off" onChange={nameChangeHandler}/>
            {savingRecipeWindow()}
        </div>

        <p className="calories">Calories: {mealFromBE.calories}</p>
        {displayMessage()}
    </Card>
}

export default Meal;