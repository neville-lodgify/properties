// import external dependencies
import React from 'react';
import { Link } from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////

export const LandingPage = () => (
    <section className="landing-page">
        <header className="landing-page__header">
            <h1 className="landing-page__header-headline">Welcome to Properties App</h1>
        </header>

        <section className="landing-page__features">
            <Link
                className="landing-page__feature-link"
                to="/properties">
                Properties
            </Link>
            <Link
                className="landing-page__feature-link"
                to="/bookings">
                Bookings
            </Link>
        </section>
    </section>
);
