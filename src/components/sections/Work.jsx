import Container from "../utils/Container"
import SectionTitle from "../utils/SectionTitle"
import { useState } from "react"
import LinkButton from "../utils/LinkButton"

const Work = () => {
  const [cat, setCat] = useState("all")
  return (
    <section id="work">
      <Container>
        <SectionTitle title="Tailored to your risk profile" />
        <main>
          <Categories cats={["all", "branding", "illustrations", "web"]} activeCat={cat} setCat={setCat} />
          <Works works={[
              {title: "Lamp", src: "https://ivkovic.me/themes/min/static/media/preview.ffd636c7.png", cat: "branding"},
              {title: "Sneakers", src: "https://ivkovic.me/themes/min/static/media/preview.3ffe0420.png", cat: "illustrations"},
              {title: "SmartWatch", src: "https://ivkovic.me/themes/min/static/media/preview.80aa8657.png", cat: "web"},
              {title: "Label", src: "https://ivkovic.me/themes/min/static/media/preview.d41b337f.png", cat: "branding"},
              {title: "SpeakerPhone", src: "https://ivkovic.me/themes/min/static/media/preview.71eebd49.png", cat: "web"},
              {title: "Lemons", src: "https://ivkovic.me/themes/min/static/media/preview.2921cad9.png", cat: "illustrations"},
            ].filter(w => w.cat === cat || cat === 'all')}
          />
          <LinkButton href='#contact' className="mx-auto">Find Yours</LinkButton>
        </main>
      </Container>
    </section>
  )
}

const Categories = ({ cats, activeCat, setCat }) => {
  return (
    <ul className="flex gap-3 uppercase text-xs flex-wrap justify-center mb-8 lg:justify-start">
      {
        cats.map((cat, i) => (
          <li key={i} className={`px-3 py-2 font-medium transition ${cat === activeCat && 'bg-secondary'} hover:bg-secondary cursor-pointer`} data-cat={cat} onClick={(e) => setCat(e.target.dataset.cat)}>{cat}</li>
        ))
      }
    </ul>
  )
}

const Works = ({ works }) => {
  const rowsCount = Math.ceil(works.length / 3)
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <div className="flex flex-col gap-5">
        {
          works.slice(0, rowsCount).map((w, i) => (
            <figure className="relative" key={i}>
              <img src={w.src} alt={w.title} className="w-full" />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-secondary-low flex flex-col justify-center items-center opacity-0 transition hover:opacity-100">
                <h3 className="text-3xl font-bold mb-1 w-full overflow-hidden text-center text-ellipsis px-3">{w.title.toUpperCase()}</h3>
                <span className="text-xs block w-full overflow-hidden text-center text-ellipsis px-3">{w.cat.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))
        }
      </div>
      <div className="flex flex-col gap-5">
        {
          works.slice(rowsCount, rowsCount * 2).map((w, i) => (
            <figure className="relative" key={i}>
              <img src={w.src} alt={w.title} className="w-full" />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-secondary-low flex flex-col justify-center items-center opacity-0 transition hover:opacity-100">
                <h3 className="text-3xl font-bold mb-1 w-full overflow-hidden text-center text-ellipsis px-3">{w.title.toUpperCase()}</h3>
                <span className="text-xs block w-full overflow-hidden text-center text-ellipsis px-3">{w.cat.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))
        }
      </div>
      <div className="flex flex-col gap-5">
        {
          works.slice(rowsCount * 2).map((w, i) => (
            <figure className="relative" key={i}>
              <img src={w.src} alt={w.title} className="w-full" />
              <figcaption className="absolute top-0 left-0 w-full h-full bg-secondary-low flex flex-col justify-center items-center opacity-0 transition hover:opacity-100">
                <h3 className="text-3xl font-bold mb-1 w-full overflow-hidden text-center text-ellipsis px-3">{w.title.toUpperCase()}</h3>
                <span className="text-xs block w-full overflow-hidden text-center text-ellipsis px-3">{w.cat.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))
        }
      </div>
    </div>
  )
}

export default Work