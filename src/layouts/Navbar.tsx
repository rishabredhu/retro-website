import React, { useState, useEffect, Suspense } from 'react'
import { Menu, X, ChevronUp, FileText, Linkedin, Github, Mail, Twitter as XIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

/**
 * SocialLink interface defines the structure for social media links
 */
interface SocialLink {
  id: string
  title: string
  icon: React.ReactNode
  url: string
}

/**
 * Array of social media links
 */
const socialLinks: SocialLink[] = [
  { id: "twitter", title: "Twitter", icon: <XIcon size={24} />, url: "https://twitter.com/r3dhuu" },
  { id: "resume", title: "Resume", icon: <FileText size={24} />, url: "https://www.dropbox.com/scl/fi/34ix49vtkqls7fhnrl5en/resumeRS.pdf?rlkey=fozamonye3t3ocrka825hozg8&st=ag37ud6y&dl=0" },
  { id: "github", title: "GitHub", icon: <Github size={24} />, url: "https://github.com/rishabredhu" },
  { id: "linkedin", title: "LinkedIn", icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/rishabredhuu/" },
  { id: "email", title: "Email", icon: <Mail size={24} />, url: "mailto:rishabredhu@gmail.com" }
  
]

/**
 * GLB Model component
 */
function Model() {
  const { scene } = useGLTF('../public/assets/3d/spaceman.glb')
  return <primitive object={scene} />
}

/**
 * Navbar component
 */
export const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-purple-900 bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ width: '40px', height: '40px' }} onClick={scrollToTop}>
              <Canvas>
                <Suspense fallback={null}>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Model />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex items-center space-x-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-all duration-300"
                  title={link.title}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <motion.button 
              onClick={() => setToggle(!toggle)} 
              className="text-purple-300 hover:text-purple-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {toggle ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div 
            className="md:hidden bg-purple-900 bg-opacity-90 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-purple-300 hover:text-purple-100 transition-all duration-300 px-3 py-2 text-base font-medium"
                  title={link.title}
                  onClick={() => setToggle(false)}
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center">
                    {React.cloneElement(link.icon as React.ReactElement, { size: 28 })}
                    <span className="ml-2">{link.title}</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {scrolled && (
        <motion.button 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={32} />
        </motion.button>
      )}
    </nav>
  )
}

export default Navbar