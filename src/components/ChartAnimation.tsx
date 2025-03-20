
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

    // Define candlestick and leaf positions with improved sprout animation
    const candlesticks = [
      { x: 50, y: 150, width: 8, height: 0, color: '#000', growing: true, growthRate: 0.3, maxHeight: 40, wickHeight: 15, delay: 0 },
      { x: 80, y: 120, width: 8, height: 0, color: '#fff', growing: false, growthRate: 0.4, maxHeight: 25, wickHeight: 12, delay: 150 },
      { x: 110, y: 140, width: 8, height: 0, color: '#b3f08c', growing: false, growthRate: 0.5, maxHeight: 45, wickHeight: 18, delay: 300 },
      { x: 140, y: 160, width: 8, height: 0, color: '#000', growing: false, growthRate: 0.3, maxHeight: 30, wickHeight: 10, delay: 450 },
      { x: 170, y: 130, width: 8, height: 0, color: '#fff', growing: false, growthRate: 0.4, maxHeight: 35, wickHeight: 15, delay: 600 },
      { x: 200, y: 150, width: 8, height: 0, color: '#b3f08c', growing: false, growthRate: 0.3, maxHeight: 50, wickHeight: 20, delay: 750 },
    ];

    // Define leaf shapes with improved sprout animation
    const leaves = [
      { x: 45, y: 90, scale: 0, maxScale: 1.0, growing: false, delay: 800, color: '#b3f08c', rotation: -0.2, growthRate: 0.02 },
      { x: 110, y: 80, scale: 0, maxScale: 0.8, growing: false, delay: 900, color: '#b3f08c', rotation: 0.1, growthRate: 0.015 },
      { x: 200, y: 85, scale: 0, maxScale: 1.2, growing: false, delay: 1000, color: '#b3f08c', rotation: -0.1, growthRate: 0.018 },
    ];

    // Draw a leaf with improved smoothness
    const drawLeaf = (x: number, y: number, scale: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      // Draw the leaf shape with smoother curves
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(10, -15, 30, -20, 40, -5);
      ctx.bezierCurveTo(30, 10, 20, 15, 0, 15);
      ctx.bezierCurveTo(-20, 15, -30, 10, -40, -5);
      ctx.bezierCurveTo(-30, -20, -10, -15, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();

      // Add a stem with gradient
      const stemGradient = ctx.createLinearGradient(0, 0, 0, 25);
      stemGradient.addColorStop(0, '#75c32c');
      stemGradient.addColorStop(1, '#558c20');
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 25);
      ctx.strokeStyle = stemGradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add vein detail with subtle gradient
      const veinGradient = ctx.createLinearGradient(0, 0, 0, 15);
      veinGradient.addColorStop(0, '#a7e350');
      veinGradient.addColorStop(1, '#75c32c');
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, 5, 0, 10, 0, 15);
      ctx.strokeStyle = veinGradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // Animation frame counter and timestamps
    let frameCount = 0;
    let startTime = Date.now();
    
    // Animation loop with improved timing and easing
    const animate = () => {
      frameCount++;
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      // Clear canvas
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, width, height);
      
      // Helper function for smooth easing
      const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3);
      };
      
      // Animate candlesticks with delayed start and smooth growth
      candlesticks.forEach((stick, index) => {
        // Start growing candlesticks based on delay
        if (elapsedTime > stick.delay && !stick.growing) {
          stick.growing = true;
        }
        
        // Grow the candlestick with easing
        if (stick.growing && stick.height < stick.maxHeight) {
          const growthProgress = stick.height / stick.maxHeight;
          const easedGrowthRate = stick.growthRate * (1 - growthProgress * 0.5); // Slow down as it approaches max height
          stick.height += easedGrowthRate;
          
          if (stick.height >= stick.maxHeight) {
            stick.height = stick.maxHeight;
            
            // Once a candlestick is fully grown, allow leaves to start growing
            if (index < leaves.length) {
              leaves[index].growing = true;
            }
          }
        }
        
        // Draw candlestick wick with subtle gradient
        const wickGradient = ctx.createLinearGradient(
          stick.x + stick.width / 2, 
          stick.y - stick.wickHeight,
          stick.x + stick.width / 2,
          stick.y + stick.height + stick.wickHeight
        );
        wickGradient.addColorStop(0, '#777');
        wickGradient.addColorStop(0.5, '#555');
        wickGradient.addColorStop(1, '#777');
        
        ctx.beginPath();
        ctx.moveTo(stick.x + stick.width / 2, stick.y - stick.wickHeight);
        ctx.lineTo(stick.x + stick.width / 2, stick.y + stick.height + stick.wickHeight);
        ctx.strokeStyle = wickGradient;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw candlestick body with subtle shadow
        if (stick.height > 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.fillStyle = stick.color;
          ctx.fillRect(stick.x, stick.y, stick.width, stick.height);
          
          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Add border to white candlesticks for visibility
          if (stick.color === '#fff') {
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(stick.x, stick.y, stick.width, stick.height);
          }
        }
      });
      
      // Animate leaves with smooth scaling
      leaves.forEach((leaf) => {
        if (leaf.growing && leaf.scale < leaf.maxScale) {
          // Apply easing to make growth more natural
          const growthProgress = leaf.scale / leaf.maxScale;
          const easedGrowthRate = leaf.growthRate * easeOutCubic(1 - growthProgress);
          leaf.scale += easedGrowthRate;
          
          if (leaf.scale >= leaf.maxScale) {
            leaf.scale = leaf.maxScale;
          }
        }
        
        if (leaf.scale > 0) {
          drawLeaf(leaf.x, leaf.y, leaf.scale, leaf.color, leaf.rotation);
        }
      });
      
      // Reset animation when complete for looping
      if (elapsedTime > 5000) {
        startTime = Date.now();
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
      className="w-full h-64 md:h-96 lg:h-96 max-w-lg mx-auto opacity-90 -mt-16 md:-mt-24"
    />
  );
};

export default ChartAnimation;
