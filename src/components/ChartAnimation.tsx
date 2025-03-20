
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

    // Define candlestick and leaf positions
    const candlesticks = [
      { x: 50, y: 150, width: 8, height: 40, color: '#000', growing: true, growthRate: 0.5, maxHeight: 40, wickHeight: 15 },
      { x: 80, y: 120, width: 8, height: 0, color: '#fff', growing: false, growthRate: 0.6, maxHeight: 25, wickHeight: 12 },
      { x: 110, y: 140, width: 8, height: 0, color: '#b3f08c', growing: false, growthRate: 0.7, maxHeight: 45, wickHeight: 18 },
      { x: 140, y: 160, width: 8, height: 0, color: '#000', growing: false, growthRate: 0.5, maxHeight: 30, wickHeight: 10 },
      { x: 170, y: 130, width: 8, height: 0, color: '#fff', growing: false, growthRate: 0.6, maxHeight: 35, wickHeight: 15 },
      { x: 200, y: 150, width: 8, height: 0, color: '#b3f08c', growing: false, growthRate: 0.5, maxHeight: 50, wickHeight: 20 },
    ];

    // Define leaf shapes based on the uploaded image
    const leaves = [
      { x: 45, y: 90, scale: 0, maxScale: 1.0, growing: false, delay: 120, color: '#b3f08c', rotation: -0.2 },
      { x: 110, y: 80, scale: 0, maxScale: 0.8, growing: false, delay: 180, color: '#b3f08c', rotation: 0.1 },
      { x: 200, y: 85, scale: 0, maxScale: 1.2, growing: false, delay: 220, color: '#b3f08c', rotation: -0.1 },
    ];

    // Draw a leaf
    const drawLeaf = (x: number, y: number, scale: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      // Draw the leaf shape similar to the reference image
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(10, -15, 30, -20, 40, -5);
      ctx.bezierCurveTo(30, 10, 20, 15, 0, 15);
      ctx.bezierCurveTo(-20, 15, -30, 10, -40, -5);
      ctx.bezierCurveTo(-30, -20, -10, -15, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();

      // Add a stem
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 25);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add vein detail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, 5, 0, 10, 0, 15);
      ctx.strokeStyle = '#75c32c';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // Animation frame counter
    let frameCount = 0;
    
    // Animation loop
    const animate = () => {
      frameCount++;
      
      // Clear canvas
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, width, height);
      
      // Animate candlesticks first
      candlesticks.forEach((stick, index) => {
        // Start growing candlesticks in sequence
        if (frameCount > index * 15 && !stick.growing) {
          stick.growing = true;
        }
        
        // Grow the candlestick
        if (stick.growing && stick.height < stick.maxHeight) {
          stick.height += stick.growthRate;
          if (stick.height >= stick.maxHeight) {
            stick.height = stick.maxHeight;
            
            // Once a candlestick is fully grown, allow its leaf to start growing
            if (index < 3 && leaves[index]) {
              setTimeout(() => {
                leaves[index].growing = true;
              }, leaves[index].delay);
            }
          }
        }
        
        // Draw candlestick wick
        ctx.beginPath();
        ctx.moveTo(stick.x + stick.width / 2, stick.y - stick.wickHeight);
        ctx.lineTo(stick.x + stick.width / 2, stick.y + stick.height + stick.wickHeight);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw candlestick body
        ctx.fillStyle = stick.color;
        ctx.fillRect(stick.x, stick.y, stick.width, stick.height);
        
        // Add border to white candlesticks for visibility
        if (stick.color === '#fff') {
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(stick.x, stick.y, stick.width, stick.height);
        }
      });
      
      // Animate leaves after candlesticks start appearing
      leaves.forEach((leaf) => {
        if (leaf.growing && leaf.scale < leaf.maxScale) {
          leaf.scale += 0.01;
          if (leaf.scale >= leaf.maxScale) {
            leaf.scale = leaf.maxScale;
          }
        }
        
        if (leaf.scale > 0) {
          drawLeaf(leaf.x, leaf.y, leaf.scale, leaf.color, leaf.rotation);
        }
      });
      
      // Reset animation when complete
      if (frameCount > 400) {
        frameCount = 0;
        candlesticks.forEach(stick => {
          stick.height = 0;
          stick.growing = false;
        });
        leaves.forEach(leaf => {
          leaf.scale = 0;
          leaf.growing = false;
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
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
