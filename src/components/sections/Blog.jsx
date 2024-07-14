import Container from "../utils/Container"
import SectionTitle from "../utils/SectionTitle"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { useState } from "react"

const Blog = () => {
  const [width, setWidth] = useState(+window.innerWidth)
  
  window.addEventListener("resize", () => {
    setWidth(+window.innerWidth)
  })

  return (
    <section id="blog">
      <Container>
        <SectionTitle title="Our Blog.">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </SectionTitle>
        <main>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={
              width >= 0 && width < 640
              ? 1
              : width >= 640 && width < 1024
              ? 2
              : width >= 1024
              ? 3
              : 3
            }
            autoplay
            pagination={{ clickable: true }}
            className="cursor-grab"
          >
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.90cb13f6.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.e0cb1b1c.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.844772d7.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.0c16d81f.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.6ebd08bf.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="mb-12">
              <figure className="border">
                <div className="relative">
                  <img src="https://ivkovic.me/themes/min/static/media/preview.2dccd3dc.png" alt="Blog Post" className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-secondary-low opacity-0 transition hover:opacity-100">
                    <a href="#" className="uppercase text-3xl font-bold">Read More</a>
                  </div>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-bold text-lg mb-2">Blog Title</h3>
                  <p className="text-sm leading-[2] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
                  </p>
                  <span className="text-xs">15 May 2020</span>
                </figcaption>
              </figure>
            </SwiperSlide>
          </Swiper>
        </main>
      </Container>
    </section>
  )
}

export default Blog