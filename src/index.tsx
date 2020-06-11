import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {App} from './App';
import { PaletteProvider } from './context/paletteContext';


ReactDOM.render(<PaletteProvider><BrowserRouter><App /></BrowserRouter></PaletteProvider>, document.getElementById('root'));

