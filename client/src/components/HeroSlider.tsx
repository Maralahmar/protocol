import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=600&fit=crop',
    key: 'slide1',
  },
  {
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=600&fit=crop',
    key: 'slide2',
  },
  {
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&h=600&fit=crop',
    key: 'slide3',
  },
  {
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&h=600&fit=crop',
    key: 'slide4',
  },
  {
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=600&fit=crop',
    key: 'slide5',
  },
]

export default function HeroSlider() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative h-[280px] sm:h-[450px] lg:h-screen overflow-hidden"
      aria-label="Hero slider"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 text-white">
            <div className="content-container max-w-2xl text-start w-full">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                {t(`hero.${slide.key}.title`)}
              </h2>
              <p className="text-white/90 text-sm sm:text-base mb-6">
                {t(`hero.${slide.key}.description`)}
              </p>
              <Link
                to="/category/all"
                className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
              >
                {t('hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 flex gap-2 z-20" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? 'bg-white w-8' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none sm:pointer-events-auto">
        <button
          type="button"
          onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors hidden sm:block"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors hidden sm:block"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
