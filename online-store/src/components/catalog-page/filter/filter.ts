import { View } from '../../../interfaces/interfaces';
import './filter.sass';
import noUiSlider, { Formatter, target, API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';

class Filter implements View {
    render() {
        const filters = document.querySelector('.filter-block__filters') as HTMLDivElement;

        filters.innerHTML = `
          <div class="filters">       
            <div class="filters__item prod-type">
              <h2 class="filters__title">Product Type</h2>
              <div class="prod-type__item">
                <input type="checkbox" name="type" id="alarm-clocks">
                <label class="label" for="alarm-clocks">Alarm clocks</label>
              </div>
              <div class="prod-type__item">
                <input type="checkbox" name="type" id="table-clocks">
                <label class="label" for="table-clocks">Table clocks</label>
              </div>
              <div class="prod-type__item">
                <input type="checkbox" name="type" id="wall-clocks">
                <label class="label" for="wall-clocks">Wall clocks</label>
              </div>
              <div class="prod-type__item">
                <input type="checkbox" name="type" id="pocket-watches">
                <label class="label" for="pocket-watches">Pocket watches</label>
              </div>
            </div>
            <div class="filters__item brand">
              <h2 class="filters__title">Brand</h2>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="dugena">
                <label class="label" for="dugena">Dugena</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="filius">
                <label class="label" for="filius">Filius</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="huamet">
                <label class="label" for="huamet">Huamet</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="junghans">
                <label class="label" for="junghans">Junghans</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="lexon">
                <label class="label" for="lexon">Lexon</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="seiko">
                <label class="label" for="seiko">Seiko</label>
              </div>
              <div class="brand__item">
                <input type="checkbox" name="brand" id="tissot">
                <label class="label" for="tissot">Tissot</label>
              </div>
            </div>
            <div class="filters__item color">
              <h2 class="filters__title">Color</h2>
              <div class="colors-wrapper">
                <div class="color__item">
                  <input type="checkbox" name="color" id="black">
                  <label class="label label__color black" for="black">Black</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="brown">
                  <label class="label label__color brown" for="brown">Brown</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="blue">
                  <label class="label label__color blue" for="blue">Blue</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="gold">
                  <label class="label label__color gold" for="gold">Gold</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="green">
                  <label class="label label__color green" for="green">Green</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="orange">
                  <label class="label label__color orange" for="orange">Orange</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="silver">
                  <label class="label label__color silver" for="silver">Silver</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="white">
                  <label class="label label__color white" for="white">White</label>
                </div>
                <div class="color__item">
                  <input type="checkbox" name="color" id="yellow">
                  <label class="label label__color yellow" for="yellow">Yellow</label>
                </div>
              </div>
            </div>
            <div class="filters__item movement">
              <h2 class="filters__title">Movement</h2>
              <div class="movement__item">
                <input type="radio" name="movement" id="all-movements" checked>
                <label class="label" for="all-movements">All</label>
              </div>
              <div class="movement__item">
                <input type="radio" name="movement" id="hand-winding">
                <label class="label" for="hand-winding">Hand winding</label>
              </div>
              <div class="movement__item">
                <input type="radio" name="movement" id="quartz">
                <label class="label" for="quartz">Quartz</label>
              </div>
            </div>
            <div class="filters__item price">
              <h2 class="filters__title">Price</h2>
              <div id="price-slider"></div>
            </div>
            <div class="filters__item amount">
              <h2 class="filters__title">Amount</h2>
              <div id="amount-slider"></div>
            </div>
            <div class="filters__item popular">
              <div class="popular__item">
                <input type="checkbox" name="popular" id="is-popular">
                <label class="label" for="is-popular">Popular only</label>
              </div>
            </div>
          </div>
        `;

        const priceSlider = document.getElementById('price-slider') as HTMLDivElement;
        const amountSlider = document.getElementById('amount-slider') as HTMLDivElement;

        noUiSlider.create(priceSlider, {
            start: [0, 300],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: 0,
                max: 300,
            },
            format: wNumb({
                decimals: 0,
                suffix: ' €',
            }) as Formatter,
        });

        noUiSlider.create(amountSlider, {
            start: [0, 100],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: 0,
                max: 100,
            },
            format: wNumb({
                decimals: 0,
            }) as Formatter,
        });

        this.mergeTooltips(priceSlider, 30, ' - ');
        this.mergeTooltips(amountSlider, 20, ' - ');
    }

    private mergeTooltips(slider: target, threshold: number, separator: string) {
        const textIsRtl = getComputedStyle(slider).direction === 'rtl';
        const isRtl = (slider.noUiSlider as API).options.direction === 'rtl';
        const tooltips = (slider.noUiSlider as API).getTooltips() as HTMLElement[];
        const origins = (slider.noUiSlider as API).getOrigins();

        tooltips.forEach((tooltip, index) => {
            if (tooltip) {
                origins[index].appendChild(tooltip);
            }
        });

        (slider.noUiSlider as API).on('update', (values, handle, unencoded, tap, positions) => {
            const pools: Array<Array<number>> = [[]];
            const poolPositions: Array<Array<number>> = [[]];
            const poolValues: Array<Array<number>> = [[]];
            let atPool = 0;

            if (tooltips[0]) {
                pools[0][0] = 0;
                poolPositions[0][0] = positions[0];
                poolValues[0][0] = values[0] as number;
            }

            for (let i = 1; i < positions.length; i++) {
                if (!tooltips[i] || positions[i] - positions[i - 1] > threshold) {
                    atPool++;
                    pools[atPool] = [];
                    poolValues[atPool] = [];
                    poolPositions[atPool] = [];
                }

                if (tooltips[i]) {
                    pools[atPool].push(i);
                    poolValues[atPool].push(values[i] as number);
                    poolPositions[atPool].push(positions[i]);
                }
            }

            pools.forEach(function (pool, poolIndex) {
                const handlesInPool = pool.length;

                for (let j = 0; j < handlesInPool; j++) {
                    const handleNumber = pool[j];

                    if (j === handlesInPool - 1) {
                        let offset = 0;

                        poolPositions[poolIndex].forEach(function (value) {
                            offset += 1000 - value;
                        });

                        const last = isRtl ? 0 : handlesInPool - 1;
                        const lastOffset = 1000 - poolPositions[poolIndex][last];
                        offset = (textIsRtl ? 100 : 0) + offset / handlesInPool - lastOffset;

                        tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                        tooltips[handleNumber].style.display = 'block';
                        tooltips[handleNumber].style.right = offset.toString() + '%';
                    } else {
                        tooltips[handleNumber].style.display = 'none';
                    }
                }
            });
        });
    }
}

export default Filter;
