<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { ref, get, child } from 'firebase/database';
  import '$lib/styles/welcome.css';

  // Dados reativos
  let cursos: {id: string, nome: string}[] = [];
  let materias: {id: string, nome: string}[] = [];
  let assuntos: {id: string, nome: string}[] = [];
  let isLoading = false;
  let error = '';

  let cursoSelecionado = '';
  let materiaSelecionada = '';
  let assuntoSelecionado = '';

  // Carrega cursos do Firebase
  onMount(async () => {
    try {
      isLoading = true;
      const snapshot = await get(child(ref(db), 'cursos'));
      
      if (snapshot.exists()) {
        cursos = Object.entries(snapshot.val()).map(([id, curso]: [string, any]) => ({
          id,
          nome: curso.nome
        }));
      }
    } catch (err) {
      console.error('Erro ao carregar cursos:', err);
      error = 'Erro ao carregar cursos';
    } finally {
      isLoading = false;
      animateParticles();
    }
  });

  // Carrega matérias quando curso é selecionado
  $: {
    if (cursoSelecionado) {
      loadMaterias(cursoSelecionado);
    } else {
      materias = [];
      assuntos = [];
    }
  }

  // Carrega assuntos quando matéria é selecionada
  $: {
    if (materiaSelecionada && cursoSelecionado) {
      loadAssuntos(cursoSelecionado, materiaSelecionada);
    } else {
      assuntos = [];
    }
  }

  async function loadMaterias(cursoId: string) {
    try {
      isLoading = true;
      const snapshot = await get(child(ref(db), `cursos/${cursoId}/materias`));
      
      if (snapshot.exists()) {
        materias = Object.entries(snapshot.val()).map(([id, materia]: [string, any]) => ({
          id,
          nome: materia.nome
        }));
      } else {
        materias = [];
      }
      materiaSelecionada = '';
      assuntoSelecionado = '';
    } catch (err) {
      console.error('Erro ao carregar matérias:', err);
      error = 'Erro ao carregar matérias';
    } finally {
      isLoading = false;
    }
  }

  async function loadAssuntos(cursoId: string, materiaId: string) {
    try {
      isLoading = true;
      const snapshot = await get(child(ref(db), `cursos/${cursoId}/materias/${materiaId}/assuntos`));
      
      if (snapshot.exists()) {
        assuntos = Object.entries(snapshot.val()).map(([id, assunto]: [string, any]) => ({
          id,
          nome: assunto.nome
        }));
      } else {
        assuntos = [];
      }
      assuntoSelecionado = '';
    } catch (err) {
      console.error('Erro ao carregar assuntos:', err);
      error = 'Erro ao carregar assuntos';
    } finally {
      isLoading = false;
    }
  }

  // Função para buscar aulas
  const buscarAulas = async () => {
    if (!cursoSelecionado || !materiaSelecionada || !assuntoSelecionado) {
      error = "Por favor, selecione o curso, matéria e assunto";
      return;
    }

    try {
      isLoading = true;
      error = '';
      
      // Redireciona para a página de resultados com os parâmetros
      await goto(`/resultados-aulas?curso=${cursoSelecionado}&materia=${materiaSelecionada}&assunto=${assuntoSelecionado}`);
    } catch (err) {
      console.error('Erro na busca:', err);
      error = "Erro ao buscar aulas";
    } finally {
      isLoading = false;
    }
  };

  // Função da animação de partículas (mantida igual)
  const animateParticles = () => {
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
  };
</script>

<!-- Fundo animado -->
<canvas id="particles" class="particles-background"></canvas>

<!-- Conteúdo principal -->
<div class="container">
  <div class="card">
    <h1>Selecione o conteúdo</h1>

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <!-- Curso -->
    <div class="campo">
      <label for="curso">Curso</label>
      <select 
        id="curso" 
        bind:value={cursoSelecionado} 
        class="form-select"
        disabled={isLoading}
      >
        <option value="">-- Selecione o curso --</option>
        {#each cursos as curso}
          <option value={curso.id}>{curso.nome}</option>
        {/each}
      </select>
    </div>

    <!-- Matéria -->
    <div class="campo">
      <label for="materia">Matéria</label>
      <select 
        id="materia" 
        bind:value={materiaSelecionada} 
        class="form-select"
        disabled={!cursoSelecionado || isLoading}
      >
        <option value="">{cursoSelecionado ? '-- Selecione a matéria --' : 'Selecione um curso primeiro'}</option>
        {#each materias as materia}
          <option value={materia.id}>{materia.nome}</option>
        {/each}
      </select>
    </div>

    <!-- Assunto -->
    <div class="campo">
      <label for="assunto">Assunto</label>
      <select 
        id="assunto" 
        bind:value={assuntoSelecionado} 
        class="form-select"
        disabled={!materiaSelecionada || isLoading}
      >
        <option value="">{materiaSelecionada ? '-- Selecione o assunto --' : 'Selecione uma matéria primeiro'}</option>
        {#each assuntos as assunto}
          <option value={assunto.id}>{assunto.nome}</option>
        {/each}
      </select>
    </div>

    <!-- Botão -->
    <button on:click={buscarAulas} class="buscar-button" disabled={isLoading}>
      {isLoading ? 'Carregando...' : 'Buscar Aulas'}
    </button>
  </div>
</div>

<style>
  .container {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 100px auto;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .card h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #006600;
  }

  .campo {
    margin-bottom: 20px;
  }

  .form-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .buscar-button {
    width: 100%;
    padding: 12px;
    background-color: #009933;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  .buscar-button:hover {
    background-color: #007a29;
  }

  .buscar-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .particles-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .error-message {
    color: #ff3333;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #ffeeee;
    border-radius: 5px;
    text-align: center;
  }
</style>