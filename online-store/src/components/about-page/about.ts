import { View } from '../../interfaces/interfaces';
import './about.sass';

class AboutPage implements View {
    render() {
        const activeLink = document.querySelector('.nav__link_active');
        if (activeLink) {
            activeLink.classList.remove('nav__link_active');
        }

        (document.querySelector('.nav__link_about') as HTMLButtonElement).classList.add('nav__link_active');
        const container = document.getElementById('container') as HTMLBodyElement;

        container.innerHTML = `
        <div class="about-page">
          <h1 class="about-page__title">About us</h1>
          <div class="about-page__item history">
            <div class="about-page__content">
              <h2 class="about-page__subtitle">History</h2>
              <p class="about-page__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, architecto
                numquam. Sint vel omnis repellat, iusto a recusandae dicta perspiciatis officiis? Voluptas, temporibus.
                Esse amet excepturi fugiat corrupti suscipit fuga. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Perferendis tenetur earum itaque corporis pariatur molestias, sapiente dolorem voluptatum fugiat
                modi ex quia veritatis aperiam, possimus, nobis vel eaque adipisci nemo. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora tempore eveniet totam facilis voluptatem! Laudantium ab veniam
                praesentium odit fugiat aliquam voluptas, aliquid esse fugit dolorum. Vel saepe odit facilis. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Culpa dolore perspiciatis, magnam consequuntur quasi maxime
                ipsum consectetur earum laboriosam inventore, quaerat maiores magni ad voluptatem mollitia dolores optio
                eos amet.</p>
            </div>
            <img class="about-page__image" src="./assets/about/history.jpg" alt="old shop">
          </div>
          <div class="about-page__item philosophy">
            <div class="about-page__content">
              <h2 class="about-page__subtitle">Philosophy</h2>
              <p class="about-page__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore fuga veritatis
                nihil aperiam maxime, cupiditate officiis qui eveniet nostrum consectetur accusantium perspiciatis
                aspernatur veniam similique velit illum ipsam error dignissimos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Magnam impedit eligendi fugiat numquam aspernatur facere enim laboriosam quos, possimus
                explicabo voluptatum ipsa perspiciatis beatae iste eveniet sunt, iusto nisi consequuntur. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quaerat ea error consequuntur autem dignissimos, eius
                architecto numquam reprehenderit, aliquam pariatur explicabo magni delectus dolorum impedit nisi quam
                saepe maxime temporibus.</p>
            </div>
            <img class="about-page__image" src="./assets/about/philosophy.jpg" alt="clock">
          </div>
          <div class="about-page__item facts">
            <div class="about-page__content">
              <h2 class="about-page__subtitle">Facts</h2>
              <p class="about-page__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptates
                magnam, officia quam blanditiis labore tempora ea nisi ut? Odio, sunt quibusdam? Veritatis porro qui
                atque. Incidunt, reiciendis? Iure, repudiandae? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora nisi iusto magni, numquam consectetur nemo dicta possimus totam doloremque facere fugiat et
                blanditiis sint illo omnis rerum delectus sapiente iure. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nam deserunt aliquid aut odit blanditiis minus! Dolorum eligendi nobis ex libero eos
                ullam iure aliquam impedit laboriosam maiores? Distinctio, voluptate perspiciatis.</p>
            </div>
            <img class="about-page__image" src="./assets/about/facts.jpg" alt="our">
          </div>
        </div>
        `;
    }
}

export default AboutPage;
