const LinkButton = ({ children, href, className }) => {
  return (
    <a className={`link-button ${className || ''}`} href={href}>{children}</a>
  )
}

export default LinkButton