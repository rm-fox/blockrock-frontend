const SectionTitle = ({ title, children }) => {
  return (
    <>
      <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-extrabold uppercase text-center lg:text-start mb-5">{title}</h1>
      <p className="mb-11 text-xs max-w-2xl leading-[2] text-center mx-auto lg:text-start lg:mx-0">
        {children}
      </p>
    </>
  )
}

export default SectionTitle