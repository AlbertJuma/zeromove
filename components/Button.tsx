interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
