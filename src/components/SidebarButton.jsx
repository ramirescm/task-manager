const SidebarButton = ({ children, variant }) => {
  const selectedClasses = "bg-[#e6f7f8] text-[#00adb5]"
  const unselectedClasses = "text-[#35383E]"

  const classes = variant === "selected" ? selectedClasses : unselectedClasses

  return (
    <a
      href="/tasks"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${classes} `}
    >
      {children}
    </a>
  )
}

export default SidebarButton
