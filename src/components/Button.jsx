const Button = ({ children, variant = "primary" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00ADB5] text-white"
      case "ghost":
        return "bg-transparent text-[#818181]"
      default:
        return ""
    }
  }
  return (
    <>
      <button
        className={`hover:opa flex items-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-75 ${getVariantClasses()}`}
      >
        {children}
      </button>
    </>
  )
}

export default Button
