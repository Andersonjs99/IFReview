<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import '$lib/styles/welcome.css'; // Importa o CSS com as animações

  let email = '';
  let password = '';

const handleLogin = async () => {
  try {
    console.log('Login attempt:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redireciona para a rota "menu"
    await goto('/menu');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

  // Animação de partículas (a mesma da welcome page)
  onMount(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuração do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Cores do tema verde
    const colors = {
      particle: 'rgba(0, 153, 51, 0.6)', // Verde principal com transparência
      line: 'rgba(0, 153, 51, 0.3)'      // Verde mais claro para as linhas
    };

    // Criação de partículas
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1
    }));

    // Animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Atualiza e desenha partículas
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Rebate nas bordas
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Desenha partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });
      
      // Conecta partículas próximas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  });
</script>

<!-- Canvas para a animação de fundo -->
<canvas id="particles" class="particles-background"></canvas>

<!-- Container do formulário de login -->
<div class="login-container">
  <div class="login-box">
    <h1>Login</h1>
    
    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
      <label for="email">E-mail:</label>
        <input
          type="email"
          bind:value={email}
          required
          placeholder="Seu email"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
      <label for="senha">Senha:</label>
        <input
          type="password"
          bind:value={password}
          required
          placeholder="Sua senha"
          class="form-input"
        />
      </div>
      
      <button type="submit" class="login-button">
        Entrar
      </button>
    </form>
    
    <div class="signup-link">
      Não tem uma conta? <a href="/cadastro">Crie uma agora</a>
    </div>
  </div>
</div>