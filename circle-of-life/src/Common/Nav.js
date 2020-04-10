// Nav.js
import React from "react";
import { connect } from "react-redux";

import styled, { css } from "styled-components";
import SignOutButton from "../Components/Auth/SignOut";
import { Link } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import "./Nav.scss";

const NavIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <path fill="none" d="M0 0h40v40H0V0z" />
    <path
      className="nav"
      d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
    />
  </svg>
);

const NavIconOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <path fill="none" d="M0 0h40v40H0V0z" />
    <path
      className="nav"
      d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
    />
  </svg>
);

const Header = styled.header`
  // position: fixed;
  padding: 12px 0;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  @media (min-width: 479px) {
    align-items: center;
    display: flex;
    padding: 12px;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 479px) {
    flex-direction: column;
    align-items: flex-end;

    /* If navigation is open (show is true) */
    ${props =>
      props.isOpen &&
      css`
        ul {
          position: absolute;
          top: 69px;
          max-height: 1000px;
        }
      `}
  }
`;

const NavList = styled.ul`
  margin: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  list-style-type: none;
  max-height: 0;
  text-align: right;
  width: fit-content;
  justify-content: center;
  background: repeating-linear-gradient(45deg, #ef9f82, #ec8c6a 100px);
  width: 100%;
  height: 100vh;
  z-index: 99;

  @media (min-width: 480px) {
    background: white;
    flex-direction: row;
    height: 20px;
    max-height: 1000px;
  }
`;

const NavItem = styled.li`
  & + & {
    margin-top: 12px;
  }

  @media (min-width: 480px) {
    & + & {
      margin-top: 0;
      margin-left: 32px;
    }
  }

  a {
    font: 400 17px/23px Avenir;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    transition: color 0.25s ease-in-out;

    &:hover {
      color: #888;
    }
    @media (min-width: 480px) {
      color: #ec8c6a;
    }
  }
`;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const Navigation = ({ authUser }) => {
  class Nav extends React.Component {
    state = {
      show: false
    };

    toggleMenu = () => {
      this.setState({
        show: !this.state.show
      });
    };
    render() {
      return (
        <Header className="NavContainer">
          <p>Circle of Life</p>
          <div>
            <NavWrapper isOpen={this.state.show}>
              <div className="navIcon" onClick={this.toggleMenu}>
                {this.state.show ? <NavIconOpen /> : <NavIcon />}
              </div>
              {authUser ? (
                <NavigationAuth
                  authUser={authUser}
                  toggleMenu={this.toggleMenu}
                />
              ) : (
                <NavigationNonAuth toggleMenu={this.toggleMenu} />
              )}
            </NavWrapper>
          </div>
        </Header>
      );
    }
  }
  return <Nav />;
};
export default connect(mapStateToProps)(Navigation);
const NavigationAuth = ({ show, toggleMenu }) => (
  <NavList>
    <NavItem onClick={toggleMenu}>
      <Link className="nav-link" to={ROUTES.HOME}>
        Home
      </Link>
    </NavItem>
    <NavItem onClick={toggleMenu}>
      <Link className="nav-link" to={ROUTES.ACCOUNT}>
        Account
      </Link>
    </NavItem>
    <NavItem onClick={toggleMenu}>
      <Link className="nav-link" to={ROUTES.RESULTS}>
        Results
      </Link>
    </NavItem>
    <NavItem onClick={toggleMenu}>
      <SignOutButton />
    </NavItem>
  </NavList>
);

const NavigationNonAuth = ({ show, toggleMenu }) => (
  <NavList>
    <NavItem onClick={toggleMenu}>
      <Link className="nav-link" to={ROUTES.SIGN_IN}>
        Sign In
      </Link>
    </NavItem>
  </NavList>
);
