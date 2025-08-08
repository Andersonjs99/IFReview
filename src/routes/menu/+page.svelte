<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import '$lib/styles/welcome.css';

  // Opções de cursos
  const cursos: string[] = [
    "Informática para Internet",
    "Logística",
    "Administração"
  ];

  // Opções de matérias por curso
  const materiasPorCurso: Record<string, string[]> = {
    "Informática para Internet": [
      "Desenvolvimento Web",
      "Banco de Dados",
      "Programação Orientada a Objetos",
      "Ética",
      "Projeto e Prática"
    ],
    "Logística": [
      "Fundamentos da Logística",
      "Gestão de Estoques e Compras",
      "Transporte e Distribuição",
      "Gestão da Qualidade",
      "Informática Aplicada"
    ],
    "Administração": [
      "Gestão de Pessoas",
      "Marketing Empresarial",
      "Finanças Corporativas",
      "Empreendedorismo",
      "Contabilidade Básica"
    ]
  };

  // Dados reativos
  let cursoSelecionado: string = "";
  let materiaSelecionada: string = "";
  let dataAula: string = "";

  // Matérias disponíveis (reagem ao curso selecionado)
  $: materiasDisponiveis = cursoSelecionado 
    ? materiasPorCurso[cursoSelecionado] || [] 
    : [];

  // Função para buscar aulas
  const buscarAulas = async () => {
  if (!cursoSelecionado || !materiaSelecionada || !dataAula) {
    alert("Por favor, selecione todos os campos");
    return;
  }

  try {
    // Salvar seleção
    localStorage.setItem('curso', cursoSelecionado);
    localStorage.setItem('materia', materiaSelecionada);
    localStorage.setItem('data', dataAula);

    await new Promise(resolve => setTimeout(resolve, 500));
    await goto('/resultados-aulas');
  } catch (error) {
    console.error('Erro na busca:', error);
    alert("Erro ao buscar aulas");
  }
};


  // Função da animação de partículas
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

  // Inicializa a animação ao carregar a página
  onMount(() => {
    animateParticles();
  });
</script>

<!-- Fundo animado -->
<canvas id="particles" class="particles-background"></canvas>

<!-- Conteúdo principal -->
<div class="container">
  <div class="card">
    <h1>Selecione o curso</h1>

    <!-- Curso -->
    <div class="campo">
      <label for="curso">Curso</label>
      <select id="curso" bind:value={cursoSelecionado} class="form-select">
        <option value="">-- Selecione o curso --</option>
        {#each cursos as curso}
          <option value={curso}>{curso}</option>
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
        disabled={!cursoSelecionado}
      >
        <option value="">{cursoSelecionado ? '-- Selecione a matéria --' : 'Selecione um curso primeiro'}</option>
        {#each materiasDisponiveis as materia}
          <option value={materia}>{materia}</option>
        {/each}
      </select>
    </div>

    <!-- Data -->
    <div class="campo">
      <label for="dataAula">Data da Aula</label>
      <input 
        type="date" 
        id="dataAula" 
        bind:value={dataAula}
        class="form-input"
        min={new Date().toISOString().split('T')[0]}
      />
    </div>

    <!-- Botão -->
    <button on:click={buscarAulas} class="buscar-button">
      Buscar Aulas
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

  .form-select, .form-input {
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

  .particles-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>
