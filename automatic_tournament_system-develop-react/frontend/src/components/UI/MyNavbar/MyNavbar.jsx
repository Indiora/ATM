import React, { useContext } from 'react'
import classes from './MyNavbar.module.css';
import { AuthContext } from '../../../context';
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
} from 'react-bootstrap';
import user_image from "./user_icon.png"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import logo from "./logoFrog.png"
import test from "./output.jpg"

const MyNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar className={`${classes.my_navbar} mb-3`} abg="dark" expand="lg">
      <Container fluid >
        <Navbar.Brand className={classes.nav_image} href="/"><img style={{width: '75px', height: '55px'}} src={logo} alt="" /></Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll">
          <span className="navbar-toggler-bar navbar-kebab" >~</span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll" className={classes.nav_background}>

          <Nav
            className="me-auto  my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link className={classes.nav_link} href="/tournaments"><h5>Tournaments</h5></Nav.Link>
            <Nav.Link className={classes.nav_link} href="/create_tournament"><h5>Create Tournament</h5></Nav.Link>
            <Nav.Link className={classes.nav_link} href="/create_bracket"><h5>Create Bracket</h5></Nav.Link>
          </Nav>


          {user ? (<>
            <ThemeSwitcher></ThemeSwitcher>
            <Nav className="ml-auto" navbar>
              <Dropdown>
                <Dropdown.Toggle drop="down" className={`${classes.my_toggle} ${"shadow-none"}`}>
                  <img className={classes.navbar_img} alt="..." src={test} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={classes.my_drop}>
                  <Dropdown.Item className={classes.nav_item} href={`/profile/${user.username}`} >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item className={classes.nav_item} href="/" onClick={logoutUser}>
                    Log out
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </>
          ) : (
            <>
              <Nav.Link href="/login" className={classes.nav_link}>Log in</Nav.Link>
              <Nav.Link href="/register" className={classes.nav_link}>Sign up</Nav.Link>
            </>
          )}


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar