import ReactDOM from 'react-dom';
//import Raven from 'raven-js';
import registerServiceWorker from './registerServiceWorker';
import './style/main.css';
//import '../node_modules/grommet/grommet.min.css'
import Routes from './routes';
registerServiceWorker();

const render = (Component) => {
    return ReactDOM.render(
            Component,
        document.getElementById('root')
    );
};
/**
Raven
    .config('https://2317581d9de14a25a777c94f1280ab9a@sentry.io/178364')
    .install();
**/
render(Routes);


if (module.hot) {
    module.hot.accept();
}
