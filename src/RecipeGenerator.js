import React, { Component } from 'react';
import axios from 'axios';

class RecipeGenerator extends Component {
    state = {
        recipe: null,
    };

    generateRandomRecipe = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            const randomRecipe = response.data.meals[0];
            this.setState({ recipe: randomRecipe });
        } catch (error) {
            console.error('Error fetching random recipe:', error);
        }
    };

    render() {
        const { recipe } = this.state;

        return (
            <div className="recipe-card">
                <h1>Random Recipe Generator</h1>
                <button onClick={this.generateRandomRecipe}>Generate Recipe</button>
                {recipe && (
                    <div className="recipe-details">
                        <h2>{recipe.strMeal}</h2>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <h3>Ingredients</h3>
                        <ul>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                                const ingredient = recipe[`strIngredient${i}`];
                                const measure = recipe[`strMeasure${i}`];
                                if (ingredient) {
                                    return (
                                        <li key={i}>
                                            {measure} {ingredient}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                        <h3>Instructions</h3>
                        <p>{recipe.strInstructions}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default RecipeGenerator;
