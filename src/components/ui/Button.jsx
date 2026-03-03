// CarbonButton.jsx - 100% self-contained, inline styles only
import React, { useState } from 'react';

const MainButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = () => !disabled && setIsPressed(true);
  const handleMouseUp = () => !disabled && setIsPressed(false);
  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleClick = (e) => {
    if (!disabled && onClick) onClick(e);
  };

  // Your exact theme values - inline only
  const getBackgroundColor = () => {
    if (disabled) return color === 'primary' ? '#64748B' : '#16A34A';
    
    if (isPressed) {
      return color === 'primary' ? '#475569' : '#15803D';
    }
    if (isHovered) {
      return color === 'primary' ? '#475569' : '#15803D';
    }
    return color === 'primary' ? '#64748B' : '#16A34A';
  };

  const getTransform = () => {
    if (disabled) return 'none';
    if (isPressed) return 'scale(0.98)';
    if (isHovered) return 'translateY(-1px)';
    return 'none';
  };

  const getBoxShadow = () => {
    if (isPressed) return '0 2px 8px rgba(0,0,0,0.16)';
    if (isHovered) return '0 4px 20px rgba(0,0,0,0.12)';
    return '0 2px 12px rgba(0,0,0,0.08)';
  };

  const sizePadding = {
    small: '6px 16px',
    medium: '8px 20px',
    large: '12px 24px',
  };

  const fontSize = {
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
  };

  const buttonStyle = {
    textTransform: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: getBackgroundColor(),
    color: 'white',
    boxShadow: getBoxShadow(),
    transform: getTransform(),
    padding: sizePadding[size],
    fontSize: fontSize[size],
    minHeight: '44px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    ...props.style,
  };

  return (
    <button
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default MainButton;