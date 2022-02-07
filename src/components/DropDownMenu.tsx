import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./DropDownMenu.css"
import NewIngredient from "./NewIngredient";

const DropDownMenu = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [addIngredientOpen, setAddIngredientOpen] = useState<boolean>(false);
    const [updateIngredientOpen, setUpdateIngredient] = useState<boolean>(false);
    const [ingredientList, setIngredientList] = useState<string[]>([])
    const [searchIngredients, setSearchIngredients] = useState<string[]>([])
    const inputRef = useRef()as MutableRefObject<HTMLInputElement>;
    const [name, setName] = useState<string>("")

    const fetchIngredientsList = async () => {
        let url = "http://localhost:8080/getIngredientsList"
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
              <div className="ingredient">
                  <NewIngredient id={0} name={"new ingredient"} protein={0} fat={0} carbohydrate={0} grams={100}/>
              </div>
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
                <div className="search-bar-dropdown">
                    <div>
                        <input ref={inputRef} autoComplete="off" id="search-bar" type="text"
                               className="form-control cycki" placeholder={"name"} onChange={nameChangeHandler}/>
                        <ul id='results' className="list-group cycuszki">
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
                                        className="list-group-item btn-outline-success cycki">
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
            return (<div className="menu-buttons">
                <div className="col">
                    <div>
                        <div className="col">
                            <button className="btn-outline-success menu-button" type="button" onClick={handleAddIngredientClick}>Ad new ingredient to DB</button>
                            {displayAddIngredient()}
                        </div>
                        <div className="col">
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
            <div className="row">

                <button type="button" className="btn-outline-success col-sm-1" onClick={handleMenuClick}>
                    Menu
                </button>
                <div className="col-sm-10"/>
            </div>
            {displayManuButtons()}
        </div>
    )
}

export default DropDownMenu;