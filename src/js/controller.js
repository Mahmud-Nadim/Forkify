import * as model from "./model";
import "core-js/stable";
import "regenerator-runtime/runtime";
import {loadRecipe} from "./model";
import recipeView from "./views/recipeView";
import {getJSON} from "./helpers";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        // 1. Loading recipe
        recipeView.renderSpinner();
        await model.loadRecipe(id);
        const {recipe} = model.state;

        // 2. Rendering recipe
        recipeView.render(recipe);

    } catch (e) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        // resultsView.renderSpinner();
        // console.log(resultsView);
        // 1. Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2. Load search results
        await model.loadSearchResults(query);

        // 3. Render results
        resultsView.render(model.state.search.results);

    } catch (err) {
        console.log(err);
    }
};

controlSearchResults();

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};

init();








