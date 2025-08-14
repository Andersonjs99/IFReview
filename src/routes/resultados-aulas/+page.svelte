<script lang="ts">
  // Interfaces
  interface Video {
    id: string;
    titulo: string;
    url: string;
    materia: string;
    duracao: string;
    relacionado: boolean;
  }

<<<<<<< HEAD
  interface Quiz {
    id: string;
    titulo: string;
    materia: string;
    questoes: number;
    concluido: boolean;
  }

  interface Resumo {
    id: string;
    titulo: string;
    conteudo: string;
    data: string;
  }

  interface Comentario {
    id: string;
    usuario: string;
    texto: string;
    data: string;
  }

  interface Arquivo {
    id: string;
    nome: string;
    tipo: string;
    tamanho: string;
    usuario: string;
    data: string;
  }

  // Dados do usuário
  let nomeUsuario = 'Anderson';
  let cursoAtual = 'Desenvolvimento Web';
  
  // Dados mockados
let videos: Video[] = [
    { 
        id: '1', 
        titulo: 'HTML Básico para Iniciantes', 
        url: 'https://www.youtube.com/embed/rsFCVjr5yxc', 
        materia: 'HTML', 
        duracao: '30:45', 
        relacionado: true 
    },
    { 
        id: '2', 
        titulo: 'Formulários HTML Avançados', 
        url: 'https://www.youtube.com/embed/wwqOJ2o84S4', 
        materia: 'HTML', 
        duracao: '25:18', 
        relacionado: true 
    },
    { 
        id: '4', 
        titulo: 'Tabelas HTML - Guia Completo', 
        url: 'https://www.youtube.com/embed/K4wUJw0QTA0', 
        materia: 'HTML', 
        duracao: '22:10', 
        relacionado: true 
    },
    { 
        id: '5', 
        titulo: 'HTML e CSS - Criando seu Primeiro Site', 
        url: 'https://www.youtube.com/embed/Ejkb_YpuHWs', 
        materia: 'HTML', 
        duracao: '45:22', 
        relacionado: true 
    }
];
  let quizzes: Quiz[] = [
    { id: '1', titulo: 'Fundamentos de React', materia: 'Front-end', questoes: 10, concluido: true },
    { id: '2', titulo: 'Node.js Básico', materia: 'Back-end', questoes: 8, concluido: false },
    { id: '3', titulo: 'CSS Avançado', materia: 'Front-end', questoes: 12, concluido: false }
  ];

  let resumos: Resumo[] = [
    { id: '1', titulo: 'Resumo Aula 1', conteudo: 'Principais conceitos de React', data: '10/08/2023' },
    { id: '2', titulo: 'Resumo Aula 2', conteudo: 'Componentes e Props', data: '12/08/2023' }
  ];

  let comentarios: Comentario[] = [
    { id: '1', usuario: 'Maria Souza', texto: 'Alguém pode explicar sobre hooks?', data: '10/08/2023 14:30' },
    { id: '2', usuario: 'Carlos Lima', texto: 'Ótima explicação sobre componentes!', data: '11/08/2023 09:15' }
  ];

  let arquivos: Arquivo[] = [
    { id: '1', nome: 'Material Aula 1.pdf', tipo: 'pdf', tamanho: '2.4 MB', usuario: 'Professor', data: '10/08/2023' },
    { id: '2', nome: 'Exercícios React.zip', tipo: 'zip', tamanho: '1.8 MB', usuario: 'Anderson', data: '12/08/2023' }
  ];

  // Estado da aplicação
  let novoComentario = '';
  let novoArquivo: File | null = null;
  let resumoAtual = '';
  let tituloResumo = '';
  
  // Pomodoro Timer
  let pomodoroAtivo = false;
  let tempoDecorrido = 0;
  let tempoTotal = 25 * 60; // 25 minutos
  let intervalo: NodeJS.Timeout | null = null;
  const modosPomodoro = [
    { nome: 'Foco', tempo: 25, cor: '#3B82F6' },
    { nome: 'Curto', tempo: 5, cor: '#10B981' },
    { nome: 'Longo', tempo: 15, cor: '#F59E0B' }
  ];
  let modoAtual = modosPomodoro[0];

  // Pomodoro Timer
  const iniciarPomodoro = () => {
    if (!pomodoroAtivo) {
      tempoTotal = modoAtual.tempo * 60;
      tempoDecorrido = 0;
      pomodoroAtivo = true;
      intervalo = setInterval(() => {
        tempoDecorrido++;
        if (tempoDecorrido >= tempoTotal) {
          clearInterval(intervalo!);
          pomodoroAtivo = false;
          alert('Tempo concluído! Hora de uma pausa.');
        }
      }, 1000);
    }
  };

  const pausarPomodoro = () => {
    if (pomodoroAtivo && intervalo) {
      clearInterval(intervalo);
      pomodoroAtivo = false;
    }
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Resumo por IA
  const gerarResumoIA = async () => {
    // Simulação de geração de resumo por IA
    resumoAtual = `Resumo gerado em ${new Date().toLocaleString()}:\n\nPrincipais tópicos:\n- Introdução aos conceitos básicos\n- Exemplos práticos\n- Boas práticas de desenvolvimento\n\nDúvidas frequentes:\n- Como implementar X?\n- Diferença entre Y e Z`;
    alert('Resumo gerado com sucesso!');
  };

  const salvarResumo = async () => {
    if (tituloResumo && resumoAtual) {
      const novoResumo: Resumo = {
        id: Date.now().toString(),
        titulo: tituloResumo,
        conteudo: resumoAtual,
        data: new Date().toLocaleDateString()
      };
      resumos = [...resumos, novoResumo];
      tituloResumo = '';
      resumoAtual = '';
      alert('Resumo salvo com sucesso!');
    }
  };

  // Comentários
  const adicionarComentario = async () => {
    if (novoComentario.trim()) {
      const novoComent: Comentario = {
        id: Date.now().toString(),
        usuario: nomeUsuario,
        texto: novoComentario,
        data: new Date().toLocaleString()
      };
      comentarios = [...comentarios, novoComent];
      novoComentario = '';
    }
  };

  // Upload de Arquivos (simulado)
  const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      novoArquivo = target.files[0];
    }
  };

  const enviarArquivo = async () => {
    if (novoArquivo) {
      const novoArquivoDoc: Arquivo = {
        id: Date.now().toString(),
        nome: novoArquivo.name,
        tipo: novoArquivo.type.split('/')[1] || 'file',
        tamanho: `${(novoArquivo.size / 1024).toFixed(1)} KB`,
        usuario: nomeUsuario,
        data: new Date().toLocaleString()
      };
      
      arquivos = [...arquivos, novoArquivoDoc];
      novoArquivo = null;
      alert('Arquivo enviado com sucesso! (simulado)');
    }
=======
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
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
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
<<<<<<< HEAD
    <div class="header-content">
      <h1>Olá, {nomeUsuario}!</h1>
      <p class="curso-info">{cursoAtual}</p>
    </div>
    <div class="header-actions">
      <button class="btn-notification">🔔</button>
      <button class="btn-profile">👤</button>
    </div>
  </header>

  <div class="main-grid">
    <!-- Coluna Esquerda - Ferramentas -->
    <div class="sidebar-grid">
      <!-- Pomodoro Timer -->
      <div class="card pomodoro-card" style={`border-left: 4px solid ${modoAtual.cor}`}>
        <div class="card-header">
          <span class="card-icon">⏱️</span>
          <h3>Pomodoro Timer</h3>
        </div>
        <div class="pomodoro-display">
          {formatarTempo(tempoTotal - tempoDecorrido)}
        </div>
        <div class="pomodoro-controls">
          {#if !pomodoroAtivo}
            <button on:click={iniciarPomodoro} class="btn-start">▶ Iniciar</button>
          {:else}
            <button on:click={pausarPomodoro} class="btn-pause">⏸ Pausar</button>
          {/if}
          <select bind:value={modoAtual} class="mode-select">
            {#each modosPomodoro as modo}
              <option value={modo}>{modo.nome} ({modo.tempo} min)</option>
            {/each}
          </select>
        </div>
        <p class="card-footer">Modo: {modoAtual.nome}</p>
      </div>

      <!-- Quizzes de Revisão -->
      <div class="card quizzes-card">
        <div class="card-header">
          <span class="card-icon">📝</span>
          <h3>Quizzes de Revisão</h3>
        </div>
        <div class="quizzes-list">
          {#each quizzes as quiz}
            <div class="quiz-item {quiz.concluido ? 'completed' : ''}">
              <div class="quiz-info">
                <h4>{quiz.titulo}</h4>
                <p>{quiz.materia} • {quiz.questoes} questões</p>
              </div>
              <button class="btn-quiz">
                {quiz.concluido ? 'Refazer' : 'Iniciar'}
              </button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Anotações Pessoais -->
      <div class="card notes-card">
        <div class="card-header">
          <span class="card-icon">✏️</span>
          <h3>Anotações Pessoais</h3>
        </div>
        <textarea
          bind:value={resumoAtual}
          placeholder="Digite suas anotações aqui..."
          class="notes-textarea"
        ></textarea>
        <button on:click={salvarResumo} class="btn-save" disabled={!resumoAtual}>
          💾 Salvar
        </button>
      </div>
    </div>

    <!-- Coluna Central - Conteúdo Principal -->
    <div class="content-area">
      <!-- Vídeos do Curso -->
      <section class="video-section">
        <h2 class="section-title">Aulas em Destaque</h2>
        <div class="video-list">
          {#each videos.filter(v => !v.relacionado) as video}
            <div class="video-card">
              <div class="video-thumbnail">
                <iframe
                  src={video.url}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="video-details">
                <h3>{video.titulo}</h3>
                <div class="video-meta">
                  <span class="materia">{video.materia}</span>
                  <span class="duracao">{video.duracao}</span>
                </div>
                <button class="btn-continue">Continuar</button>
              </div>
            </div>
          {/each}
=======
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
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
        </div>
      </section>

      <!-- Vídeos Relacionados -->
<<<<<<< HEAD
      <section class="video-section">
        <h2 class="section-title">Vídeos Relacionados</h2>
        <div class="related-videos">
          {#each videos.filter(v => v.relacionado) as video}
            <div class="related-video">
              <iframe
                src={video.url}
                title={video.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="video-info">
                <h4>{video.titulo}</h4>
                <p>{video.materia} • {video.duracao}</p>
=======
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
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
              </div>
            </div>
          {/each}
        </div>
      </section>
<<<<<<< HEAD

      <!-- Resumo por IA -->
      <section class="resumo-section">
        <h2 class="section-title">Resumo por IA</h2>
        <div class="resumo-container">
          <div class="resumo-actions">
            <input
              bind:value={tituloResumo}
              placeholder="Título do resumo"
              class="resumo-title"
            />
            <button on:click={gerarResumoIA} class="btn-ai">
              🤖 Gerar Resumo
            </button>
          </div>
          <textarea
            bind:value={resumoAtual}
            placeholder="Seu resumo aparecerá aqui..."
            class="resumo-textarea"
          ></textarea>
          <div class="resumo-history">
            <h3>Resumos Anteriores</h3>
            {#each resumos as resumo}
              <div class="resumo-item">
                <h4>{resumo.titulo}</h4>
                <p>{resumo.data}</p>
              </div>
            {/each}
          </div>
        </div>
      </section>
    </div>

    <!-- Coluna Direita - Interação -->
    <div class="interaction-sidebar">
      <!-- Área de Comentários -->
      <div class="card comments-card">
        <div class="card-header">
          <span class="card-icon">💬</span>
          <h3>Discussão</h3>
        </div>
        <div class="comments-list">
          {#each comentarios as comentario}
            <div class="comment">
              <div class="comment-header">
                <span class="comment-user">{comentario.usuario}</span>
                <span class="comment-date">{comentario.data}</span>
              </div>
              <p class="comment-text">{comentario.texto}</p>
            </div>
          {/each}
        </div>
        <div class="comment-input">
          <input
            bind:value={novoComentario}
            placeholder="Adicione um comentário..."
            on:keydown={(e) => e.key === 'Enter' && adicionarComentario()}
          />
          <button on:click={adicionarComentario} disabled={!novoComentario.trim()}>
            Enviar
          </button>
        </div>
      </div>

      <!-- Upload de Arquivos -->
      <div class="card upload-card">
        <div class="card-header">
          <span class="card-icon">📤</span>
          <h3>Compartilhar Materiais</h3>
        </div>
        <div class="upload-area">
          <label for="file-upload" class="upload-btn">
            {#if novoArquivo}
              {novoArquivo.name}
            {:else}
              Selecionar Arquivo
            {/if}
          </label>
          <input
            id="file-upload"
            type="file"
            on:change={handleFileUpload}
            hidden
          />
          <button on:click={enviarArquivo} disabled={!novoArquivo} class="btn-upload">
            Enviar
          </button>
        </div>
        <div class="files-list">
          <h3>Arquivos Recentes</h3>
          {#each arquivos as arquivo}
            <div class="file-item">
              <span class="file-icon">{arquivo.tipo === 'pdf' ? '📄' : '📂'}</span>
              <div class="file-info">
                <p class="file-name">{arquivo.nome}</p>
                <p class="file-meta">{arquivo.usuario} • {arquivo.data}</p>
              </div>
              <a href="#" class="file-download">↓</a>
            </div>
          {/each}
        </div>
      </div>
=======
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
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
    </div>
  </div>
</div>

<style>
<<<<<<< HEAD
  /* Estilos Base */
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
  }

  .dashboard-container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 1.5rem;
  }

=======
  /* Estilos gerais */
 
  .dashboard-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
<<<<<<< HEAD
    margin-bottom: 2rem;
  }

  .header-content h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #0f172a;
  }

  .curso-info {
    margin: 0.25rem 0 0;
    color: #64748b;
    font-size: 0.95rem;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn-notification, .btn-profile {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    background: #e2e8f0;
    color: #475569;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 320px 1fr 380px;
    gap: 1.5rem;
  }

  /* Sidebar - Ferramentas */
  .sidebar-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .card-icon {
    font-size: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
  }

  .card h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #334155;
  }

  /* Pomodoro Timer */
  .pomodoro-display {
    font-size: 2.5rem;
    text-align: center;
    margin: 1rem 0;
    font-family: monospace;
    font-weight: bold;
    color: #1e40af;
  }

  .pomodoro-controls {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .btn-start, .btn-pause {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-start {
    background: #3b82f6;
    color: white;
  }

  .btn-pause {
    background: #f59e0b;
    color: white;
  }

  .mode-select {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    background: white;
  }

  /* Quizzes */
  .quizzes-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quiz-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.75rem;
    background: #f8fafc;
  }

  .quiz-item.completed {
    background: #f0fdf4;
  }

  .quiz-info h4 {
    margin: 0;
    font-size: 0.875rem;
  }

  .quiz-info p {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  .btn-quiz {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.5rem;
    background: #3b82f6;
    color: white;
    font-size: 0.75rem;
    cursor: pointer;
  }

  /* Anotações */
  .notes-textarea {
    width: 100%;
    min-height: 150px;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    resize: vertical;
  }

  .btn-save {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.75rem;
    background: #10b981;
    color: white;
    cursor: pointer;
  }

  /* Conteúdo Principal */
  .content-area {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: #0f172a;
  }

  /* Vídeos */
  .video-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .video-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
    display: flex;
  }

  .video-thumbnail {
    width: 40%;
    min-height: 180px;
  }

  .video-thumbnail iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .video-details {
    flex: 1;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
  }

  .video-details h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  .video-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .btn-continue {
    margin-top: auto;
    align-self: flex-start;
    padding: 0.5rem 1.25rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  /* Vídeos Relacionados */
  .related-videos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .related-video {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .related-video iframe {
    width: 100%;
    height: 140px;
    border: none;
  }

  .video-info {
    padding: 0.75rem;
  }

  .video-info h4 {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
  }

  .video-info p {
    margin: 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  /* Resumo por IA */
  .resumo-container {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .resumo-actions {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .resumo-title {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
  }

  .btn-ai {
    padding: 0 1.25rem;
    border: none;
    border-radius: 0.75rem;
    background: #8b5cf6;
    color: white;
    cursor: pointer;
  }

  .resumo-textarea {
    width: 100%;
    min-height: 200px;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    resize: vertical;
  }

  .resumo-history h3 {
    font-size: 1rem;
    margin: 0 0 0.75rem;
  }

  .resumo-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .resumo-item h4 {
    margin: 0;
    font-size: 0.875rem;
  }

  .resumo-item p {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  /* Sidebar Interação */
  .interaction-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* Comentários */
  .comments-list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding-right: 0.5rem;
  }

  .comment {
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .comment-user {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .comment-date {
    font-size: 0.75rem;
    color: #64748b;
  }

  .comment-text {
    margin: 0;
    font-size: 0.875rem;
  }

  .comment-input {
    display: flex;
    gap: 0.75rem;
  }

  .comment-input input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
  }

  .comment-input button {
    padding: 0 1.25rem;
    border: none;
    border-radius: 0.75rem;
    background: #3b82f6;
    color: white;
    cursor: pointer;
  }

  /* Upload de Arquivos */
  .upload-area {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .upload-btn {
    flex: 1;
    padding: 0.75rem;
    border: 1px dashed #cbd5e1;
    border-radius: 0.75rem;
    text-align: center;
    cursor: pointer;
    background: #f8fafc;
  }

  .btn-upload {
    padding: 0 1.25rem;
    border: none;
    border-radius: 0.75rem;
    background: #10b981;
    color: white;
    cursor: pointer;
  }

  .files-list h3 {
    font-size: 1rem;
    margin: 0 0 0.75rem;
  }

  .file-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
    gap: 0.75rem;
  }

  .file-icon {
    font-size: 1.25rem;
  }

  .file-info {
    flex: 1;
  }

  .file-name {
    margin: 0;
    font-size: 0.875rem;
  }

  .file-meta {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  .file-download {
    color: #3b82f6;
    text-decoration: none;
    font-size: 1.25rem;
  }

  /* Responsividade */
  @media (max-width: 1200px) {
    .main-grid {
      grid-template-columns: 280px 1fr;
    }

    .interaction-sidebar {
      grid-column: span 2;
    }
  }

  @media (max-width: 768px) {
    .main-grid {
      grid-template-columns: 1fr;
    }

    .video-card {
      flex-direction: column;
    }

    .video-thumbnail {
      width: 100%;
      min-height: 200px;
    }
=======
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
>>>>>>> 6aa3d885c816431cf13ffcb616cf7f580cd13705
  }
</style>