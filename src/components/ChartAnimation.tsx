
import { useEffect, useRef } from 'react';

const ChartAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Draw candlestick chart
    const drawChart = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw some candlesticks
      const stickWidth = 10;
      const gap = 20;
      const startX = 50;
      const centerY = height / 2;
      
      for (let i = 0; i < 10; i++) {
        const x = startX + i * (stickWidth + gap);
        const isUp = Math.random() > 0.5;
        
        const bodyHeight = 30 + Math.random() * 50;
        const wickHeight = 20 + Math.random() * 30;
        
        // Draw the wick
        ctx.beginPath();
        ctx.moveTo(x + stickWidth / 2, centerY - bodyHeight / 2 - wickHeight);
        ctx.lineTo(x + stickWidth / 2, centerY + bodyHeight / 2 + wickHeight);
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw the body
        ctx.fillStyle = isUp ? '#b3f08c' : '#000';
        ctx.fillRect(
          x, 
          centerY - bodyHeight / 2, 
          stickWidth, 
          bodyHeight
        );
      }
      
      // Draw some leaves (similar to the design in the image)
      const leafPositions = [
        { x: startX - 20, y: centerY - 80, scale: 1.5, rotation: -0.2 },
        { x: startX + 3 * (stickWidth + gap), y: centerY - 100, scale: 1.2, rotation: 0.1 },
        { x: startX + 7 * (stickWidth + gap), y: centerY - 90, scale: 1.3, rotation: -0.3 }
      ];
      
      leafPositions.forEach(leaf => {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(leaf.scale, leaf.scale);
        
        // Draw a simple leaf
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(15, -15, 30, -5);
        ctx.quadraticCurveTo(15, 15, 0, 30);
        ctx.quadraticCurveTo(-15, 15, -30, -5);
        ctx.quadraticCurveTo(-15, -15, 0, 0);
        ctx.fillStyle = '#b3f08c';
        ctx.fill();
        
        ctx.restore();
      });
    };

    // Initial draw
    drawChart();
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      drawChart();
      frameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-64 md:h-80 lg:h-96 max-w-lg mx-auto opacity-75"
    />
  );
};

export default ChartAnimation;
