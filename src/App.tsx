import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Scene3D from './components/Scene3D';
import ChapterContent from './components/ChapterContent'; // Chapter 1.1
import ChapterTwo from './components/ChapterTwo';       // Chapter 1.2
import ChapterThree from './components/ChapterThree';   // Chapter 1.3
import ChapterFour from './components/ChapterFour';
import TopProgressBar from './components/TopProgressBar';
import FullscreenButton from './components/FullscreenButton';
import BottomProgressRing from './components/BottomProgressRing';
import InteractiveMascot from './components/InteractiveMascot';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen relative bg-blue-50/50">

        {/* Global Progress Bar */}
        <TopProgressBar />

        {/* Global Fullscreen Toggle */}
        <FullscreenButton />

        {/* Circular Bottom Right Progress Indicator */}
        <BottomProgressRing />

        {/* Full-Screen 3D Background (Persists globally) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Scene3D />
        </div>

        {/* Main Content Rendered by Route */}
        <div className="relative z-10 w-full pt-10">
          <Routes>
            <Route path="/" element={<Navigate to="/chapter-1.1" replace />} />
            <Route path="/chapter-1.1" element={<ChapterContent />} />
            <Route path="/chapter-1.2" element={<ChapterTwo />} />
            <Route path="/chapter-1.3" element={<ChapterThree />} />
            <Route path="/chapter-1.4" element={<ChapterFour />} />
          </Routes>
        </div>

        {/* Global Interactive Mascot */}
        <InteractiveMascot />
      </div>
    </BrowserRouter>
  );
}

export default App;
