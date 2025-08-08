<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import '$lib/styles/welcome.css'; // Mesmo CSS da welcome page

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  const handleSignup = async () => {
    try {
      // Validação básica
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      console.log('Signup attempt:', { name, email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redireciona para login com flag de sucesso
      await goto('/login?signupSuccess=true');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Mesma animação de partículas do login
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

    const colors = {
      particle: 'rgba(0, 153, 51, 0.6)',
      line: 'rgba(0, 153, 51, 0.3)'
    };

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });
      
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

<!-- Mesmo fundo animado -->
<canvas id="particles" class="particles-background"></canvas>

<!-- Estrutura do formulário corrigida -->
<div class="login-container">
  <div class="login-box">
    <h1>Criar Conta</h1>
    
    <form on:submit|preventDefault={handleSignup}>
      <!-- Campo Nome - Corrigido -->
      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input
          id="name"
          type="text"
          bind:value={name}
          required
          placeholder="Seu nome completo"
          class="form-input"
        />
      </div>
      
      <!-- Campo Email - Corrigido -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="Seu email"
          class="form-input"
        />
      </div>
      
      <!-- Campo Senha - Corrigido -->
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Sua senha"
          class="form-input"
          minlength="6"
        />
      </div>
      
      <!-- Campo Confirmar Senha - Corrigido -->
      <div class="form-group">
        <label for="confirmPassword">Confirme sua Senha</label>
        <input
          id="confirmPassword"
          type="password"
          bind:value={confirmPassword}
          required
          placeholder="Digite a senha novamente"
          class="form-input"
          minlength="6"
        />
      </div>
      
      <button type="submit" class="login-button">
        Cadastrar
      </button>
    </form>
    
    <div class="signup-link">
      Já tem uma conta? <a href="/login">Faça login</a>
    </div>
  </div>
</div>