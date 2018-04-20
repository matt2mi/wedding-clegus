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
        if (window.innerWidth <= 767) {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light={true} expand="md" fixed="top">
                    <NavbarBrand href="#/" className="thin-font custom-font">Mariage Clé et Gus</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav navbar={true}>
                            <NavItem>
                                <NavLink href="#/infos" onClick={this.toggle} className="thin-font custom-font">
                                    Infos pratiques
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/presence" onClick={this.toggle} className="thin-font custom-font">
                                    Présence
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/covoiturages" onClick={this.toggle} className="thin-font custom-font">
                                    Covoiturage
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/gites" onClick={this.toggle} className="thin-font custom-font">
                                    Gîtes
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/buffet" onClick={this.toggle} className="thin-font custom-font">
                                    Buffet participatif
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/faire-part" onClick={this.toggle} className="thin-font custom-font">
                                    Faire-Part
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/contacts" onClick={this.toggle} className="thin-font custom-font">
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