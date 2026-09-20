import { useEffect, useState } from "react"


const slides = [
  {
    image: 'images/showcase/pexels-d_odd_y-885774-3882638.webp',
    category: 'Residential',
    title: 'Contemporary Living',
  },
  {
    image: 'images/showcase/pexels-lexi-lauwers-1431940-17939427.webp',
    category: 'Commercial',
    title: 'Places for Business',
  },
  {
    image: 'images/showcase/stock2-885774-3882638.webp',
    category: 'Civic',
    title: 'Spaces for Community',
  },
];



const ShowcaseSlider = () => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const basePath = import.meta.env.BASE_URL

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentSlide((current)=>(current+1) % slides.length)
        },5000)

        return ()=> clearInterval(interval);
    },[])


    const goToPrevious = ()=>{
        setCurrentSlide((current) => (current-1+slides.length) % slides.length)
    }

    const goToNext = ()=>{
        setCurrentSlide((current)=> (current + 1) % slides.length)
    }




  return (
    <div className="showcase-slider">
      <div
        className="showcase-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div className="showcase-slide" key={slide.image}>
            <img
              src={`${basePath}${slide.image}`}
              alt={`${slide.category} architecture - ${slide.title}`}
            />

            <div className="showcase-overlay">
              <span>{slide.category}</span>
              <strong>{slide.title}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="showcase-controls">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous showcase image"
        >
          ←
        </button>

        <span>
          {String(currentSlide + 1).padStart(2, '0')}
          {' / '}
          {String(slides.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next showcase image"
        >
          →
        </button>
      </div>

      <div className="showcase-dots">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.image}
            className={index === currentSlide ? 'active' : ''}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ShowcaseSlider