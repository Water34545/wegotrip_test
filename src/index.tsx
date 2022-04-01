import ReactDOM from 'react-dom';
import moment from 'moment';
import {Provider} from 'react-redux';
import './i18n';
import './scss/main.scss';
import App from './components/App/App';
import store from './redux/store';

moment.locale('ru');

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
