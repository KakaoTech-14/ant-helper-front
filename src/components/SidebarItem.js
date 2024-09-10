import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: black;
  font-size: 20px;

  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
  }
`;

export default function SidebarItem({ to, text }) {
  return (
    <li>
      <StyledNavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-lg group ${
            isActive ? 'bg-gray-200' : 'text-gray-900 hover:bg-gray-100'
          }`
        }>
        <span className="flex-1 ms-3 whitespace-nowrap">{text}</span>
      </StyledNavLink>
    </li>
  );
}
