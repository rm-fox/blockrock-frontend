import Container from "../utils/Container"
import SectionTitle from "../utils/SectionTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

const Contact = () => {
  return (
    <section id="contact">
      <Container>
        <SectionTitle title="Contact Us.">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </SectionTitle>
        <main>
          <div className="flex gap-10 items-center flex-col lg:flex-row mb-16">
            <form className="flex-1 flex flex-col gap-5 w-full">
              <h2 className="text-2xl font-extrabold mb-2 text-center lg:text-start">Send Us A Message.</h2>
              <input type="text" placeholder="Name" className="block w-full p-2 outline-none bg-slate-50 border focus:border-primary transition" required />
              <input type="email" placeholder="Email" className="block w-full p-2 outline-none bg-slate-50 border focus:border-primary transition" required />
              <textarea placeholder="Message..." className="block w-full p-2 outline-none bg-slate-50 border focus:border-primary min-h-[200px] transition" required></textarea>
              <button type="submit" className="link-button mx-auto lg:mx-0">Send Message</button>
            </form>
            <img src="https://ivkovic.me/themes/min/static/media/bg.b74b9f78.png" alt="Contact" className="flex-1 w-full" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-10 mb-16">
            <figure className="text-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-4xl mb-4 text-secondary stroke-[15px] stroke-black" />
              <figcaption className="text-xs max-w-[140px] leading-[1.8] mx-auto">
                1211 Awesome Avenue, NY USD
              </figcaption>
            </figure>
            <figure className="text-center">
              <FontAwesomeIcon icon={faPhone} className="text-4xl mb-4 text-secondary stroke-[15px] stroke-black" />
              <figcaption className="text-xs max-w-[140px] leading-[1.8] mx-auto">
                +00 123 - 456 -78<br />
                +00 987 - 654 -32
              </figcaption>
            </figure>
            <figure className="text-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-4 text-secondary stroke-[15px] stroke-black" />
              <figcaption className="text-xs max-w-[140px] leading-[1.8] mx-auto">
                mint@mintmail.com
              </figcaption>
            </figure>
          </div>
          <div className="flex gap-16 items-center justify-center">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} className="text-3xl stroke-[15px] stroke-primary transition text-primary hover:text-secondary" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} className="text-3xl stroke-[15px] stroke-primary transition text-primary hover:text-secondary" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-3xl stroke-[15px] stroke-primary transition text-primary hover:text-secondary" />
            </a>
          </div>
        </main>
      </Container>
    </section>
  )
}

export default Contact