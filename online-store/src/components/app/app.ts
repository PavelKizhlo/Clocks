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
        switch (localStorage.getItem('page')) {
            case 'home':
                this.homePage.render();
                break;
            case 'catalog':
                this.catalogPage.render();
                break;
            case 'about':
                this.aboutPage.render();
                break;
            default:
                this.homePage.render();
                break;
        }

        const logoLink = document.querySelector('.logo') as HTMLDivElement;
        const homeLink = document.querySelector('.nav__link_home') as HTMLButtonElement;
        const catalogLink = document.querySelector('.nav__link_catalog') as HTMLButtonElement;
        const aboutLink = document.querySelector('.nav__link_about') as HTMLButtonElement;

        homeLink.addEventListener('click', (): void => {
            this.homePage.render();
        });

        logoLink.addEventListener('click', (): void => {
            this.homePage.render();
        });

        aboutLink.addEventListener('click', (): void => {
            this.aboutPage.render();
        });

        catalogLink.addEventListener('click', (): void => {
            this.catalogPage.render();
        });
    }
}

export default App;
