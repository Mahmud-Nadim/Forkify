import * as model from "./model";

import "core-js/stable";
import "regenerator-runtime/runtime";
import {loadRecipe} from "./model";
import recipeView from "./views/recipeView";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        // 1. Loading recipe
        recipeView._renderSpinner();
        await model.loadRecipe(id);
        const {recipe} = model.state;
        // const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        //     // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce26`
        // );
        // const data = await res.json();
        //
        // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // let recipe = data.data.recipe;
        //
        // recipe = {
        //     id: recipe.id,
        //     title: recipe.title,
        //     publisher: recipe.publisher,
        //     sourceUrl: recipe.source_url,
        //     image: recipe.image_url,
        //     servings: recipe.servings,
        //     cookingTime: recipe.cooking_time,
        //     ingredients: recipe.ingredients
        // };

        // console.log(recipe);

        // 2. Rendering recipe
        recipeView.render(model.state.recipe);

    } catch (e) {
        console.log(e);
    }
};

["hashchange", "load"].forEach(ev => window.addEventListener(ev, controlRecipes));










