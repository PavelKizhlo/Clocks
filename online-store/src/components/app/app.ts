import AppView from '../view/appView';
import { View } from '../../interfaces/interfaces';

class App implements View {
    private view: AppView;

    constructor() {
        this.view = new AppView();
    }

    render() {
        this.view.render();
    }
}

export default App;
