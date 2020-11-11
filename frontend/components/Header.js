import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { logout, isAuth } from "../actions/auth";
import Router from "next/router";
import NProgress from "nprogress";
import ".././node_modules/nprogress/nprogress.css";
import Search from "../components/blog/Search"
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

// Use NProgress Load
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>

      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar>

            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Posts</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/login">
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/register">
                    <NavLink>Register</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
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

            <NavItem>
              <a href="/user/manage/blog" className="btn btn-primary text-light ml-2">Criar Novo Post</a>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>

      <Search />

    </React.Fragment>
  );
};


export default Header;