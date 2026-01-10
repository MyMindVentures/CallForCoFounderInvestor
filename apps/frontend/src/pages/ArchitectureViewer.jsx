import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, RefreshCcw, Move } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { assets } from '@/utils/assets';

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.15;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function ArchitectureViewer() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const zoomIn = () => setScale((prev) => clamp(prev + SCALE_STEP, MIN_SCALE, MAX_SCALE));
  const zoomOut = () => setScale((prev) => clamp(prev - SCALE_STEP, MIN_SCALE, MAX_SCALE));
  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    setIsPanning(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.lastX = event.clientX;
    event.currentTarget.dataset.lastY = event.clientY;
  };

  const handlePointerMove = (event) => {
    if (!isPanning) return;
    const lastX = Number(event.currentTarget.dataset.lastX || event.clientX);
    const lastY = Number(event.currentTarget.dataset.lastY || event.clientY);
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    event.currentTarget.dataset.lastX = event.clientX;
    event.currentTarget.dataset.lastY = event.clientY;
  };

  const handlePointerUp = (event) => {
    setIsPanning(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerLeave = (event) => {
    if (!isPanning) return;
    setIsPanning(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP;
    setScale((prev) => clamp(prev + delta, MIN_SCALE, MAX_SCALE));
  };

  return (
    <PageTransition className="relative min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <img
        src={assets.backgrounds.storytelling}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-100">
              Architecture Showcase
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Zoom and pan the latest architecture diagram generated from Mermaid.
            </p>
          </div>
          <Button asChild variant="glass" size="sm">
            <Link to="/storytelling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Story
            </Link>
          </Button>
        </motion.div>

        <Card variant="glass" size="lg" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Move className="w-4 h-4 text-teal-300" />
              Drag to pan • Scroll or buttons to zoom
            </div>
            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm" onClick={zoomOut} aria-label="Zoom out">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="sm" onClick={zoomIn} aria-label="Zoom in">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="sm" onClick={resetView} aria-label="Reset view">
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative h-[70vh] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <div
              className={`absolute inset-0 ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              onPointerCancel={handlePointerLeave}
              onWheel={handleWheel}
              style={{ touchAction: 'none' }}
            >
              <div
                className="flex min-h-full min-w-full items-center justify-center"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: 'center',
                }}
              >
                <img
                  src={assets.architectureDiagram}
                  alt="Project architecture diagram"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}

export default ArchitectureViewer;
