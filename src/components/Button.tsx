import React from "react";

interface PropTypes extends React.ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary" | "danger",
  children: React.ReactNode,
}

const Button = ({ onClick, children, variant = "primary" }: PropTypes) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
