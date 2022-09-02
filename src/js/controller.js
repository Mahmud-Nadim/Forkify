import * as model from "./model";
import "core-js/stable";
import "regenerator-runtime/runtime";
import {loadRecipe} from "./model";
import recipeView from "./views/recipeView";
import {getJSON} from "./helpers";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
// import {resolve} from "../../dist/controller.7d25b0d5";

// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        // 0. Update results view to mark selected search result
        resultsView.update(model.getSearchResults());
        bookmarksView.update(model.state.bookmarks);
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
        resultsView.render(model.getSearchResults());

        // 4. Render initial pagination buttons
        paginationView.render(model.state.search);

    } catch (err) {
        console.log(err);
    }
};

controlSearchResults();

const controlPagination = function (goToPage) {

    // 1. Render NEW results
    resultsView.render(model.getSearchResults(goToPage));

    // 2. Render NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);
    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // 1. Add or remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // 2. Update recipe view
    recipeView.render(model.state.recipe);

    // 3. Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};


const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};

init();








