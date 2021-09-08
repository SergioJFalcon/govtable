import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/localtable/">Local Table</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/resttable">REST Table</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Repo Links
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="https://github.com/SergioJFalcon/govtable">
                  GovTable
                </DropdownItem>
                <DropdownItem href="https://github.com/SergioJFalcon/django-rest-govtable">
                  Django-Rest-GovTable
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="https://govtable.herokuapp.com/">
                  GovTable Heroku
                </DropdownItem>
                <DropdownItem href="https://django-rest-govtable.herokuapp.com/">
                  API Heroku
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
