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
                    <NavbarBrand href="#/">Mariage CleGus</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav navbar={true}>
                            <NavItem>
                                <NavLink href="#/covoiturages" onClick={this.toggle}>Covoiturage</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/faire-part" onClick={this.toggle}>Faire-Part</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/gites" onClick={this.toggle}>Gîtes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/buffet" onClick={this.toggle}>Buffet</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/presence" onClick={this.toggle}>Présence</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/contacts" onClick={this.toggle}>Contacts</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}