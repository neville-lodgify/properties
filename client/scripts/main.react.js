// import external dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import internal dependencies
import {
    LandingPage,
    PropertyListPage,
} from './pages';
import { factory as storeFactory} from './store';

////////////////////////////////////////////////////////////////////////////////

const anchor = document.getElementById('anchor');
const store = storeFactory.create();

const Application = () => (
    <Provider store={store}>
        <Router>
            <div className="page">
                <header className="header">
                    <div className="page__container">
                        <h1 className="header__headline">Properties App</h1>
                        <p className="header__tagline">Guiding repository for the TypeScript Workshop</p>
                    </div>
                </header>

                <main id="app" className="content">
                    <div className="page__container">
                        <Route
                            exact
                            path="/"
                            component={LandingPage} />
                        <Route
                            exact
                            path="/properties"
                            component={PropertyListPage} />
                    </div>
                </main>

                <footer className="footer">
                    <div className="page__container">
                        <p className="footer__copyright">&copy; 2019 - Coded by Neville</p>
                    </div>
                </footer>
            </div>
        </Router>
    </Provider>
);

render(<Application />, anchor);

