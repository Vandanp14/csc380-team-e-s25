import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #002B5C;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #001f42;
  }
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#002B5C' : '#666'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  padding: 0.5rem 0;
  
  &:hover {
    color: #002B5C;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #002B5C;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          <LogoIcon>🚌
          </LogoIcon>
          
        </Logo>
        <NavLinks>
          <NavLink to="/" active={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/schedule" active={isActive('/schedule')}>
            Schedule
          </NavLink>
          <NavLink to="/tracker" active={isActive('/tracker')}>
            Live Tracker
          </NavLink>
          <NavLink to="/helppage" active={isActive('/help')}>
            Help
          </NavLink>

        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
