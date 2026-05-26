import { useState } from 'react'
import Hero from './sections/Hero'
import Work from './sections/Work'
import About from './sections/About'
import Contact from './sections/Contact'
import CanvasTrail from './components/CanvasTrail'
import GradientDots from './components/GradientDots'
import ProjectOverlay from './components/ProjectOverlay'
import ArchiveOverlay from './components/ArchiveOverlay'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [archiveOpen, setArchiveOpen]         = useState(false)

  return (
    <>
      <GradientDots />
      <CanvasTrail />
      <Hero />
      <Work
        onProjectClick={setSelectedProject}
        onArchiveOpen={() => setArchiveOpen(true)}
      />
      <About />
      <Contact />

      {/* Individual project deep-dive (case study or standard view) */}
      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Full-screen grid of the 6 archive projects */}
      {archiveOpen && (
        <ArchiveOverlay
          onClose={() => setArchiveOpen(false)}
          onProjectClick={setSelectedProject}
        />
      )}

      {/* Scroll-to-top — hidden when any overlay is open */}
      {!selectedProject && !archiveOpen && <ScrollToTop />}
    </>
  )
}

export default App
