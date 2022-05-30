import React from 'react';
import { NavLink } from 'react-router-dom';

export const WrapperLink = ({ condition, title, ...props }) =>
  condition && (
      <NavLink {...props}>{title}</NavLink>
  );
