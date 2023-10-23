import React from "react";

const Header = ({ heading, description }) => {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Header;
