import * as React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

interface Props {
}

interface State {
    isOpen: boolean;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        if (window.innerWidth <= 992) {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light={true} expand="lg" fixed="top">
                    <NavbarBrand href="#/" className="thin-font-title borden navbar-item-big">
                        Mariage Clé et Gus
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav navbar={true}>
                            <NavItem className="d-lg-none">
                                <NavLink href="#/" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Acceuil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/infos" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Infos pratiques
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/presence" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Présence
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/covoiturages" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Covoiturage
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/gites" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Gîtes
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/buffet" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Buffet participatif
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/faire-part" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Faire-Part
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/contacts" onClick={this.toggle} className="thin-font borden-light navbar-item">
                                    Contacts
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}