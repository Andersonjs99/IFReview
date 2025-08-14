<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { auth, db } from '$lib/firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { ref, set } from 'firebase/database';
  import '$lib/styles/welcome.css';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let isLoading = false;

  const handleSignup = async () => {
    try {
      isLoading = true;
      error = '';
      
      // Validações
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('Preencha todos os campos');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      console.log('Tentativa de cadastro:', { name, email });
      
      // Criar usuário na autenticação
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Salvar dados adicionais no Realtime Database
      await set(ref(db, 'users/' + user.uid), {
        name,
        email,
        createdAt: Date.now(),
        lastLogin: Date.now()
      });
      
      // Redirecionar para login com flag de sucesso
      await goto('/login?signupSuccess=true');
    } catch (err) {
      console.error('Falha no cadastro:', err);
      error = err.message;
      
      // Tratamento específico de erros do Firebase
      if (err.code === 'auth/email-already-in-use') {
        error = 'Este email já está cadastrado';
      } else if (err.code === 'auth/invalid-email') {
        error = 'Email inválido';
      } else if (err.code === 'auth/weak-password') {
        error = 'Senha muito fraca (mínimo 6 caracteres)';
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

<canvas id="particles" class="particles-background"></canvas>

<div class="login-container">
  <div class="login-box">
    <h1>Criar Conta</h1>
    
    {#if error}
      <div class="error-message">{error}</div>
    {/if}
    
    <form on:submit|preventDefault={handleSignup}>
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
      
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Sua senha (mínimo 6 caracteres)"
          class="form-input"
          minlength="6"
        />
      </div>
      
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
      
      <button type="submit" class="login-button" disabled={isLoading}>
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
    
    <div class="signup-link">
      Já tem uma conta? <a href="/login">Faça login</a>
    </div>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
  
  .login-box {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #009933;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #007a29;
  }
  
  .login-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .signup-link {
    margin-top: 1rem;
    text-align: center;
  }
  
  .signup-link a {
    color: #009933;
    text-decoration: none;
  }
  
  .signup-link a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: #ff3333;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #ffeeee;
    border-radius: 5px;
    text-align: center;
  }
  
  .particles-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>