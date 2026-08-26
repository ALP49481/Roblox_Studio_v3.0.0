# Plano completo da apostila de desenvolvimento no Roblox Studio

> **Etapa:** plano corrigido para orientar a produção modular da apostila em HTML  
> **Data da verificação:** 25 de agosto de 2026  
> **Autoridade técnica principal:** Roblox Creator Hub e Roblox Engine API Reference  
> **Arquivo-base preservado:** `Apostila-Completa-Desenvolvimento-Roblox-Studio.md`

---

## 1. Diagnóstico do projeto

### 1.1 Arquivos Markdown encontrados

Há dois arquivos Markdown relevantes no projeto:

| Arquivo | Função identificada | Tratamento nesta etapa |
|---|---|---|
| `Apostila-Completa-Desenvolvimento-Roblox-Studio.md` | Material-base extenso, com 34 capítulos, exemplos, projetos, trilha de 24 semanas, checklists, glossário e decisões pedagógicas anteriores. | Preservado integralmente e sem alterações. Continua sendo fonte de temas, exemplos, decisões e alertas, sempre subordinada à revisão oficial atual. |
| `Plano-Completo-da-Apostila-Roblox-Studio.md` | Documento interno que organiza a progressão, as dependências, os projetos, as fontes e os critérios de validação da nova apostila. | Atualizado somente como plano; não é a apostila entregue ao aluno. |

Os parâmetros da apostila vêm de três fontes complementares:

1. a solicitação atual do aluno, que define o escopo, as correções e o formato HTML obrigatório;
2. o material-base, que funciona como rascunho técnico e registro de decisões anteriores;
3. este plano, que registra a sequência aprovada e deve permanecer coerente com a documentação oficial.

Em caso de divergência, a solicitação atual prevalece. Em questões técnicas, prevalece a documentação oficial atual.

### 1.2 O que o arquivo existente já define bem

- Cobertura ampla: Studio, Luau, mundo 3D, rede, segurança, dados, UI, física, personagens, arquitetura, testes, desempenho, publicação, monetização e analytics.
- Modelo mental correto de cliente e servidor: o cliente envia intenções; o servidor decide resultados relevantes.
- Preocupação consistente com validação, rate limiting, idempotência, falhas externas e concorrência.
- Uso de projetos progressivos, incluindo obby, coleta, loja, simulador, combate e dungeon.
- Preferência por módulos pequenos, composição, máquinas de estado e ciclo de vida explícito.
- Avisos úteis sobre streaming, network ownership, DataStore, recibos e texto criado por usuários.
- Referências oficiais específicas em vários temas, não apenas links para portais gerais.

### 1.3 Lacunas em relação à solicitação atual

- O arquivo já desenvolve as aulas, mas a etapa solicitada agora deve conter somente diagnóstico, sumário, matriz de fontes e planejamento de projetos.
- A progressão não começa no absoluto zero: instalação, criação do primeiro projeto, salvamento, interface e primeiro teste não recebem capítulos iniciais completos.
- Conceitos avançados aparecem cedo. O capítulo inicial de Luau usa generics e funções de ordem superior antes de consolidar variáveis, funções e tabelas para um iniciante.
- Os capítulos não seguem todos os 19 componentes obrigatórios. Em geral faltam objetivos formais, pré-requisitos, vocabulário, instruções exatas no Explorer, resultado esperado, diagnóstico de erros, três níveis de exercício, gabarito separado e a tabela “Validação técnica”.
- As práticas são boas propostas, porém normalmente não dizem exatamente qual projeto abrir, qual objeto criar, onde colocá-lo, quais propriedades alterar e como comparar cliente e servidor.
- As playlists são listadas por papel geral, mas não há, capítulo a capítulo, aula/assunto, momento, pré-requisitos, pontos de observação, reprodução, correções, fonte de validação e desafio de modificação.
- A trilha fixa de 24 semanas pode ser confundida com promessa de prazo. O novo plano usa dificuldade e critérios de domínio, sem prazo obrigatório.
- O capítulo de áudio apresenta os sistemas antigo e novo, mas a documentação atual desencoraja `Sound`, `SoundGroup` e `SoundEffect` em favor dos objetos modulares de áudio. O novo plano ensinará o sistema modular primeiro e o legado apenas para leitura/manutenção.
- Entrada multiplataforma é ensinada principalmente com `ContextActionService`. A documentação atual apresenta o Input Action System como solução própria para ações, contextos e bindings; ele será o caminho principal, com APIs anteriores tratadas de forma contextual.
- Open Cloud precisa de uma separação mais explícita: Engine APIs rodam dentro da experiência; Open Cloud usa HTTP, autenticação e aplicações externas. Serviços de Engine com nome semelhante não devem ser confundidos com a API web.
- Recomendações de bibliotecas comunitárias para session locking precisam ser apresentadas como opções externas auditáveis, nunca como solução oficial da Roblox.
- Faltam checkpoints pedagógicos formais para confirmar que o aluno domina a base antes de avançar para rede, dados e produção.

### 1.4 Informações que exigem confirmação contínua

- Interface, nomes de menus, recursos beta e fluxo de publicação do Studio podem mudar. Cada capítulo será revisto na data de redação.
- Limites, budgets, elegibilidade e políticas de DataStore, MemoryStore, monetização, anúncios, conteúdo aleatório pago, classificação e Open Cloud são mutáveis.
- A estabilidade e disponibilidade do Input Action System, Input Action Manager e recursos relacionados devem ser reconfirmadas antes da aula correspondente.
- O sistema modular de áudio é a orientação atual; exemplos legados continuarão sendo rotulados e nunca apresentados como primeira escolha sem justificativa.
- O conteúdo integral das seis playlists não pôde ser enumerado de modo confiável nesta análise. Alguns títulos foram confirmados, mas nenhuma playlist será marcada como “validada” em bloco.
- A edição existente é datada de 25 de agosto de 2026. A data não torna automaticamente todas as afirmações atuais; cada membro da API continuará sujeito a validação individual.

### 1.5 Decisões adotadas sem necessidade de nova pergunta

1. Criar um plano novo e separado, preservando o arquivo existente.
2. Começar por instalação, interface, salvar e testar antes de introduzir programação.
3. Ensinar Luau básico antes de usar generics, arquitetura, rede ou persistência.
4. Introduzir segurança conceitualmente antes de remotes e aplicá-la obrigatoriamente em toda mecânica de valor.
5. Usar projetos incrementais no mesmo laboratório sempre que isso reduzir carga cognitiva.
6. Adotar `--!strict` depois que o aluno compreender os tipos em runtime, sem misturar tipagem estática com validação de rede.
7. Ensinar o Input Action System e o áudio modular como caminhos atuais; APIs anteriores aparecerão para compatibilidade e leitura de projetos existentes.
8. Manter Open Cloud perto do fim, depois de HTTP, autenticação, segurança, dados, publicação e operação.
9. Não associar número ou título de vídeo quando ele não tiver sido diretamente confirmado.

---

## 2. Estrutura obrigatória de cada futuro capítulo

Cada capítulo desenvolvido após a aprovação deste plano usará a mesma estrutura:

1. Objetivos de aprendizagem.
2. Pré-requisitos e diagnóstico rápido.
3. Vocabulário novo.
4. Explicação simples.
5. Explicação técnica.
6. Modelo mental e limites do conceito.
7. Exemplos pequenos e progressivos.
8. Ficha de execução de cada código: tipo de script, caminho completo no Explorer, lado de execução, momento de execução e responsabilidade.
9. Código comentado e explicado linha por linha.
10. Prática guiada com projeto, objetos, propriedades, scripts, código, teste, resultado esperado e diagnóstico de divergências.
11. Uso de Output, Script Analysis, debugger ou ferramentas adequadas.
12. Erros comuns, causas e correções.
13. Exercícios fácil, médio e desafiador.
14. Pequeno projeto ou incremento de projeto.
15. Checklist de aprendizagem.
16. Resumo.
17. Gabarito comentado, separado dos enunciados.
18. Fontes oficiais específicas e data de consulta.
19. Conteúdo complementar, quando confirmado.
20. Tabela “Validação técnica” com as classificações exigidas.

O conteúdo de vídeo associado incluirá: playlist, aula ou assunto, momento de assistir, conhecimentos necessários, o que observar, o que reproduzir, o que corrigir ou atualizar, documentação usada na validação e um desafio que altere o exemplo.

---

## 3. Sumário completo, hierárquico e numerado

O percurso contém **12 módulos, 57 capítulos numerados e 4 avaliações de domínio não contabilizadas como capítulos**. As avaliações encerram os módulos 2, 5, 7 e 9 e impedem que lacunas críticas sejam carregadas para rede, persistência ou produção.

### Módulo 0 — Preparação para aprender e criar

**Dificuldade estimada:** 1/5 — introdutória.

#### 0.1 O que é desenvolver uma experiência Roblox

- **Aprender:** diferença entre experiência, place, sessão, servidor, cliente, Studio, Creator Hub e Engine; ciclo ideia → protótipo → teste → publicação → manutenção.
- **Prática guiada:** navegar pelos portais oficiais e montar um glossário inicial de dez termos.
- **Exercício/projeto:** escrever o conceito de uma experiência pequena com objetivo, ação principal e condição de sucesso.
- **Depende de:** nenhum capítulo.
- **Documentação:** [Experiências](https://create.roblox.com/docs/experiences), [visão geral da plataforma](https://create.roblox.com/docs/platform), [design para Roblox](https://create.roblox.com/docs/production/game-design/design-for-roblox).
- **Playlist complementar:** nenhuma; primeiro será estabelecido o vocabulário oficial.

#### 0.2 Instalação, conta, primeiro projeto, salvamento e teste

- **Aprender:** instalar e abrir o Studio, entrar na conta, criar uma experiência a partir de template, salvar localmente/na nuvem, executar e encerrar um teste.
- **Prática guiada:** criar `LaboratorioRoblox`, salvar uma cópia e executar Play e Run observando a diferença.
- **Exercício/projeto:** checklist reproduzível de abertura, salvamento, teste e recuperação de uma versão.
- **Depende de:** 0.1.
- **Documentação:** [configuração do Studio](https://create.roblox.com/docs/studio/setup), [interface do Studio](https://create.roblox.com/docs/studio/ui-overview), [criar e publicar experiências e places](https://create.roblox.com/docs/production/publishing/publish-games-and-places), [arquivos de place](https://create.roblox.com/docs/projects/place-files).
- **Playlist complementar:** Beginners Scripting — BrawlDev, somente um vídeo de apresentação ao Studio se o título e a interface forem confirmados antes da redação.

### Módulo 1 — Studio, objetos e construção do mundo

**Dificuldade estimada:** 1/5 — introdutória.

#### 1.1 Explorer, Properties, Output e modos de teste

- **Aprender:** localizar objetos, editar propriedades, ler mensagens e distinguir edição de execução.
- **Prática guiada:** abrir as três janelas, selecionar `Workspace`, alterar uma Part e comparar estado editado e estado em teste.
- **Exercício/projeto:** mapa de ferramentas do Studio com a finalidade de cada janela.
- **Depende de:** 0.2.
- **Documentação:** [Explorer](https://create.roblox.com/docs/studio/explorer), [Properties](https://create.roblox.com/docs/studio/properties), [Output](https://create.roblox.com/docs/studio/output), [modos de teste](https://create.roblox.com/docs/studio/testing-modes).
- **Playlist complementar:** nenhuma obrigatória.

#### 1.2 DataModel, Instances, hierarquia e serviços

- **Aprender:** `game`, `Workspace`, `Instance`, pai, filho, descendente, classe, serviço e contêiner.
- **Prática guiada:** montar no Explorer uma árvore nomeada com `Folder`, `Model` e Parts; prever o caminho completo de cada objeto.
- **Exercício/projeto:** reorganizar uma árvore propositalmente confusa sem alterar o comportamento visual.
- **Depende de:** 1.1.
- **Documentação:** [Data model](https://create.roblox.com/docs/projects/data-model), [Workspace](https://create.roblox.com/docs/workspace), [serviços](https://create.roblox.com/docs/scripting/services), [Instance API](https://create.roblox.com/docs/reference/engine/classes/Instance).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “objetos e hierarquia”, apenas após confirmação do episódio.

#### 1.3 Parts, Models, propriedades, pivôs e greybox

- **Aprender:** posição, tamanho, orientação, ancoragem, colisão, agrupamento, pivô, unidade stud e prototipagem em blocos.
- **Prática guiada:** construir uma sala com piso, paredes, porta e obstáculo; nomear e agrupar tudo.
- **Exercício/projeto:** **Projeto progressivo 1 — Primeira sala**, ainda sem código, com rota legível e escala testada.
- **Depende de:** 1.2.
- **Documentação:** [Parts](https://create.roblox.com/docs/parts), [Models](https://create.roblox.com/docs/parts/models), [Pivot tools](https://create.roblox.com/docs/studio/pivot-tools), [unidades Roblox](https://create.roblox.com/docs/physics/units), [prototipagem](https://create.roblox.com/docs/production/game-design/prototyping).
- **Playlist complementar:** nenhuma obrigatória.

#### 1.4 Assets, Toolbox, permissões, terreno e iluminação básica

- **Aprender:** asset, Creator Store, Asset Manager, risco de scripts em modelos, ownership, Terrain e iluminação como comunicação.
- **Prática guiada:** importar um asset seguro, inspecionar toda a árvore, remover conteúdo indesejado e criar uma pequena área de terreno.
- **Exercício/projeto:** concluir o Projeto progressivo 1 transformando a Primeira sala em duas atmosferas sem mudar sua geometria principal e registrando a versão salva.
- **Depende de:** 1.3.
- **Documentação:** [Assets](https://create.roblox.com/docs/assets), [Asset Manager](https://create.roblox.com/docs/projects/assets/manager), [Toolbox](https://create.roblox.com/docs/projects/assets/toolbox), [vulnerabilidades de assets de terceiros](https://create.roblox.com/docs/scripting/security/third-party-vulnerabilities), [Terrain Editor](https://create.roblox.com/docs/studio/terrain-editor), [iluminação](https://create.roblox.com/docs/environment/lighting).
- **Playlist complementar:** nenhuma; exemplos oficiais terão prioridade.

### Módulo 2 — Lógica de programação e Luau do zero

**Dificuldade estimada:** 1–2/5 — básica.

#### 2.1 Primeiro Script, `print()` e leitura do Output

- **Aprender:** o que é código, instrução, comentário, `Script`, `RunContext = Server`, execução sequencial no servidor, erro e log; a comparação completa entre tipos de script ficará para 4.2.
- **Prática guiada:** criar um `Script` em `ServerScriptService`, imprimir três mensagens e provocar/corrigir um erro simples.
- **Exercício/projeto:** iniciar o **Projeto progressivo 2 — Primeira sala interativa** fazendo a sala responder ao início da sessão com uma mudança simples e observável; a interação por evento será acrescentada somente em 3.1.
- **Depende de:** 1.1 e 1.2.
- **Documentação:** [introdução à programação](https://create.roblox.com/docs/tutorials/fundamentals/coding-1/coding-fundamentals), [Scripting](https://create.roblox.com/docs/scripting), [tipos e locais de script](https://create.roblox.com/docs/scripting/locations), [Script Editor](https://create.roblox.com/docs/studio/script-editor), [Output](https://create.roblox.com/docs/studio/output).
- **Playlist complementar:** Beginners Scripting — BrawlDev, **“Printing — #2”**; assistir depois da prática, observar ordem e Output, reproduzir sem copiar e modificar para imprimir propriedades da sala. Validar pela documentação de Output e Scripting.

#### 2.2 Valores, variáveis, constantes e tipos básicos

- **Aprender:** `nil`, boolean, number, string, variável local, nome claro, `const` nativo e a convenção `LOUD_SNAKE_CASE`; explicar que `const` impede reatribuição da variável, mas não congela automaticamente o conteúdo de uma tabela.
- **Prática guiada:** representar nome de fase, pontuação, porta aberta e tempo limite; imprimir valor e `typeof()`.
- **Exercício/projeto:** ficha de configuração simples para a Primeira sala.
- **Depende de:** 2.1.
- **Documentação:** [variáveis](https://create.roblox.com/docs/luau/variables), [nil](https://create.roblox.com/docs/luau/nil), [booleans](https://create.roblox.com/docs/luau/booleans), [numbers](https://create.roblox.com/docs/luau/numbers), [strings](https://create.roblox.com/docs/luau/strings).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “variáveis e tipos”, após confirmação do episódio.

#### 2.3 Operadores, expressões e conversões

- **Aprender:** aritmética, comparação, lógica, concatenação/interpolação, precedência e conversões explícitas.
- **Prática guiada:** calcular pontuação, bônus e texto de resultado com entradas controladas.
- **Exercício/projeto:** calculadora de recompensa com casos normais e limites.
- **Depende de:** 2.2.
- **Documentação:** [operadores](https://create.roblox.com/docs/luau/operators), [strings](https://create.roblox.com/docs/luau/strings), [type coercion](https://create.roblox.com/docs/luau/type-coercion).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto correspondente, somente após confirmar conteúdo.

#### 2.4 Condições, decisões e guard clauses

- **Aprender:** `if`, `elseif`, `else`, verdade/falsidade, condições compostas e retorno antecipado.
- **Prática guiada:** decidir se uma porta pode abrir com base em chave e nível.
- **Exercício/projeto:** regras de acesso fácil, médio e desafiador para três portas.
- **Depende de:** 2.3.
- **Documentação:** [estruturas de controle](https://create.roblox.com/docs/luau/control-structures), [booleans](https://create.roblox.com/docs/luau/booleans), [operadores](https://create.roblox.com/docs/luau/operators).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “if statements/conditionals”, título a confirmar.

#### 2.5 Laços, repetição segura e tempo

- **Aprender:** `for`, `while`, término, `break`, iteração e por que loops sem pausa podem bloquear a execução.
- **Prática guiada:** contar checkpoints e percorrer uma pequena lista; comparar repetição finita e tarefa agendada.
- **Exercício/projeto:** cronômetro simples que pode ser encerrado.
- **Depende de:** 2.4.
- **Documentação:** [estruturas de controle](https://create.roblox.com/docs/luau/control-structures), [agendamento de código](https://create.roblox.com/docs/scripting/scheduler).
- **Playlist complementar:** Beginners Scripting — BrawlDev, **“Loops — #11”**; observar condição de término, reproduzir com limite e transformar o exemplo para contar objetos. Corrigir qualquer uso de globais legadas com `task.*` quando necessário.

#### 2.6 Funções, parâmetros, retornos e decomposição

- **Aprender:** declarar, chamar, receber parâmetros, retornar valores, evitar repetição e nomear responsabilidade.
- **Prática guiada:** criar funções para calcular recompensa, atualizar mensagem e validar um valor.
- **Exercício/projeto:** dividir uma regra longa de porta em três funções pequenas.
- **Depende de:** 2.2–2.5.
- **Documentação:** [funções](https://create.roblox.com/docs/luau/functions), [tuples](https://create.roblox.com/docs/luau/tuples), [escopo](https://create.roblox.com/docs/luau/scope).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “functions”, título a confirmar.

#### 2.7 Tabelas: arrays, dicionários e dados de configuração

- **Aprender:** índices, chaves, inserção, remoção, iteração, arrays sem buracos, cópia rasa e configuração orientada a dados.
- **Prática guiada:** representar fases, itens e preços em tabelas.
- **Exercício/projeto:** catálogo de coletáveis com três tipos e regras diferentes.
- **Depende de:** 2.5 e 2.6.
- **Documentação:** [tabelas](https://create.roblox.com/docs/luau/tables), [filas](https://create.roblox.com/docs/luau/queues), [pilhas](https://create.roblox.com/docs/luau/stacks).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “tables”, episódio a confirmar.

#### 2.8 Escopo, `nil`, erros e diagnóstico

- **Aprender:** escopo local, referência ausente, leitura de mensagens de erro, stack trace, diferença entre erro de programação e falha externa e um processo de diagnóstico reproduzível.
- **Prática guiada:** localizar e corrigir referências `nil`, variáveis fora do escopo e erros de digitação usando Output e a linha indicada pela mensagem.
- **Exercício/projeto:** laboratório de diagnóstico e melhoria da Primeira sala interativa; `pcall` será apenas mencionado como prévia e ensinado de forma aplicada no capítulo 7.2, quando surgirem operações externas que realmente podem falhar. Ele nunca será usado para esconder erro de programação.
- **Depende de:** 2.1–2.7.
- **Documentação:** [escopo](https://create.roblox.com/docs/luau/scope), [Output](https://create.roblox.com/docs/studio/output), [debugging](https://create.roblox.com/docs/studio/debugging), [documentação da linguagem Luau](https://luau.org/).
- **Playlist complementar:** Beginners Scripting — BrawlDev para escopo/erros, somente se a aula específica for confirmada.

#### 2.9 Tipagem Luau, inferência, anotações e `--!strict`

- **Aprender:** diferença entre tipo observado em runtime e verificação estática, inferência, anotações, aliases, tipos opcionais, refinamento e a diretiva `--!strict`.
- **Prática guiada:** tipar gradualmente funções pequenas da Primeira sala interativa, interpretar avisos do editor e corrigir incompatibilidades sem recorrer a `any` como atalho.
- **Exercício/projeto:** produzir uma versão estrita de um pequeno arquivo de regras em `Script`, preservando o mesmo comportamento observado antes da tipagem. `ModuleScript` só será exigido depois de ser ensinado em 4.2.
- **Depende de:** 2.1–2.8.
- **Documentação:** [type checking](https://create.roblox.com/docs/luau/type-checking), [introdução aos tipos Luau](https://luau.org/types/) e [refinamentos de tipo](https://luau.org/types/type-refinements/).
- **Playlist complementar:** Advanced Scripting — BrawlDev somente depois da base e apenas se houver aula específica confirmada e tecnicamente atual.

#### Avaliação de domínio — Módulo 2 (não contabilizada como capítulo)

- **Confirma:** leitura do Output, valores e tipos, condições, laços finitos, funções, tabelas, escopo, diagnóstico e tipagem básica.
- **Evidência:** o aluno prevê, executa, explica e corrige três pequenos programas, além de realizar uma alteração na Primeira sala interativa sem copiar uma solução.
- **Critério para avançar:** explicar o fluxo de execução e corrigir os casos essenciais sem depender do gabarito; lacunas identificadas remetem ao capítulo correspondente antes do Módulo 3.

### Módulo 3 — Programar a Engine e o mundo 3D

**Dificuldade estimada:** 2/5 — básica com integração à Engine.

#### 3.1 Propriedades, métodos, eventos e conexões

- **Aprender:** diferença entre dado, ação e sinal; `Connect()`, callback, parâmetros do evento, desconexão e debounce simples.
- **Prática guiada:** uma Part muda de cor quando tocada e registra a interação no Output.
- **Exercício/projeto:** concluir o **Projeto progressivo 2 — Primeira sala interativa** e iniciar o **Projeto progressivo 3 — Obstáculo com eventos**, com efeito temporário e proteção contra repetição acidental; dano e estado por jogador serão acrescentados somente após 4.1.
- **Depende de:** 1.2, 2.4 e 2.6.
- **Documentação:** [propriedades e atributos](https://create.roblox.com/docs/scripting/attributes), [eventos](https://create.roblox.com/docs/scripting/events), [Instance API](https://create.roblox.com/docs/reference/engine/classes/Instance), [BasePart API](https://create.roblox.com/docs/reference/engine/classes/BasePart).
- **Playlist complementar:** Beginners Scripting — BrawlDev, **“Events — #13”**; assistir após criar a primeira versão, observar callback e debounce e reproduzir com um efeito diferente. A variação de cooldown por jogador fica reservada para depois de 4.1.

#### 3.2 Encontrar/criar Instances, caminhos, atributos e tags

- **Aprender:** `Instance.new`, `Parent`, `FindFirstChild`, `WaitForChild`, `GetChildren`, `GetDescendants`, atributos e `CollectionService`.
- **Prática guiada:** criar uma pasta de coletáveis, atribuir `Reward`, aplicar tag e validar configuração.
- **Exercício/projeto:** iniciar a base do **Projeto progressivo 6 — Coleta e moedas seguras** com coletáveis configurados e um detector que lista itens inválidos; recompensa em rede só será adicionada no capítulo 5.4.
- **Depende de:** 3.1 e 2.7.
- **Documentação:** [Data model](https://create.roblox.com/docs/projects/data-model), [atributos](https://create.roblox.com/docs/scripting/attributes), [CollectionService API](https://create.roblox.com/docs/reference/engine/classes/CollectionService), [Instance API](https://create.roblox.com/docs/reference/engine/classes/Instance).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “instances”, título a confirmar.

#### 3.3 `Vector3`, `CFrame`, pivôs e transformações

- **Aprender:** posição, direção, magnitude, espaço local/mundo, orientação, composição e ordem de transformações.
- **Prática guiada:** mover e girar uma porta pelo pivô e posicionar um marcador à frente de uma Part de referência.
- **Exercício/projeto:** plataforma móvel com pontos de destino e testes de orientação.
- **Depende de:** 1.3, 2.3 e 3.2.
- **Documentação:** [CFrames](https://create.roblox.com/docs/workspace/cframes), [PVInstance API](https://create.roblox.com/docs/reference/engine/classes/PVInstance), [Pivot tools](https://create.roblox.com/docs/studio/pivot-tools), [Vector3 API](https://create.roblox.com/docs/reference/engine/datatypes/Vector3).
- **Playlist complementar:** Advanced Scripting — BrawlDev, assunto de `CFrame`/vetores, somente depois de confirmar título e API usada.

#### 3.4 Colisões, raycasts, consultas espaciais e TweenService

- **Aprender:** colisão física, `Touched` como sinal e não como prova, raycast, filtros, consultas de volume, deduplicação e interpolação.
- **Prática guiada:** detectar obstáculo entre origem e destino e visualizar a linha de teste.
- **Exercício/projeto:** porta animada e sensor de área que deduplica Models; a conversão de Parts atingidas em personagens será feita depois de 4.1.
- **Depende de:** 3.1–3.3.
- **Documentação:** [colisões](https://create.roblox.com/docs/workspace/collisions), [raycasting](https://create.roblox.com/docs/workspace/raycasting), [TweenService API](https://create.roblox.com/docs/reference/engine/classes/TweenService), [WorldRoot API](https://create.roblox.com/docs/reference/engine/classes/WorldRoot).
- **Playlist complementar:** Advanced Scripting — BrawlDev, assunto “raycasting”, episódio a confirmar e validar.

### Módulo 4 — Jogadores, scripts, ferramentas, entrada e interface

**Dificuldade estimada:** 2–3/5 — intermediária inicial.

#### 4.1 `Player`, `Character`, `Humanoid` e respawn

- **Aprender:** identidade da sessão, personagem recriável, raiz, humanoide, entrada/saída de jogadores e ciclo de vida.
- **Prática guiada:** observar `PlayerAdded`, `CharacterAdded`, morte e dez respawns sem duplicar conexões.
- **Exercício/projeto:** concluir o **Projeto progressivo 3 — Obstáculo com eventos** acrescentando dano e debounce por jogador; iniciar a base do **Projeto progressivo 5 — Percurso com checkpoint e interface** com um checkpoint de sessão que restaura a posição depois do respawn.
- **Depende de:** 3.1 e 3.2.
- **Documentação:** [Players](https://create.roblox.com/docs/players), [Characters](https://create.roblox.com/docs/characters), [Players API](https://create.roblox.com/docs/reference/engine/classes/Players), [Humanoid API](https://create.roblox.com/docs/reference/engine/classes/Humanoid), [exemplo oficial Player Lifecycle Events](https://create.roblox.com/docs/samples).
- **Playlist complementar:** Beginners Scripting — BrawlDev, assunto “players/characters”, episódio a confirmar.

#### 4.2 `Script`, `LocalScript`, `ModuleScript`, `RunContext` e locais de execução

- **Aprender:** servidor, cliente, cache separado de módulo, locais permitidos e momento de execução.
- **Prática guiada:** imprimir mensagens identificadas do servidor e do cliente e comparar as duas árvores de teste.
- **Exercício/projeto:** classificar vinte responsabilidades pelo lado correto.
- **Depende de:** 4.1 e 2.8.
- **Documentação:** [tipos e locais de script](https://create.roblox.com/docs/scripting/locations), [client-server runtime](https://create.roblox.com/docs/projects/client-server), [RunService API](https://create.roblox.com/docs/reference/engine/classes/RunService).
- **Playlist complementar:** Advanced Scripting — BrawlDev, **“Local Scripts (Server vs Client) — #1”**; reproduzir a separação, observar visibilidade e atualizar qualquer generalização com as regras atuais de localização e `RunContext`.

#### 4.3 Tools, `StarterPack`, `Backpack` e inventário de sessão

- **Aprender:** estrutura de `Tool`, Handle, equipar/desequipar, ativação e diferença entre ferramenta visual e inventário autoritativo.
- **Prática guiada:** criar uma lanterna utilizável e testar após respawn.
- **Exercício/projeto:** iniciar o **Projeto progressivo 4 — Ferramenta utilizável**, com estado, cooldown e limpeza.
- **Depende de:** 4.1, 4.2 e 3.1.
- **Documentação:** [ferramentas no jogo](https://create.roblox.com/docs/players/tools), [Tool API](https://create.roblox.com/docs/reference/engine/classes/Tool), [StarterPack API](https://create.roblox.com/docs/reference/engine/classes/StarterPack).
- **Playlist complementar:** Advanced Scripting — TheDevKing, **“Tools — #1”**, somente como estudo histórico; comparar toda API com a documentação atual e substituir padrões antigos de input, animação ou cliente-servidor.

#### 4.4 Input Action System: teclado e gamepad

- **Aprender:** ação versus tecla, contextos, bindings de teclado e gamepad, inputs analógicos, troca de dispositivo e controles reservados.
- **Prática guiada:** criar a ação “Interagir” somente com teclado e gamepad e testá-la com os dispositivos disponíveis no Studio. Nenhum botão touch ou objeto de GUI será exigido aqui.
- **Exercício/projeto:** melhorar o Projeto progressivo 4 convertendo a lanterna para ações de teclado e gamepad; a versão touch será adicionada após os fundamentos de GUI.
- **Depende de:** 4.2 e 4.3.
- **Documentação:** [Input Action System](https://create.roblox.com/docs/input/input-action-system), [input](https://create.roblox.com/docs/input), [mouse e teclado](https://create.roblox.com/docs/input/mouse-and-keyboard), [gamepad](https://create.roblox.com/docs/input/gamepad).
- **Playlist complementar:** nenhuma nesta primeira passagem; vídeos de GUI só serão usados depois de `ScreenGui` e `GuiButton` serem ensinados.

#### 4.5 Fundamentos de GUI e interação

- **Aprender:** `ScreenGui`, `Frame`, `TextLabel`, `GuiButton`, `Activated`, `UDim2`, `AnchorPoint`, hierarquia visual e estados básicos de foco.
- **Prática guiada:** criar primeiro um HUD simples e depois um botão funcional, sem ainda exigir responsividade completa ou binding touch no Input Action System.
- **Exercício/projeto:** melhorar o **Projeto progressivo 5 — Percurso com checkpoint e interface** exibindo o checkpoint atual e uma mensagem de conclusão.
- **Depende de:** 4.1 e 4.2; usa apenas os fundamentos de input já apresentados em 4.4.
- **Documentação:** [UI](https://create.roblox.com/docs/ui), [posição e tamanho](https://create.roblox.com/docs/ui/position-and-size), [botões](https://create.roblox.com/docs/ui/buttons), [GuiButton API](https://create.roblox.com/docs/reference/engine/classes/GuiButton), [ScreenGui API](https://create.roblox.com/docs/reference/engine/classes/ScreenGui).
- **Playlist complementar:** GUI — BrawlDev, assunto correspondente à primeira tela; assistir depois da versão funcional, observar hierarquia e eventos e refazer sem posições fixas frágeis.

#### 4.6 Touch, responsividade, acessibilidade e localização

- **Aprender:** binding touch no Input Action System, adaptação a celular/tablet/desktop, layouts e constraints, safe area, contraste, foco de gamepad e textos localizáveis.
- **Prática guiada:** retornar à ação “Interagir”, associar o botão touch agora que `ScreenGui` e `GuiButton` já são conhecidos, adaptar o HUD e executar o teste final em teclado, gamepad e emulação móvel.
- **Exercício/projeto:** concluir o **Projeto progressivo 4 — Ferramenta utilizável** com input multiplataforma e concluir o **Projeto progressivo 5 — Percurso com checkpoint e interface** em celular vertical, tablet, desktop e gamepad.
- **Depende de:** 4.4 e 4.5.
- **Documentação:** [Input Action System](https://create.roblox.com/docs/input/input-action-system), [mobile](https://create.roblox.com/docs/input/mobile), [layouts flexíveis](https://create.roblox.com/docs/ui/list-flex-layouts), [adaptive design](https://create.roblox.com/docs/production/publishing/adaptive-design), [acessibilidade](https://create.roblox.com/docs/production/publishing/accessibility), [localização](https://create.roblox.com/docs/production/localization).
- **Playlist complementar:** GUI — BrawlDev, assunto correspondente; observar hierarquia e interação, reproduzir com layout adaptativo e acrescentar binding touch atual depois de validar a API.

### Módulo 5 — Cliente, servidor, rede e segurança

**Dificuldade estimada:** 3/5 — intermediária.

#### 5.1 Replicação, latência, fonte de verdade e fronteira de confiança

- **Aprender:** o que replica, o que é apenas local, autoridade, previsão visual e por que o cliente não é confiável.
- **Prática guiada:** alterar uma Part no cliente e no servidor durante teste com dois clientes e comparar os resultados.
- **Exercício/projeto:** tabela de fonte de verdade para moedas, dano, UI, câmera, inventário e efeitos.
- **Depende de:** 4.2.
- **Documentação:** [client-server runtime](https://create.roblox.com/docs/projects/client-server), [fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary), [acesso e confidencialidade](https://create.roblox.com/docs/scripting/security/access-control).
- **Playlist complementar:** Advanced Scripting — BrawlDev, “Local Scripts — #1”, agora revisto sob a perspectiva de segurança.

#### 5.2 RemoteEvents, RemoteFunctions e UnreliableRemoteEvents

- **Aprender:** direção, evento versus chamada com retorno, payload, ordem, dados descartáveis e riscos de dependência síncrona.
- **Prática guiada:** botão cliente solicita uma mudança; servidor valida e responde por evento separado.
- **Exercício/projeto:** documentar cinco contratos remotos estreitos.
- **Depende de:** 5.1, 3.1 e 2.7.
- **Documentação:** [eventos e callbacks remotos](https://create.roblox.com/docs/scripting/events/remote), [RemoteEvent API](https://create.roblox.com/docs/reference/engine/classes/RemoteEvent), [RemoteFunction API](https://create.roblox.com/docs/reference/engine/classes/RemoteFunction), [UnreliableRemoteEvent API](https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent).
- **Playlist complementar:** Advanced Scripting — BrawlDev, assunto “remotes”, episódio a confirmar; qualquer remote genérico será convertido em intenção estreita.

#### 5.3 Validação de runtime, números finitos, contexto, distância e rate limiting

- **Aprender:** validação por camadas, allowlist, limites de tamanho, `NaN`/infinito, permissão, estado, espaço, tempo, custo e resposta segura.
- **Prática guiada:** construir um validador de interação e um token bucket por jogador/ação.
- **Exercício/projeto:** suíte adversarial com tipos errados, ID inexistente, spam e distância impossível.
- **Depende de:** 5.2 e 2.8.
- **Documentação:** [fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary), [táticas de segurança](https://create.roblox.com/docs/scripting/security/security-tactics), [design defensivo](https://create.roblox.com/docs/scripting/security/defensive-design).
- **Playlist complementar:** Advanced Scripting — BrawlDev e TheDevKing somente para comparar padrões; a documentação oficial decide a correção.

#### 5.4 Sistema de coleta e moedas controlado pelo servidor

- **Aprender:** intenção de coleta, identidade do coletável, corrida entre jogadores, distância, cooldown, concessão única e feedback local.
- **Prática guiada:** transformar os coletáveis do capítulo 3.2 em moedas validadas no servidor.
- **Exercício/projeto:** iniciar e concluir o **Projeto progressivo 6 — Coleta e moedas seguras**, com placar de sessão.
- **Depende de:** 3.2, 4.6 e 5.1–5.3.
- **Documentação:** [CollectionService API](https://create.roblox.com/docs/reference/engine/classes/CollectionService), [Proximity Prompts](https://create.roblox.com/docs/ui/proximity-prompts), [fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary), [leaderboards](https://create.roblox.com/docs/players/leaderboards).
- **Playlist complementar:** Beginners Scripting — BrawlDev para eventos; qualquer recompensa inicialmente local será reimplementada no servidor.

#### 5.5 Loja simples, segura e transacional

- **Aprender:** catálogo por ID, preço confiável, saldo, capacidade, atomicidade em memória, idempotência, confirmação e UX de erro.
- **Prática guiada:** cliente mostra catálogo; servidor calcula preço e conclui ou rejeita a compra.
- **Exercício/projeto:** iniciar o **Projeto progressivo 7 — Loja segura**, incluindo repetição, saldo exato, item inválido e clique rápido.
- **Depende de:** 5.4, 2.7 e 4.6.
- **Documentação:** [fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary), [UI/UX design](https://create.roblox.com/docs/production/game-design/ui-ux-design), [exemplos oficiais](https://create.roblox.com/docs/samples).
- **Playlist complementar:** Simulator — MonzterDEV, assuntos de moeda/loja; observar o loop, reproduzir com servidor autoritativo, substituir preço enviado pelo cliente e adicionar desafio de item com limite.

#### Avaliação de domínio — Módulo 5 (não contabilizada como capítulo)

- **Confirma:** replicação, escolha entre tipos de remote, contrato de payload, autoridade do servidor, validação por camadas, rate limiting e testes hostis.
- **Evidência:** o aluno explica por que preço e recompensa não vêm do cliente e demonstra a rejeição de tipo errado, distância impossível, spam e pedido duplicado.
- **Critério para avançar:** coleta e loja permanecem corretas em teste com múltiplos clientes e entradas adulteradas; falhas remetem aos capítulos 5.1–5.5.

### Módulo 6 — Arquitetura, estados, depuração e colaboração

**Dificuldade estimada:** 3/5 — intermediária.

#### 6.1 ModuleScripts, configuração, estado e contratos tipados

- **Aprender:** `require`, cache por ambiente, API pública, configuração versus estado, tipos exportados e dados compartilháveis.
- **Prática guiada:** extrair catálogo, cálculo de preço e formatação para módulos pequenos.
- **Exercício/projeto:** melhorar o Projeto progressivo 7 convertendo a loja em módulos `ItemCatalog`, `Economy` e `Shop`.
- **Depende de:** 2.7–2.9 e 5.5.
- **Documentação:** [reutilizar código](https://create.roblox.com/docs/scripting/module), [type checking](https://create.roblox.com/docs/luau/type-checking), [ModuleScript API](https://create.roblox.com/docs/reference/engine/classes/ModuleScript).
- **Playlist complementar:** Advanced Scripting — BrawlDev/TheDevKing, assunto de módulos e OOP, apenas após validar cada padrão e evitar herança desnecessária.

#### 6.2 Composição, dependências, serviços internos, ciclo de vida e máquinas de estado

- **Aprender:** responsabilidade única, dependência explícita, bootstrap, `init/start/destroy`, limpeza de conexões, composição e transições válidas.
- **Prática guiada:** porta com estados `Closed`, `Opening`, `Open` e `Closing` e dependências injetadas.
- **Exercício/projeto:** refatorar um script monolítico sem criar dependência circular.
- **Depende de:** 6.1 e 3.1.
- **Documentação:** [ModuleScripts](https://create.roblox.com/docs/scripting/module), [metatables](https://create.roblox.com/docs/luau/metatables), [eventos](https://create.roblox.com/docs/scripting/events).
- **Playlist complementar:** Advanced Scripting — TheDevKing como estudo de padrões clássicos; preferir composição quando reduzir acoplamento.

#### 6.3 Debug, stack traces, testes e regressão

- **Aprender:** reproduzir, observar, formular hipótese, isolar, testar, corrigir e registrar regressão; testes puros, integração e multiplayer.
- **Prática guiada:** depurar três falhas e executar a loja em Play Solo, Server & Clients e Device Emulator.
- **Exercício/projeto:** concluir o Projeto progressivo 7 com uma matriz de testes feliz, limite, inválido, hostil, concorrente e falha externa.
- **Depende de:** 2.8, 5.5 e 6.1.
- **Documentação:** [debugging](https://create.roblox.com/docs/studio/debugging), [modos de teste](https://create.roblox.com/docs/studio/testing-modes), [Developer Console](https://create.roblox.com/docs/studio/developer-console), [Script Analysis/Editor](https://create.roblox.com/docs/studio/script-editor).
- **Playlist complementar:** nenhuma; exemplos oficiais e testes originais terão prioridade.

#### 6.4 Controle de versão, Packages, Script Sync e colaboração

- **Aprender:** versões, commits, revisão, rollback, ownership, permissões, Team Create, Packages e fluxo com arquivos.
- **Prática guiada:** versionar a loja, criar uma alteração pequena, revisar e restaurar versão anterior em ambiente de teste.
- **Exercício/projeto:** checklist de revisão e plano de reversão.
- **Depende de:** 6.1–6.3.
- **Documentação:** [colaboração](https://create.roblox.com/docs/projects/collaboration), [Version History](https://create.roblox.com/docs/projects/version-history), [Packages](https://create.roblox.com/docs/projects/assets/packages), [Script Sync](https://create.roblox.com/docs/scripting/sync), [ferramentas externas](https://create.roblox.com/docs/projects/external-tools).
- **Playlist complementar:** nenhuma obrigatória.

### Módulo 7 — Pontuação, persistência, economia e progressão

**Dificuldade estimada:** 3–4/5 — intermediária avançada.

#### 7.1 Estado de sessão, leaderstats e modelo de perfil

- **Aprender:** placar visível versus fonte de verdade, chave por `UserId`, schema, valores padrão e dados serializáveis.
- **Prática guiada:** modelar perfil versionado sem ainda gravar na nuvem.
- **Exercício/projeto:** iniciar o **Projeto progressivo 8 — Salvamento de progresso** modelando e migrando dados fictícios v1 para v2 em memória, ainda sem gravação na nuvem.
- **Depende de:** 5.4 e 6.1.
- **Documentação:** [leaderboards](https://create.roblox.com/docs/players/leaderboards), [Data stores](https://create.roblox.com/docs/cloud-services/data-stores), [player data sample](https://create.roblox.com/docs/samples).
- **Playlist complementar:** Advanced Scripting — BrawlDev, preparação para DataStore.

#### 7.2 DataStore básico e ambiente de teste seguro

- **Aprender:** `GetAsync`, `SetAsync`, `UpdateAsync`, `IncrementAsync`, budgets, throttling, risco de testar contra produção e uso aplicado de `pcall` em operações externas que podem falhar.
- **Prática guiada:** carregar e salvar um perfil mínimo em experiência de teste separada; envolver apenas as chamadas de DataStore com `pcall`, registrar a falha e manter visíveis os erros de programação.
- **Exercício/projeto:** melhorar o Projeto progressivo 8 comparando quando `SetAsync` e `UpdateAsync` são adequados e simulando uma falha externa observável.
- **Depende de:** 7.1, 2.8 e 6.3.
- **Documentação:** [Data stores](https://create.roblox.com/docs/cloud-services/data-stores), [erros e limites](https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits), [boas práticas](https://create.roblox.com/docs/cloud-services/data-stores/best-practices), [DataStoreService API](https://create.roblox.com/docs/reference/engine/classes/DataStoreService).
- **Playlist complementar:** Advanced Scripting — BrawlDev, **“DataStore — #17”**; observar operações e `pcall`, reproduzir só em ambiente de teste, corrigir fluxos “Get ao entrar/Set ao sair” insuficientes e acrescentar falha de carregamento.

#### 7.3 Salvamento robusto, migração, retries, autosave, concorrência e sessão

- **Aprender:** reconciliação, migração determinística, backoff limitado, fila de escrita, falha de load, autosave escalonado, fechamento e session ownership.
- **Prática guiada:** simular falha de load e provar que nenhum dado vazio sobrescreve o real.
- **Exercício/projeto:** concluir o **Projeto progressivo 8 — Salvamento de progresso**, cobrindo moedas, inventário e checkpoint.
- **Depende de:** 7.2 e 6.3.
- **Documentação:** [boas práticas de DataStore](https://create.roblox.com/docs/cloud-services/data-stores/best-practices), [versionamento/listagem/cache](https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching), [observabilidade](https://create.roblox.com/docs/cloud-services/data-stores/observability), [dados de jogador e compras](https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing).
- **Playlist complementar:** BrawlDev #17 apenas como base; bibliotecas comunitárias de perfil serão opcionais e auditadas, nunca apresentadas como oficiais.

#### 7.4 Inventário, recompensas, economia, progressão e missões

- **Aprender:** IDs estáveis, stacks, capacidade, RewardService, fontes/sumidouros, curvas, quests, loot e idempotência.
- **Prática guiada:** simular progressão e compra com três perfis de jogador e limites numéricos.
- **Exercício/projeto:** iniciar o **Projeto progressivo 9 — Simulador enxuto** com um sistema de missão que concede recompensa uma única vez.
- **Depende de:** 5.5, 7.3 e 6.2.
- **Documentação:** [balanceamento de economias](https://create.roblox.com/docs/production/game-design/balance-virtual-economies), [quest design](https://create.roblox.com/docs/production/game-design/introduction-to-quest-design), [eventos de economia](https://create.roblox.com/docs/production/analytics/economy-events), [PolicyService API](https://create.roblox.com/docs/reference/engine/classes/PolicyService).
- **Playlist complementar:** Simulator — MonzterDEV; observar loop e progressão, reconstruir com autoridade do servidor, módulos separados e desafio de nova fonte/sumidouro.

#### 7.5 Protótipo de simulador bem arquitetado

- **Aprender:** integrar coleta, ferramenta, mochila, venda, upgrades, área, rebirth, UI, dados e testes sem script monolítico.
- **Prática guiada:** construir uma vertical slice de mineração com uma ferramenta, dois minérios, uma venda e um upgrade.
- **Exercício/projeto:** concluir o **Projeto progressivo 9 — Simulador enxuto**, com abuso de remotes e falhas de save testados.
- **Depende de:** 4.3–4.6, 5.1–5.5, 6.1–6.3 e 7.1–7.4.
- **Documentação:** fontes específicas dos capítulos anteriores, [core loops](https://create.roblox.com/docs/production/game-design/core-loops) e [analytics de economia](https://create.roblox.com/docs/production/analytics/economy-events).
- **Playlist complementar:** Simulator — MonzterDEV, playlist de 2022. A sequência exata de episódios será selecionada somente após acesso; toda implementação será tratada como estudo, não como arquitetura de referência.

#### Avaliação de domínio — Módulo 7 (não contabilizada como capítulo)

- **Confirma:** schema versionado, separação entre sessão e persistência, falha de load segura, escolha de operação, migração, retry limitado, idempotência e economia coerente.
- **Evidência:** o aluno demonstra que um load falho não sobrescreve dados, que uma recompensa repetida não duplica valor e que dados v1 migram para v2.
- **Critério para avançar:** o protótipo mantém integridade nos cenários normal, concorrente e de falha; lacunas remetem aos capítulos 7.1–7.5.

### Módulo 8 — Sistemas avançados de gameplay

**Dificuldade estimada:** 4/5 — avançada.

#### 8.1 Scheduler, `task`, RunService e independência de FPS

- **Aprender:** concorrência cooperativa, yield, `task.*`, fases do frame, `deltaTime`, polling versus eventos e condições de corrida.
- **Prática guiada:** cronômetro estável e sistema de verificação a 5 Hz em diferentes taxas de quadros.
- **Exercício/projeto:** eliminar um loop por frame desnecessário e medir o resultado.
- **Depende de:** 2.5, 3.1 e 6.3.
- **Documentação:** [agendamento de código](https://create.roblox.com/docs/scripting/scheduler), [task scheduler](https://create.roblox.com/docs/performance-optimization/microprofiler/task-scheduler), [RunService API](https://create.roblox.com/docs/reference/engine/classes/RunService), [Parallel Luau](https://create.roblox.com/docs/scripting/multithreading).
- **Playlist complementar:** Advanced Scripting — BrawlDev, **“Task Functions — #4”** e **“RunService — #24”**; atualizar qualquer uso de `wait/spawn/delay` globais e justificar a fase escolhida.

#### 8.2 Física, constraints, network ownership e streaming

- **Aprender:** assemblies, constraints atuais, simulação distribuída, propriedade de rede, risco de física cliente e conteúdo streamado.
- **Prática guiada:** porta com `HingeConstraint`, bola com ownership observado e mapa de teste com streaming.
- **Exercício/projeto:** validar uma interação física crítica sem confiar apenas em `Touched`.
- **Depende de:** 3.3, 3.4, 5.1 e 5.3.
- **Documentação:** [física](https://create.roblox.com/docs/physics), [assemblies](https://create.roblox.com/docs/physics/assemblies), [constraints](https://create.roblox.com/docs/physics/mechanical-constraints), [network ownership](https://create.roblox.com/docs/physics/network-ownership), [segurança de física](https://create.roblox.com/docs/scripting/security/network-ownership), [streaming](https://create.roblox.com/docs/workspace/streaming).
- **Playlist complementar:** Advanced Scripting — BrawlDev/TheDevKing quando houver física; BodyMovers antigos serão classificados como obsoletos e substituídos por constraints atuais.

#### 8.3 Animação, câmera, áudio modular e efeitos

- **Aprender:** rigs, `Animator`, prioridades/markers, câmera local, feedback previsto/confirmado, `AudioPlayer`, `AudioEmitter`, `AudioListener`, `Wire`, partículas, beams e trails.
- **Prática guiada:** ferramenta com animação, câmera e feedback audiovisual que não concede dano.
- **Exercício/projeto:** iniciar a camada audiovisual do **Projeto progressivo 10 — Estudo de combate**, com feedback em camadas e opção de reduzir movimento e efeitos.
- **Depende de:** 4.1–4.4 e 5.1.
- **Documentação:** [animações](https://create.roblox.com/docs/animation/using), [eventos de animação](https://create.roblox.com/docs/animation/events), [câmera](https://create.roblox.com/docs/workspace/camera), [objetos de áudio](https://create.roblox.com/docs/audio/objects), [efeitos](https://create.roblox.com/docs/effects).
- **Playlist complementar:** playlists avançadas somente se a aula for confirmada. `Humanoid:LoadAnimation` e o sistema `Sound` serão comparados com as alternativas atuais, sem serem ensinados como padrão novo.

#### 8.4 NPCs, pathfinding e máquinas de comportamento

- **Aprender:** percepção, memória, decisão, ação, `PathfindingService`, falha, bloqueio, recálculo controlado, estados e atualização escalonada.
- **Prática guiada:** NPC `Idle → Chase → Attack` que reage a caminho bloqueado e alvo removido.
- **Exercício/projeto:** testar vários NPCs com frequências diferentes por distância.
- **Depende de:** 6.2, 8.1, 3.4 e 4.1.
- **Documentação:** [pathfinding](https://create.roblox.com/docs/characters/pathfinding), [PathfindingService API](https://create.roblox.com/docs/reference/engine/classes/PathfindingService), [Parallel Luau](https://create.roblox.com/docs/scripting/multithreading).
- **Playlist complementar:** Advanced Scripting — BrawlDev/TheDevKing, assunto de NPC/pathfinding, depois de validar API e impedir recálculo por frame.

#### 8.5 Combate, hitboxes, projéteis e estudo de FPS

- **Aprender:** estados de arma, input previsto, raycast/hitbox, deduplicação, cadência, munição, origem plausível, servidor aplicando dano e noções de compensação de lag.
- **Prática guiada:** uma arma hitscan e um ataque melee com validação server-side.
- **Exercício/projeto:** concluir o **Projeto progressivo 10 — Estudo de combate**, em uma arena testada com origem impossível, `NaN`, spam, parede e latência simulada.
- **Depende de:** 3.4, 4.3–4.6, 5.1–5.3, 6.2–6.3 e 8.1–8.3.
- **Documentação:** [raycasting](https://create.roblox.com/docs/workspace/raycasting), [fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary), [server authority model](https://create.roblox.com/docs/projects/server-authority), [network ownership security](https://create.roblox.com/docs/scripting/security/network-ownership).
- **Playlist complementar:** FPS — Xera como estudo aplicado; observar sensação, câmera e pipeline, reproduzir apenas uma arma mínima, corrigir autoridade/validação e criar desafio de nova arma. A arquitetura da série não será tratada como universal.

### Módulo 9 — Qualidade, segurança e produção

**Dificuldade estimada:** 4/5 — avançada e orientada a lançamento.

#### 9.1 Threat modeling, segurança social, texto, políticas e moderação

- **Aprender:** capacidades do atacante, superfícies além de remotes, logs, reação proporcional, filtragem, chat moderno, UGC, `PolicyService`, bans, privacidade e maturidade.
- **Prática guiada:** auditar loja, coleta, combate e campo de texto; simular falha de filtro sem exibir texto bruto.
- **Exercício/projeto:** threat model e matriz de políticas da experiência.
- **Depende de:** 5.1–5.5, 7.4 e 8.5.
- **Documentação:** [segurança](https://create.roblox.com/docs/safety), [security tactics](https://create.roblox.com/docs/scripting/security/security-tactics), [texto filtrado](https://create.roblox.com/docs/ui/text-filtering), [TextChatService](https://create.roblox.com/docs/chat/in-experience-text-chat), [content maturity](https://create.roblox.com/docs/production/promotion/content-maturity), [bans](https://create.roblox.com/docs/production/bans).
- **Playlist complementar:** nenhuma; políticas e documentação oficial prevalecem integralmente.

#### 9.2 Performance, memória, rede e profiling

- **Aprender:** orçamento por dispositivo, baseline, CPU/GPU/memória/rede, MicroProfiler, Script Profiler, vazamentos, pooling e otimização guiada por medida.
- **Prática guiada:** criar um gargalo e vazamento controlados, registrar antes/depois e verificar regressão.
- **Exercício/projeto:** relatório de performance do simulador ou arena em aparelho-alvo.
- **Depende de:** 6.3, 8.1 e um projeto integrado.
- **Documentação:** [performance optimization](https://create.roblox.com/docs/performance-optimization), [identificar problemas](https://create.roblox.com/docs/performance-optimization/identify), [MicroProfiler](https://create.roblox.com/docs/performance-optimization/microprofiler), [melhorar performance](https://create.roblox.com/docs/performance-optimization/improve), [testar em hardware](https://create.roblox.com/docs/performance-optimization/test-on-hardware).
- **Playlist complementar:** nenhuma obrigatória; medição local é a evidência principal.

#### 9.3 Assets, avatares, ownership, permissões e propriedade intelectual

- **Aprender:** tipos de assets, privacy, ownership individual/grupo, permissões, animações, áudio, packages, avatar R6/R15/custom e uso responsável de conteúdo.
- **Prática guiada:** auditoria de todos os IDs e proprietários usados pelo projeto.
- **Exercício/projeto:** plano de migração de assets para o owner correto sem quebrar o jogo.
- **Depende de:** 1.4, 4.1, 6.4 e 8.3.
- **Documentação:** [assets](https://create.roblox.com/docs/assets), [asset privacy](https://create.roblox.com/docs/projects/assets/privacy), [avatares](https://create.roblox.com/docs/avatar), [characters](https://create.roblox.com/docs/characters), [IP licensing](https://create.roblox.com/docs/ip-licensing).
- **Playlist complementar:** nenhuma obrigatória.

#### 9.4 Publicação, configuração, lançamento, rollback e descoberta

- **Aprender:** publicar place/experiência, permissões, dispositivos, metadados, ícone, thumbnail, staging, rollout, version history, rollback e onboarding.
- **Prática guiada:** publicar versão privada de teste e executar checklist de release.
- **Exercício/projeto:** plano de rollback que preserva compatibilidade de schema.
- **Depende de:** 6.3–6.4, 7.3, 9.1–9.3.
- **Documentação:** [publicar experiências e places](https://create.roblox.com/docs/production/publishing/publish-games-and-places), [configurar experiências](https://create.roblox.com/docs/projects/configure-games), [atualizações](https://create.roblox.com/docs/projects/update-games), [Version History](https://create.roblox.com/docs/projects/version-history), [ícones](https://create.roblox.com/docs/production/publishing/experience-icons), [thumbnails](https://create.roblox.com/docs/production/publishing/thumbnails), [onboarding](https://create.roblox.com/docs/production/game-design/onboarding).
- **Playlist complementar:** nenhuma; fluxos do Studio e Creator Hub serão conferidos na data da aula.

#### 9.5 Monetização responsável, passes, produtos, assinaturas e recibos

- **Aprender:** tipos de produto, prompt versus concessão, comparação entre `MarketplaceService:BindReceiptHandler()` e `MarketplaceService.ProcessReceipt` conforme a documentação disponível na data da aula, idempotência persistente, falhas, preços regionais/gerenciados, políticas e UX ética. O plano não presume que `ProcessReceipt` seja a única abordagem atual.
- **Prática guiada:** produto de teste cujo mesmo identificador de compra concede uma única vez; a implementação tratará recibo repetido, jogador ausente e falha de DataStore sem perder nem duplicar a concessão.
- **Exercício/projeto:** auditoria de fluxo para cancelamento, API indisponível, repetição, produto desconhecido, jogador desconectado e retorno inconclusivo; informações novas de produto serão consultadas com `GetProductInfoAsync()`.
- **Depende de:** 5.5, 7.3–7.4, 9.1 e 9.4.
- **Documentação:** [monetização](https://create.roblox.com/docs/production/monetization), [passes](https://create.roblox.com/docs/production/monetization/passes), [developer products](https://create.roblox.com/docs/production/monetization/developer-products), [MarketplaceService API](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService), [subscriptions](https://create.roblox.com/docs/production/monetization/subscriptions), [managed pricing](https://create.roblox.com/docs/production/monetization/managed-pricing), [purchase handling sample](https://create.roblox.com/docs/samples). `GetProductInfo()` será classificado como depreciado e substituído por `GetProductInfoAsync()` em código novo.
- **Playlist complementar:** Advanced Scripting — BrawlDev, **“Developer Products — #22”**; observar prompt e recibo, reproduzir apenas em teste, comparar o manipulador mostrado com as duas superfícies oficiais disponíveis na data, reforçar idempotência persistente e criar desafio de recibo repetido com jogador ausente.
- **Revalidação obrigatória:** imediatamente antes da redação, abrir novamente o guia de Developer Products e a referência de `MarketplaceService` para confirmar disponibilidade, assinatura, tipos de recibo, decisões de retorno e recomendação vigente de `BindReceiptHandler`, `ProcessReceipt`, `GetProductInfoAsync` e `GetProductInfo`.

#### 9.6 Analytics, experimentos, LiveOps e manutenção

- **Aprender:** pergunta antes da métrica, eventos de funil/economia/custom, coortes, experimentos, guardrails, configs, alertas, observabilidade e ciclo de atualização.
- **Prática guiada:** definir funil de onboarding e dashboard técnico sem coletar dados desnecessários.
- **Exercício/projeto:** plano de uma atualização com hipótese, métrica, rollback e critério de decisão.
- **Depende de:** 7.4, 9.2, 9.4 e 9.5.
- **Documentação:** [analytics](https://create.roblox.com/docs/production/analytics), [event types](https://create.roblox.com/docs/production/analytics/event-types), [experiments](https://create.roblox.com/docs/production/experiments), [LiveOps](https://create.roblox.com/docs/production/game-design/liveops-essentials), [alerts](https://create.roblox.com/docs/production/analytics/alerts), [content updates](https://create.roblox.com/docs/production/game-design/content-updates).
- **Playlist complementar:** Simulator — MonzterDEV apenas para levantar perguntas de economia; decisões analíticas virão dos dados e da documentação.

#### Avaliação de domínio — Módulo 9 (não contabilizada como capítulo)

- **Confirma:** ameaça e política, profiling orientado por medida, ownership de assets, release privado e reversível, concessão monetária idempotente e analytics ligado a uma pergunta.
- **Evidência:** o aluno executa um checklist de release, demonstra rollback, explica o tratamento de recibos repetidos e apresenta uma métrica com hipótese e guardrail.
- **Critério para avançar:** nenhuma falha crítica conhecida permanece no fluxo principal e toda concessão de valor tem fonte de verdade, registro persistente e estratégia de recuperação.

### Módulo 10 — Escala, múltiplos places e Open Cloud

**Dificuldade estimada:** 5/5 — avançada e opcional para o primeiro jogo simples.

#### 10.1 TeleportService, múltiplos places e servidores reservados

- **Aprender:** experience versus place versus servidor, `TeleportAsync`, TeleportOptions, dados de contexto, falha, retry e teste publicado.
- **Prática guiada:** lobby privado que tenta mover um grupo para um place de teste e recupera falhas.
- **Exercício/projeto:** fluxo de teleporte parcial com cancelamento seguro.
- **Depende de:** 7.3, 9.4 e 6.3.
- **Documentação:** [teleporte entre places](https://create.roblox.com/docs/projects/teleport), [TeleportService API](https://create.roblox.com/docs/reference/engine/classes/TeleportService), [TeleportOptions API](https://create.roblox.com/docs/reference/engine/classes/TeleportOptions).
- **Playlist complementar:** Advanced Scripting — BrawlDev, **“Teleport Service — #26”**; observar place/JobId e falhas, reproduzir em versão publicada de teste, validar dados no destino e criar desafio de grupo parcialmente desconectado.

#### 10.2 MemoryStore, MessagingService e matchmaking

- **Aprender:** persistente versus temporário, queue/sorted map/hash map, TTL, best-effort messaging, tickets e falhas distribuídas.
- **Prática guiada:** desenhar e simular fila 2v2 com timeout, desistência e servidor que não inicia.
- **Exercício/projeto:** classificar dados entre DataStore, MemoryStore e MessagingService.
- **Depende de:** 10.1, 7.3 e 8.1.
- **Documentação:** [escolha de cloud services](https://create.roblox.com/docs/cloud-services/data-stores-vs-memory-stores), [MemoryStore](https://create.roblox.com/docs/cloud-services/memory-stores), [MemoryStore best practices](https://create.roblox.com/docs/cloud-services/memory-stores/best-practices), [cross-server messaging](https://create.roblox.com/docs/cloud-services/cross-server-messaging), [matchmaking](https://create.roblox.com/docs/matchmaking).
- **Playlist complementar:** Advanced Scripting — BrawlDev apenas se a aula específica for confirmada.

#### 10.3 Open Cloud, autenticação e automação externa

- **Aprender:** distinguir Engine APIs, requisições genéricas de `HttpService` e Open Cloud; entender Open Cloud como APIs REST; separar automação externa de requisições feitas por um servidor da experiência; reconhecer que `HttpService` pode acessar somente o subconjunto de endpoints Open Cloud permitido; aplicar API key/OAuth, escopos, menor privilégio, limites, falhas, validação de respostas e webhooks.
- **Prática guiada:** comparar dois fluxos — uma ferramenta externa de leitura e uma requisição feita por um servidor da experiência. Para o segundo, configurar o Secrets Store e obter a credencial com `HttpService:GetSecret()`; nenhum token, chave ou segredo será escrito diretamente em Script, ModuleScript, configuração replicada ou arquivo da apostila.
- **Exercício/projeto:** threat model de uma automação externa de publicação e de uma consulta permitida em jogo, incluindo autenticação, escopo mínimo, expiração/rotação, rate limit, timeout, resposta malformada e indisponibilidade.
- **Depende de:** 9.1, 9.4, 9.6 e noções de HTTP introduzidas no próprio capítulo.
- **Documentação:** [Open Cloud](https://create.roblox.com/docs/cloud), [requisições HTTP em experiências](https://create.roblox.com/docs/cloud-services/http-service), [uso de Open Cloud em experiências](https://create.roblox.com/docs/cloud/guides/usage-in-experience), [Secrets Store](https://create.roblox.com/docs/cloud/guides/secrets-store), [HttpService API](https://create.roblox.com/docs/reference/engine/classes/HttpService), [API keys](https://create.roblox.com/docs/cloud/auth/api-keys), [OAuth 2.0](https://create.roblox.com/docs/cloud/auth/oauth2-overview), [patterns](https://create.roblox.com/docs/cloud/reference/patterns), [rate limits](https://create.roblox.com/docs/cloud/reference/rate-limits).
- **Playlist complementar:** nenhuma. Não será confundido com serviços de Engine nem com automação externa; a disponibilidade de cada endpoint para acesso em jogo será verificada individualmente na data da aula.

### Módulo 11 — Projeto final completo

**Dificuldade estimada:** 5/5 — síntese e autonomia.

#### 11.1 Escopo, documento de design e arquitetura do projeto final

- **Aprender:** definir público, dispositivos, loop, progressão, riscos, dados, remotes, módulos, testes, orçamento e critério de pronto.
- **Prática guiada:** elaborar documento e diagrama antes de implementar.
- **Exercício/projeto:** iniciar o **Projeto progressivo 11 — Projeto final** com revisão de escopo que elimina dependências ainda não dominadas.
- **Depende de:** módulos 0–10 conforme o escopo escolhido.
- **Documentação:** [core loops](https://create.roblox.com/docs/production/game-design/core-loops), [prototyping](https://create.roblox.com/docs/production/game-design/prototyping), [design for performance](https://create.roblox.com/docs/performance-optimization/design).
- **Playlist complementar:** escolher no máximo uma playlist como estudo de caso, nunca como especificação.

#### 11.2 Vertical slice: loop principal seguro e testável

- **Aprender:** implementar o menor ciclo completo com servidor autoritativo, feedback cliente, UI, teste e logs.
- **Prática guiada:** construir uma rodada curta com coleta/combate, recompensa e retorno ao início.
- **Exercício/projeto:** melhorar o Projeto progressivo 11 com teste adversarial do ciclo principal antes de adicionar conteúdo.
- **Depende de:** 11.1 e capítulos dos sistemas escolhidos.
- **Documentação:** páginas específicas das APIs realmente selecionadas.
- **Playlist complementar:** assunto correspondente, somente após validação individual.

#### 11.3 Progressão persistente, acessibilidade e endurecimento de produção

- **Aprender:** integrar perfil, inventário, economia, UI adaptativa, localização, segurança, performance e migração.
- **Prática guiada:** teste de falha de load/save, dois clientes, mobile, gamepad, respawn e reconexão.
- **Exercício/projeto:** melhorar o Projeto progressivo 11 até um release candidate privado com zero erro relevante conhecido no fluxo principal.
- **Depende de:** 11.2, módulos 7 e 9.
- **Documentação:** DataStore, UI, acessibilidade, localização, segurança e performance já listadas.
- **Playlist complementar:** nenhuma obrigatória.

#### 11.4 Publicação privada, analytics, manutenção e portfólio técnico

- **Aprender:** release, instrumentação, monitoramento, rollback, incidentes, atualização compatível, documentação e apresentação do trabalho.
- **Prática guiada:** publicar privadamente, executar checklist, validar eventos e simular rollback.
- **Exercício/projeto:** concluir o **Projeto progressivo 11 — Projeto final**, uma experiência pronta para operação, com relatório técnico e plano de manutenção.
- **Depende de:** 11.3 e módulos 9–10 conforme o escopo.
- **Documentação:** publicação, analytics, updates, observabilidade e Open Cloud já listadas.
- **Playlist complementar:** nenhuma; a evidência vem do projeto testado.

---

## 4. Evolução dos projetos progressivos

| Nº | Projeto | Começa | Recebe melhorias | É concluído | Evidência de conclusão |
|---:|---|---|---|---|---|
| 1 | Primeira sala | 1.3 — greybox, Parts e Models | 1.4 — assets inspecionados, terreno e iluminação | 1.4 | sala navegável, organizada, segura e salva |
| 2 | Primeira sala interativa | 2.1 — primeira reação executada por Script | 2.2–2.9 — valores, regras, repetição, funções, tabelas, diagnóstico e tipos | 3.1 — interação dirigida por evento | porta/objeto reage e o Output confirma o fluxo |
| 3 | Obstáculo com eventos | 3.1 — evento, conexão e debounce simples | 3.4 — colisão e consultas; 4.1 — personagem e estado por jogador | 4.1 | dois jogadores não quebram o estado um do outro |
| 4 | Ferramenta utilizável | 4.3 — Tool, equipar, ativar e respawn | 4.4 — teclado/gamepad; 4.5 — GUI necessária; 4.6 — binding touch e acessibilidade | 4.6 | funciona após equipar, desequipar e respawn em teclado, gamepad e touch |
| 5 | Percurso com checkpoint e interface | 4.1 — checkpoint de sessão | 4.5 — HUD e botão; 4.6 — responsividade, touch, gamepad e localização | 4.6 | checkpoint e HUD funcionam em múltiplas telas e métodos de entrada |
| 6 | Coleta e moedas seguras | 3.2 — coletáveis configurados por atributos/tags | 5.1–5.3 — autoridade, remotes, validação e rate limit | 5.4 | cliente adulterado não cria nem duplica moeda |
| 7 | Loja segura | 5.5 — catálogo e transação em memória | 6.1 — módulos; 6.3 — matriz de testes e regressão | 6.3 | preço local alterado não afeta o servidor e pedidos repetidos não duplicam itens |
| 8 | Salvamento de progresso | 7.1 — schema e migração em memória | 7.2 — operações e falhas externas; 7.3 — concorrência, autosave e sessão | 7.3 | falha de load não sobrescreve dados e schema antigo migra |
| 9 | Simulador enxuto | 7.4 — economia, progressão e missão | 7.5 — integração de ferramenta, coleta, venda, upgrades, UI e dados | 7.5 | ciclo completo medido, persistente e servidor autoritativo |
| 10 | Estudo de combate | 8.3 — feedback local sem concessão de dano | 8.5 — raycast/hitbox, estados, cadência e validação | 8.5 | tiros impossíveis, spam e `NaN` são rejeitados |
| 11 | Projeto final | 11.1 — escopo, design e arquitetura | 11.2 — vertical slice; 11.3 — progressão, acessibilidade e endurecimento | 11.4 | release candidate privado, observável e reversível |

Cada projeto reutiliza somente conceitos já ensinados. Extensões opcionais ficam fora do caminho crítico e recebem uma lista explícita de dependências.

---

## 5. Projeto final proposto

### Expedição de cristais — experiência cooperativa curta

O aluno construirá uma experiência com sessões curtas em que jogadores entram em uma área, coletam cristais, enfrentam obstáculos ou criaturas simples, concluem um objetivo, recebem recompensas e melhoram uma ferramenta para a próxima sessão.

#### Escopo mínimo

- lobby e área de jogo no mesmo place na primeira versão;
- uma ferramenta com input para teclado, toque e gamepad;
- três tipos de cristal configurados por ID;
- coleta e recompensas validadas no servidor;
- um NPC simples com estados e pathfinding ou, se o aluno optar por não usar IA, um obstáculo equivalente;
- inventário, moedas e dois upgrades;
- HUD responsivo, feedback visual/sonoro reduzível e localização preparada;
- perfil versionado com salvamento, migração e tratamento de falha;
- remotes estreitos, rate limiting e testes adversariais;
- analytics de onboarding, ciclo principal, fonte/sumidouro e erro de dados;
- publicação privada, checklist, rollback e documentação.

#### Etapas testáveis

1. Greybox e loop de 60–90 segundos.
2. Ferramenta e feedback apenas local, sem recompensa.
3. Coleta/recompensa autoritativa.
4. HUD e controles multiplataforma.
5. Inventário, loja e upgrades.
6. Persistência e migração.
7. NPC/obstáculo e condição de conclusão.
8. Testes multiplayer, hostis e de dispositivo.
9. Perfil de performance e acessibilidade.
10. Publicação privada, analytics e rollback.

#### Critério de conclusão

O projeto final não será considerado concluído apenas porque “funciona em Play Solo”. Ele deverá apresentar evidência de correção, segurança, recuperação de falhas, funcionamento em vários clientes/dispositivos, desempenho medido, dados versionados e processo de release reversível.

---

## 6. Integração planejada das playlists

### 6.1 Limitação verificada

Os links das seis playlists foram preservados, mas o acesso disponível não expôs uma lista completa e confiável de todos os episódios. Foram confirmados diretamente ou por metadados indexados os seguintes títulos:

- [BrawlDev Beginners](https://youtube.com/playlist?list=PLQ1Qd31Hmi3W_CGDzYOp7enyHlOuO3MtC): “Printing — #2”, “Loops — #11” e “Events — #13”.
- [BrawlDev Advanced](https://youtube.com/playlist?list=PLQ1Qd31Hmi3WKkVHnadvhOOjz04AuMYAf): “Local Scripts — #1”, “Task Functions — #4”, “DataStore — #17”, “Developer Products — #22”, “RunService — #24” e “Teleport Service — #26”.
- [TheDevKing Advanced](https://youtube.com/playlist?list=PLhieaQmOk7nIoGnFoACf33M3o0BOqB38a): “Tools — #1”, material de 2019.
- [MonzterDEV Simulator](https://youtube.com/playlist?list=PLl1Tso3TyF55UEnXsYkmsamFqKUBdgo1S): playlist “How to Make a Simulator on Roblox 2022”.
- [Xera FPS](https://youtube.com/playlist?list=PLWNYI4_6C0wthAguFMjzcPnXGvqwcTwbL): playlist “Roblox Studio: FPS Game Tutorial”.
- [BrawlDev GUI](https://youtube.com/playlist?list=PLQ1Qd31Hmi3Xnlu8u9hCYClLurMQYJIrz): a playlist foi identificada, mas seus episódios não foram enumerados de forma confiável.

Não se afirma que o conteúdo integral desses vídeos foi assistido ou validado. Antes de escrever cada capítulo, a aula associada será aberta e comparada membro por membro com a documentação oficial.

### 6.2 Matriz de uso complementar

| Capítulo(s) | Playlist e assunto | Momento e pré-requisitos | Observar e reproduzir | Atualizar/corrigir | Validação oficial | Desafio de modificação |
|---|---|---|---|---|---|---|
| 2.1 | BrawlDev Beginners — Printing #2 | depois do primeiro Script | ordem, `print`, Output | interface/nomenclatura que tiver mudado | Scripting e Output | imprimir propriedades de três objetos sem copiar o exemplo |
| 2.5 | BrawlDev Beginners — Loops #11 | após condições | término e variação de controle | substituir espera global antiga por `task.*` | Luau control structures e scheduler | contar apenas objetos com atributo válido |
| 3.1 | BrawlDev Beginners — Events #13 | após funções | callback, parâmetros, debounce | separar cooldown por jogador quando necessário | Events e BasePart | criar dois efeitos com causas diferentes |
| 4.2/5.1 | BrawlDev Advanced — Local Scripts #1 | após Player/Character | diferença cliente/servidor | corrigir generalizações de replicação e incluir `RunContext` | script locations, client-server e security boundary | prever o que cada cliente vê em cinco alterações |
| 8.1 | BrawlDev Advanced — Task Functions #4 e RunService #24 | após loops e eventos | agendamento, fases, `deltaTime` | remover `wait/spawn/delay` globais e trabalho por frame sem motivo | scheduler, RunService e task scheduler | converter polling de 60 Hz para 5 Hz |
| 7.2/7.3 | BrawlDev Advanced — DataStore #17 | após módulos/testes | `pcall`, operações e limites | falha de load, concorrência, migração e ambiente separado | DataStore guides e API | provar que load falho não salva perfil vazio |
| 9.5 | BrawlDev Advanced — Developer Products #22 | após DataStore e segurança | prompt, recibo e entrega | idempotência persistente e jogador ausente | developer products e purchase sample | repetir o mesmo recibo duas vezes |
| 10.1 | BrawlDev Advanced — Teleport Service #26 | após publicação privada | place, servidor, opções e falha | validar dados no destino e recuperar teleporte parcial | TeleportService e TeleportOptions | simular desistência de um membro do grupo |
| 4.3 | TheDevKing Advanced — Tools #1 | após scripts e personagem | estrutura da Tool e ativação | atualizar input, animação, API e autoridade | Tools, Tool e StarterPack | fazer a Tool sobreviver a dez respawns |
| 4.5/4.6 | BrawlDev GUI — assunto a selecionar | depois da primeira GUI própria | hierarquia e interação | responsividade, touch, gamepad e acessibilidade; binding touch só depois de `GuiButton` | UI, Input Action System, adaptive design e accessibility | adaptar a tela para celular vertical e testar três métodos de entrada |
| 5.5/7.4/7.5 | MonzterDEV Simulator | após remotes, loja e DataStore | loop, economia e apresentação | autoridade do servidor, módulos, idempotência e dados robustos | security boundary, DataStore e economy analytics | adicionar uma regra que mude o balanceamento |
| 8.5 | Xera FPS | após rede, raycast e estados | sensação, câmera e pipeline de tiro | servidor decide dano, valida origem/cadência e rejeita valores inválidos | raycasting, security e server authority | criar arma com cadência/alcance diferentes |
| 6.1/6.2/8.4 | BrawlDev/TheDevKing Advanced — assuntos a selecionar | somente após Luau, rede e testes | padrões de módulos/OOP/IA | evitar herança profunda, globals, APIs antigas e loops por frame | ModuleScripts, metatables, pathfinding | trocar herança por composição ou FSM |

---

## 7. Matriz entre módulos, documentação oficial e playlists

| Módulo | Documentação oficial principal | Engine/API consultada | Playlists complementares | Dificuldade |
|---|---|---|---|---:|
| 0. Preparação | Experiences, Studio setup, publishing | — | Beginners, apenas orientação confirmada | 1/5 |
| 1. Studio e mundo | Studio, Data model, Parts, Assets, Terrain, Lighting | Instance, BasePart, Model | nenhuma obrigatória | 1/5 |
| 2. Luau | Coding fundamentals, escopo, diagnóstico, Luau types/features, scheduler | globals/libraries conforme uso | BrawlDev Beginners | 1–2/5 |
| 3. Engine e 3D | Events, Attributes, CFrames, Collisions, Raycasting | Instance, CollectionService, WorldRoot, TweenService | BrawlDev Beginners/Advanced | 2/5 |
| 4. Jogador e interface | Players, Characters, Tools, Input, UI, Accessibility | Players, Humanoid, Tool, InputAction, Gui classes | Beginners, GUI, TheDevKing Tools | 2–3/5 |
| 5. Rede e segurança | Client-server, Remotes, Security boundary | RemoteEvent, RemoteFunction, UnreliableRemoteEvent | BrawlDev Advanced | 3/5 |
| 6. Arquitetura e testes | ModuleScripts, Testing modes, Debugging, Collaboration | ModuleScript, RunService | Advanced, com validação individual | 3/5 |
| 7. Dados e progressão | Data stores, best practices, Economy, Quests, Analytics | DataStoreService, PolicyService | BrawlDev DataStore, MonzterDEV Simulator | 3–4/5 |
| 8. Gameplay avançado | Scheduler, Physics, Streaming, Animation, Audio, Pathfinding, Server Authority | RunService, constraints, Animator, audio objects, PathfindingService | BrawlDev Advanced, TheDevKing, Xera | 4/5 |
| 9. Produção | Safety, Performance, Assets, Publishing, Monetization, Analytics | MarketplaceService, AnalyticsService, TextChatService | BrawlDev Dev Products; demais opcionais | 4/5 |
| 10. Escala e Cloud | Teleport, MemoryStore, Messaging, Matchmaking, Open Cloud | TeleportService, MemoryStoreService, MessagingService | BrawlDev Teleport | 5/5 |
| 11. Projeto final | páginas específicas de todos os sistemas escolhidos | somente APIs efetivamente usadas | no máximo uma série como estudo de caso | 5/5 |

---

## 8. Por que esta ordem é adequada para quem começa do zero

1. O aluno aprende primeiro a operar o ambiente e recuperar o próprio trabalho; assim, erros de interface não são confundidos com erros de programação.
2. A árvore de objetos vem antes do código que a manipula. Nomes como `Parent`, `Workspace` e `Instance` deixam de ser abstratos.
3. Luau é ensinado em exemplos pequenos antes de misturar rede, física ou dados persistentes.
4. Eventos e matemática 3D aparecem antes de jogadores, ferramentas e interface, que dependem desses mecanismos.
5. Cliente e servidor são introduzidos antes de qualquer sistema valioso em rede. A primeira moeda em rede já nasce validada.
6. Arquitetura e testes entram antes de DataStore, economia e combate, reduzindo a chance de sistemas críticos virarem scripts monolíticos.
7. Persistência é ensinada em camadas: estado em memória, operação básica, falhas, migração e somente então um simulador integrado.
8. Física, áudio, IA e combate chegam quando o aluno já sabe testar, modularizar e proteger a fronteira de confiança.
9. Publicação, monetização e analytics ficam depois de segurança, dados e performance, porque operar um jogo exige esses fundamentos.
10. Open Cloud fica no final por exigir conceitos externos de HTTP, autenticação, escopos e segurança que não são necessários para o primeiro jogo.

---

## 9. Registro inicial de atualização técnica

| Informação ou API | Fonte oficial | Fonte complementar | Situação | Ajustes planejados |
|---|---|---|---|---|
| Input Action System | [guia oficial](https://create.roblox.com/docs/input/input-action-system) | GUI/BrawlDev, ainda não enumerada | Atual e recomendada | ensinar ações, contextos e bindings antes de APIs anteriores; sinalizar recursos beta individualmente |
| `ContextActionService` | [API](https://create.roblox.com/docs/reference/engine/classes/ContextActionService) | tutoriais antigos | Atual, mas depende do contexto | apresentar para manutenção/migração e casos compatíveis, sem ignorar o Input Action System |
| Objetos modulares de áudio | [Audio objects](https://create.roblox.com/docs/audio/objects) | vídeos a selecionar | Atual e recomendada | usar `AudioPlayer`, emissores/listeners e `Wire` como trilha principal |
| `Sound`, `SoundGroup`, `SoundEffect` | [Sound](https://create.roblox.com/docs/sound) | muitos tutoriais existentes | Atual, mas depende do contexto | ensinar principalmente para leitura, compatibilidade e migração; a documentação atual desencoraja o sistema em projetos novos |
| `task.wait/spawn/defer/delay` | [scheduler](https://create.roblox.com/docs/scripting/scheduler) | BrawlDev Advanced #4 | Atual e recomendada | substituir globais `wait`, `spawn` e `delay` em exemplos novos |
| BodyMovers antigos | [mover constraints](https://create.roblox.com/docs/physics/mover-constraints) | tutoriais antigos | Antiga ou obsoleta | usar constraints modernas em projetos novos |
| Remotes para economia/dano | [security boundary](https://create.roblox.com/docs/scripting/security/client-server-boundary) | séries de simulator/FPS | Insegura sem validação | exigir tipo, forma, contexto, distância, tempo, custo e autoridade do servidor |
| DataStore com `SetAsync` | [Data stores](https://create.roblox.com/docs/cloud-services/data-stores) | BrawlDev Advanced #17 | Atual, mas depende do contexto | comparar com `UpdateAsync`; cobrir concorrência, falhas e ambiente separado |
| `MarketplaceService.ProcessReceipt` | [Developer Products](https://create.roblox.com/docs/production/monetization/developer-products) e [MarketplaceService API](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) | BrawlDev Advanced #22 | Atual e recomendada | comparar com `BindReceiptHandler()` na data da aula; nunca conceder pelo evento de fechamento do prompt |
| `MarketplaceService:BindReceiptHandler()` | [MarketplaceService API](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) | nenhuma confirmada | Atual e recomendada | confirmar tipos de transação e decisões de retorno imediatamente antes da aula; manter idempotência persistente |
| `GetProductInfoAsync()` | [MarketplaceService API](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) | nenhuma | Atual e recomendada | usar em todo código novo que consulta informações de produto |
| `GetProductInfo()` | [MarketplaceService API](https://create.roblox.com/docs/reference/engine/classes/MarketplaceService) | tutoriais antigos | Antiga ou obsoleta | classificar como depreciada e substituir por `GetProductInfoAsync()` |
| Open Cloud via REST | [Open Cloud](https://create.roblox.com/docs/cloud) | nenhuma | Atual e recomendada | separar automação externa de Engine APIs e de requisições permitidas via `HttpService` |
| Open Cloud por `HttpService` | [uso em experiências](https://create.roblox.com/docs/cloud/guides/usage-in-experience) e [Secrets Store](https://create.roblox.com/docs/cloud/guides/secrets-store) | nenhuma | Atual, mas depende do contexto | limitar aos endpoints permitidos, usar `HttpService:GetSecret()`, validar respostas e nunca embutir chaves |
| Serviços de Engine depreciados com nome Open Cloud | [índice oficial de documentação](https://create.roblox.com/docs/llms.txt) | nenhuma | Antiga ou obsoleta | não usar em trabalho novo; evitar confusão com a API REST |
| Server Authority | [modelo oficial](https://create.roblox.com/docs/projects/server-authority) | FPS — Xera | Atual, mas depende do contexto | apresentar depois do modelo cliente-servidor tradicional e das técnicas de validação |

---

## 10. Verificação dos critérios da primeira entrega

- [x] A progressão começa antes da primeira linha de código.
- [x] Instalação, interface, salvamento e teste aparecem antes de programação.
- [x] Cada capítulo depende somente de conceitos anteriores ou declara explicitamente suas dependências.
- [x] As práticas propostas são realizáveis no Roblox Studio; os detalhes exatos serão escritos nos capítulos.
- [x] A documentação oficial é a autoridade principal e páginas específicas foram associadas aos capítulos.
- [x] As playlists são complementares e nenhuma foi validada em bloco.
- [x] Conteúdo não acessível dos vídeos foi identificado como não confirmado.
- [x] APIs e padrões antigos recebem plano de atualização explícito.
- [x] Segurança aparece antes da primeira mecânica de valor em rede.
- [x] Os projetos crescem de sala e obstáculo para dados, simulador, combate e produção.
- [x] O projeto final reutiliza conhecimentos construídos ao longo da formação.
- [x] O plano contém apenas diagnóstico, sumário, matriz de fontes e planejamento de projetos; a apostila do aluno é produzida separadamente em HTML.
- [x] O arquivo original foi preservado.

---

## 11. Regra de produção modular

A apostila do aluno será produzida em HTML, CSS e JavaScript simples, um módulo completo por execução. O Módulo 0 inclui obrigatoriamente os capítulos **0.1 — O que é desenvolver uma experiência Roblox** e **0.2 — Instalação, conta, primeiro projeto, salvamento e teste**; nenhum módulo posterior será antecipado sem autorização e sem que seus pré-requisitos tenham sido ensinados.
