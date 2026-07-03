const SidebarButton = ({ children, variant }) => {
  const selectedClasses = "bg-brand-primary/15 text-brand-primary "
  const unselectedClasses = "text-brand-dark-blue"

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
