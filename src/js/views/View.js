import icons from "url:../../img/icons.svg";

export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        console.log(data);
        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data) {
        // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        // console.log("From update method: ", data);
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const currentElements = Array.from(this._parentElement.querySelectorAll("*"));

        newElements.forEach((newEl, i) => {
            const curEl = currentElements[i];
            // Update changed text
            if ((!newEl.isEqualNode(curEl)) && newEl.firstChild.nodeValue.trim() !== "") {
                curEl.textContent = newEl.textContent;
            }
            // Update changed attributes
            if (!newEl.isEqualNode(curEl)) {
                // console.log(curEl.attributes);
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner = function () {
        const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    };

    renderError(message = this._errorMessage) {
        // console.log("Render error is running");
        const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> -->

`;
        this._clear();
        // console.log(this._parentElement);
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this._message) {
        const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> -->

`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}