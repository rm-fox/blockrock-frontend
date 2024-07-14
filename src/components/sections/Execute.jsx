import Container from "../utils/Container"
import SectionTitle from "../utils/SectionTitle"
import yellowImage from '../../assets/yellow.png'; // Import the yellow.png image
import mediumImage from '../../assets/medium.png'; // Import the yellow.png image
import lowImage from '../../assets/low.png'; // Import the yellow.png image



const Execute = () => {
  return (
    <section id="about">
    <Container>
      {/* <SectionTitle  title="Dynamic Risk Pools">
        Currently trending dynamically adjusting risk pools
      </SectionTitle> */}
      <main className="flex flex-col gap-7 lg:flex-row justify-center items-center">
        <div className="grid gap-3 sm:grid-cols-2 flex-[2]">
          <div className="flex flex-row space-x-3">
            
          </div>
        </div>
      </main>
    </Container>
    </section>
  )
}

export default Execute