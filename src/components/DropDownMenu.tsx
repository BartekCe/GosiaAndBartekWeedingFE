import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./DropDownMenu.css"
import NewIngredient from "./NewIngredient";
import {useUrl} from "../general/general";

const DropDownMenu = (props: any) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [addIngredientOpen, setAddIngredientOpen] = useState<boolean>(false);
    const [updateIngredientOpen, setUpdateIngredient] = useState<boolean>(false);
    const [ingredientList, setIngredientList] = useState<string[]>([])
    const [searchIngredients, setSearchIngredients] = useState<string[]>([])
    const inputRef = useRef()as MutableRefObject<HTMLInputElement>;
    const [name, setName] = useState<string>("")

    const fetchIngredientsList = async () => {
        let url = `${useUrl}/ingredient/getAllNames`
        const response = await fetch(url);
        const data = await response.json();
        setIngredientList(data);
        // setSearchIngredients(data)
    }
    useEffect(() => {
        fetchIngredientsList();
    }, [])

    const nameChangeHandler = (event: any) => {
        setName(event.target.value);
        const newIngredientList = ingredientList.filter(ingredient => ingredient.toLowerCase().includes(event.target.value))
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
    }

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }
    const handleAddIngredientClick = () => {
        if(updateIngredientOpen){
            setUpdateIngredient(false)
        }
        setAddIngredientOpen(!addIngredientOpen)
    }
    const handleUpdateIngredientClick = () => {
        if(addIngredientOpen){
            setAddIngredientOpen(false)
        }
        setUpdateIngredient(!updateIngredientOpen)
    }

    const displayAddIngredient = () => {
      if(addIngredientOpen){
          return(
                  <NewIngredient id={0} name={"new ingredient"} protein={0} fat={0} carbohydrate={0} grams={100}/>
          )
      }
    }

    const displayUpdateIngredient = () => {

    }

    const showIngredient = () => {
        if(ingredientList.includes(name)) {

        }
        else{
            console.log("dupa")
        }
    }

    const asdasd = () => {
        if (updateIngredientOpen) {
            return (
                <div className="search-bar-dropdown lala">
                    <div>
                        <input ref={inputRef} autoComplete="off" id="search-bar" type="text"
                               className="form-control cycki" placeholder={"name"} onChange={nameChangeHandler}/>
                        <ul id='results' className="list-group">
                            {searchIngredients.map((ingredient, index) => {
                                if(index<5){
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={(e) => {
                                            inputRef.current.value = ingredient;
                                            nameAfterClickHandler(ingredient);
                                            //zmienić na przekierowanie do updatu od razu!
                                            setSearchIngredients([])
                                        }}
                                        className="list-group-item btn-outline-success">
                                        {ingredient}
                                    </button>)
                            }})}
                        </ul>
                        <button className="btn-outline-success" onClick={showIngredient}> Update</button>
                    </div>
                </div>
            )
        }
    }


    const displayManuButtons = () => {
        if (menuOpen) {
            return (<div className="menuuuu">
                <div >
                    <div>
                        <div className="container menuuuu">
                            <button className="btn-outline-success menu-button" type="button" onClick={handleAddIngredientClick}>Ad new ingredient to DB</button>
                            {displayAddIngredient()}
                        </div>
                        <div className="container">
                            <button className="btn-outline-success menu-button" type="button" onClick={handleUpdateIngredientClick}>Update ingredient</button>
                            {asdasd()}
                        </div>
                        {/*<div className="col menu-button">*/}
                        {/*    <button className="btn-outline-success menu-button" type="button">See Recipe</button>*/}
                        {/*    <button>trororoorolloror</button>*/}
                        {/*</div>*/}
                        {/*<div className="col menu-button">*/}
                        {/*    <button className="btn-outline-success menu-button" type="button">Update Recipe</button>*/}
                        {/*    <button>trororoorolloror</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>)
        }
    }

    return (
        <div>
            <div>

                <button type="button" className="btn-outline-success" onClick={handleMenuClick}>
                    Menu
                </button>
                <div/>
            </div>
            {displayManuButtons()}
        </div>
    )
}

export default DropDownMenu;