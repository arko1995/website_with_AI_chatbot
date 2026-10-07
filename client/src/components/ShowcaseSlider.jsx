import { useEffect, useState, useRef } from "react";

const slides = [
  {
    video: "animation/1326 E (Living Room).mp4",
    category: "Residential",
    title: "Living Room",
  },
  {
    video: "animation/The Foundry 55 (Workforce Housing).mp4",
    category: "The Foundry 55",
    title: "Workforce Housing",
  },
  {
    video: "animation/The Madison junction (Exterior).mp4",
    category: "Commercial",
    title: "Exterior",
  },
  {
    video: "animation/The Slice (Courtyard).mp4",
    category: "Residential",
    title: "Courtyard",
  },
];

const ShowcaseSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const basePath = import.meta.env.BASE_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentSlide) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentSlide]);

  const goToPrevious = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div className="showcase-slider">
      <div
        className="showcase-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div className="showcase-slide" key={slide.video}>
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              src={
                index === currentSlide ? `${basePath}${slide.video}` : undefined
              }
              muted
              loop
              playsInline
              preload={index === currentSlide ? "auto" : "metadata"}
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
          {String(currentSlide + 1).padStart(2, "0")}
          {" / "}
          {String(slides.length).padStart(2, "0")}
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
            key={slide.video}
            className={index === currentSlide ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowcaseSlider;
