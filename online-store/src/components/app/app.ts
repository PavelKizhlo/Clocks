import AppView from '../view/appView';
import HomePage from '../home-page/home';
import { View } from '../../interfaces/interfaces';

class App implements View {
    private view: AppView;
    private homePage: HomePage;

    constructor() {
        this.view = new AppView();
        this.homePage = new HomePage();
    }

    render() {
        this.view.render();
        this.homePage.render();
    }
}

export default App;
