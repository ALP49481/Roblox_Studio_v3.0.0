/* Conteúdo autoral das avaliações. Não executa Luau no navegador. */
window.APOSTILA_ASSESSMENTS = {
  passingScore: 70,
  modules: [
    {
      id: "modulo-00", number: 0, title: "Preparação para aprender e criar",
      questions: [
        { id: "m00q1", prompt: "Uma experiência possui um lobby e uma caverna em mapas separados. Qual descrição está correta?", options: ["São duas experiências e nenhum place", "É uma experiência com dois places", "É um place com dois clientes", "É uma sessão com duas Engines"], correct: 1, explanation: "Experiência é o produto completo; cada mapa publicável dentro dela é um place.", reviewUrl: "modulos/modulo-00.html#capitulo-01" },
        { id: "m00q2", prompt: "Você quer testar o personagem e a câmera como jogador. Qual modo é o ponto de partida?", options: ["Play", "Run", "Salvar localmente", "Creator Hub"], correct: 0, explanation: "Play cria o cliente do jogador. Run simula sem inserir o personagem controlável da mesma forma.", reviewUrl: "modulos/modulo-00.html#capitulo-02" }
      ],
      practical: ["Criei, salvei e reabri um projeto sem perder o trabalho.", "Consigo iniciar Play e Run, explicar a diferença e encerrar com Stop."]
    },
    {
      id: "modulo-01", number: 1, title: "Studio, objetos e construção do mundo",
      questions: [
        { id: "m01q1", prompt: "Uma parede atravessável volta ao normal quando o teste termina. Onde você deve investigar primeiro?", options: ["No estado de edição e na propriedade CanCollide", "Na senha da conta", "No DataStore", "No RemoteEvent"], correct: 0, explanation: "Mudanças feitas durante o teste são temporárias. Verifique o objeto correto e suas propriedades no estado de edição.", reviewUrl: "modulos/modulo-01.html#capitulo-01" },
        { id: "m01q2", prompt: "Antes de usar um Model da Toolbox, qual atitude é mais segura?", options: ["Publicar imediatamente", "Inspecionar descendentes, scripts e procedência", "Desancorar todas as Parts", "Mover tudo para ReplicatedStorage"], correct: 1, explanation: "Assets de terceiros precisam de inspeção de conteúdo, procedência e permissões antes de entrar no projeto.", reviewUrl: "modulos/modulo-01.html#capitulo-04" }
      ],
      practical: ["Minha Primeira sala tem rota testada em Play e objetos organizados no Explorer.", "Consigo explicar Part, Model, propriedade, hierarquia e pivot sem consultar o gabarito."]
    },
    {
      id: "modulo-02", number: 2, title: "Lógica e Luau do zero",
      questions: [
        { id: "m02q1", prompt: "Uma variável local criada dentro de uma função é usada fora dela e resulta em nil. Qual conceito explica o problema?", options: ["Replicação", "Escopo", "Monetização", "Pathfinding"], correct: 1, explanation: "Escopo determina onde um nome existe. Uma variável local da função não fica disponível fora desse bloco.", reviewUrl: "modulos/modulo-02.html#capitulo-08" },
        { id: "m02q2", prompt: "Qual uso de pcall é apropriado?", options: ["Esconder qualquer erro de digitação", "Substituir condições", "Tratar uma operação externa que pode falhar", "Fazer todo código continuar mesmo incorreto"], correct: 2, explanation: "pcall serve para fronteiras falíveis, como APIs externas. Não deve mascarar erros de programação.", reviewUrl: "modulos/modulo-02.html#capitulo-08" }
      ],
      practical: ["Consigo prever o resultado de condições, laços e funções antes de executar.", "Corrigi um erro usando Output e mantive --!strict sem recorrer a any como atalho."]
    },
    {
      id: "modulo-03", number: 3, title: "Engine e mundo 3D",
      questions: [
        { id: "m03q1", prompt: "Você precisa reagir quando uma Part é tocada. Qual mecanismo representa melhor essa ocorrência?", options: ["Propriedade", "Evento", "Enumeração", "Serviço de dados"], correct: 1, explanation: "Touched é um evento: ele sinaliza que algo aconteceu e pode ser conectado a uma função.", reviewUrl: "modulos/modulo-03.html#capitulo-01" },
        { id: "m03q2", prompt: "Um tiro não deve atravessar uma parede. Qual evidência espacial é adequada?", options: ["Somar moedas no cliente", "Raycast com parâmetros e validação do resultado", "Esperar um segundo", "Alterar apenas a GUI"], correct: 1, explanation: "Raycast consulta o mundo ao longo de uma direção e permite verificar qual superfície foi atingida primeiro.", reviewUrl: "modulos/modulo-03.html#capitulo-04" }
      ],
      practical: ["Minha interação por evento desconecta ou limita conexões quando necessário.", "Consigo demonstrar Vector3, CFrame e um raycast sem usar APIs legadas."]
    },
    {
      id: "modulo-04", number: 4, title: "Jogadores, ferramentas, entrada e interface",
      questions: [
        { id: "m04q1", prompt: "Uma interface individual e o input de teclado pertencem principalmente a qual contexto?", options: ["Cliente", "Banco externo", "Todos os servidores simultaneamente", "Creator Hub"], correct: 0, explanation: "Interface e input do jogador são responsabilidades locais do cliente; resultados importantes ainda serão confirmados pelo servidor.", reviewUrl: "modulos/modulo-04.html#capitulo-02" },
        { id: "m04q2", prompt: "Qual sequência respeita a progressão multiplataforma da apostila?", options: ["Touch antes de GuiButton", "GUI básica, depois binding touch e teste completo", "Somente teclado", "Somente botão visual sem ação"], correct: 1, explanation: "ScreenGui e GuiButton precisam ser compreendidos antes de o Input Action System ligar uma ação ao touch.", reviewUrl: "modulos/modulo-04.html#capitulo-06" }
      ],
      practical: ["Minha Tool sobrevive a equipar, desequipar e respawn.", "Testei a mesma ação em teclado, gamepad e touch com foco visível."]
    },
    {
      id: "modulo-05", number: 5, title: "Cliente, servidor, rede e segurança",
      questions: [
        { id: "m05q1", prompt: "O cliente envia 'adicione 999999 moedas'. Qual é a resposta correta do servidor?", options: ["Confiar porque veio de um RemoteEvent", "Validar intenção, contexto, tipo, limite e frequência", "Salvar o número imediatamente", "Pedir ao cliente para confirmar"], correct: 1, explanation: "O cliente não é autoridade sobre recompensas. O servidor reconstrói e valida o resultado usando seu próprio estado.", reviewUrl: "modulos/modulo-05.html#capitulo-03" },
        { id: "m05q2", prompt: "O mesmo pedido de compra chega duas vezes com o mesmo requestId. O que a idempotência deve garantir?", options: ["Duas cobranças", "Um resultado aplicado no máximo uma vez", "Uma desconexão obrigatória", "Preço definido pela GUI"], correct: 1, explanation: "Repetir a mesma operação identificada não pode duplicar cobrança ou concessão.", reviewUrl: "modulos/modulo-05.html#capitulo-05" }
      ],
      practical: ["Executei testes hostis com tipo errado, NaN, distância e spam.", "Consigo apontar a fonte da verdade de moedas, itens e dano."]
    },
    {
      id: "modulo-06", number: 6, title: "Arquitetura, depuração e colaboração",
      questions: [
        { id: "m06q1", prompt: "Dois ModuleScripts exigem um ao outro e a inicialização não termina. Qual problema arquitetural existe?", options: ["Dependência circular", "Baixo contraste", "Cold start", "Raycast curto"], correct: 0, explanation: "Dependências circulares tornam a ordem de criação ambígua. Extraia contratos ou reorganize as responsabilidades.", reviewUrl: "modulos/modulo-06.html#capitulo-01" },
        { id: "m06q2", prompt: "Uma correção será compartilhada com a equipe. Qual evidência é mais útil?", options: ["Apenas 'funcionou aqui'", "Commit pequeno, reprodução e teste de regressão", "Apagar o histórico", "Misturar refatoração e dezenas de mudanças"], correct: 1, explanation: "Mudanças pequenas com reprodução e teste permitem revisão, reversão e colaboração seguras.", reviewUrl: "modulos/modulo-06.html#capitulo-04" }
      ],
      practical: ["Separei configuração, estado e regras sem dependência circular.", "Registrei um bug com reprodução, causa, correção e teste de regressão."]
    },
    {
      id: "modulo-07", number: 7, title: "Persistência, economia e progressão",
      questions: [
        { id: "m07q1", prompt: "O carregamento do perfil falhou. O que o servidor deve fazer?", options: ["Criar dados padrão e sobrescrever o antigo", "Bloquear consequências persistentes e não salvar", "Pedir ao cliente o saldo", "Ignorar e conceder compras"], correct: 1, explanation: "Falha de load não pode virar dado novo salvável, pois isso pode destruir progresso existente.", reviewUrl: "modulos/modulo-07.html#capitulo-03" },
        { id: "m07q2", prompt: "Por que UpdateAsync costuma ser preferível em uma alteração concorrente?", options: ["Executa no cliente", "Transforma o valor atual com controle de concorrência", "Não possui limites", "Nunca pode falhar"], correct: 1, explanation: "UpdateAsync recebe o valor observado e tenta aplicar uma transformação; ainda exige função segura, orçamento e tratamento de falhas.", reviewUrl: "modulos/modulo-07.html#capitulo-02" }
      ],
      practical: ["Simulei falha de load, retry, lock concorrente e encerramento.", "Provei que missão, venda e upgrade não duplicam valor quando repetidos."]
    },
    {
      id: "modulo-08", number: 8, title: "Sistemas avançados de gameplay",
      questions: [
        { id: "m08q1", prompt: "Dois dispositivos atualizam movimento em taxas de quadros diferentes. Qual cálculo reduz a dependência do FPS?", options: ["Somar 1 por frame", "velocidade multiplicada por deltaTime", "Usar um RemoteEvent por frame", "Aumentar o dano"], correct: 1, explanation: "deltaTime representa o tempo transcorrido e transforma velocidade por segundo em deslocamento do frame.", reviewUrl: "modulos/modulo-08.html#capitulo-01" },
        { id: "m08q2", prompt: "O cliente informa que acertou um inimigo atrás de uma parede. O servidor deve:", options: ["Aplicar dano e confiar na animação", "Validar origem, estado, cadência, distância e obstrução", "Aumentar o alcance", "Salvar o dano no cliente"], correct: 1, explanation: "Combate importante é servidor-autoritativo e usa evidência espacial para rejeitar acertos impossíveis.", reviewUrl: "modulos/modulo-08.html#capitulo-05" }
      ],
      practical: ["Comparei comportamento em FPS diferentes e medi antes de otimizar.", "Minha arena rejeita spam, NaN, parede, origem impossível e estado inválido."]
    },
    {
      id: "modulo-09", number: 9, title: "Qualidade, segurança e produção",
      questions: [
        { id: "m09q1", prompt: "Uma compra de Developer Product foi confirmada visualmente pelo cliente. Quando conceder o produto?", options: ["No evento visual do cliente", "No processamento idempotente do recibo no servidor", "Antes do pagamento", "Ao clicar no botão"], correct: 1, explanation: "A concessão depende do recibo processado no servidor e precisa sobreviver a repetição, ausência do jogador e falha de dados.", reviewUrl: "modulos/modulo-09.html#capitulo-05" },
        { id: "m09q2", prompt: "Qual API deve aparecer em código novo para consultar informações de produto?", options: ["GetProductInfo", "GetProductInfoAsync", "PromptPurchaseFinished", "FindProduct"], correct: 1, explanation: "GetProductInfoAsync é a forma atual; GetProductInfo está depreciada.", reviewUrl: "modulos/modulo-09.html#capitulo-05" }
      ],
      practical: ["Executei matriz de ameaças, teste de performance e ensaio de rollback.", "Provei concessão idempotente para recibo repetido e falha persistente."]
    },
    {
      id: "modulo-10", number: 10, title: "Escala, múltiplos places e Open Cloud",
      questions: [
        { id: "m10q1", prompt: "Qual API moderna inicia um teleporte de jogadores a outro place?", options: ["TeleportAsync", "TeleportToPrivateServer", "MoveTo", "RequestAsync"], correct: 0, explanation: "TeleportAsync é a API moderna; falhas de inicialização também precisam ser observadas e tratadas.", reviewUrl: "modulos/modulo-10.html#capitulo-01" },
        { id: "m10q2", prompt: "Onde uma API key de automação Open Cloud deve ficar?", options: ["Em LocalScript", "Em ReplicatedStorage", "No cofre de segredos do ambiente externo com menor privilégio", "Em uma TextLabel oculta"], correct: 2, explanation: "Automação externa guarda credenciais fora do cliente e limita escopo, recurso, rotação e logs.", reviewUrl: "modulos/modulo-10.html#capitulo-03" }
      ],
      practical: ["Testei falha de teleporte e entrega best effort entre servidores.", "Modelei uma automação externa sem segredo em código, frontend, banco ou log."]
    },
    {
      id: "modulo-11", number: 11, title: "Projeto final completo",
      questions: [
        { id: "m11q1", prompt: "Antes de ampliar conteúdo, qual entrega demonstra o ciclo principal de ponta a ponta?", options: ["Vertical slice", "Uma lista de ideias", "Cem assets", "Uma monetização isolada"], correct: 0, explanation: "A vertical slice comprova um fluxo pequeno, completo e testável antes da expansão.", reviewUrl: "modulos/modulo-11.html#capitulo-02" },
        { id: "m11q2", prompt: "Um release candidate apresenta erro conhecido no fluxo principal. Qual decisão é adequada?", options: ["Publicar para descobrir", "Bloquear o lançamento, corrigir e repetir a evidência", "Ocultar o erro do checklist", "Compensar com mais efeitos"], correct: 1, explanation: "Critério de saída é uma decisão verificável. Erro relevante no fluxo principal bloqueia a publicação.", reviewUrl: "modulos/modulo-11.html#capitulo-04" }
      ],
      practical: ["Minha Expedição de cristais possui vertical slice, dados, acessibilidade e testes hostis.", "Executei release privado, observabilidade, rollback e plano de manutenção."]
    }
  ],
  finalBoard: {
    id: "banca-final", title: "Banca final — decisões de produção",
    questions: [
      { id: "bfq1", prompt: "Um cliente envia o alvo, o dano e a recompensa de um ataque. Qual redesenho é mais seguro?", options: ["Servidor aceita tudo", "Cliente envia intenção; servidor valida estado e calcula consequências", "Cliente grava no DataStore", "GUI escolhe o resultado"], correct: 1, explanation: "A fronteira de confiança aceita intenção mínima e mantém consequências importantes no servidor.", reviewUrl: "modulos/modulo-05.html#capitulo-03" },
      { id: "bfq2", prompt: "O DataStore falhou durante o carregamento. Qual combinação preserva integridade?", options: ["Padrão + save automático", "Falha fechada, feedback, retry limitado e nenhum save destrutivo", "Saldo do cliente", "Loop infinito"], correct: 1, explanation: "Uma falha externa deve terminar de forma observável sem transformar ausência de dados em sobrescrita.", reviewUrl: "modulos/modulo-07.html#capitulo-03" },
      { id: "bfq3", prompt: "O mesmo recibo chega novamente enquanto o jogador está ausente. Qual garantia importa?", options: ["Descartar sempre", "Concessão persistente idempotente e decisão compatível com nova tentativa", "Entregar pelo LocalScript", "Gerar outro PurchaseId"], correct: 1, explanation: "Recibos podem repetir; a operação precisa registrar a concessão e lidar com falhas/jogador ausente sem duplicar.", reviewUrl: "modulos/modulo-09.html#capitulo-05" },
      { id: "bfq4", prompt: "Uma atualização piorou retenção e trouxe erro crítico. O plano de release deve permitir:", options: ["Somente adicionar conteúdo", "Detectar por métricas e logs, interromper e reverter com compatibilidade", "Apagar analytics", "Mudar o nome da experiência"], correct: 1, explanation: "Observação, guardrails e rollback fazem parte da manutenção, não são tarefas posteriores opcionais.", reviewUrl: "modulos/modulo-11.html#capitulo-04" },
      { id: "bfq5", prompt: "Uma chave Open Cloud precisa apenas ler um universo em uma automação. Qual configuração segue menor privilégio?", options: ["Chave administrativa no jogo", "Chave externa restrita ao recurso e à leitura, com rotação", "Token no HTML", "Segredo no ReplicatedStorage"], correct: 1, explanation: "Credencial externa deve ter recurso e operação mínimos, permanecer no cofre e possuir ciclo de rotação/revogação.", reviewUrl: "modulos/modulo-10.html#capitulo-03" }
    ],
    practical: [
      "Demonstrei o ciclo principal em uma publicação privada com dois clientes.",
      "Executei testes hostis de rede, combate, economia, dados e recibos.",
      "Registrei evidência de acessibilidade em teclado, touch, gamepad, zoom e movimento reduzido.",
      "Preparei monitoramento, rollback compatível e próxima revisão técnica."
    ]
  }
};
