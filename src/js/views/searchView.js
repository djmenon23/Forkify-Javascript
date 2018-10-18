import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};
/*
Example of how the function logic will work
'Pasta with tomato and spinach'
first iteration
acc: 0 / acc + cur.length = 5: newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9: newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15: newTitle = ['Pasta', 'with','Tomato']
acc: 15 / acc + cur.length = 18: newTitle = ['Pasta', 'with','Tomato']
acc: 18 / acc + cur.length = 24: newTitle = ['Pasta', 'with','Tomato']
*/
const limitRecipeTitle = (title, limit = 17) => {
    //0 is the initial value of the accumulator(acc)
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) =>{
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        },0);
        return `${newTitle.join(' ')}...`;
    };
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `     <!--
<button class="btn-inline results__btn--prev">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-left"></use>
    </svg>
    <span>Page 1</span>
</button>
<button class="btn-inline results__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
</button>
-->`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if(page === 1 && pages > 1){
        //Only button to go to next page
    }
    else if(page < pages) {
        //Both Buttons
    }
    else if(page === pages && pages > 1){
        //Only button to go to orevious page

    }
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe)
};