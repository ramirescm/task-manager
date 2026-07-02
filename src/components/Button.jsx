const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00ADB5] text-white"
      case "secondary":
        return "bg-[#EEEEEE] text-[#35383E]"
      case "ghost":
        return "bg-transparent text-[#818181]"
      default:
        return ""
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "py-1 text-xs"
      case "large":
        return "py-2 text-sm"
      default:
        return ""
    }
  }

  return (
    <>
      <button
        className={`hover:opa flex items-center justify-center gap-2 rounded-md px-3 transition hover:opacity-75 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
        {...rest}
      >
        {children}
      </button>
    </>
  )
}

export default Button
