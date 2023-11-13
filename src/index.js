import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Header } from './components/Header';
import { ImatgeIntroduccio } from './components/ImatgeIntroduccio';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <ImatgeIntroduccio />
    </React.StrictMode>,
    document.getElementById('root')
);
