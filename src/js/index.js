// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
/**  Global State of the app
 * -Search Object
 * -Current recipw Object
 * -Shopping list Object
 * -liked recipes
 */
const state = {};

//Search Controller starts
const controlSearch = async () => {
    //1) get Query from view
    const query = searchView.getInput();

    if (query) {
        // 2) new search object and add to state
        state.search = new Search(query);

        //3) Prepare Ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4) Search for recepies
        await state.search.getResults();

        //5) render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});
//Search Controller ends

//Recipe Controller starts
const r =new Recipe(47746);
r.getRecipe();
console.log(r);