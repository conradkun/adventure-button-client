import ReactDOM from 'react-dom';
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

undefined.map((test)=>{
  console.log(test);
});
render(Routes);


if (module.hot) {
    module.hot.accept();
}
