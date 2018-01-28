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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light={true} expand="md">
          <NavbarBrand href="#/">Mariage CleGus</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav navbar={true}>
              <NavItem>
                <NavLink href="#/covoiturages">Covoiturage</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="#/faire-part">Faire-Part</NavLink>
              </NavItem>
                <NavItem>
                    <NavLink href="#/gites">Gîtes</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#/buffet">Buffet</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#/presence">Réponse</NavLink>
              </NavItem>
                <NavItem>
                    <NavLink href="#/contacts">Contacts</NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}