import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { logout, isAuth } from "../actions/auth";
import Router from "next/router";
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
  NavbarText
} from 'reactstrap';


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && <React.Fragment>
              <NavItem>
                <Link href="/login">
                  <NavLink>
                    Login
                </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/register">
                  <NavLink>
                    Register
                </NavLink>
                </Link>
              </NavItem>

            </React.Fragment>}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <NavLink>
                  <Link href="/user">
                    {`${isAuth().name}'s Dashboard`}
                  </Link>
                </NavLink>
              </NavItem>
            )}


            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <NavLink>
                  <Link href="/admin">
                    {`${isAuth().name}'s Dashboard`}
                  </Link>
                </NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() => logout(() => Router.replace("/login"))}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </NavLink>
              </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};


export default Header;