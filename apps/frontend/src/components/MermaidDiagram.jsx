import { useEffect, useMemo, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '@/lib/utils';

let mermaidInitialized = false;

const initMermaid = () => {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'dark',
    themeVariables: {
      fontFamily: 'Poppins, system-ui, sans-serif',
      primaryColor: '#0f172a',
      primaryTextColor: '#e2e8f0',
      primaryBorderColor: '#22d3ee',
      lineColor: '#38bdf8',
      tertiaryColor: '#0f172a',
      tertiaryBorderColor: '#22d3ee',
      tertiaryTextColor: '#e2e8f0',
    },
  });
  mermaidInitialized = true;
};

function MermaidDiagram({ chart, className, ariaLabel = 'Mermaid diagram' }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const diagramId = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    if (!chart || !containerRef.current) {
      setError(null);
      return;
    }

    initMermaid();
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const { svg, bindFunctions } = await mermaid.render(diagramId, chart);
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', '100%');
          svgElement.style.maxWidth = '100%';
          svgElement.style.height = 'auto';
        }

        if (bindFunctions) {
          bindFunctions(containerRef.current);
        }

        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError('Unable to render the diagram.');
        }
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  return (
    <div className={cn('relative', className)} role="img" aria-label={ariaLabel}>
      <div ref={containerRef} className={error ? 'hidden' : ''} />
      {error && (
        <div className="text-sm text-red-400">{error}</div>
      )}
    </div>
  );
}

export default MermaidDiagram;
