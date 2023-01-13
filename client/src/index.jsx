import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);


//import { createRoot } from 'react-dom/client';
//import { BrowserRouter } from 'react-router-dom';
//import App from './App';

//const root = createRoot(document.getElementById('root'));
//root.render(
//  <BrowserRouter>
//    <App />
//  </BrowserRouter>
//);
