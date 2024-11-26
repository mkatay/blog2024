import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
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
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const Header=()=> {
  const { user, logoutUser} = useContext(UserContext);
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
      <Navbar expand='md' fixed='top' dark className={isHidden ? "menu hidden" : "menu"}>
        <NavbarBrand href="/"><FaBlog/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className='nav-link' to='/'>Főoldal</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink className='nav-link' to='/posts'>Posztok</NavLink>
            </NavItem>
            
          </Nav>  
          <Nav  navbar>
            {! user ? <>
             <NavItem>
                <NavLink className='nav-link' to='/auth/in'>Belépés</NavLink>
              </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/auth/up'>Regisztráció</NavLink>
            </NavItem>
            </> 
              : <>
              <NavItem>
                <NavLink className='nav-link' onClick={()=>logoutUser()} to='/'>Kijelentkezés</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <RxAvatar title={user.email}/>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>Személyes adatok</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Felhasználói fiok törlése</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>}
          </Nav>
         
        </Collapse>
      </Navbar>
       <Outlet/>
    </div>
  );
}
