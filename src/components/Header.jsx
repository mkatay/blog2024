import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const Header=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScrollTop) {
        setIsHidden(true); // Lefelé görgetéskor elrejtés
      } else {
        setIsHidden(false); // Felfelé görgetéskor megjelenítés
      }

      setLastScrollTop(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Takarítás
    };
  }, [lastScrollTop]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='home'>
      <Navbar expand='md' fixed='top' dark className={isHidden ? "hidden" : ""}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className='nav-link' to='/'>Főoldal</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink className='nav-link' to='/'>Főoldal</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/'>Főoldal</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/'>Főoldal</NavLink>
            </NavItem>
          </Nav>  
          <Nav  navbar>
            <NavItem>
                <NavLink className='nav-link' to='/signin'>Belépés</NavLink>
              </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/signup'>Regisztráció</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
         
        </Collapse>
      </Navbar>
       <Outlet/>
    </div>
  );
}
