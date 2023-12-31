import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Example from './Example';
import ExampleDefaults from './ExampleDefaults';
import ExampleModal from './ExampleModal';
import ExampleOverlay from './ExampleOverlay';
import ExampleFilePond from './ExampleFilePond';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Pintura Image Editor</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Example</Link>
                        </li>
                        <li>
                            <Link to="/defaults">Defaults</Link>
                        </li>
                        <li>
                            <Link to="/modal">Modal</Link>
                        </li>
                        <li>
                            <Link to="/overlay">Overlay</Link>
                        </li>
                        <li>
                            <Link to="/filepond">FilePond</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/modal">
                        <ExampleModal />
                    </Route>
                    <Route path="/overlay">
                        <ExampleOverlay />
                    </Route>
                    <Route path="/filepond">
                        <ExampleFilePond />
                    </Route>
                    <Route path="/defaults">
                        <ExampleDefaults />
                    </Route>
                    <Route path="/">
                        <Example />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
