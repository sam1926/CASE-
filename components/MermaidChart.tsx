import React, { useEffect, useRef } from 'react';

interface MermaidChartProps {
  chart: string;
  id: string;
}

const MermaidChart: React.FC<MermaidChartProps> = ({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mermaid is loaded from CDN
    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#e0e7ff',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#4f46e5',
          lineColor: '#64748b',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#fff',
        },
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      });

      const renderChart = async () => {
        if (containerRef.current) {
            // Generate a unique ID for the SVG to avoid conflicts
            const svgId = `mermaid-svg-${id}`;
            // Clean previous content
            containerRef.current.innerHTML = '';
            
            try {
                // Use the run method or render depending on version, 
                // but direct insertion for simple CDN usage is often easier via wrapper
                // Here we simulate the render manually
                const { svg } = await window.mermaid.render(svgId, chart);
                containerRef.current.innerHTML = svg;
            } catch (e) {
                console.error("Mermaid render error:", e);
                containerRef.current.innerHTML = "Error rendering diagram. Please check syntax.";
            }
        }
      };

      renderChart();
    }
  }, [chart, id]);

  return (
    <div className="w-full overflow-x-auto bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex justify-center">
      <div ref={containerRef} className="mermaid-container w-full max-w-4xl" />
    </div>
  );
};

export default MermaidChart;