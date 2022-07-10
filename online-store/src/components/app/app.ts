import AppView from '../view/appView';
import HomePage from '../home-page/home';
import AboutPage from '../about-page/about';
import CatalogPage from '../catalog-page/catalog';
import { View } from '../../interfaces/interfaces';

class App implements View {
    private view: AppView;
    private homePage: HomePage;
    private aboutPage: AboutPage;
    private catalogPage: CatalogPage;

    constructor() {
        this.view = new AppView();
        this.homePage = new HomePage();
        this.aboutPage = new AboutPage();
        this.catalogPage = new CatalogPage();
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

        (document.querySelector('.nav__link_catalog') as HTMLButtonElement).addEventListener('click', (): void => {
            this.catalogPage.render();
        });
    }
}

export default App;
