
import React, { useRef, useEffect } from 'react';

export const AiVisualization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const colors = ['#667eea', '#764ba2', '#4ecdc4', '#a8e6cf'];

        class Particle {
            x: number;
            y: number;
            radius: number;
            color: string;
            vx: number;
            vy: number;

            constructor(x: number, y: number, radius: number, color: string) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx!.fillStyle = this.color;
                ctx!.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        const init = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = [];
            const particleCount = Math.floor(canvas.width * canvas.height / 20000);
            for (let i = 0; i < particleCount; i++) {
                const radius = Math.random() * 2 + 1;
                const x = Math.random() * (canvas.width - radius * 2) + radius;
                const y = Math.random() * (canvas.height - radius * 2) + radius;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, radius, color));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = Math.sqrt(
                        (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
                        (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
                    );
                    if (distance < (canvas.width / 7)) {
                        opacityValue = 1 - (distance / (canvas.width / 7));
                        ctx!.strokeStyle = `rgba(128, 128, 128, ${opacityValue})`;
                        ctx!.lineWidth = 1;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[a].x, particles[a].y);
                        ctx!.lineTo(particles[b].x, particles[b].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => p.update());
            connect();
            particles.forEach(p => p.draw());
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="ai-network-animation"
            className="w-full h-full opacity-50"
        />
    );
};