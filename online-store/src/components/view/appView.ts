import { View } from '../../interfaces/interfaces';
import './appView.sass';

class AppView implements View {
    render() {
        const app = document.getElementById('app') as HTMLBodyElement;

        app.innerHTML = `
          <header class="header">
            <div class="logo"></div>
            <nav class="nav">
              <button class="nav__link nav__link_home">Home</button>
              <button class="nav__link nav__link_catalog">Catalog</button>
              <button class="nav__link nav__link_about">About</button>
            </nav>
          </header>
          <main class="main-page">
            <div class="container" id="container"></div>
          </main>
          <footer class="footer">
            <a href="https://rs.school/js/" class="footer__link rss-link"></a>
            <span class="footer__text">RS School 2022</span>
            <a href="https://github.com/PavelKizhlo" class="footer__link github-link">@PavelKizhlo</a>
          </footer>
        `;
    }
}

export default AppView;
