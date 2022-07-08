import { View } from '../../interfaces/interfaces';
import './appView.sass';

class AppView implements View {
    render() {
        const app = document.querySelector('#app') as HTMLBodyElement;

        app.innerHTML = `
          <header class="header">
            <a href="#" class="logo"></a>
            <nav class="nav">
              <a href="#" class="nav__link nav__link_active">Home</a>
              <a href="#" class="nav__link">Catalog</a>
              <a href="#" class="nav__link">About</a>
            </nav>
          </header>
          <main class="main-page">
            <div class="container"></div>
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
