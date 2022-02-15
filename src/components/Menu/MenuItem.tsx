import React, {useState} from "react";
import "./MenuItem.css"
import NewIngredient from "../NewIngredient";

const MenuItem = (props:any) => {
    const[open, setOpen] = useState<boolean>(false)

    const showCard = () => {
      if(open){return<NewIngredient id={0} name={"new ingredient"} protein={0} fat={0} carbohydrate={0} grams={100}/>
      }
    }

  return(
      <div className="sasdsad">
      <button onClick={()=>setOpen(!open)}>
          {props.text}
      </button>
          {showCard()}
      </div>
  )
}

export default MenuItem;