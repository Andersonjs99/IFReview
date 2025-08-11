<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
   import '$lib/styles/welcome.css';

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = `rgba(0, 153, 51, ${Math.random() * 0.5 + 0.1})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const redirectTo = (path: string) => {
    goto(path);
  };

  function hoverEffect(node: HTMLElement) {
    const handleMouseEnter = () => {
      node.style.transform = 'translateY(-3px)';
    };
    
    const handleMouseLeave = () => {
      node.style.transform = 'translateY(0)';
    };
    
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    
    return {
      destroy() {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }

  onMount(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) + 
            Math.pow(particles[a].y - particles[b].y, 2)
          );
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 153, 51, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  });
</script>

<div class="page-container">
  <!-- Canvas como plano de fundo -->
  <canvas id="particles" class="particles-background"></canvas>

  <!-- Conteúdo principal -->
  <div class="welcome-page">
    <nav class="main-nav">
      <ul>
        <li><a href="/sobre" use:hoverEffect>Sobre</a></li>
        <li><a href="/contato" use:hoverEffect>Contato</a></li>
      </ul>
    </nav>

    <main class="welcome-content">
      <div class="logo-container">
        <img src="/ifreview_write.png" alt="IFPE Estuda" class="logo floating" />
      </div>

      <h1 class="welcome-title">BEM-VINDO</h1>

      <p class="welcome-text">
       Quer material de estudo específico para o seu curso no IFPE? 
       Acesse a plataforma gratuita criada por alunos para alunos e encontre materiais de aulas práticas, resumos e exercícios!
      </p>

      <div class="action-buttons">
        <button on:click={() => redirectTo('/login')} class="btn-login fill-effect">
          <span>ENTRAR</span>
        </button>
        <button on:click={() => redirectTo('/cadastro')} class="btn-signup slide-effect">
          <span>CRIAR CONTA</span>
        </button>
      </div>
    </main>

    <footer class="page-footer">
      <p>Desenvolvido por alunos do IFPE</p>
    </footer>
  </div>
</div>