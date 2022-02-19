import {useUrl} from "../general/general";
import {useEffect, useState} from "react";
import {Ingredient} from "../fetches/interfaces";

export const useIngredientsFetch = () => {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([{
        id: 0,
        name: "",
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        grams: 0
    }])

    const fetchIngredientsList = async () => {
        let url = `${useUrl}/ingredient/getAll`;
        await fetch(url).then(res => {
            if(!res.ok) {
                throw Error(`could not fetch the data from that resource -> "${url}" `)
            }
            return res.json();
        })
            .then(data => {
                setIngredientList(data)
            });
    }

    useEffect(() => {
        fetchIngredientsList()
    }, [])

    return ingredientList;
}
