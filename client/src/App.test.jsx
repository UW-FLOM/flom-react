import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});


//import { createRoot } from 'react-dom/client';
//import App from './App';

//it('renders without crashing', () => {
//    const div = document.createElement('div');
//    const root = createRoot(div);
//  root.render(<App />);
//  root.unmount();
//});
