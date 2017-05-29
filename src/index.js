import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './style/main.css';
//import '../node_modules/grommet/grommet.min.css'
import Routes from './routes';

const render = (Component) => {
    return ReactDOM.render(
            Component,
        document.getElementById('root')
    );
};

render(Routes);


if (module.hot) {
    module.hot.accept();
}
registerServiceWorker();
