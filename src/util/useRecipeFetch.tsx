import {useEffect, useState} from "react";
import {useUrl} from "../general/general";
import {Recipe} from "../fetches/interfaces";

export const useRecipeFetch = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        fetchRecipes();
    }, [])

    const fetchRecipes = async () => {
        let url = `${useUrl}/recipe/getAll`
        await fetch(url).then(res => {
            if(!res.ok) {
                throw Error(`could not fetch the data from that resource -> "${url}" `)
            }
            return res.json();
        })
            .then(data => {
                setRecipes(data)
            });
    }
    return recipes;
}

