<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { auth, db } from '$lib/firebase';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { ref, set } from 'firebase/database'; // Descomentado pois é usado no código
  import '$lib/styles/welcome.css';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  const handleLogin = async () => {
    try {
      isLoading = true;
      error = '';
      
      // Validação básica
      if (!email || !password) {
        throw new Error('Preencha todos os campos');
      }

      console.log('Tentativa de login:', { email });
      
      // Autenticar com Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Atualizar último login no Realtime Database
      await set(ref(db, 'users/' + user.uid + '/lastLogin'), Date.now());
      
      // Redirecionar para o menu
      await goto('/menu');
    } catch (err: unknown) {
      const erro = err as { message: string; code?: string };

      console.error('Falha no login:', erro.message);

      if (erro.code === 'auth/invalid-email') {
        error = 'Email inválido';
      } else if (erro.code === 'auth/user-not-found') {
        error = 'Usuário não encontrado';
      } else if (erro.code === 'auth/wrong-password') {
        error = 'Senha incorreta';
      } else if (erro.code === 'auth/too-many-requests') {
        error = 'Muitas tentativas. Tente mais tarde.';
      } else if (erro.message) {
        error = erro.message;
      } else {
        error = 'Ocorreu um erro durante o login';
      }
    } finally {
      isLoading = false;
    }
  };

  // Animação de partículas
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
          
          if (distance < 100) { // Corrigido o erro de digitação
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

<canvas id="particles" class="particles-background"></canvas>

<!-- Container do formulário de login -->
<div class="login-container">
  <div class="login-box">
    <h1>Login</h1>
    
    {#if error}
      <div class="error-message">{error}</div>
    {/if}
    
    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
<<<<<<< HEAD
        <label for="email">Email</label>
=======
      <label for="email">E-mail:</label>
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="Seu email"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
<<<<<<< HEAD
        <label for="password">Senha</label>
=======
      <label for="senha">Senha:</label>
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Sua senha"
          class="form-input"
        />
      </div>
      
      <button type="submit" class="login-button" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
    
    <div class="signup-link">
      Não tem uma conta? <a href="/cadastro">Crie uma agora</a>
    </div>
  </div>
</div>