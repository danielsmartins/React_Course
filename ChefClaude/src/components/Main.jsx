import { useEffect, useRef, useState } from "react"
import IngredientList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "/src/ai"

export default function Main() {
const [ingredients, setIngredients] = useState([])
const [recipe, setRecipe] = useState("")
const recipeSection = useRef(null)
 

function addIngredient(formData)  {
    // Vantagem de usar action: preventDefault já vem por padrão
    const newIngredient = formData.get("ingredient")
    setIngredients(prev => [...prev, newIngredient])
}

useEffect(() => {
    if(recipe !== "" && recipeSection.current !== null){
    recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
}, [recipe])

async function getRecipe () {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
    
}
    return( 
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input 
                    aria-label="Add Ingredient" 
                    name="ingredient" 
                    type="text" 
                    placeholder="e.g. oregano" 
                    required
                    />
                <button>Add Indredient</button>
            </form>

            {ingredients.length > 0 && <IngredientList 
                ref={recipeSection}
                getRecipe={getRecipe} 
                ingredients={ingredients}
            />
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}


