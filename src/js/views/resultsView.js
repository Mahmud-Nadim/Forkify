import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = "No recipes found for your query. Please try again ;)";
    _message = "";

    _generateMarkup() {
        return this._data.map(recipe => this._generatePreview(recipe)).join("");
    }

    _generatePreview(result) {
        return `
        <li class="preview">
    <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="Test"/>
        </figure>
        <div class="preview__data">
            <h4 class="preview__name">
                ${result.title}
            </h4> <br>
            <p class="preview__publisher">${result.publisher}</p>
           </div>
          </a>
         </li>
        `;
    }
}

export default new ResultsView();