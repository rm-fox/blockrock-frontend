import Container from "../utils/Container"
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"

const Nav = () => {
  const menuRef = useRef()

  const switchMenu = () => {
    menuRef.current.classList.toggle("top-full")
    menuRef.current.classList.toggle("translate-y-0")
  }

  return (
    <div className="shadow-sm py-3 sticky top-0 left-0 bg-white z-30 flex items-center">
      <Container className="flex justify-between items-center gap-3">
        <a href="#">
          <img src={logo} alt="Mint" className="max-w-[60px] sm:max-w-[80px]" />
        </a>
        <nav className="flex items-center">
          <ul className="hidden justify-between items-center gap-5 sm:flex">
            <li>
              <a href="#work" className="font-medium text-primary hover:text-secondary transition-colors uppercase">Work</a>
            </li>
            <li>
              <a href="#about" className="font-medium text-primary hover:text-secondary transition-colors uppercase">About</a>
            </li>
            <li>
              <a href="#blog" className="font-medium text-primary hover:text-secondary transition-colors uppercase">Blog</a>
            </li>
            <li>
              <a href="#contact" className="font-medium text-primary hover:text-secondary transition-colors uppercase">Contact</a>
            </li>
          </ul>
          <button className="sm:hidden" onClick={switchMenu}>
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
          <ul className="absolute top-0 left-0 w-full bg-white shadow-md z-10 transition -translate-y-full sm:hidden" ref={menuRef}>
            <Container>
              <li>
                <a href="#work" className="font-medium text-primary hover:text-secondary transition-colors py-3 block uppercase">Work</a>
              </li>
              <li>
                <a href="#about" className="font-medium text-primary hover:text-secondary transition-colors py-3 block uppercase">About</a>
              </li>
              <li>
                <a href="#blog" className="font-medium text-primary hover:text-secondary transition-colors py-3 block uppercase">Blog</a>
              </li>
              <li>
                <a href="#contact" className="font-medium text-primary hover:text-secondary transition-colors py-3 block uppercase">Contact</a>
              </li>
            </Container>
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default Nav
