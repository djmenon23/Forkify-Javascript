// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
/**  Global State of the app
 * -Search Object
 * -Current recipw Object
 * -Shopping list Object
 * -liked recipes
 */
const state = {};

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

