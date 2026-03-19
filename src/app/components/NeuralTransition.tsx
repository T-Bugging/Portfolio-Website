import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Point {
  x: number;
  y: number;
  layer: number;
}

export function NeuralTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // 1. Structural dimensions based on reference
  const layerCounts = [4, 5, 5, 5, 3];
  
  const { flattenedPoints, connections } = useMemo(() => {
    const layers: Point[][] = [];
    const flat: Point[] = [];
    const conns: { from: Point; to: Point }[] = [];

    layerCounts.forEach((count, layerIdx) => {
      const layerNodes: Point[] = [];
      for (let i = 0; i < count; i++) {
        const node = {
          x: 15 + layerIdx * 17.5,
          y: 45 - ((count - 1) * 8) / 2 + (i * 8), // Shifted up slightly to make room for text below
          layer: layerIdx
        };
        layerNodes.push(node);
        flat.push(node);
      }
      layers.push(layerNodes);
    });

    for (let l = 0; l < layers.length - 1; l++) {
      layers[l].forEach(fromNode => {
        layers[l + 1].forEach(toNode => {
          conns.push({ from: fromNode, to: toNode });
        });
      });
    }

    return { flattenedPoints: flat, connections: conns };
  }, []);

  const randomPoints = useMemo(() => 
    flattenedPoints.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    })), [flattenedPoints.length]);

  const getNodeColor = (layerIdx: number) => {
    if (layerIdx === 0) return '#4ade80'; // Green
    if (layerIdx === layerCounts.length - 1) return '#fb7185'; // Coral
    return '#94a3b8'; // Slate-Blue
  };

  return (
    <div ref={containerRef} className="h-[300vh] relative bg-zinc-50 overflow-visible">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Network Area */}
        <div className="relative w-full max-w-5xl h-[500px]">
          <svg className="w-full h-full overflow-visible">
            {/* Edges */}
            {connections.map((conn, i) => (
              <motion.line
                key={`line-${i}`}
                x1={`${conn.from.x}%`} y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`} y2={`${conn.to.y}%`}
                stroke="#6366f1"
                strokeWidth="0.5"
                style={{ 
                  opacity: useTransform(smoothProgress, [0.5, 0.8], [0, 0.25]) 
                }}
              />
            ))}

            {/* Nodes - Increased Size */}
            {flattenedPoints.map((point, i) => (
              <motion.circle
                key={`node-${i}`}
                r="9" 
                fill={getNodeColor(point.layer)}
                stroke="white"
                strokeWidth="2.5"
                style={{
                  cx: useTransform(smoothProgress, [0.1, 0.7], [`${randomPoints[i].x}%`, `${point.x}%`]),
                  cy: useTransform(smoothProgress, [0.1, 0.7], [`${randomPoints[i].y}%`, `${point.y}%`]),
                  opacity: useTransform(smoothProgress, [0, 0.1, 1, 1], [0, 1, 1, 1]),
                }}
              />
            ))}
          </svg>
        </div>

        {/* 2. Tagline Box - Now positioned UNDER the network */}
        <motion.div 
          style={{ 
            // Appears only after network assembly (0.75 -> 0.9)
            opacity: useTransform(smoothProgress, [0.75, 0.9], [0, 1]),
            y: useTransform(smoothProgress, [0.75, 0.9], [40, -130]) // Slight gap from the network
          }}
          className="z-20 mt-8" 
        >
          <div className="px-10 py-5 rounded-xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-light text-zinc-800 tracking-tight italic text-center">
              Turning Data, into <span className="text-indigo-600 font-semibold">Clear</span> Decisions.
            </h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}