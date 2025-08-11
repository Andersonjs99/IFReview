<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Interfaces de tipo
  interface Revisao {
    data: string;
    conteudo: string;
    materia?: string;
  }

  interface Video {
    url: string;
    titulo: string;
    resumo: string;
    assunto?: string;
    dataPublicacao?: string;
    canal?: string;
    duracao?: string;
  }

  interface SessaoEstudo {
    id: number;
    nome: string;
    tempo: number;
    cor?: string;
  }

  interface EventoCalendario {
    data: string;
    titulo: string;
    horario: string;
  }

  interface AulaFaltada {
    materia: string;
    data: string;
    assunto: string;
  }

  interface Desempenho {
    quizzes: number;
    exercicios: number;
    participacao: number;
  }

  // Dados do usuário e curso
  let nomeUsuario: string = 'James';
  let curso: string = 'Informática para Internet';
  let materia: string = 'Desenvolvimento Web';
  let dataAula: string = new Date().toLocaleDateString();
  
  // Dados do vídeo atual
  let videoAtual: Video = {
    url: 'https://www.youtube.com/embed/5Hn58p-hYC0?start=60',
    titulo: 'Desenvolvimento Web Moderno',
    resumo: 'Aprenda as tecnologias mais recentes para desenvolvimento web front-end e back-end.',
    assunto: 'HTML5, CSS3, JavaScript',
    dataPublicacao: '15/03/2023'
  };

  // Progresso e desempenho
  let progresso: number = 45;
  let notaAnterior: number = 7.5;
  let desempenho: Desempenho = {
    quizzes: 78,
    exercicios: 85,
    participacao: 90
  };
  
  // Controle de estudos
  let estudado: boolean = false;
  let comentario: string = '';
  let resumoUsuario: string = '';
  let revisoes: Revisao[] = [];
  let aulasFaltadas: AulaFaltada[] = [
    { materia: 'Desenvolvimento Web', data: '10/08/2023', assunto: 'Flexbox e Grid Layout' },
    { materia: 'Banco de Dados', data: '05/08/2023', assunto: 'Modelagem Relacional' }
  ];

  // Pomodoro
  let pomodoroAtivo: boolean = false;
  let tempoPomodoro: number = 25 * 60;
  let tempoDecorrido: number = 0;
  let intervaloPomodoro: NodeJS.Timeout | null = null;
  
  const tiposSessao: SessaoEstudo[] = [
    { id: 1, nome: 'Leitura', tempo: 30, cor: '#4CAF50' },
    { id: 2, nome: 'Prática', tempo: 45, cor: '#2196F3' },
    { id: 3, nome: 'Revisão', tempo: 20, cor: '#FF9800' }
  ];
  
  let sessaoSelecionada: SessaoEstudo = tiposSessao[0];

  // Calendário
  let eventos: EventoCalendario[] = [
    { data: '15/08/2023', titulo: 'Aula - Desenvolvimento Web', horario: '14:00-16:00' },
    { data: '16/08/2023', titulo: 'Quiz - Banco de Dados', horario: '10:00-11:00' },
    { data: '18/08/2023', titulo: 'Entrega Projeto', horario: '23:59' }
  ];

let videosRelacionados: Video[] = [
  {
    titulo: 'CSS Grid Layout Completo',
    canal: 'Rocketseat',
    duracao: '32 min',
    url: 'https://www.youtube.com/embed/HN1UjzRSdBk',
    resumo: 'Aprenda a utilizar CSS Grid Layout para criar layouts complexos de forma simples'
  },
  {
    titulo: 'JavaScript Moderno ES6+',
    canal: 'Cod3r',
    duracao: '45 min',
    url: 'https://www.youtube.com/embed/2G_mWfG0DZE',
    resumo: 'Conheça as principais features do JavaScript moderno (ES6+)'
  }
];

  onMount(() => {
    // Carrega dados salvos
    const dadosSalvos: string | null = localStorage.getItem('dadosEstudo');
    if (dadosSalvos) {
      const dados: { revisoes: Revisao[], resumo: string } = JSON.parse(dadosSalvos);
      revisoes = dados.revisoes || [];
      resumoUsuario = dados.resumo || '';
      estudado = localStorage.getItem(`estudado-${curso}`) === 'true';
    }
  });

  // Pomodoro
  const iniciarPomodoro = (): void => {
    pomodoroAtivo = true;
    tempoDecorrido = 0;
    tempoPomodoro = sessaoSelecionada.tempo * 60;
    
    if (intervaloPomodoro) {
      clearInterval(intervaloPomodoro);
    }
    
    intervaloPomodoro = setInterval(() => {
      tempoDecorrido++;
      if (tempoDecorrido >= tempoPomodoro) {
        if (intervaloPomodoro) {
          clearInterval(intervaloPomodoro);
        }
        pomodoroAtivo = false;
        alert('Tempo de estudo concluído! Hora de uma pausa.');
      }
    }, 1000);
  };

  const pausarPomodoro = (): void => {
    if (intervaloPomodoro) {
      clearInterval(intervaloPomodoro);
    }
    pomodoroAtivo = false;
  };

  const formatarTempo = (segundos: number): string => {
    const mins: number = Math.floor(segundos / 60);
    const secs: number = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Gestão de estudos
  const adicionarRevisao = (): void => {
    if (comentario.trim()) {
      revisoes = [...revisoes, { 
        data: new Date().toLocaleDateString(), 
        conteudo: comentario,
        materia: materia
      }];
      salvarDados();
      comentario = '';
    }
  };

  const salvarResumo = (): void => {
    if (resumoUsuario.trim()) {
      salvarDados();
      alert('Resumo salvo com sucesso!');
    }
  };

  const salvarDados = (): void => {
    localStorage.setItem('dadosEstudo', JSON.stringify({
      revisoes,
      resumo: resumoUsuario
    }));
  };

  const responderQuiz = (): Promise<void> => goto('/quiz');
  
  const marcarComoEstudado = (): void => {
    estudado = true;
    localStorage.setItem(`estudado-${curso}`, 'true');
  };

  // Gerar resumo por AI
  const gerarResumoAI = async (): Promise<void> => {
    // Simulação de chamada à API de AI
    alert('Gerando resumo automático... (simulação)');
    await new Promise(resolve => setTimeout(resolve, 1500));
    resumoUsuario = `Resumo AI gerado em ${new Date().toLocaleString()}:\n\nPrincipais pontos da aula:\n- Introdução a ${videoAtual.assunto}\n- Sintaxe básica\n- Exemplos práticos\n\nDestaques: ${videoAtual.titulo}`;
  };
</script>

<div class="dashboard-container">
  <!-- Cabeçalho -->
  <header class="dashboard-header">
    <div class="header-left">
      <h1>IFReview Dashboard</h1>
    </div>
    <div class="header-right">
      <button class="btn-calendar" on:click={() => goto('/calendario')}>📅 Calendário</button>
      <button class="btn-menu" on:click={() => goto('/menu')}>📚 Meus Cursos</button>
    </div>
  </header>

  <div class="main-content">
    <!-- Coluna Esquerda - Ferramentas de Estudo -->
    <div class="tools-column">
      <!-- Progresso do Curso -->
      <section class="card progress-card">
        <h2>Progresso do Curso</h2>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style={`width: ${progresso}%`}></div>
          </div>
          <span class="progress-text">{progresso}% completo</span>
        </div>
        
        <div class="performance-metrics">
          <div class="metric">
            <span class="metric-label">Quizzes</span>
            <div class="metric-bar">
              <div class="metric-fill" style={`width: ${desempenho.quizzes}%`}></div>
            </div>
            <span class="metric-value">{desempenho.quizzes}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Exercícios</span>
            <div class="metric-bar">
              <div class="metric-fill" style={`width: ${desempenho.exercicios}%`}></div>
            </div>
            <span class="metric-value">{desempenho.exercicios}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Participação</span>
            <div class="metric-bar">
              <div class="metric-fill" style={`width: ${desempenho.participacao}%`}></div>
            </div>
            <span class="metric-value">{desempenho.participacao}%</span>
          </div>
        </div>
      </section>

      <!-- Pomodoro Timer -->
      <section class="card pomodoro-card">
        <h2>Técnica Pomodoro</h2>
        <div class="pomodoro-display" style={`background-color: ${sessaoSelecionada.cor}20`}>
          {formatarTempo(tempoPomodoro - tempoDecorrido)}
        </div>
        <div class="pomodoro-controls">
          {#if !pomodoroAtivo}
            <button class="btn-start" on:click={iniciarPomodoro}>▶ Iniciar</button>
          {:else}
            <button class="btn-pause" on:click={pausarPomodoro}>⏸ Pausar</button>
          {/if}
          <select bind:value={sessaoSelecionada} class="session-select">
            {#each tiposSessao as sessao}
              <option value={sessao}>{sessao.nome} ({sessao.tempo} min)</option>
            {/each}
          </select>
        </div>
        <p class="pomodoro-tip">Dica: Faça pausas de 5 minutos entre sessões</p>
      </section>

      <!-- Aulas Faltadas -->
      <section class="card missed-classes-card">
        <h2>Aulas para Repor</h2>
        <div class="missed-classes-list">
          {#each aulasFaltadas as aula, i}
            <div class="missed-class">
              <div class="class-info">
                <h3>{aula.materia}</h3>
                <p>{aula.assunto}</p>
                <span class="class-date">{aula.data}</span>
              </div>
              <button class="btn-review">Rever Conteúdo</button>
            </div>
          {/each}
        </div>
      </section>
    </div>

    <!-- Coluna Central - Conteúdo Principal -->
    <div class="main-column">
      <!-- Vídeo da Aula -->
      <section class="card video-card">
        <div class="video-container">
          <iframe 
            src={videoAtual.url} 
            title={`Vídeo aula: ${videoAtual.titulo}`}
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
        <div class="video-info">
          <h2>{videoAtual.titulo}</h2>
          <div class="video-meta">
            <span class="subject-badge">{materia}</span>
            <span class="date-badge">📅 {dataAula}</span>
            {#if estudado}
              <span class="completed-badge">✅ Concluído</span>
            {:else}
              <button class="btn-complete" on:click={marcarComoEstudado}>Marcar como Concluído</button>
            {/if}
          </div>
          <p class="video-description">{videoAtual.resumo}</p>
          <div class="video-actions">
            <button class="btn-quiz" on:click={responderQuiz}>📝 Fazer Quiz</button>
            <button class="btn-ai" on:click={gerarResumoAI}>🤖 Gerar Resumo AI</button>
          </div>
        </div>
      </section>

      <!-- Resumo e Anotações -->
      <section class="card notes-card">
        <h2>Meu Resumo</h2>
        <textarea 
          bind:value={resumoUsuario} 
          placeholder="Anote aqui os principais conceitos, dúvidas e insights..."
          class="notes-textarea"
        ></textarea>
        <div class="notes-actions">
          <button class="btn-save" on:click={salvarResumo}>💾 Salvar Resumo</button>
          <button class="btn-export">📤 Exportar</button>
        </div>
      </section>

      <!-- Vídeos Relacionados -->
      <section class="card related-videos-card">
        <h2>Vídeos Relacionados</h2>
        <div class="related-videos">
          {#each videosRelacionados as video}
            <div class="related-video">
              <iframe 
                src={video.url}
                title={`Vídeo relacionado: ${video.titulo}`}
                frameborder="0"
                allowfullscreen
              ></iframe>
              <div class="video-details">
                <h3>{video.titulo}</h3>
                <p>{video.canal} • {video.duracao}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </div>

    <!-- Coluna Direita - Ferramentas Adicionais -->
    <div class="sidebar-column">
      <!-- Calendário de Aulas -->
      <section class="card calendar-card">
        <h2>Próximas Atividades</h2>
        <div class="upcoming-events">
          {#each eventos as evento}
            <div class="event">
              <div class="event-date">
                <span class="event-day">{evento.data.split('/')[0]}</span>
                <span class="event-month">Ago</span>
              </div>
              <div class="event-info">
                <h3>{evento.titulo}</h3>
                <p>⏰ {evento.horario}</p>
              </div>
            </div>
          {/each}
        </div>
        <button class="btn-view-all" on:click={() => goto('/calendario')}>Ver Calendário Completo</button>
      </section>

      <!-- Revisões e Comentários -->
      <section class="card reviews-card">
        <h2>Minhas Anotações</h2>
        <div class="add-comment">
          <input 
            bind:value={comentario}
            placeholder="Adicione um comentário..."
            class="comment-input"
          />
          <button class="btn-add" on:click={adicionarRevisao}>+</button>
        </div>
        <div class="reviews-list">
          {#each revisoes as revisao, i}
            <div class="review-item">
              <div class="review-header">
                <span class="review-date">{revisao.data}</span>
                <span class="review-subject">{revisao.materia}</span>
              </div>
              <p class="review-content">{revisao.conteudo}</p>
            </div>
          {/each}
        </div>
      </section>

      <!-- Feedback -->
      <section class="card feedback-card">
        <h2>Feedback do Professor</h2>
        <div class="feedback-item">
          <p>"Seu último exercício demonstrou bom entendimento dos conceitos, mas atenção à semântica HTML."</p>
          <span class="feedback-date">12/08/2023</span>
        </div>
        <button class="btn-feedback">Enviar Feedback</button>
      </section>
    </div>
  </div>
</div>

<style>
  /* Estilos gerais */
 
  .dashboard-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .header-left h1 {
    margin: 0;
    color: #045131;
  }

  
  .main-content {
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    gap: 20px;
  }
  
  .card {
    background: rgba(190, 186, 186, 0.585);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
  
  /* Estilos específicos para cada seção */
  .progress-card {
    background: linear-gradient(135deg, #04954ad4 0%, #c3cfe2 100%);
  }
  
  .progress-container {
    margin: 15px 0;
  }
  
  .progress-bar {
    height: 10px;
    background: #eeecec;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #034523, #43af70b9);
    transition: width 0.3s ease;
  }
  
  .performance-metrics {
    margin-top: 20px;
  }
  
  .metric {
    margin-bottom: 10px;
  }
  
  .metric-bar {
    height: 6px;
    background: #f3f4f5;
    border-radius: 3px;
    margin: 5px 0;
  }
  
  .metric-fill {
    height: 100%;
    background: #04be4f;
    border-radius: 3px;
  }
  
  /* Pomodoro */
  .pomodoro-display {
    font-size: 2.5rem;
    text-align: center;
    margin: 15px 0;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }
  
  /* Vídeo */
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  
  /* Botões */
  button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .btn-start {
    background: #2ecc71;
    color: white;
  }
  
  .btn-pause {
    background: #e74c3c;
    color: white;
  }
  
  .btn-quiz {
    background: #9b59b6;
    color: white;
  }
  
  .btn-ai {
    background: #1abc9c;
    color: white;
  }
  
  /* Responsividade */
  @media (max-width: 1200px) {
    .main-content {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .main-content {
      grid-template-columns: 1fr;
    }
  }
</style>