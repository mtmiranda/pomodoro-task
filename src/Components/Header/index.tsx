import React from 'react';

type Props = {
  className?: string;
};
// eslint-disable-next-line react/prop-types
export const Header: React.FC<Props> = ({ className, children }) => (
  <header className={className}>{children}</header>
);
