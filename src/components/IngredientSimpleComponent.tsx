import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./IngredientSimpleComponent.css";

const IngredientSimpleComponent = (props: any) => {
    let url = "http://localhost:8080/getIngredientsList"

    const [grams, setGrams] = useState<number>(props.grams);
    const [name, setName] = useState<string>(props.name);
    const [ingredientList, setIngredientList] = useState<string[]>([])
    const [searchIngredients, setSearchIngredients] = useState<string[]>([])
    const inputRef = useRef()as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        fetchIngredientsList();
    }, [])

    const fetchIngredientsList = async () => {
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
        setName(event.target.value);
        props.onIngredientChange({
            name: event.target.value,
            grams: grams,
            number: props.number
        })
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

    const handleRemoveIngredient = () => {
        props.onIngredientRemove(props.number)
    }

    const nameAfterClickHandler = (name:any) => {
        setName(name)
        props.onIngredientChange({
            name: name,
            grams: grams,
            number: props.number
        })
        console.log(props)
    }

    const display = (name: string) => {
            return <div className="search-bar-dropdown">
                <div>
                <input  ref={inputRef} autoComplete="off" id="search-bar" type="text" className="form-control" placeholder={name} onChange={nameChangeHandler}/>
                <ul id='results' className="list-group">
                    {searchIngredients.map((ingredient, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={(e)=> {
                                    inputRef.current.value = ingredient;
                                    nameAfterClickHandler(ingredient);
                                    setSearchIngredients([])
                                }}
                                className="list-group-item btn-outline-success">
                                {ingredient}
                            </button>)
                    })}
                </ul>
                </div>
                <input id="grams" type="number"  autoComplete="off" className="form-control" placeholder={props.grams.toString() + "g"}
                              onChange={gramsChangeHandler} step="1"/>
                <button className="btn-danger" onClick={handleRemoveIngredient}>X</button>
            </div>
        }

    return display(props.name)
}

export default IngredientSimpleComponent;