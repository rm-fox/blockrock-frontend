import Container from "../utils/Container"
import logo from "../../assets/logo-white.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <footer className="py-6 bg-primary text-white">
      <Container className="flex flex-col text-center justify-between gap-5 items-center md:flex-row md:text-start">
        <div className="flex gap-5 items-center flex-col md:flex-row">
          <img src={logo} alt="Logo" className="max-w-[60px] sm:max-w-[80px]" />
          <p>© 2023 - Mint, All Right Reserved</p>
        </div>
        <a href="#" className="uppercase text-xs font-semibold flex items-center gap-2 transition hover:text-secondary">Back To Top <FontAwesomeIcon icon={faChevronUp} /></a>
      </Container>
    </footer>
  )
}

export default Footer