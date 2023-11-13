import logo from './logo.svg';
import './App.css';
import { PrimerComponent } from './components/PrimerComponent';
import { SegonComponent } from './components/SegonComponent';
import { PrimerDiv } from './components/PrimerDiv';
import { DivTotal } from './components/DivTotal';

function App() {
    return ( 
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className="App-logo" alt="logo" />
                <p> LA PATUFETA ES LA MILLOR DEL MON </p>
                
                {/* <PrimerComponent /> */}
                {/* <SegonComponent /> */}
                <DivTotal />

            </header>
        </div>
    );
}

export default App;