import { View } from '../../interfaces/interfaces';
import CatalogPage from '../catalog-page/catalog';
import './home.sass';

class HomePage implements View {
    render() {
        const catalogPage = new CatalogPage();
        const activeLink = document.querySelector('.nav__link_active');
        if (activeLink) {
            activeLink.classList.remove('nav__link_active');
        }

        (document.querySelector('.nav__link_home') as HTMLButtonElement).classList.add('nav__link_active');
        const container = document.getElementById('container') as HTMLBodyElement;

        container.innerHTML = `
          <div class="home-page">
            <div class="home-page__clock">
              <div class="clock-face">
                <div class="clock-face__hour" id="hr">
                </div>
                <div class="clock-face__min" id="mn">
                </div>
                <div class="clock-face__sec" id="sc">
                </div>
              </div>
            </div>
            <div class="home-page__content">
              <h1 class="home-page__title">You’ve never seen clocks like these before…</h1>
              <p class="home-page__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam, quaerat similique consectetur tempora possimus, culpa dignissimos ab doloremque consequuntur cumque. Consectetur totam, eum nisi aperiam dolor cumque perferendis delectus!</p>
              <button class="home-page__link">Shop now</button>
            </div>
          </div>
        `;

        (document.querySelector('.home-page__link') as HTMLButtonElement).addEventListener('click', (): void => {
            catalogPage.render();
        });

        this.startClock();
    }

    private startClock() {
        const deg = 6;
        const hr = document.getElementById('hr') as HTMLDivElement;
        const mn = document.getElementById('mn') as HTMLDivElement;
        const sc = document.getElementById('sc') as HTMLDivElement;

        setInterval(() => {
            const day = new Date();
            const hh = day.getHours() * 30;
            const mm = day.getMinutes() * deg;
            const ss = day.getSeconds() * deg;

            hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
            mn.style.transform = `rotateZ(${mm}deg)`;
            sc.style.transform = `rotateZ(${ss}deg)`;
        });
    }
}

export default HomePage;
