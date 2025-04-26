import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'flowbite'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';
import ContextData from './context/ContextData.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ContextData>
            <App />
        </ContextData>
    </BrowserRouter>
    ,
)