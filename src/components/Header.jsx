import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";
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
  const [avatar,setAvatar]=useState(null)

  useEffect(()=>{
    user?.photoURL && setAvatar(user.photoURL)
    !user && setAvatar(null)
  },[user,user?.photoURL])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
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
console.log(avatar)
  return (
    <div className='home'>
      <Navbar expand='md' fixed='top' dark className={isHidden ? "menu hidden" : "menu"} style={{background:'linear-gradient(to bottom, var(--col5), #718ab2)'}}>
     
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem >
              <NavLink onClick={()=>setIsOpen(false)}   to='/' 
                  className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>   
                Főoldal
             </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink onClick={()=>setIsOpen(false)} className='nav-link ' to='/posts'>Posztok</NavLink>
            </NavItem>
           {user && <NavItem>
              <NavLink onClick={()=>setIsOpen(false)} className='nav-link' to='/create'>Új Poszt</NavLink>
            </NavItem>
}
          </Nav>  
          <Nav  navbar>
            {! user ? <>
             <NavItem>
                <NavLink onClick={()=>setIsOpen(false)} className='nav-link' to='/auth/in'>Belépés</NavLink>
              </NavItem>
            <NavItem>
              <NavLink onClick={()=>setIsOpen(false)} className='nav-link' to='/auth/up'>Regisztráció</NavLink>
            </NavItem>
            </> 
              : <>
              <NavItem>
                <NavLink  className='nav-link' onClick={()=>logoutUser()} to='/'>Kijelentkezés</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {avatar ?<img className='avatarIcon' src={avatar} title={user.displayName}/> : <RxAvatar />}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NavLink onClick={()=>setIsOpen(false)} style={{textDecoration:'none',borderBottom:'1px solid var(--col(4))'}} to='/profile'> Személyes adatok</NavLink>
                    </DropdownItem>
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
