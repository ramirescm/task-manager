import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
}: {
  children?: string;
  onClick?: () => void;
}) => {
  return (
    <div>
      <button onClick={onClick} className="button">
        {children}
      </button>
    </div>
  );
};

export default Button;
