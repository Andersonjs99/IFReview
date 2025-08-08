<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Dados do curso
  let curso = '';
  let materia = '';
  let data = '';
  let videoURL = '';
  let videoTitulo = '';
  let resumo = '';
  let notaAnterior = 7.5; // Exemplo de nota
  let estudado = false;
  let progresso = 0;

  // Vídeos relacionados (adaptados para seus cursos)
  const videosRelacionados: Record<string, { url: string; titulo: string; resumo: string }> = {
    'Informática para Internet': {
      url: 'https://www.youtube.com/watch?v=5Hn58p-hYC0&t=60s',
      titulo: 'Desenvolvimento Web Moderno',
      resumo: 'Aprenda as tecnologias mais recentes para desenvolvimento web front-end e back-end.'
    },
    'Logística': {
      url: 'https://www.youtube.com/embed/VIDEO_LOGISTICA',
      titulo: 'Gestão de Cadeia de Suprimentos',
      resumo: 'Conceitos avançados de gestão logística e otimização de processos.'
    },
    'Administração': {
      url: 'https://www.youtube.com/embed/VIDEO_ADMINISTRACAO',
      titulo: 'Gestão Empresarial',
      resumo: 'Fundamentos de administração e gestão de negócios.'
    }
  };

  onMount(() => {
    // Recupera dados do localStorage
    curso = localStorage.getItem('curso') || 'Curso não selecionado';
    materia = localStorage.getItem('materia') || 'Matéria não selecionada';
    data = localStorage.getItem('data') || new Date().toLocaleDateString();

    // Configura progresso baseado no curso
    if (curso.includes('Informática')) progresso = 45;
    else if (curso.includes('Logística')) progresso = 60;
    else if (curso.includes('Administração')) progresso = 30;

    const info = videosRelacionados[curso] || {
      url: '',
      titulo: 'Conteúdo em produção',
      resumo: 'Estamos preparando o material para este curso.'
    };

    videoURL = info.url;
    videoTitulo = info.titulo;
    resumo = info.resumo;

    estudado = localStorage.getItem(`estudado-${curso}`) === 'true';
  });

  const responderQuiz = () => {
    goto('/quiz');
  };

  const marcarComoEstudado = () => {
    estudado = true;
    localStorage.setItem(`estudado-${curso}`, 'true');
  };
</script>

<div class="dashboard">
  <header>
    <h1>Ecourse Dashboard</h1>
    <h2>My Courses</h2>
    <p class="saudacao">Good Morning James!</p>
  </header>

  <div class="curso-container">
    <div class="curso-card">
      <h3>{curso}</h3>
      <div class="progress-bar">
        <div class="progress" style={`width: ${progresso}%`}></div>
      </div>
      <p class="progress-text">{progresso}% Completo</p>
      
      {#if videoURL}
        <iframe class="video" src={videoURL} frameborder="0" allowfullscreen></iframe>
      {:else}
        <div class="video-placeholder">Vídeo Indisponível</div>
      {/if}

      <div class="curso-info">
        <h4>{videoTitulo}</h4>
        <p>{resumo}</p>
        
        <div class="meta-info">
          <p><strong>Matéria:</strong> {materia}</p>
          <p><strong>Data:</strong> {data}</p>
          <p class="nota">📊 Última nota: <strong>{notaAnterior}/10</strong></p>
        </div>

        {#if estudado}
          <p class="estudado">✅ Aula concluída</p>
        {:else}
          <button class="marcar" on:click={marcarComoEstudado}>✅ Marcar como concluída</button>
        {/if}
      </div>

      <div class="action-buttons">
        <button class="quiz-button" on:click={responderQuiz}>Responder Quiz</button>
        <button class="back-button" on:click={() => goto('/menu')}>Voltar aos Cursos</button>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 30px;
  }

  h1 {
    color: #2b7a4b;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 5px;
  }

  .saudacao {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .curso-container {
    display: flex;
    justify-content: center;
  }

  .curso-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 800px;
    overflow: hidden;
    padding: 25px;
  }

  .curso-card h3 {
    color: #2b7a4b;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .progress-bar {
    background: #e0e0e0;
    border-radius: 10px;
    height: 10px;
    margin-bottom: 15px;
    overflow: hidden;
  }

  .progress {
    background: #2b7a4b;
    height: 100%;
    transition: width 0.5s ease;
  }

  .progress-text {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .video {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .video-placeholder {
    background: #f5f5f5;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #666;
    margin-bottom: 20px;
  }

  .curso-info h4 {
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  .curso-info p {
    color: #555;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .meta-info {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .meta-info p {
    margin: 8px 0;
  }

  .nota {
    color: #2b7a4b;
    font-weight: bold;
  }

  .estudado {
    color: #2b7a4b;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 25px;
  }

  .quiz-button, .back-button, .marcar {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .quiz-button {
    background-color: #2b7a4b;
    color: white;
  }

  .quiz-button:hover {
    background-color: #24693e;
  }

  .back-button {
    background-color: white;
    color: #2b7a4b;
    border: 2px solid #2b7a4b;
  }

  .back-button:hover {
    background-color: #2b7a4b;
    color: white;
  }

  .marcar {
    background-color: #e8f5e9;
    color: #2b7a4b;
    border: 1px solid #2b7a4b;
    width: 100%;
  }

  .marcar:hover {
    background-color: #c8e6c9;
  }
</style>