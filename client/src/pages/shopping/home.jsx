import React, { useEffect, useState } from 'react'
import a1 from '/a1.webp'
import a3 from '/a3.jpg'
import a4 from '/back.jpg'
import a5 from '/a5.png'
import { Button } from '@/components/ui/button'
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react'

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [a1, a3,a4,a5]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Carousel Section */}
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex justify-center items-center">
        {/* Slides */}
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            alt={`Slide ${index + 1}`}
          />
        ))}
        {/* Navigation Buttons */}
        <Button
          onClick={() =>
            setCurrentSlide((currentSlide) => (currentSlide - 1 + slides.length) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftCircleIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRightCircleIcon className="w-6 h-6" />
        </Button>
        {/* Slide Indicators */}
        <div className="absolute bottom-4 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-400 text-center py-6 text-slate-900 text-sm font-medium shadow-inner mt-auto">
        <div className="container mx-auto px-4">
          <p>© 2025 Your Store. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-amber-800 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-amber-800 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-amber-800 transition-colors duration-200">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ShoppingHome