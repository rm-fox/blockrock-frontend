import Container from "../utils/Container"
import SectionTitle from "../utils/SectionTitle"
import yellowImage from '../../assets/yellow.png'; // Import the yellow.png image
import mediumImage from '../../assets/medium.png'; // Import the yellow.png image
import lowImage from '../../assets/low.png'; // Import the yellow.png image



const About = () => {
  return (
    <section id="about">
    <Container>
      <SectionTitle title="Dynamic Risk Pools">
        Currently trending dynamically adjusting risk pools
      </SectionTitle>
      <main className="flex flex-col gap-7 lg:flex-row justify-center items-center">
        <div className="grid gap-3 sm:grid-cols-2 flex-[2]">
          <div className="flex flex-row space-x-3">
            {[yellowImage, mediumImage, lowImage].map((image, index) => (
              <figure key={index} className="relative flex-none">
                <img src={image} alt="Risk Level" className="w-full" />
                <figcaption className="absolute bottom-0 left-0 bg-secondary px-4 py-2 w-[30%]">
                  {/* You can customize the text below based on the risk level */}
                  <h3 className="font-bold">{index === 0 ? "HIGH RISK" : index === 1 ? "MEDIUM RISK" : "LOW RISK"}</h3>
                  <span className="text-xs">
                    {index === 0 ? "ETH Yellow" : index === 1 ? "ETH ZOO" : "ETH OldButGold"}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>
    </Container>
    </section>
  )
}

export default About