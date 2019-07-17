// import external dependencies
import { arrayOf, bool, func, shape, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////

export class Component extends React.Component {
    static displayName = 'PropertyListPage';
    static propTypes = {
        properties: shape({
            isLoading: bool.isRequired,
            isErrored: bool.isRequired,
            data: arrayOf(
                shape({
                    id: string.isRequired,
                    name: string.isRequired,
                    description: string.isRequired,
                    owner: shape({
                        name: string.isRequired,
                        phone: string.isRequired,
                        email: string.isRequired,
                        location: shape({
                            address: string.isRequired,
                            country: string.isRequired,
                            city: string.isRequired,
                            state: string.isRequired,
                            zip: string.isRequired,
                        }).isRequired,
                    }),
                    location: shape({
                        address: string.isRequired,
                        country: string.isRequired,
                        city: string.isRequired,
                        state: string.isRequired,
                        zip: string.isRequired,
                    }).isRequired,
                    image: string.isRequired,
                    created: string.isRequired,
                    updated: string.isRequired,
                })
            ).isRequired,
        }).isRequired,
        getProperties: func.isRequired,
    };
    static defaultProps = {
        properties: {
            isLoading: false,
            isErrored: false,
            data: [],
        },
        getProperties: f => f,
    };

    componentDidMount () {
        this.props.getProperties();
    }

    render () {
        return (
            <section className="property-list-page">
                <header className="property-list-page__header">
                    <h1 className="property-list-page__header-headline">Properties</h1>
                </header>

                <section className="property-list-page__content">
                    <ul className="property-list">
                        {this.props.properties.data.map((property) => (
                            <li key={property.id}>{property.name}</li>
                        ))}
                    </ul>

                    <nav className="navigation">
                        <Link
                            className="property-list-page__feature-link"
                            to="/">
                            &lt; Back
                        </Link>
                    </nav>
                </section>
            </section>
        );
    }
}
