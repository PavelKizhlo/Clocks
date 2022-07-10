import AppView from '../view/appView';
import HomePage from '../home-page/home';
import AboutPage from '../about-page/about';
import { View } from '../../interfaces/interfaces';

class App implements View {
    private view: AppView;
    private homePage: HomePage;
    private aboutPage: AboutPage;

    constructor() {
        this.view = new AppView();
        this.homePage = new HomePage();
        this.aboutPage = new AboutPage();
    }

    render() {
        this.view.render();
        this.homePage.render();

        (document.querySelector('.nav__link_home') as HTMLButtonElement).addEventListener('click', (): void => {
            this.homePage.render();
        });

        (document.querySelector('.logo') as HTMLButtonElement).addEventListener('click', (): void => {
            this.homePage.render();
        });

        (document.querySelector('.nav__link_about') as HTMLButtonElement).addEventListener('click', (): void => {
            this.aboutPage.render();
        });
    }
}

export default App;
