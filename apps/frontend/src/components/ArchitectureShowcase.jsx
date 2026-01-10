import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { assets } from '@/utils/assets';

function ArchitectureShowcase() {
  return (
    <Card variant="glass" size="lg" className="overflow-hidden">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-100">Architecture & Showcase</h3>
          <p className="text-sm text-gray-400">
            The live system map that powers the storytelling experience and proof of mind.
          </p>
        </div>
        <Button asChild variant="glass" size="sm">
          <Link to="/architecture">Open full view</Link>
        </Button>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
        <img
          src={assets.architectureDiagram}
          alt="Project architecture diagram"
          className="w-full h-56 sm:h-64 object-contain bg-black/30"
          loading="lazy"
        />
      </div>
    </Card>
  );
}

export default ArchitectureShowcase;
