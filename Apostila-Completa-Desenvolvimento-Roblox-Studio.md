# Apostila Completa de Desenvolvimento no Roblox Studio
### Luau, sistemas, arquitetura, design de jogos, segurança e produção

> **Edição:** 25 de agosto de 2026  
> **Idioma:** Português do Brasil  
> **Fonte principal:** [Roblox Creator Hub](https://create.roblox.com/docs/) e [referência da Roblox Engine](https://create.roblox.com/docs/reference/engine)  
> **Objetivo:** formar um desenvolvedor capaz de projetar, programar, testar, publicar e manter experiências Roblox — não apenas reproduzir tutoriais.

---

## Nota de escopo e atualização

A API da Roblox muda continuamente. A referência oficial reúne centenas de classes, tipos e enums, mas decorar esse catálogo não torna alguém desenvolvedor. Esta apostila ensina os modelos mentais, as ferramentas e os padrões que permitem consultar qualquer API nova com autonomia.

Sempre confira na página do membro usado:

- se ele é executável no cliente, no servidor ou em ambos;
- se é replicado;
- se pode produzir `yield`;
- se possui restrições de segurança;
- se está marcado como obsoleto;
- qual é sua segurança de thread para Parallel Luau.

Quando esta apostila e um vídeo antigo divergirem, use a documentação oficial atual como fonte de verdade.

---

## Correções importantes em relação ao guia anterior

| Afirmação simplificada | Correção |
|---|---|
| “`StarterPack` está obsoleto.” | Não está. É o contêiner próprio para `Tool`s iniciais, copiadas para o `Backpack` do jogador. |
| “Variáveis globais vazam entre scripts.” | Uma global comum pertence ao ambiente do próprio script. Scripts não acessam globais uns dos outros; `_G` e `shared` são mecanismos distintos e devem ser evitados na arquitetura comum. |
| “O servidor controla toda posição do personagem.” | O cliente normalmente possui a simulação física do próprio personagem. O servidor precisa validar movimento quando isso é relevante para a integridade do jogo. |
| “Tudo no `Workspace` sempre existe no cliente.” | Com streaming, conteúdo 3D pode entrar e sair do cliente dinamicamente. Scripts devem tolerar ausência temporária. |
| “`RemoteEvent` é a única comunicação assíncrona.” | Há também `UnreliableRemoteEvent`, adequado para dados frequentes e descartáveis, além de bindables dentro do mesmo contexto. |
| “Segurança é validar RemoteEvents.” | Também é preciso validar `ProximityPrompt`, `ClickDetector`, física sob ownership do cliente, compras, texto criado por usuários e qualquer ação iniciada pelo cliente. |
| “OOP com herança é a arquitetura avançada.” | OOP é uma opção. Em jogos, módulos pequenos, composição, dados imutáveis, máquinas de estado e eventos costumam ser mais simples do que hierarquias profundas de classes. |

As correções acima são apoiadas pelas páginas oficiais de [escopo em Luau](https://create.roblox.com/docs/luau/scope), [StarterPack](https://create.roblox.com/docs/reference/engine/classes/StarterPack), [streaming](https://create.roblox.com/docs/workspace/streaming), [ownership de rede](https://create.roblox.com/docs/physics/network-ownership) e [segurança da fronteira cliente-servidor](https://create.roblox.com/docs/scripting/security/client-server-boundary).

---

## Como estudar com esta apostila

Use o ciclo abaixo em cada capítulo:

```text
COMPREENDER → PREVER → IMPLEMENTAR → TESTAR → EXPLICAR → MODIFICAR
```

1. **Compreender:** leia a teoria e acompanhe o exemplo.
2. **Prever:** antes de executar, escreva o que espera que aconteça.
3. **Implementar:** digite o código; não copie mecanicamente.
4. **Testar:** provoque entradas normais, limites e erros.
5. **Explicar:** descreva cada decisão sem olhar o texto.
6. **Modificar:** mude uma regra e adapte a solução sozinho.

### Regra de progresso

Você domina um tópico quando consegue:

- explicar o conceito sem repetir definições decoradas;
- construir uma versão mínima sem vídeo;
- encontrar e corrigir um erro proposital;
- consultar a API e adaptar a solução para outro sistema;
- justificar o que pertence ao cliente e ao servidor.

### Como usar as playlists fornecidas

| Playlist | Papel na formação | Como usar |
|---|---|---|
| [Advanced Scripting — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3WKkVHnadvhOOjz04AuMYAf) | Demonstrações avançadas | Assista depois dos módulos de Luau, rede e arquitetura. |
| [Beginners Scripting — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3W_CGDzYOp7enyHlOuO3MtC) | Primeiros contatos com código | Use junto dos capítulos 2–7. Refaça os exemplos sem copiar. |
| [GUI — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3Xnlu8u9hCYClLurMQYJIrz) | Construção visual de interfaces | Confronte cada tela com responsividade, gamepad e acessibilidade. |
| [Advanced Scripting — TheDevKing](https://youtube.com/playlist?list=PLhieaQmOk7nIoGnFoACf33M3o0BOqB38a) | Padrões e APIs clássicas | Verifique APIs antigas na documentação antes de reutilizar código. |
| [Simulator — MonzterDEV](https://youtube.com/playlist?list=PLl1Tso3TyF55UEnXsYkmsamFqKUBdgo1S) | Estudo de economia e progressão | Reimplemente com autoridade do servidor e módulos separados. |
| [FPS — Xera](https://youtube.com/playlist?list=PLWNYI4_6C0wthAguFMjzcPnXGvqwcTwbL) | Estudo aplicado de combate | Use como estudo de caso, não como arquitetura universal. |

Vídeos ensinam uma implementação. A documentação descreve o contrato da Engine. Seus exercícios transformam ambos em habilidade.

---

## Mapa da formação

```text
Fundamentos do Studio e 3D
        ↓
Lógica + Luau + tipagem
        ↓
Cliente/servidor + eventos + execução
        ↓
Física + personagens + UI + áudio + IA
        ↓
Arquitetura + dados + sistemas de jogo
        ↓
Segurança + testes + performance
        ↓
Publicação + monetização + analytics + operação
```

---

## Índice

### Parte I — Base do desenvolvimento

1. O trabalho de um desenvolvedor Roblox
2. Studio, DataModel e Instances
3. Construção 3D, assets, terreno e iluminação

### Parte II — Programação com Luau

4. Lógica, valores, controle e funções
5. Tabelas, algoritmos e tratamento de erros
6. Luau tipado em modo estrito
7. ModuleScripts, composição, OOP e estados

### Parte III — Como a Engine executa o jogo

8. Cliente, servidor, replicação e contextos
9. Eventos, remotes e contratos de rede
10. Scheduler, `task`, RunService e paralelismo
11. Matemática 3D, CFrame, raycasts e consultas espaciais
12. Física, constraints, ownership e streaming
13. Jogadores, personagens, animações e câmera
14. Entrada multiplataforma
15. UI, UX, responsividade, estilos e acessibilidade
16. Áudio, partículas e feedback audiovisual
17. NPCs, pathfinding e máquinas de comportamento

### Parte IV — Sistemas e arquitetura

18. Arquitetura de projetos escaláveis
19. Estado, configuração, inventário e itens
20. Persistência com DataStore e dados de sessão
21. MemoryStore, MessagingService, teleporte e múltiplos lugares
22. Economia, progressão, missões e recompensas
23. Combate, FPS, hitboxes e previsão do cliente
24. Segurança e mitigação de exploits
25. Segurança social, texto, políticas e moderação

### Parte V — Qualidade e produção

26. Debug e testes
27. Performance, memória, rede e profiling
28. Colaboração, pacotes, sincronização e versionamento
29. Publicação, monetização e recibos
30. Analytics, experimentação e LiveOps

### Parte VI — Prática deliberada

31. Projetos progressivos completos
32. Trilha de estudo de 24 semanas
33. Referência rápida, checklists e glossário
34. Fontes verificadas

---

# Parte I — Base do desenvolvimento

## 1. O trabalho de um desenvolvedor Roblox

Desenvolver um jogo é transformar uma intenção de experiência em um sistema que permanece correto sob condições imprevisíveis: jogadores entrando e saindo, aparelhos lentos, rede ruim, dados inválidos, exploits, atualizações e milhares de sessões simultâneas.

### 1.1 As seis disciplinas

| Disciplina | Pergunta principal | Resultado |
|---|---|---|
| Design de jogo | O que o jogador decide, aprende e sente? | Regras, loops e progressão |
| Engenharia | Como manter o comportamento correto? | Código, arquitetura e dados |
| Arte e mundo | Como comunicar espaço, atmosfera e ação? | Cenário, assets, iluminação |
| UX/UI | Como o jogador entende e controla o jogo? | Fluxos, HUD, menus, feedback |
| Produção | Como transformar uma ideia em entregas pequenas? | Escopo, milestones, testes |
| Operação | Como melhorar depois da publicação? | Analytics, eventos e atualizações |

Você pode se especializar, mas precisa compreender as fronteiras entre essas áreas.

### 1.2 Do conceito ao jogo publicado

```text
Pilar de fantasia
   ↓
Loop central de 30 segundos
   ↓
Protótipo cinza e descartável
   ↓
Vertical slice pequeno, porém completo
   ↓
Produção de conteúdo
   ↓
Testes, otimização e conformidade
   ↓
Publicação gradual
   ↓
Medição, correções e novas versões
```

**Loop central** é a sequência repetida que sustenta o jogo. Exemplo de mineração:

```text
encontrar minério → minerar → receber recursos → vender → melhorar ferramenta → alcançar minério melhor
```

Se esse ciclo não for divertido no protótipo, mais mapas e efeitos não consertarão o fundamento.

### 1.3 Documento mínimo de projeto

Antes de programar, responda em uma página:

- fantasia: “quem o jogador sente que é?”;
- verbo principal: correr, construir, atirar, negociar, explorar;
- loop de 30 segundos e loop de 30 minutos;
- público e dispositivos suportados;
- condição de sucesso e fracasso;
- progressão persistente;
- diferencial;
- maior risco técnico;
- escopo da primeira versão jogável.

> **Prática 1.1:** escreva o documento de uma experiência que possa ser prototipada em sete dias. Corte tudo que não seja essencial ao loop central.

> **Prática 1.2:** escolha um jogo conhecido e desenhe três loops: momento a momento, sessão e longo prazo.

**Critério de domínio:** você consegue explicar seu jogo sem listar funcionalidades e consegue reduzir a ideia a um protótipo testável.

---

## 2. Studio, DataModel e Instances

### 2.1 O modelo mental

Uma experiência contém um ou mais **places**. Cada servidor executa um place, cujo estado é representado pelo `DataModel`, acessado pela global `game`. A árvore contém objetos chamados `Instance`.

```text
Experience
├── Place: Lobby
│   └── servidor(es) executando um DataModel
├── Place: Mundo
└── Place: Dungeon
```

`Instance` fornece identidade, hierarquia, atributos, tags e sinais. Classes derivadas acrescentam capacidades: `BasePart` possui geometria e física; `GuiObject` possui posição 2D; `Sound` reproduz áudio.

### 2.2 Serviços e contêineres essenciais

```text
game
├── Workspace                 mundo 3D ativo
├── Players                   jogadores conectados
├── ReplicatedStorage         objetos visíveis a cliente e servidor
├── ReplicatedFirst           conteúdo inicial do cliente
├── ServerScriptService       código exclusivo do servidor
├── ServerStorage             objetos exclusivos do servidor
├── StarterGui                modelo copiado para PlayerGui
├── StarterPack               Tools copiadas para o Backpack
├── StarterPlayer
│   ├── StarterPlayerScripts
│   └── StarterCharacterScripts
├── Lighting
├── SoundService
└── TextChatService
```

Use `game:GetService()`:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
```

### 2.3 Navegação segura

| Operação | Uso |
|---|---|
| `instance.Parent` | Sobe um nível ou muda a hierarquia |
| `GetChildren()` | Retorna filhos diretos |
| `GetDescendants()` | Retorna toda a subárvore |
| `FindFirstChild(name)` | Busca imediata e pode retornar `nil` |
| `WaitForChild(name, timeout)` | Espera replicação/criação; use timeout quando uma espera infinita for um bug |
| `FindFirstChildWhichIsA(class)` | Busca por classe considerando herança |
| `IsA(class)` | Testa a classe ou uma ancestral |
| `GetAttribute()` | Lê metadados simples sem criar ValueObjects |
| `Destroy()` | Remove a instância e encerra sua vida útil |

```lua
local spawnsFolder = Workspace:WaitForChild("Spawns", 10)
assert(spawnsFolder, "A pasta Spawns não carregou em 10 segundos")

for _, descendant in spawnsFolder:GetDescendants() do
	if descendant:IsA("BasePart") then
		descendant.CanCollide = false
	end
end
```

### 2.4 Propriedades, atributos e tags

- **Propriedade:** parte do contrato da classe, como `BasePart.Position`.
- **Atributo:** dado simples criado pelo desenvolvedor e salvo com o place, como `Damage = 20`.
- **Tag:** rótulo gerenciado por `CollectionService` para encontrar conjuntos de instâncias, como `EnemySpawn`.
- **ValueObject:** instância observável (`IntValue`, `StringValue`); ainda útil quando a hierarquia precisa expor o valor, mas atributos ou estado em módulos são frequentemente mais leves.

```lua
local CollectionService = game:GetService("CollectionService")

for _, door in CollectionService:GetTagged("Door") do
	local requiredLevel = door:GetAttribute("RequiredLevel") or 0
	print(door:GetFullName(), requiredLevel)
end
```

### 2.5 Ferramentas do Studio

| Janela/ferramenta | Finalidade |
|---|---|
| Explorer | Hierarquia e busca de instâncias |
| Properties | Inspeção e edição de propriedades/atributos |
| Output | Logs e erros de cliente/servidor |
| Script Analysis | Problemas estáticos e de tipos |
| Asset Manager | Importação e organização de assets |
| Toolbox | Creator Store; inspecione modelos antes de usá-los |
| Command Bar | Experimentos pontuais no place aberto |
| Device Emulator | Tamanhos de tela e características de dispositivo |
| MicroProfiler | Investigação temporal de CPU, render, física e rede |

> **Segurança:** um modelo gratuito pode conter scripts indesejados. Inspecione a árvore e o código; não execute assets desconhecidos em um projeto importante.

> **Prática 2.1:** crie uma pasta com cinco partes, adicione atributos `Reward` e uma tag `Collectible`, e escreva um script que valide se todas têm recompensa positiva.

> **Prática 2.2:** provoque uma referência inexistente, leia o stack trace e corrija sem usar uma espera infinita.

**Critério de domínio:** você prevê onde um objeto existirá em runtime e escolhe conscientemente hierarquia, atributo, tag ou estado em módulo.

---

## 3. Construção 3D, assets, terreno e iluminação

Programadores completos entendem o custo e o comportamento do mundo que seus sistemas manipulam.

### 3.1 Unidades e transformações

- **stud:** unidade espacial da Roblox;
- `Position`: posição de uma parte;
- `Orientation`: representação em ângulos para edição;
- `CFrame`: posição e orientação completas;
- `PivotTo()`: move um `Model` ou `PVInstance` pelo pivô;
- `GetPivot()`: obtém o pivô atual.

Prefira pivôs de modelo a mover cada parte separadamente:

```lua
local gate = workspace:WaitForChild("Gate")
local target = CFrame.new(0, 12, 0) * CFrame.Angles(0, math.rad(90), 0)
gate:PivotTo(target)
```

### 3.2 Parts, MeshParts e Models

| Estrutura | Melhor uso | Cuidado |
|---|---|---|
| `Part` | Greybox, colisores, formas simples | Muitas partes elevam custo de instâncias/física |
| `MeshPart` | Geometria importada e otimizada | Colisão complexa e textura pesada custam memória |
| `Model` | Agrupamento semântico e pivô | Um model não é uma peça física única |
| `Folder` | Organização sem significado espacial | Não possui pivô |
| `UnionOperation` | CSG simples | Pode ser mais difícil de editar e otimizar |

### 3.3 Greyboxing

Construa primeiro com blocos:

1. escala e distâncias;
2. rotas e linhas de visão;
3. pontos de interesse;
4. cobertura, saltos e gargalos;
5. somente depois, arte final.

Um FPS precisa testar tempo até o primeiro confronto e ângulos de tiro. Um obby precisa testar legibilidade e tolerância dos saltos. Um simulador precisa testar distância entre coleta, venda e upgrades.

### 3.4 Colisão e assemblies

Partes conectadas por `WeldConstraint`, juntas ou constraints formam assemblies. Uma parte ancorada torna a assembly efetivamente controlada pelo servidor. Use grupos de colisão em `PhysicsService` para expressar regras como “projéteis atravessam aliados” sem alternar `CanCollide` em loops.

### 3.5 Assets e PBR

Assets publicados recebem IDs. Respeite propriedade intelectual e permissões. Para materiais realistas, `SurfaceAppearance` pode combinar mapas PBR. Reduza resolução quando a textura não será vista de perto; uma textura grande consome memória mesmo em um objeto pequeno.

### 3.6 Terrain

O terreno é voxelizado em células de 4×4×4 studs. É apropriado para paisagens orgânicas, água e grandes superfícies naturais. O Terrain Editor gera, esculpe, suaviza e importa heightmaps; scripts podem usar métodos como `FillBlock()` e `FillBall()`.

```lua
local terrain = workspace.Terrain
terrain:FillBlock(CFrame.new(0, -4, 0), Vector3.new(64, 8, 64), Enum.Material.Grass)
```

### 3.7 Iluminação e efeitos

| Elemento | Função |
|---|---|
| `Lighting` | Ambiente global, horário, exposição e estilo |
| `Atmosphere` | Densidade, névoa e dispersão atmosférica |
| `Sky` | Céu e corpos celestes |
| `PointLight` | Fonte omnidirecional local |
| `SpotLight` | Cone de luz |
| `SurfaceLight` | Luz emitida por uma face |
| Pós-processamento | Bloom, correção de cor, profundidade de campo |

Luz também comunica gameplay: perigo, direção, área segura e objetivo. Não use pós-processamento apenas para “embelezar”; teste legibilidade em telas pequenas e brilho reduzido.

> **Prática 3.1:** faça o greybox de uma arena com duas rotas principais e uma rota de risco/recompensa. Meça os tempos de travessia.

> **Prática 3.2:** crie uma mesma sala em estados “segura” e “ameaçadora” alterando somente luz, som e partículas.

> **Prática 3.3:** compare uma decoração feita com muitas Parts e uma MeshPart. Observe memória e instâncias no Developer Console.

**Critério de domínio:** você constrói um espaço jogável antes da arte final e consegue justificar colisão, pivô, asset e iluminação.

---

# Parte II — Programação com Luau

## 4. Lógica, valores, controle e funções

Roblox usa **Luau**, linguagem derivada de Lua 5.1 com tipagem gradual, interpolação de strings, iteração generalizada e otimizações próprias. Consulte [Scripting](https://create.roblox.com/docs/scripting) e a [documentação da linguagem Luau](https://luau.org/).

### 4.1 Valores e verdade

```lua
local playerName = "Lia"       -- string
local health = 100             -- number
local alive = true             -- boolean
local target = nil             -- ausência de valor
local inventory = {}           -- table
local position = Vector3.zero  -- datatype da Engine
```

Somente `false` e `nil` são falsos. `0` e `""` são verdadeiros.

### 4.2 Operadores essenciais

| Grupo | Operadores |
|---|---|
| Aritmética | `+ - * / // % ^` |
| Comparação | `== ~= < > <= >=` |
| Lógica | `and or not` |
| Texto | `..` ou interpolação `` `Olá {name}` `` |
| Atribuição composta | `+= -= *= /=` |

Use `and`/`or` compreendendo que retornam operandos, não necessariamente booleanos:

```lua
local displayName = customName or "Sem nome"
local canEnter = hasKey and level >= 10
```

### 4.3 Condições e guard clauses

```lua
local function calculateDamage(attack: number, defense: number): number
	if attack < 0 or defense < 0 then
		return 0
	end

	return math.max(0, attack - defense)
end
```

Retornos antecipados reduzem aninhamento. Valide entradas no começo e mantenha o caminho principal legível.

### 4.4 Laços

```lua
for index = 1, 10 do
	print(index)
end

local names = {"Ana", "Bia", "Caio"}
for index, name in names do
	print(index, name)
end

local attempts = 0
while attempts < 3 do
	attempts += 1
	if tryOpenDoor() then
		break
	end
end
```

Um loop deve ter condição de término ou ceder execução. `while true do end` bloqueia a thread.

### 4.5 Funções como valores

```lua
local function map<T, U>(items: {T}, transform: (T) -> U): {U}
	local result = {}
	for index, value in items do
		result[index] = transform(value)
	end
	return result
end

local doubled = map({1, 2, 3}, function(value)
	return value * 2
end)
```

Funções podem ser armazenadas, passadas e retornadas. Isso permite callbacks, estratégias e composição.

### 4.6 Escopo correto

Globais comuns são visíveis em todos os blocos **do mesmo script**, não em outros scripts. Prefira `local` por clareza, desempenho e controle de vida útil. Compartilhe comportamento com ModuleScripts.

```lua
local total = 0

do
	local bonus = 10
	total += bonus
end

-- bonus não existe aqui
```

> **Prática 4.1:** implemente `calculateXPForLevel(level)` com crescimento quadrático e rejeite níveis menores que 1.

> **Prática 4.2:** escreva FizzBuzz de 1 a 100 e depois transforme a regra em uma função testável.

> **Prática 4.3:** crie uma função de cooldown que recebe o instante atual; evite chamar `os.clock()` dentro da lógica para facilitar testes.

**Critério de domínio:** você divide um problema em funções pequenas, prevê escopo e explica a condição de término de cada loop.

---

## 5. Tabelas, algoritmos e tratamento de erros

### 5.1 Arrays e dicionários

```lua
local hotbar = {"Sword", "Potion", "Bow"}
local profile = {
	coins = 100,
	level = 4,
	items = {Sword = 1, Potion = 3},
}
```

- array: índices inteiros contíguos, normalmente iniciados em 1;
- dicionário: chaves explícitas;
- `#array` só é confiável quando o array não possui buracos;
- atribuir `nil` remove uma chave.

### 5.2 Biblioteca de tabelas

| Função | Uso |
|---|---|
| `table.insert` | Insere em array |
| `table.remove` | Remove e desloca índices |
| `table.find` | Encontra um valor |
| `table.sort` | Ordena in-place |
| `table.concat` | Junta strings |
| `table.clone` | Cópia rasa |
| `table.freeze` | Impede alterações diretas |
| `table.clear` | Limpa mantendo a tabela alocada |

`table.clone` não copia sub-tabelas. Isso é uma cópia rasa:

```lua
local original = {stats = {health = 100}}
local copy = table.clone(original)
copy.stats.health = 0
print(original.stats.health) -- 0: ambos apontam para a mesma subtabela
```

### 5.3 Conjuntos, filas e pilhas

```lua
-- conjunto: busca média O(1)
local unlocked: {[string]: boolean} = {Forest = true, Cave = true}
if unlocked.Forest then
	print("acesso liberado")
end

-- pilha: último a entrar, primeiro a sair
local stack = {}
table.insert(stack, "StateA")
local current = table.remove(stack)
```

Para filas grandes, evitar `table.remove(queue, 1)` repetidamente pode ser importante, pois desloca os elementos. Mantenha índices `head` e `tail`.

### 5.4 Complexidade prática

| Operação | Custo típico | Consequência |
|---|---:|---|
| Buscar chave em dicionário | O(1) médio | Ideal para configs por ID |
| Percorrer array | O(n) | Aceitável, mas não a cada frame em listas enormes |
| Buscar em array | O(n) | Crie índice/dicionário se a busca for frequente |
| Duplo loop | O(n²) | Pode crescer rapidamente |
| Ordenar | O(n log n) | Faça quando necessário, não todo frame |

### 5.5 Validação e invariantes

Uma **invariante** deve permanecer verdadeira. Exemplo: moedas nunca negativas.

```lua
local function spend(balance: number, price: number): (boolean, number)
	assert(price >= 0, "price must be non-negative")
	if balance < price then
		return false, balance
	end
	return true, balance - price
end
```

### 5.6 `pcall` e erros esperados

Use `pcall` em operações que podem falhar por motivos externos, como DataStore e serviços web. Não o use para esconder bugs de programação.

```lua
local success, result = pcall(function()
	return riskyOperation()
end)

if not success then
	warn("riskyOperation failed:", result)
	return
end
```

### 5.7 Estado mutável e funções puras

Uma função pura depende apenas das entradas e não altera estado externo. Ela é mais fácil de testar:

```lua
local function nextLevelState(state, gainedXP)
	local result = table.clone(state)
	result.xp += gainedXP
	while result.xp >= result.xpNeeded do
		result.xp -= result.xpNeeded
		result.level += 1
		result.xpNeeded = math.floor(result.xpNeeded * 1.25)
	end
	return result
end
```

> **Prática 5.1:** implemente uma fila O(1) amortizada com `enqueue`, `dequeue` e `isEmpty`.

> **Prática 5.2:** receba uma lista de drops e produza um dicionário `itemId → quantidade total`.

> **Prática 5.3:** escreva testes manuais para saldo igual ao preço, preço zero, saldo insuficiente e preço negativo.

**Critério de domínio:** você escolhe a estrutura pelo padrão de acesso, reconhece cópia rasa e separa erro externo de bug lógico.

---

## 6. Luau tipado em modo estrito

O sistema de tipos é gradual: você pode tipar parte do código, mas projetos novos se beneficiam de `--!strict`. O Script Editor detecta incompatibilidades antes do runtime. Veja [Type checking](https://create.roblox.com/docs/luau/type-checking).

### 6.1 Anotações fundamentais

```lua
--!strict

local title: string = "Miner"
local score: number = 0
local target: BasePart? = nil

local function clampHealth(value: number, maximum: number): number
	return math.clamp(value, 0, maximum)
end
```

`T?` equivale à união `T | nil`. Depois de verificar `if target then`, o type checker refina o tipo.

### 6.2 Tipos estruturais

```lua
export type ItemDefinition = {
	id: string,
	displayName: string,
	price: number,
	stackLimit: number,
	tags: {string},
}

export type Inventory = {[string]: number}
```

### 6.3 Uniões discriminadas

```lua
type IdleState = {kind: "Idle"}
type ChasingState = {kind: "Chasing", target: Model}
type AttackingState = {kind: "Attacking", target: Model, startedAt: number}
type EnemyState = IdleState | ChasingState | AttackingState

local function describe(state: EnemyState): string
	if state.kind == "Idle" then
		return "sem alvo"
	elseif state.kind == "Chasing" then
		return `perseguindo {state.target.Name}`
	else
		return `atacando desde {state.startedAt}`
	end
end
```

### 6.4 Generics

```lua
local function first<T>(values: {T}): T?
	return values[1]
end

local firstPlayer: Player? = first(game:GetService("Players"):GetPlayers())
```

### 6.5 Evite `any` como fuga

`any` desliga a proteção naquele fluxo. Prefira `unknown` quando um valor ainda precisa ser validado e casts `::` somente quando você possui uma prova que o analisador não consegue inferir.

```lua
local function isStringArray(value: unknown): boolean
	if typeof(value) ~= "table" then
		return false
	end
	for _, item in value :: {unknown} do
		if typeof(item) ~= "string" then
			return false
		end
	end
	return true
end
```

### 6.6 Tipos não validam a rede em runtime

Uma anotação não impede um exploiter de enviar outro tipo por remote. Tipagem protege o código durante desenvolvimento; validação de runtime protege a fronteira de confiança.

> **Prática 6.1:** converta um módulo de inventário para `--!strict`, exportando os tipos públicos.

> **Prática 6.2:** modele o resultado de uma compra como união: sucesso, fundos insuficientes, item inválido e limite atingido.

> **Prática 6.3:** elimine todos os `any` de um exemplo e documente os casts restantes.

**Critério de domínio:** seu módulo roda em `--!strict`, exporta um contrato claro e não confunde tipos estáticos com validação de dados externos.

---

## 7. ModuleScripts, composição, OOP e estados

### 7.1 O contrato de `require`

Um `ModuleScript` executa uma vez por ambiente e devolve o valor armazenado em cache nas próximas chamadas. Cliente e servidor têm caches separados. Um módulo em `ReplicatedStorage` é visível ao cliente; não coloque segredos nele.

```lua
-- ReplicatedStorage/Shared/FormatNumber.lua
local FormatNumber = {}

function FormatNumber.compact(value: number): string
	if value >= 1_000_000 then
		return string.format("%.1fM", value / 1_000_000)
	elseif value >= 1_000 then
		return string.format("%.1fK", value / 1_000)
	end
	return tostring(value)
end

return table.freeze(FormatNumber)
```

### 7.2 Dependências explícitas

```lua
local ShopService = {}
ShopService.__index = ShopService

function ShopService.new(economyService, inventoryService)
	return setmetatable({
		economy = economyService,
		inventory = inventoryService,
	}, ShopService)
end

function ShopService:buy(player, item)
	if not self.economy:trySpend(player, item.price) then
		return false, "InsufficientFunds"
	end
	self.inventory:add(player, item.id, 1)
	return true, nil
end

return ShopService
```

Passar dependências no construtor facilita testes e evita `require` circular.

### 7.3 Composição antes de herança

Em vez de `FireBoss extends Boss extends Enemy extends Character`, componha comportamentos:

```text
Enemy
├── HealthComponent
├── MovementComponent
├── TargetingComponent
└── AbilityComponent: FireBreath
```

Composição reduz acoplamento e permite reutilizar `HealthComponent` em objetos que não são personagens.

### 7.4 Metatables e métodos

`obj:method(x)` é açúcar para `obj.method(obj, x)`. `__index` permite que uma instância encontre métodos no protótipo.

```lua
local Counter = {}
Counter.__index = Counter

function Counter.new(initial: number?)
	return setmetatable({value = initial or 0}, Counter)
end

function Counter:increment(amount: number?)
	self.value += amount or 1
end
```

Metatables não são “classes reais” da Engine; são um padrão de Luau.

### 7.5 Máquinas de estado

Estados tornam transições explícitas:

```text
Idle ──detectou alvo──> Chase ──em alcance──> Attack
  ↑                         │                   │
  └──── perdeu alvo ────────┴── alvo morreu ───┘
```

```lua
local allowed = {
	Idle = {Chase = true},
	Chase = {Idle = true, Attack = true},
	Attack = {Idle = true, Chase = true},
}

local function canTransition(from: string, to: string): boolean
	return allowed[from] ~= nil and allowed[from][to] == true
end
```

### 7.6 Ciclo de vida

Todo sistema deve responder:

- como é criado/inicializado;
- quando começa a observar eventos;
- quem possui o estado;
- como desconecta eventos e libera instâncias;
- o que acontece ao jogador sair ou personagem renascer.

> **Prática 7.1:** divida um script monolítico de loja em Config, EconomyService, InventoryService e ShopService.

> **Prática 7.2:** implemente uma porta com estados `Closed`, `Opening`, `Open`, `Closing` e impeça transições ilegais.

> **Prática 7.3:** crie um teste com dependências falsas para verificar uma compra sem Players ou DataStore.

**Critério de domínio:** seus módulos têm responsabilidades pequenas, dependências visíveis e um ciclo de vida encerrável.

---
# Parte III — Como a Engine executa o jogo

## 8. Cliente, servidor, replicação e contextos

### 8.1 O modelo distribuído

Toda sessão multiplayer possui um servidor e um cliente por jogador:

```text
                 SERVIDOR
      regras, dados e autoridade do jogo
          │       │       │
     replicação e mensagens remotas
          │       │       │
      Cliente A Cliente B Cliente C
       input/UI  input/UI  input/UI
```

O servidor deve decidir resultados que afetam progressão, economia, outros jogadores ou integridade competitiva. O cliente deve cuidar de input, câmera, interface e efeitos locais. Para responsividade, o cliente pode **prever** um resultado visual, enquanto o servidor valida o resultado real.

### 8.2 O que replica

| Origem/ação | O outro lado recebe? |
|---|---|
| Servidor cria/altera instância replicada | Normalmente, clientes recebem |
| Cliente altera propriedade local | Em geral, a alteração permanece local |
| Cliente cria efeito em `Workspace` | Só esse cliente vê |
| Cliente move física que possui | Estado físico pode ser comunicado ao servidor |
| Objeto em `ServerStorage` | Cliente não recebe |
| ModuleScript em `ReplicatedStorage` | Cliente recebe código e pode inspecioná-lo |

Replicação não é autorização. Ver uma porta aberta no cliente não significa que o cliente pode conceder a si mesmo a chave.

### 8.3 Tipos de script e `RunContext`

| Tipo/contexto | Onde executa | Uso |
|---|---|---|
| `Script` servidor | Servidor | Regras, dados e validação |
| `LocalScript` | Cliente em contêiner permitido | Input, câmera, UI |
| `ModuleScript` | No ambiente que o requereu | Biblioteca/estado modular |
| `Script` com `RunContext.Client` | Cliente | Código cliente sem depender do tipo legado |

Um ModuleScript não é “cliente” ou “servidor” por natureza. Ele executa no lado que chamou `require`.

### 8.4 Fonte de verdade

| Dado | Fonte de verdade recomendada |
|---|---|
| moedas, XP, inventário | servidor |
| dano e cooldown de habilidade | servidor |
| mira instantânea e recoil visual | cliente |
| estado aberto do menu | cliente |
| configurações não sensíveis de itens | módulo compartilhado |
| fórmula secreta/antifraude | servidor |

### 8.5 Latência e reconciliação

Se o cliente esperar uma ida e volta de rede para todo feedback, o jogo parecerá lento. Um padrão útil:

1. cliente recebe input;
2. cliente mostra animação/efeito previsto;
3. cliente envia intenção e dados mínimos;
4. servidor valida e aplica o resultado;
5. servidor confirma ou corrige o cliente.

> **Prática 8.1:** classifique 20 dados de um jogo seu como servidor, cliente ou compartilhado e justifique cada um.

> **Prática 8.2:** use o teste Client/Server para alterar uma Part somente no cliente e observe as duas árvores.

**Critério de domínio:** você descreve a direção de cada dado e não confunde aparência local com estado autoritativo.

---

## 9. Eventos, remotes e contratos de rede

### 9.1 Sinais locais

Eventos da Engine são `RBXScriptSignal`s:

```lua
local Players = game:GetService("Players")

local connection = Players.PlayerAdded:Connect(function(player)
	print(player.Name, "joined")
end)

-- quando não for mais necessário:
connection:Disconnect()
```

Uma conexão mantém referências ao callback. Sistemas temporários devem desconectar suas conexões.

### 9.2 Bindables

`BindableEvent` comunica scripts no mesmo lado sem retorno; `BindableFunction` possui retorno e pode produzir dependência síncrona. Em muitos projetos, um módulo de sinais ou callbacks explícitos é mais fácil de tipar.

### 9.3 RemoteEvent

Comunicação assíncrona confiável e ordenada:

```lua
-- Cliente: envia intenção
PurchaseRequest:FireServer("IronPickaxe")

-- Servidor: o Player remetente é inserido pela Engine
PurchaseRequest.OnServerEvent:Connect(function(player, itemId)
	-- validar tipo, contexto, permissão, valor e frequência
end)

-- Servidor → cliente
PurchaseResult:FireClient(player, true, "IronPickaxe")
```

### 9.4 UnreliableRemoteEvent

Use para dados que mudam continuamente e podem ser descartados ou chegar fora de ordem sem comprometer o estado, por exemplo uma direção de mira remota, rastro cosmético ou posição visual de um cursor. Não use para compra, dano confirmado, recompensa ou inventário.

### 9.5 RemoteFunction

`InvokeServer()` espera retorno. Pode ser útil para uma consulta pontual, mas aumenta acoplamento e risco de espera. O servidor deve evitar `InvokeClient()`: o cliente pode desconectar, falhar ou nunca responder.

### 9.6 Contrato de mensagens

Modele cada remote como um endpoint:

| Campo | Exemplo |
|---|---|
| Nome | `RequestPurchase` |
| Direção | Cliente → servidor |
| Intenção | Solicitar compra de um item conhecido |
| Payload | `itemId: string` |
| Limite | 5 solicitações por segundo |
| Validações | tipo, ID, proximidade, saldo, limite |
| Efeitos | debitar e adicionar item |
| Resposta | evento `PurchaseResolved` |

Evite remotes genéricos como `ChangeAnyProperty(instance, property, value)`.

### 9.7 Validação em camadas

```lua
local catalog = require(ServerStorage.Config.ItemCatalog)

PurchaseRequest.OnServerEvent:Connect(function(player, itemId)
	if typeof(itemId) ~= "string" then return end
	if #itemId > 64 then return end

	local item = catalog[itemId]
	if not item then return end
	if not RateLimiter:allow(player, "Purchase", 5, 1) then return end
	if not ShopAccess:isPlayerNearShop(player) then return end

	local ok, reason = ShopService:purchase(player, item)
	PurchaseResult:FireClient(player, ok, reason)
end)
```

Valide números finitos: `NaN` não é igual a si mesmo e infinitos podem quebrar física/cálculos.

```lua
local function isFiniteNumber(value: unknown): boolean
	return typeof(value) == "number"
		and value == value
		and value ~= math.huge
		and value ~= -math.huge
end
```

> **Prática 9.1:** documente o contrato de cinco remotes de um inventário.

> **Prática 9.2:** escreva casos de abuso para payload enorme, ID inexistente, spam, distância impossível e jogador morto.

**Critério de domínio:** todo remote possui intenção estreita, validação completa e limite de frequência no servidor.

---

## 10. Scheduler, `task`, RunService e paralelismo

### 10.1 Concorrência cooperativa

Luau comum executa sequencialmente até a thread terminar ou ceder. Uma função que produz `yield` permite que outras tarefas avancem. Concorrência não significa execução simultânea; Parallel Luau é um recurso separado.

### 10.2 Biblioteca `task`

| API | Comportamento |
|---|---|
| `task.wait(seconds?)` | Suspende a thread atual |
| `task.spawn(fn, ...)` | Agenda rapidamente uma função |
| `task.defer(fn, ...)` | Agenda para um ponto posterior do ciclo |
| `task.delay(seconds, fn, ...)` | Agenda após atraso |
| `task.cancel(thread)` | Cancela uma thread agendada/suspensa |

Prefira `task.*` às globais legadas `wait`, `spawn` e `delay`.

### 10.3 Eventos do RunService

```text
input → PreAnimation → animação → PreSimulation → física
      → PostSimulation → Heartbeat → renderização do cliente
```

| Evento | Uso típico |
|---|---|
| `PreSimulation` | Preparar forças/estado antes da física |
| `PostSimulation` | Reagir ao resultado físico |
| `Heartbeat` | Atualizações gerais após física |
| `PreRender` | Atualizações visuais por frame no cliente |
| `BindToRenderStep` | Ordem explícita para câmera/input visual |

Não conecte lógica pesada a eventos por frame sem necessidade. Para uma verificação de 5 Hz, acumule `deltaTime`.

```lua
local accumulator = 0
local interval = 0.2

RunService.Heartbeat:Connect(function(deltaTime)
	accumulator += deltaTime
	if accumulator < interval then return end
	accumulator %= interval
	updateNearbyTargets()
end)
```

### 10.4 Independência de frame rate

```lua
position += velocity * deltaTime
```

Somar uma distância fixa por frame faz o resultado depender do FPS.

### 10.5 Condições de corrida

Duas threads podem ler o mesmo estado, ceder e sobrescrever alterações. Evite “ler-modificar-gravar” com yields no meio. Para DataStore, use `UpdateAsync`; para estado em memória, centralize a mutação.

### 10.6 Parallel Luau

`Actor`s isolam unidades de execução. `task.desynchronize()` ou `ConnectParallel()` entra em fase paralela; `task.synchronize()` retorna à fase serial para operações não permitidas. Use somente após profiling demonstrar cálculo CPU-bound independente, como muitos raycasts, geração procedural ou percepção de NPCs.

```lua
RunService.Heartbeat:ConnectParallel(function()
	local result = computeReadOnlyResult()

	task.synchronize()
	applyResultToInstances(result)
end)
```

Consulte a segurança de thread de cada membro da API. Não “paralelize tudo”.

> **Prática 10.1:** faça um cronômetro que permanece correto em 30, 60 e 120 FPS.

> **Prática 10.2:** encontre um loop por frame e reduza sua frequência sem alterar o comportamento perceptível.

> **Prática 10.3:** descreva um caso em que Parallel Luau pioraria a complexidade sem benefício mensurável.

**Critério de domínio:** você escolhe a fase correta, usa `deltaTime` e só aplica paralelismo com evidência de profiling.

---

## 11. Matemática 3D, CFrame, raycasts e consultas espaciais

### 11.1 Vector3

```lua
local displacement = targetPosition - originPosition
local distance = displacement.Magnitude
local direction = if distance > 0 then displacement.Unit else Vector3.zero
```

Produto escalar mede alinhamento:

```lua
local facing = character:GetPivot().LookVector
local toTarget = (targetPosition - character:GetPivot().Position).Unit
local dot = facing:Dot(toTarget)

if dot > 0.7 then
	print("alvo aproximadamente à frente")
end
```

Produto vetorial produz um vetor perpendicular e ajuda a determinar esquerda/direita.

### 11.2 CFrame

`CFrame` representa transformação local → mundo. A ordem de multiplicação importa.

```lua
local root = character:GetPivot()
local pointFiveStudsAhead = (root * CFrame.new(0, 0, -5)).Position
local looking = CFrame.lookAt(root.Position, targetPosition)
```

Conversões úteis:

```lua
local worldPoint = root:PointToWorldSpace(localPoint)
local localPointAgain = root:PointToObjectSpace(worldPoint)
local localDirection = root:VectorToObjectSpace(worldDirection)
```

### 11.3 Raycasting

O segundo argumento é um vetor direção **com comprimento**:

```lua
local params = RaycastParams.new()
params.FilterType = Enum.RaycastFilterType.Exclude
params.FilterDescendantsInstances = {character}
params.IgnoreWater = true

local origin = camera.CFrame.Position
local direction = camera.CFrame.LookVector * 500
local result = workspace:Raycast(origin, direction, params)

if result then
	print(result.Instance, result.Position, result.Normal, result.Material)
end
```

### 11.4 Consultas de volume

Para áreas, use APIs como `GetPartBoundsInBox`, `GetPartBoundsInRadius` e `GetPartsInPart` com `OverlapParams`. Não faça dezenas de raycasts quando o problema é “quem está nesta caixa?”.

```lua
local overlap = OverlapParams.new()
overlap.FilterType = Enum.RaycastFilterType.Exclude
overlap.FilterDescendantsInstances = {attackerCharacter}

local hits = workspace:GetPartBoundsInBox(hitboxCFrame, hitboxSize, overlap)
```

Converta Parts atingidas em entidades e deduplique por `Model`, ou um personagem com 15 partes receberá dano 15 vezes.

### 11.5 Interpolação

`CFrame:Lerp`, `Vector3:Lerp` e TweenService criam transições. Interpolação linear com fator dependente de frame precisa considerar tempo; para um tween com duração conhecida, controle `alpha = elapsed / duration`.

> **Prática 11.1:** detecte se um alvo está em um cone de visão considerando ângulo, distância e obstáculo.

> **Prática 11.2:** faça uma hitbox de espada que deduplica Humanoids e desenhe-a temporariamente para debug.

> **Prática 11.3:** converta um ponto do espaço da arma para o mundo e explique a ordem dos CFrames.

**Critério de domínio:** você distingue ponto, direção e transformação e escolhe raycast ou consulta de volume conscientemente.

---

## 12. Física, constraints, ownership e streaming

### 12.1 Física baseada em assemblies

Uma assembly é um conjunto rígido de partes conectadas. Propriedades como `AssemblyLinearVelocity`, `AssemblyAngularVelocity`, `AssemblyMass` e `AssemblyCenterOfMass` descrevem o conjunto.

Evite alterar `CFrame` de uma peça física a cada frame para simular movimento. Use constraints, forças ou controllers quando desejar interação física.

### 12.2 Constraints atuais

| Constraint | Uso |
|---|---|
| `WeldConstraint` | União rígida |
| `HingeConstraint` | Rotação em eixo, portas e rodas |
| `PrismaticConstraint` | Movimento linear restrito |
| `BallSocketConstraint` | Articulação esférica |
| `AlignPosition` | Alinhar posição por força |
| `AlignOrientation` | Alinhar orientação |
| `LinearVelocity` | Manter velocidade linear |
| `AngularVelocity` | Manter rotação |
| `VectorForce` | Aplicar força |

BodyMovers antigos aparecem em tutoriais, mas constraints modernas são preferíveis em projetos novos.

### 12.3 Network ownership

A Engine distribui simulação de partes não ancoradas entre servidor e clientes para responsividade. Um cliente que possui uma assembly pode controlar sua física; o servidor não valida automaticamente esses cálculos. Para objetos críticos, considere `SetNetworkOwner(nil)`, validação ou design menos dependente de física cliente.

```lua
if criticalBall:CanSetNetworkOwnership() then
	criticalBall:SetNetworkOwner(nil)
end
```

Forçar ownership do servidor pode gerar jitter e custo; é uma decisão, não uma receita universal.

### 12.4 Eventos de toque não são prova

`Touched` pode ser influenciado por ownership. Para recompensa importante, valide distância, estado, cooldown e identidade do coletável no servidor.

### 12.5 Streaming

Com `Workspace.StreamingEnabled`, o cliente carrega e descarrega conteúdo 3D. Isso reduz tempo de entrada e memória, mas muda suposições:

- um objeto distante pode não existir localmente;
- `ChildRemoved` pode ocorrer por stream-out, não destruição;
- referências e alterações locais podem precisar ser reconstruídas;
- modelos críticos podem usar modos de streaming adequados;
- `RequestStreamAroundAsync()` é uma solicitação, não licença para depender de todo o mapa.

Não guarde scripts de gameplay importantes dentro de geometria que pode sair do streaming no cliente.

### 12.6 Colisões e segurança

Uma checagem de distância baseada somente numa Part não ancorada pode ser burlada movendo a Part sob ownership do cliente. Interações críticas devem usar âncoras confiáveis e contexto mantido no servidor.

> **Prática 12.1:** construa uma porta com HingeConstraint e limites físicos, sem atualizar CFrame em loop.

> **Prática 12.2:** visualize network ownership no Studio e observe quando uma bola próxima muda de dono.

> **Prática 12.3:** ative streaming em um mapa de teste e registre objetos entrando/saindo sem tratar stream-out como destruição definitiva.

**Critério de domínio:** você entende quem simula cada assembly e escreve código cliente tolerante a conteúdo ausente.

---

## 13. Jogadores, personagens, animações e câmera

### 13.1 Player não é Character

- `Player`: identidade da sessão;
- `Character`: Model físico, pode nascer várias vezes;
- `Humanoid`: comportamento de personagem;
- `HumanoidRootPart`: raiz espacial comum;
- `Animator`: carrega e reproduz animações.

```lua
local function onCharacterAdded(player: Player, character: Model)
	local humanoid = character:WaitForChild("Humanoid", 10)
	if not humanoid then return end

	humanoid.Died:Connect(function()
		print(player.Name, "died")
	end)
end

Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		onCharacterAdded(player, character)
	end)
	if player.Character then
		onCharacterAdded(player, player.Character)
	end
end)
```

Trate personagem atual e próximos respawns. Não armazene para sempre uma referência ao primeiro Character.

### 13.2 R6, R15 e rigs customizados

Não dependa de partes específicas sem declarar o rig esperado. `HumanoidDescription` configura escala, roupas, acessórios e animações. Rigs sem `Humanoid` podem usar `AnimationController` com `Animator`.

### 13.3 Animações

Fluxo:

1. criar rig e animação;
2. publicar com propriedade compatível à experiência/grupo;
3. carregar no `Animator`;
4. configurar prioridade;
5. tocar, ajustar peso/velocidade e reagir a markers;
6. parar e limpar quando o estado termina.

```lua
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://SEU_ID"

local track = animator:LoadAnimation(animation)
track.Priority = Enum.AnimationPriority.Action
track:GetMarkerReachedSignal("Hit"):Connect(function()
	-- sincroniza a janela visual; o servidor ainda valida o golpe
end)
track:Play(0.15)
```

Não use a animação do cliente como prova de dano.

### 13.4 Câmera

Cada cliente possui `Workspace.CurrentCamera`. Para controle total:

```lua
local camera = workspace.CurrentCamera
camera.CameraType = Enum.CameraType.Scriptable
camera.CFrame = CFrame.lookAt(cameraPosition, focusPosition)
camera.Focus = CFrame.new(focusPosition)
```

Atualize câmeras customizadas no cliente. Preserve conforto: limite shake, ofereça redução de movimento e evite mudanças bruscas de FOV.

### 13.5 Ciclo de vida de sistemas do personagem

Um controller deve desconectar conexões e cancelar threads quando o personagem for removido. Um padrão simples é guardar recursos num “trove/janitor” próprio ou implementar `destroy()`.

> **Prática 13.1:** implemente sprint que se reconecta corretamente após dez respawns.

> **Prática 13.2:** sincronize som de passo com markers de animação e teste em velocidades diferentes.

> **Prática 13.3:** crie câmera de inspeção que restaura `CameraType` e `CameraSubject` ao fechar.

**Critério de domínio:** seus sistemas sobrevivem a respawn, rigs esperados são explícitos e câmera/animação não decidem resultados autoritativos.

---

## 14. Entrada multiplataforma

### 14.1 Pense em ações, não teclas

“Recarregar” é uma ação. `R`, `ButtonX` ou botão touch são bindings. `ContextActionService` permite associar a ação a múltiplos inputs e desfazê-la quando o contexto acaba.

```lua
local ContextActionService = game:GetService("ContextActionService")
local ACTION_RELOAD = "ReloadWeapon"

local function handleReload(_actionName, inputState, _inputObject)
	if inputState == Enum.UserInputState.Begin then
		requestReload()
	end
	return Enum.ContextActionResult.Sink
end

ContextActionService:BindAction(
	ACTION_RELOAD,
	handleReload,
	true,
	Enum.KeyCode.R,
	Enum.KeyCode.ButtonX
)

-- ao desequipar:
ContextActionService:UnbindAction(ACTION_RELOAD)
```

### 14.2 UserInputService

Use quando precisar do estado do dispositivo, posições de toque/mouse ou input de baixo nível. Respeite `gameProcessedEvent` para não reagir a teclas consumidas por chat/UI.

### 14.3 Mouse, toque e gamepad

| Aspecto | Mouse/teclado | Touch | Gamepad |
|---|---|---|---|
| Precisão | alta | dedo oculta área | analógico |
| Hover | existe | não existe | seleção/foco |
| Atalhos | muitas teclas | botões visuais | botões limitados |
| Texto | teclado | teclado virtual | difícil |

Use `GuiButton.Activated` para ativação independente do dispositivo. Não dependa apenas de `MouseButton1Click`.

### 14.4 Input dinâmico

Atualize ícones/instruções quando o tipo de input usado mudar. Teste troca durante a sessão: um jogador pode usar controle e depois mouse.

### 14.5 Mobile

- botões frequentes em zonas alcançáveis pelos polegares;
- não sobreponha controles padrão;
- alvos de toque grandes e separados;
- evite dez ações simultâneas;
- teste orientação e teclado virtual;
- não interprete gestos de câmera como ação de UI.

> **Prática 14.1:** faça uma ação “Interagir” funcionar com E, ButtonX e botão touch.

> **Prática 14.2:** altere o prompt visual quando o último input mudar de teclado para gamepad.

**Critério de domínio:** nenhuma mecânica central depende de um único dispositivo e bindings são removidos quando o contexto termina.

---

## 15. UI, UX, responsividade, estilos e acessibilidade

### 15.1 UI e UX

UI são os elementos; UX é o caminho completo do jogador. Uma loja bonita ainda possui UX ruim se o jogador não entende o preço, compra por acidente ou não recebe confirmação.

### 15.2 Hierarquia

```text
StarterGui
└── MainGui (ScreenGui)
    ├── HUD
    ├── Screens
    │   ├── InventoryScreen
    │   └── ShopScreen
    └── Overlays
        ├── Notifications
        └── ConfirmationModal
```

O servidor envia estado; o cliente renderiza. Não envie Frames pelo remote.

### 15.3 UDim2, AnchorPoint e layouts

`UDim2` combina escala relativa e offset em pixels:

```lua
button.AnchorPoint = Vector2.new(0.5, 0.5)
button.Position = UDim2.fromScale(0.5, 0.5)
button.Size = UDim2.fromOffset(240, 56)
```

Use `UIListLayout`, `UIGridLayout`, `UIPadding`, `UIAspectRatioConstraint`, `UISizeConstraint` e flex layouts para expressar relações. Posicionar manualmente cada item é frágil.

### 15.4 Escala e legibilidade

- teste várias proporções, não só resoluções;
- use `AutomaticSize` com cuidado para texto variável;
- prefira `TextScaled` junto a limites quando necessário;
- respeite inset/safe area;
- contraste texto e fundo;
- não comunique estados somente por cor;
- forneça feedback visual e sonoro, com opções para reduzi-lo.

### 15.5 Arquitetura reativa simples

```lua
local function render(state)
	coinsLabel.Text = tostring(state.coins)
	buyButton.Active = state.canBuy
	buyButton.AutoButtonColor = state.canBuy
	errorLabel.Visible = state.errorMessage ~= nil
	errorLabel.Text = state.errorMessage or ""
end
```

Centralize a transformação `estado → aparência`; evite dezenas de scripts alterando a mesma tela.

### 15.6 Universal styling

StyleSheets, regras, tokens, temas e queries permitem estilos reutilizáveis, semelhantes a CSS. Use tokens para cores, espaçamento, tipografia e estados; isso reduz valores mágicos espalhados e facilita temas claro/escuro.

### 15.7 Acessibilidade

| Necessidade | Decisão de design |
|---|---|
| baixa visão | contraste, escala, texto legível |
| daltonismo | ícones/texto além da cor |
| sensibilidade a movimento | reduzir shake, blur, flashes e FOV |
| deficiência auditiva | legendas e indicadores visuais |
| limitação motora | remapeamento, tolerância e menos ações simultâneas |
| carga cognitiva | hierarquia, consistência e instruções curtas |

### 15.8 Localização

Não concatene frases traduzíveis em fragmentos. Use chaves e parâmetros. Deixe espaço para idiomas que expandem o texto. Números, datas e plural variam por localidade. Consulte [Localization](https://create.roblox.com/docs/production/localization).

### 15.9 Fluxo de confirmação

```text
ação destrutiva/cara → resumo claro → confirmação explícita
                   ↘ cancelar sem punição
```

> **Prática 15.1:** construa um inventário que se reorganiza em celular vertical, tablet e desktop.

> **Prática 15.2:** audite uma tela sem cor e sem som: toda informação importante ainda é compreensível?

> **Prática 15.3:** traduza textos para uma versão artificialmente 40% maior e corrija cortes.

**Critério de domínio:** sua interface funciona com touch, gamepad e diferentes proporções, e estado importante possui mais de uma forma de comunicação.

---

## 16. Áudio, partículas e feedback audiovisual

### 16.1 Funções do áudio

- feedback: clique, acerto, erro;
- informação: inimigo atrás, habilidade pronta;
- atmosfera: vento, chuva, ambiente;
- ritmo: música e transições;
- acessibilidade: reforçar eventos visuais.

O sistema clássico usa `Sound`/`SoundGroup`; o sistema de áudio mais novo usa objetos como `AudioPlayer`, `AudioEmitter`, `AudioListener` e `Wire`. Consulte [Audio](https://create.roblox.com/docs/audio).

### 16.2 Posicional e não posicional

Um `Sound` sob `SoundService` ou `Workspace` pode funcionar como áudio global; sob uma Part/Attachment, é espacial. Configure rolloff para que o som comunique distância sem dominar todo o mapa.

### 16.3 Mixagem

Organize grupos:

```text
Master
├── Music
├── SFX
├── UI
└── Ambience
```

Isso permite sliders e ducking. Ao abrir diálogo, reduza música/ambiente em vez de aumentar excessivamente a voz.

### 16.4 Pooling e limites

Não crie centenas de Sounds/ParticleEmitters sem limpeza. Para efeitos frequentes, reutilize instâncias ou use `Debris:AddItem()` para efeitos descartáveis. Defina um orçamento por importância e distância.

### 16.5 Partículas, beams e trails

| Recurso | Uso |
|---|---|
| `ParticleEmitter` | fumaça, impacto, magia |
| `Beam` | laser, raio, ligação entre Attachments |
| `Trail` | rastro de arma/movimento |
| `Highlight` | seleção e leitura de alvo |

Cliente pode criar efeitos cosméticos após confirmação do servidor. Reduza densidade em aparelhos fracos e evite flashes agressivos.

### 16.6 Feedback em camadas

Um bom acerto pode combinar:

```text
animação + som curto + partícula + hitmarker + pequena reação do alvo
```

Cada camada deve reforçar a mesma informação. Não esconda atraso de input atrás de uma animação longa.

> **Prática 16.1:** crie um mixer com sliders separados para música, efeitos e UI.

> **Prática 16.2:** implemente um pool de dez efeitos de impacto e compare com criar/destruir a cada tiro.

**Critério de domínio:** áudio e VFX comunicam eventos, possuem orçamento e podem ser reduzidos sem quebrar a jogabilidade.

---

## 17. NPCs, pathfinding e máquinas de comportamento

### 17.1 Percepção, decisão e ação

Separe IA em três camadas:

```text
Sensores → memória/blackboard → decisão → ação
```

- sensores: distância, linha de visão, dano recebido;
- memória: último alvo, posição suspeita, cooldowns;
- decisão: máquina de estado/utility/behavior tree;
- ação: mover, atacar, investigar.

### 17.2 PathfindingService

```lua
local PathfindingService = game:GetService("PathfindingService")

local path = PathfindingService:CreatePath({
	AgentRadius = 2,
	AgentHeight = 5,
	AgentCanJump = true,
	Costs = {Danger = math.huge},
})

local success, errorMessage = pcall(function()
	path:ComputeAsync(root.Position, destination)
end)

if not success or path.Status ~= Enum.PathStatus.Success then
	warn("Path failed", errorMessage)
	return
end

for _, waypoint in path:GetWaypoints() do
	if waypoint.Action == Enum.PathWaypointAction.Jump then
		humanoid.Jump = true
	end
	humanoid:MoveTo(waypoint.Position)
	local reached = humanoid.MoveToFinished:Wait()
	if not reached then break end
end
```

Uma implementação de produção também reage a `path.Blocked`, recalcula com cooldown e encerra quando alvo/character deixa de existir.

### 17.3 Não recalcule todo frame

Recalcule quando o destino mudou significativamente, o caminho bloqueou ou um intervalo expirou. Distribua atualizações de muitos NPCs entre frames.

### 17.4 Máquina de estados de NPC

| Estado | Entrada | Atualização | Saída |
|---|---|---|---|
| Idle | inicia animação | procura alvo lentamente | para animação |
| Chase | calcula caminho | segue/recalcula | cancela movimento |
| Attack | trava janela | tenta ataque | libera janela |
| Stunned | interrompe ações | aguarda duração | restaura controle |
| Dead | limpa alvo | nenhum update | destrói/recicla NPC |

### 17.5 Escalabilidade

- LOD de IA: NPC distante pensa com menor frequência;
- percepção espacial: use zonas/índices, não compare todos com todos;
- pooling: recicle NPCs quando apropriado;
- servidor decide dano; clientes podem animar/apresentar;
- Parallel Luau somente para cálculos independentes e medidos.

> **Prática 17.1:** implemente Idle/Chase/Attack e registre cada transição com motivo.

> **Prática 17.2:** force um obstáculo no caminho e faça o NPC recalcular sem loop infinito.

> **Prática 17.3:** atualize 100 NPCs em grupos distribuídos e compare o profiler.

**Critério de domínio:** seu NPC separa percepção/decisão/ação, lida com falha de caminho e tem frequência de atualização controlada.

---

# Parte IV — Sistemas e arquitetura

## 18. Arquitetura de projetos escaláveis

Arquitetura é o conjunto de fronteiras que torna mudanças previsíveis. Não existe uma única estrutura oficial; existe estrutura coerente com o tamanho, equipe e risco.

### 18.1 Objetivos

- dependências visíveis;
- servidor autoritativo;
- estado com dono definido;
- módulos pequenos e testáveis;
- código de apresentação separado da regra;
- inicialização e destruição previsíveis;
- rede com contratos estreitos.

### 18.2 Estrutura recomendada como ponto de partida

```text
ReplicatedStorage
├── Shared
│   ├── Types
│   ├── Config
│   ├── Util
│   └── Domain
└── Remotes
    ├── Requests
    └── Events

ServerScriptService
├── ServerBootstrap.server.luau
└── Server
    ├── Services
    │   ├── DataService
    │   ├── EconomyService
    │   ├── InventoryService
    │   └── CombatService
    └── Systems

ServerStorage
├── ServerConfig
└── Templates

StarterPlayer
└── StarterPlayerScripts
    ├── ClientBootstrap.client.luau
    └── Client
        ├── Controllers
        ├── UI
        └── Effects
```

Isso não exige um framework. O bootstrap pode construir dependências e chamar `init()`/`start()`.

### 18.3 Ordem de inicialização

```lua
local services = {
	DataService,
	InventoryService,
	EconomyService,
	ShopService,
}

for _, service in services do
	if service.init then
		service:init()
	end
end

for _, service in services do
	if service.start then
		task.spawn(function()
			service:start()
		end)
	end
end
```

`init()` deve montar estado e dependências sem depender de eventos externos; `start()` pode conectar eventos. Documente a ordem quando um serviço depende de outro.

### 18.4 Camadas úteis

| Camada | Responsabilidade | Exemplo |
|---|---|---|
| Domínio | Regras puras | cálculo de dano/preço |
| Aplicação | Coordena casos de uso | realizar compra |
| Infraestrutura | Engine e serviços externos | DataStore, remotes |
| Apresentação | UI, câmera e efeitos | renderizar resultado |

Não transforme camadas em burocracia. Um protótipo de dois scripts não precisa de vinte pastas; cresça as fronteiras conforme a mudança exige.

### 18.5 Eventos de domínio

```text
ShopService conclui compra
        ↓
InventoryChanged (evento interno)
     ↙       ↘
salvar sujo   atualizar cliente
```

O serviço de inventário não deve conhecer TextLabels. O controller de UI observa uma réplica segura do estado.

### 18.6 Erros arquiteturais comuns

| Erro | Sintoma |
|---|---|
| God module | qualquer alteração quebra tudo |
| require circular | módulos travam ou retornam estado incompleto |
| estado duplicado | UI, servidor e ValueObjects discordam |
| evento global genérico | difícil descobrir origem e payload |
| lógica em botões | regra não é reutilizável/testável |
| configs misturadas com runtime | alterações acidentais e difícil serialização |

> **Prática 18.1:** desenhe o grafo de dependências de um sistema de loja e elimine um ciclo.

> **Prática 18.2:** extraia de um LocalScript uma função pura de cálculo e teste-a no servidor sem UI.

**Critério de domínio:** cada estado importante tem um dono, dependências apontam numa direção compreensível e a UI não contém regra autoritativa.

---

## 19. Estado, configuração, inventário e itens

### 19.1 Configuração não é estado

```lua
-- Configuração estática, compartilhável
local Items = {
	IronSword = table.freeze({
		id = "IronSword",
		displayName = "Espada de Ferro",
		price = 250,
		stackLimit = 1,
		tags = table.freeze({"Weapon", "Melee"}),
	}),
}

return table.freeze(Items)
```

Estado seria “Henri possui 1 IronSword”. Configs podem ficar em `ReplicatedStorage` se não houver segredo. Preços exibidos pelo cliente são conveniência; o servidor usa sua própria fonte confiável.

### 19.2 IDs estáveis

Nome visível pode ser traduzido ou alterado. Salve IDs estáveis, não nomes:

```lua
inventory = {
	IronSword = 1,
	HealthPotion = 5,
}
```

### 19.3 API de inventário

```lua
--!strict
local Inventory = {}

export type State = {[string]: number}

function Inventory.canAdd(state: State, itemId: string, amount: number, limit: number): boolean
	if amount <= 0 then return false end
	return (state[itemId] or 0) + amount <= limit
end

function Inventory.add(state: State, itemId: string, amount: number, limit: number): boolean
	if not Inventory.canAdd(state, itemId, amount, limit) then
		return false
	end
	state[itemId] = (state[itemId] or 0) + amount
	return true
end

function Inventory.remove(state: State, itemId: string, amount: number): boolean
	if amount <= 0 then return false end
	local current = state[itemId] or 0
	if current < amount then return false end
	local remaining = current - amount
	state[itemId] = if remaining == 0 then nil else remaining
	return true
end

return table.freeze(Inventory)
```

### 19.4 Transações atômicas em memória

Uma troca deve validar tudo antes de mutar:

```text
validar jogador A + jogador B
validar ownership dos itens
validar quantidades e capacidade
montar resultado pretendido
aplicar a transação de uma vez
marcar ambos os perfis como alterados
registrar auditoria
```

Nunca remova do A, produza yield e depois tente adicionar ao B. Uma falha intermediária duplica ou destrói itens.

### 19.5 Estado replicado

Não replique o perfil completo. Envie ao cliente apenas o que ele pode usar e ver. Segredos de servidor, flags antifraude e histórico de compras não pertencem ao payload.

Estratégias:

- snapshot inicial + eventos de mudança;
- atributos/ValueObjects para poucos valores públicos;
- remote de delta com versão;
- reconstrução completa após inconsistência.

```text
v17: AddItem HealthPotion +1
v18: SetCoins 420
```

Se o cliente esperava v17 e recebeu v19, solicita um snapshot em vez de aplicar deltas fora de ordem.

### 19.6 Idempotência

Uma operação idempotente repetida não duplica efeito. Para recompensas críticas, use um `transactionId` registrado:

```lua
if profile.processedTransactions[transactionId] then
	return true -- já aplicado
end

grantReward(profile, reward)
profile.processedTransactions[transactionId] = os.time()
```

Defina limpeza/compactação desse histórico para não crescer indefinidamente.

> **Prática 19.1:** implemente stacks, slots e itens não empilháveis com IDs de instância únicos.

> **Prática 19.2:** projete uma troca que falha inteiramente se qualquer validação falhar.

> **Prática 19.3:** envie snapshot + deltas versionados para uma UI local.

**Critério de domínio:** item tem ID estável, mutações passam por uma única API e transações críticas são atômicas/idempotentes.

---

## 20. Persistência com DataStore e dados de sessão

`DataStoreService` persiste dados entre sessões e é compartilhado pelos places da mesma experiência. Só Scripts no servidor podem acessá-lo. A documentação alerta que habilitar acesso de Studio em uma experiência de produção pode sobrescrever dados reais; use uma versão de teste separada. Veja [Data stores](https://create.roblox.com/docs/cloud-services/data-stores).

### 20.1 Modelo de dados versionado

```lua
local DEFAULT_PROFILE = {
	schemaVersion = 3,
	coins = 0,
	level = 1,
	xp = 0,
	inventory = {},
	settings = {
		musicVolume = 0.7,
	},
}
```

Dados antigos precisam de migrações:

```lua
local function migrate(profile)
	if profile.schemaVersion == nil then
		profile.schemaVersion = 1
	end
	if profile.schemaVersion < 2 then
		profile.inventory = profile.items or {}
		profile.items = nil
		profile.schemaVersion = 2
	end
	if profile.schemaVersion < 3 then
		profile.settings = {musicVolume = 0.7}
		profile.schemaVersion = 3
	end
	return profile
end
```

Migrações devem ser determinísticas e testadas com cópias de dados antigos.

### 20.2 `GetAsync`, `SetAsync` e `UpdateAsync`

| Operação | Uso | Risco |
|---|---|---|
| `GetAsync` | ler valor | pode falhar/throttle |
| `SetAsync` | substituir valor | pode sobrescrever atualização concorrente |
| `UpdateAsync` | transformar valor atual | callback pode repetir e não pode produzir yield |
| `IncrementAsync` | incrementar número | útil para contadores simples |
| OrderedDataStore | ranking ordenado | não é perfil completo |

Prefira `UpdateAsync` quando pode haver concorrência.

### 20.3 Camada mínima didática

O código abaixo demonstra separação e tratamento de falha, mas **não implementa sozinho** todos os requisitos de produção, como session locking robusto, reconciliação entre servidores e filas de escrita.

```lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local store = DataStoreService:GetDataStore("PlayerProfile_v3")
local profiles = {}

local function keyFor(userId)
	return `player:{userId}`
end

local function loadProfile(player)
	local success, data = pcall(function()
		return store:GetAsync(keyFor(player.UserId))
	end)

	if not success then
		return false, data
	end

	local profile = reconcileAndMigrate(data, DEFAULT_PROFILE)
	profiles[player] = profile
	return true, profile
end

local function saveProfile(player)
	local profile = profiles[player]
	if not profile then return true end

	local payload = serializeProfile(profile)
	local success, errorMessage = pcall(function()
		store:UpdateAsync(keyFor(player.UserId), function(_oldValue)
			-- não produza yield aqui
			return payload
		end)
	end)

	return success, errorMessage
end
```

### 20.4 Reconciliação

Quando uma nova chave entra no template, perfis antigos não a possuem. Faça merge de padrões sem compartilhar sub-tabelas e sem apagar dados desconhecidos antes da migração.

### 20.5 Falha ao carregar

Não permita que o jogador jogue com perfil vazio e depois salve por cima do real. Estratégias:

1. tentativas limitadas com backoff;
2. informar que os dados não carregaram;
3. remover o jogador com mensagem clara ou oferecer modo sem salvamento que **nunca grava**;
4. registrar telemetria.

```lua
local function retry(operation, attempts)
	local lastError
	for attempt = 1, attempts do
		local ok, result = pcall(operation)
		if ok then return true, result end
		lastError = result
		if attempt < attempts then
			task.wait(math.min(2 ^ (attempt - 1), 8))
		end
	end
	return false, lastError
end
```

Não faça retries infinitos; respeite budgets e diferencie falha temporária de dado inválido.

### 20.6 Autosave e fechamento

- salve periodicamente, com jogadores distribuídos no tempo;
- salve em `PlayerRemoving`;
- use `game:BindToClose()` para tentativa final;
- impeça duas gravações simultâneas do mesmo perfil;
- grave somente snapshots serializáveis;
- não dependa exclusivamente do fechamento, que tem tempo limitado.

### 20.7 Session locking

Dois servidores podem tentar possuir o mesmo perfil durante teleporte/reconexão. Um lock de sessão registra servidor, timestamp e renovação, e usa `UpdateAsync` para adquirir/liberar com segurança. Implementá-lo corretamente envolve expiração, recuperação de servidor morto e prevenção de gravações antigas. Em produção, use uma biblioteca madura e auditada ou implemente uma camada testada especificamente para isso — não copie um lock de poucas linhas.

### 20.8 Serialização

DataStores aceitam tipos serializáveis, não Instances, CFrames ou funções diretamente. Converta:

```lua
local savedPosition = {x = position.X, y = position.Y, z = position.Z}
local restored = Vector3.new(savedPosition.x, savedPosition.y, savedPosition.z)
```

### 20.9 Checklist de dados

- [ ] chave usa `UserId`, não nome;
- [ ] schema versionado e migrações testadas;
- [ ] falha de load nunca sobrescreve dado real;
- [ ] writes protegidos e limitados;
- [ ] session ownership definido;
- [ ] autosave escalonado;
- [ ] `PlayerRemoving` e `BindToClose`;
- [ ] transações importantes idempotentes;
- [ ] ambiente de teste separado;
- [ ] telemetria de sucesso, latência e erro.

> **Prática 20.1:** crie dados nas versões 1 e 2 e prove que migram para a versão 3.

> **Prática 20.2:** simule falha de load e confirme que nenhum save acontece.

> **Prática 20.3:** injete duas solicitações de save simultâneas e implemente uma fila/mutex por perfil.

**Critério de domínio:** você sabe por que “Get ao entrar, Set ao sair” não é suficiente e consegue descrever recuperação, migração e concorrência.

---

## 21. MemoryStore, MessagingService, teleporte e múltiplos lugares

### 21.1 Escolha do armazenamento

| Necessidade | Serviço |
|---|---|
| progresso durável | DataStore |
| fila rápida temporária | MemoryStoreQueue |
| ranking/cache temporário | MemoryStoreSortedMap |
| chave temporária compartilhada | MemoryStoreHashMap |
| aviso best-effort entre servidores | MessagingService |
| mover jogadores | TeleportService |

MemoryStore possui baixa latência e alto throughput, mas seus dados expiram e não substituem persistência. A documentação descreve hash map, sorted map e queue em [Memory stores](https://create.roblox.com/docs/cloud-services/memory-stores).

### 21.2 Matchmaking simplificado

```text
jogador entra na fila → MemoryStoreQueue
worker retira grupo → reserva servidor
grava ticket temporário → teleporta grupo
servidor destino valida ticket → inicia partida
```

Trate jogador que desiste, item invisível por TTL, teleporte que falha e servidor destino que nunca inicia.

### 21.3 MessagingService

Permite publish/subscribe entre servidores da mesma experiência. Entrega é best-effort, não garantida; nunca faça dele a única prova de uma recompensa.

```lua
local MessagingService = game:GetService("MessagingService")

local success, connectionOrError = pcall(function()
	return MessagingService:SubscribeAsync("GlobalAnnouncement", function(message)
		showValidatedAnnouncement(message.Data)
	end)
end)

if not success then
	warn("Subscription failed", connectionOrError)
end
```

### 21.4 Experience, place e servidor

- experience/universe: produto completo;
- place: mapa/executável dentro da experiência;
- JobId: instância específica de servidor;
- reserved server: servidor acessado por código reservado.

### 21.5 TeleportService

`TeleportAsync()` deve ser chamado no servidor. Teleportes não funcionam como produção dentro do playtest comum do Studio; publique e teste no cliente Roblox.

```lua
local TeleportService = game:GetService("TeleportService")

local options = Instance.new("TeleportOptions")
options.ShouldReserveServer = true
options:SetTeleportData({matchId = matchId})

local ok, errorMessage = pcall(function()
	TeleportService:TeleportAsync(targetPlaceId, partyPlayers, options)
end)

if not ok then
	warn("Teleport failed", errorMessage)
	-- permitir retry/cancelamento e restaurar estado de fila
end
```

Dados de teleporte não são armazenamento seguro de progresso. Use-os como contexto e valide no destino.

### 21.6 Arquitetura de múltiplos places

Divida quando houver benefício real: lobby, partida isolada, mundo com regras diferentes. Custos: teleporte, loading, duplicação de assets/código, observabilidade e testes.

> **Prática 21.1:** desenhe uma fila 2v2 com timeout, cancelamento e recuperação de teleporte.

> **Prática 21.2:** classifique dez dados entre DataStore, MemoryStore e mensagem best-effort.

**Critério de domínio:** você não usa serviço temporário como persistência e todo fluxo de teleporte possui recuperação.

---

## 22. Economia, progressão, missões e recompensas

### 22.1 Fontes e sumidouros

```text
FONTES                              SUMIDOUROS
missões ─┐                      ┌─ upgrades
drops ───┼──> moeda em circulação ┼─ crafting
vendas ──┘                      └─ cosméticos/fees
```

Uma economia sem sumidouros infla. Uma economia com custos agressivos vira grind. Modele em planilha e simule diferentes perfis de jogador.

### 22.2 Curvas de progressão

Exemplos:

```lua
local function xpRequired(level)
	return math.floor(100 * level ^ 1.6)
end

local function upgradePrice(rank)
	return math.floor(50 * 1.35 ^ rank)
end
```

Exponencial cresce rapidamente. Observe valores após 10, 50 e 100 níveis antes de adotá-la. Defina limites e representação numérica.

### 22.3 Transação de compra

```text
receber itemId
 → validar catálogo
 → validar contexto e limite
 → obter preço do servidor
 → validar saldo
 → validar capacidade
 → aplicar débito + item atomicamente
 → marcar perfil alterado
 → emitir resultado e analytics
```

Nunca aceite o preço enviado pelo cliente.

### 22.4 Recompensas

Modele recompensas como dados:

```lua
type Reward =
	{kind: "Currency", currencyId: string, amount: number}
	| {kind: "Item", itemId: string, amount: number}
	| {kind: "XP", amount: number}
```

Um único RewardService valida e aplica recompensas de missões, códigos, eventos e partidas, reduzindo duplicação.

### 22.5 Missões

```lua
local Quest = {
	id = "MineIron_01",
	objective = {event = "OreMined", oreId = "Iron", amount = 10},
	rewards = {{kind = "Currency", currencyId = "Coins", amount = 250}},
}
```

O servidor incrementa progresso ao observar eventos de domínio validados. O cliente apenas apresenta.

### 22.6 Loot e aleatoriedade

```lua
local function weightedChoice(entries, rng: Random)
	local total = 0
	for _, entry in entries do total += entry.weight end
	local roll = rng:NextNumber(0, total)
	local cursor = 0
	for _, entry in entries do
		cursor += entry.weight
		if roll <= cursor then return entry.value end
	end
	return entries[#entries].value
end
```

Se o jogador usa Robux ou algo comprado com Robux para obter item aleatório, consulte `PolicyService` e as obrigações de divulgação/elegibilidade atuais. Não trate loot pago apenas como problema matemático.

### 22.7 Rebirth/prestígio

Declare exatamente:

- o que é resetado;
- o que permanece;
- multiplicador ganho;
- custo;
- proteção contra dupla execução;
- evento de analytics.

### 22.8 Balanceamento

Meça:

| Métrica | Pergunta |
|---|---|
| tempo até primeiro upgrade | onboarding recompensa rápido? |
| tempo entre upgrades | o ritmo desacelera demais? |
| ganho/minuto por faixa | há estratégia dominante? |
| saldo mediano | moeda acumula sem uso? |
| funil de missão | onde jogadores desistem? |

> **Prática 22.1:** simule 60 minutos de progressão com jogador casual, médio e otimizado.

> **Prática 22.2:** implemente RewardService idempotente e aplique a mesma transação duas vezes.

> **Prática 22.3:** desenhe três sumidouros que acrescentam decisão, não apenas removem moeda.

**Critério de domínio:** sua economia tem fontes/sumidouros mensuráveis e toda recompensa importante é aplicada no servidor por um caminho único.

---

## 23. Combate, FPS, hitboxes e previsão do cliente

### 23.1 Pipeline de um disparo

```text
cliente detecta input
 → verifica estado local e mostra recoil/muzzle flash
 → envia origem, direção, arma e sequência
 → servidor valida arma, cadência, munição, estado e geometria
 → servidor calcula/valida hit
 → servidor aplica dano
 → servidor replica resultado
```

O cliente não deve enviar “causei 100 de dano ao jogador X”.

### 23.2 Payload mínimo

```lua
FireWeapon:FireServer({
	weaponId = equippedWeaponId,
	origin = muzzleWorldPosition,
	direction = aimDirection,
	sequence = shotSequence,
	clientTime = workspace:GetServerTimeNow(),
})
```

O servidor valida tipos, números finitos, sequência, direção normalizada, origem plausível perto do personagem/arma, cadência, munição e estado.

### 23.3 Dano no servidor

```lua
local function computeDamage(baseDamage, distance, falloffStart, falloffEnd)
	if distance <= falloffStart then return baseDamage end
	if distance >= falloffEnd then return baseDamage * 0.4 end
	local alpha = (distance - falloffStart) / (falloffEnd - falloffStart)
	return baseDamage * (1 - 0.6 * alpha)
end
```

Config da arma usada para dano deve ser confiável no servidor.

### 23.4 Cadência e sequência

Rate limit genérico não basta. Guarde `lastAcceptedShot`, sequência monotônica, arma equipada e cadência específica. Considere tolerância de relógio/rede, mas não aceite rajadas impossíveis.

### 23.5 Hitboxes melee

Opções:

- box/radius queries durante janela ativa;
- raycasts entre posições anteriores e atuais para evitar “tunneling”;
- hitbox ligada a Attachment;
- deduplicação por alvo por ataque;
- validação de distância e ângulo no servidor.

### 23.6 Lag compensation

Em jogos competitivos, o servidor pode manter histórico curto de posições e reconstruir o mundo no instante aproximado do disparo. Isso é complexo:

- limite a janela histórica;
- use tempo do servidor e estimativa validada;
- não aceite timestamp arbitrariamente antigo;
- considere streaming, teleportes e estados invulneráveis;
- meça injustiça percebida por atirador e alvo.

### 23.7 Estado da arma

```text
Unequipped → Equipping → Ready → Firing → Cooldown
                         ↘ Reloading ↗
```

Máquina de estado impede atirar enquanto recarrega ou equipar duas armas simultaneamente.

### 23.8 Projectiles

Decida entre:

- hitscan: raycast instantâneo;
- projétil físico: visual e colisão contínua;
- projétil matemático: trajetória simulada por código;
- híbrido: servidor calcula e clientes renderizam.

Para projéteis rápidos, colisão discreta por frame pode atravessar objetos; raycast do ponto anterior ao atual reduz o problema.

### 23.9 Combate e feedback

O servidor confirma dano; o cliente pode prever recoil, animação e flash. Hitmarker forte deve preferir confirmação para não mentir. Espectadores e outros clientes recebem somente efeitos necessários.

> **Prática 23.1:** implemente arma hitscan com sequência, cadência, munição e raycast no servidor.

> **Prática 23.2:** envie `NaN`, origem a 1.000 studs e sequência repetida em testes; nenhuma deve causar dano.

> **Prática 23.3:** construa ataque melee que atinge cada Humanoid no máximo uma vez por swing.

**Critério de domínio:** o cliente envia intenção, o servidor reconstrói/valida resultado e o sistema permanece utilizável com latência.

---

## 24. Segurança e mitigação de exploits

### 24.1 Modelo de ameaça

Assuma que um cliente pode:

- executar código local arbitrário;
- inspecionar conteúdo replicado;
- chamar remotes com qualquer payload e frequência;
- alterar propriedades locais;
- manipular física que possui;
- disparar interações replicáveis fora do fluxo normal;
- desconectar em qualquer momento.

O objetivo não é detectar “qual executor” ele usa. É tornar solicitações inválidas incapazes de produzir resultados valiosos.

### 24.2 Camadas de validação

| Camada | Exemplo |
|---|---|
| tipo/forma | string, tabela, tamanho, número finito |
| identidade | item pertence ao catálogo esperado |
| permissão | jogador possui habilidade/item |
| estado | vivo, não atordoado, rodada ativa |
| espaço | distância, linha de visão, região |
| tempo | cooldown, cadência, sequência |
| economia | saldo/capacidade calculados no servidor |
| impacto | limite de alvos/quantidade |

### 24.3 Token bucket para rate limiting

```lua
local buckets = {}

local function allow(userId, action, capacity, refillPerSecond)
	local key = `{userId}:{action}`
	local now = os.clock()
	local bucket = buckets[key]

	if not bucket then
		bucket = {tokens = capacity, updatedAt = now}
		buckets[key] = bucket
	end

	local elapsed = now - bucket.updatedAt
	bucket.tokens = math.min(capacity, bucket.tokens + elapsed * refillPerSecond)
	bucket.updatedAt = now

	if bucket.tokens < 1 then return false end
	bucket.tokens -= 1
	return true
end
```

Limpe buckets ao jogador sair e imponha também limites globais para operações caras.

### 24.4 ProximityPrompt, ClickDetector e Touched

Não presuma que `Enabled`, distância ou hold duration no cliente impedirão abuso. A orientação oficial exige validação server-side também para essas interações. `ProximityPrompt.Triggered` possui uma checagem de distância do servidor, mas regras de estado e rate limit continuam necessárias; outros eventos podem ser ainda menos protegidos.

### 24.5 Ownership e movimento

Em jogos competitivos:

- detecte deslocamentos impossíveis considerando mecânicas legítimas e latência;
- valide interações por histórico/estado do servidor;
- evite punição automática baseada em uma única amostra;
- corrija estado e acumule evidências;
- nunca confie em `WalkSpeed` local como prova.

### 24.6 Honeypots e heurísticas

Um remote nunca usado pelo cliente legítimo pode sinalizar exploração, mas não substitui segurança. Detecção deve gerar evidência, não tornar um endpoint real vulnerável. Evite banir por falso positivo sem investigação.

### 24.7 Logs de segurança

Registre de forma amostrada:

- userId, servidor e ação;
- motivo da rejeição;
- valores resumidos, não dados pessoais desnecessários;
- taxa e reincidência;
- versão do jogo.

Não faça log de payloads enormes nem permita que spam de logs derrube o servidor.

### 24.8 Checklist de fronteira

- [ ] servidor conhece a intenção do endpoint;
- [ ] tipos e números finitos;
- [ ] tabelas/strings possuem limites;
- [ ] IDs pertencem a allowlist/config;
- [ ] contexto, permissão e distância;
- [ ] rate limit por jogador/ação;
- [ ] custo máximo controlado;
- [ ] servidor calcula dinheiro, dano e recompensa;
- [ ] nenhuma referência arbitrária é destruída/modificada;
- [ ] rejeição não quebra handler;
- [ ] telemetria sem amplificação.

> **Prática 24.1:** faça threat modeling de loja, trade, combate e recompensa diária.

> **Prática 24.2:** crie um testador local que envie tipos errados e bursts aos seus remotes em ambiente privado.

**Critério de domínio:** você consegue listar capacidades do atacante e provar por que cada endpoint não concede autoridade ao cliente.

---

## 25. Segurança social, texto, políticas e moderação

Segurança técnica e segurança de comunidade são partes do produto. Consulte [Safety](https://create.roblox.com/docs/safety) e as políticas atuais antes da publicação.

### 25.1 Texto criado por usuários

Todo texto de usuário visível a outros precisa passar por filtragem apropriada no servidor, inclusive nomes de pets, placas, desenhos com legenda e conteúdo persistente. `TextService:FilterStringAsync()` pode falhar e produz yield; não mostre o texto bruto durante a falha.

```lua
local TextService = game:GetService("TextService")

local function filterBroadcast(rawText, fromUserId)
	local ok, filterResult = pcall(function()
		return TextService:FilterStringAsync(rawText, fromUserId)
	end)
	if not ok then return nil end

	local success, filtered = pcall(function()
		return filterResult:GetNonChatStringForBroadcastAsync()
	end)
	return if success then filtered else nil
end
```

Use a variante de saída adequada ao contexto e à audiência, conforme a documentação vigente.

### 25.2 TextChatService

Experiências com chat devem integrar o sistema moderno e respeitar filtragem, bloqueio, mute e denúncia. Não recrie chat ignorando essas proteções.

### 25.3 UGC dentro da experiência

Se jogadores criam desenhos, construções, avatares ou combinações:

- limite forma, tamanho, frequência e alcance;
- prefira opções pré-aprovadas;
- ofereça denúncia e remoção;
- avalie revisão antes de tornar persistente/público;
- mantenha trilha de autoria;
- impeça scripts/código arbitrário.

### 25.4 PolicyService

Políticas podem variar por idade, localização e plataforma. Consulte o serviço antes de mostrar recursos restritos, como itens aleatórios pagos, troca de itens pagos, anúncios ou links permitidos. Não armazene permanentemente a resposta como se nunca mudasse.

### 25.5 Ban e disciplina

Use Ban API/Kick conforme política clara. Uma boa ferramenta de moderação registra motivo, duração, moderador e possibilidade de revisão. Segurança não é insultar ou constranger o usuário.

### 25.6 Maturity & Compliance

Preencha o questionário com precisão e atualize quando o conteúdo mudar. Áudio, sustos, violência, comunicação e conteúdo criado pelo usuário podem alterar a classificação.

### 25.7 Privacidade e minimização

Colete somente dados necessários. Não solicite informação pessoal. UserId é a identidade técnica principal; nome de usuário e DisplayName podem mudar e não devem ser tratados como chave de segurança.

> **Prática 25.1:** liste todos os pontos onde usuários podem produzir conteúdo e escreva a política de tratamento de cada um.

> **Prática 25.2:** simule indisponibilidade do filtro; o texto bruto nunca deve aparecer.

> **Prática 25.3:** construa uma matriz de recursos condicionados por `PolicyService`.

**Critério de domínio:** nenhum conteúdo bruto de usuário chega a outra pessoa e o projeto possui políticas operacionais, não só APIs.

---

# Parte V — Qualidade e produção

## 26. Debug e testes

### 26.1 Debug é redução de incerteza

Processo:

```text
reproduzir → observar → formar hipótese → isolar variável
→ testar hipótese → corrigir causa → criar regressão
```

Não altere cinco coisas ao mesmo tempo. Primeiro obtenha uma reprodução pequena e determinística.

### 26.2 Leia o stack trace

Um erro normalmente informa mensagem, script, linha e cadeia de chamadas. Vá à primeira linha do seu código que viola uma suposição. “Attempt to index nil” não é corrigido adicionando `WaitForChild` em todos os lugares; descubra por que a referência pode ser `nil`.

### 26.3 Logs úteis

```lua
local function logPurchase(player, itemId, result)
	print("[Purchase]", {
		userId = player.UserId,
		itemId = itemId,
		result = result,
	})
end
```

Inclua contexto e categoria. Evite log por frame, dados sensíveis e mensagens sem ação como “não funciona”.

### 26.4 Assertions

Use `assert` para invariantes internas que indicam bug, não para dados hostis que devem ser rejeitados normalmente.

```lua
assert(maxHealth > 0, "maxHealth must be positive")
```

### 26.5 Pirâmide de testes

```text
           poucos testes ponta a ponta
        testes de integração cliente/servidor
     muitos testes rápidos de módulos puros
```

### 26.6 Teste de módulo puro

```lua
local function expectEqual(actual, expected, label)
	assert(actual == expected, `{label}: expected {expected}, got {actual}`)
end

local ok, balance = spend(100, 40)
expectEqual(ok, true, "purchase succeeds")
expectEqual(balance, 60, "remaining balance")

local failed, unchanged = spend(10, 40)
expectEqual(failed, false, "purchase fails")
expectEqual(unchanged, 10, "balance unchanged")
```

Um framework de testes melhora suites grandes, mas os princípios independem da ferramenta: arrange, act, assert; isolamento; nomes descritivos; resultado determinístico.

### 26.7 Matriz de casos

| Classe | Exemplo para compra |
|---|---|
| caminho feliz | saldo maior que preço |
| limite | saldo exatamente igual |
| inválido | item inexistente |
| hostil | tipo errado/NaN/spam |
| concorrente | duas compras simultâneas |
| falha externa | DataStore indisponível |
| ciclo de vida | jogador sai durante operação |

### 26.8 Modos de teste do Studio

A documentação oficial destaca que o modelo cliente-servidor exige diferentes modos de teste:

| Modo | O que revela |
|---|---|
| Test/Test Here | fluxo básico e alternância cliente/servidor |
| Run | física/sistemas sem personagem |
| Server & Clients | replicação e interação multiplayer, até vários clientes |
| Team Test | colaboração em sessão |
| Device Emulator | layout e capacidades de dispositivos |
| cliente Roblox publicado | teleporte, serviços e condições reais |

Consulte [Studio testing modes](https://create.roblox.com/docs/studio/testing-modes).

### 26.9 Test doubles

```lua
local FakeEconomy = {}
function FakeEconomy:trySpend(_player, amount)
	return amount <= 100
end
```

Injetar fakes permite testar ShopService sem DataStore ou jogadores reais.

### 26.10 Regressão

Quando corrigir um bug:

1. escreva teste que falha com o bug;
2. confirme a falha;
3. corrija;
4. confirme que o teste passa;
5. mantenha o teste.

> **Prática 26.1:** crie 12 casos para Inventory.remove, incluindo negativos e item ausente.

> **Prática 26.2:** teste uma compra simultânea e prove que o saldo não fica negativo.

> **Prática 26.3:** execute a mesma feature em solo, dois clientes e emulador mobile; registre divergências.

**Critério de domínio:** todo bug importante gera reprodução e regressão, e módulos críticos podem ser testados sem iniciar o jogo inteiro.

---

## 27. Performance, memória, rede e profiling

O ciclo correto é: projetar com bom senso, medir, localizar gargalo, alterar uma causa e medir novamente. Veja [Performance optimization](https://create.roblox.com/docs/performance-optimization).

### 27.1 Orçamentos

| Recurso | Sintoma quando excedido |
|---|---|
| CPU cliente | FPS baixo e input atrasado |
| CPU servidor | heartbeat baixo e lag para todos |
| GPU | FPS baixo em cenas/efeitos pesados |
| memória cliente | crashes, especialmente mobile |
| memória servidor | crescimento, crash e desconexões |
| rede | atraso, filas e replicação lenta |
| tempo de entrada | abandono antes de jogar |

Roblox normalmente mira 60 FPS no cliente, cerca de 16,67 ms por quadro, mas o orçamento deve servir também aos aparelhos suportados mais fracos.

### 27.2 Meça primeiro

- MicroProfiler: custo temporal por frame;
- Script Profiler/Script Performance: tempo por script/função;
- Developer Console: memória, rede, logs e heap Luau;
- Stats: ping, física, render e memória;
- analytics de performance após publicação.

Marque regiões próprias quando útil:

```lua
debug.profilebegin("NPC.Perception")
updatePerception()
debug.profileend()
```

### 27.3 CPU de scripts

Evite:

- `GetDescendants()` em todo frame;
- procurar a mesma instância repetidamente;
- recalcular path/ranking/layout sem mudança;
- loops O(n²) entre todos os jogadores/NPCs;
- serialização/cópias profundas frequentes;
- callbacks por frame fazendo trabalho não visual.

Prefira cache invalidado por evento, atualização em lotes e frequência proporcional à necessidade.

### 27.4 Vazamentos de memória

Fontes comuns:

- tabela global de sessão nunca limpa;
- conexão guardando objeto morto;
- closures capturando hierarquia grande;
- thread infinita após sistema destruído;
- cache sem limite;
- eventos duplicados a cada respawn.

```lua
Players.PlayerRemoving:Connect(function(player)
	profiles[player] = nil
	rateLimits[player.UserId] = nil
	connectionsByPlayer[player] = nil
end)
```

Limpar uma tabela de conexões não desconecta as conexões automaticamente; chame `Disconnect()`.

### 27.5 Instâncias e render

- reduza partes/decals/efeitos sem valor visual;
- use collision fidelity adequada em meshes;
- desative `CanCollide`, `CanTouch` e `CanQuery` quando desnecessários;
- limite luzes com sombras;
- use streaming em mundos grandes;
- evite transparência sobreposta excessiva;
- forneça LOD e orçamentos para partículas.

### 27.6 Rede

Não envie estado completo todo frame. Envie intenção/delta compacto e deixe efeitos nos clientes. `UnreliableRemoteEvent` serve a dados descartáveis, não a estado crítico. Agrupe atualizações quando isso reduz overhead sem aumentar latência perceptível.

### 27.7 Pooling

Pooling ajuda quando objetos caros são criados/destruídos em alta frequência, mas aumenta complexidade e mantém memória. Meça. Um projétil por segundo não precisa necessariamente de pool; centenas de partículas/impactos talvez precisem.

### 27.8 Streaming e tempo de entrada

Streaming pode reduzir memória e tempo de entrada. `ReplicatedStorage` não é streamado: mover todo o mapa para lá anula a economia. Carregue primeiro o necessário ao loop inicial e adie conteúdo não crítico.

### 27.9 Otimização segura

1. salve uma captura/baseline;
2. identifique CPU, GPU, memória ou rede;
3. localize sistema e função;
4. altere uma causa;
5. repita o cenário;
6. verifique regressão de comportamento;
7. teste aparelho fraco e servidor cheio.

> **Prática 27.1:** crie um vazamento proposital por respawn, capture crescimento e corrija.

> **Prática 27.2:** compare polling de 60 Hz com evento e atualização a 5 Hz.

> **Prática 27.3:** registre baseline de entrada, memória e FPS antes/depois de habilitar streaming.

**Critério de domínio:** você apresenta captura antes/depois e sabe qual orçamento melhorou, em vez de afirmar que o código “parece mais otimizado”.

---

## 28. Colaboração, pacotes, sincronização e versionamento

### 28.1 Trabalho em equipe

Defina:

- dono técnico de cada sistema;
- convenções de nomes e estrutura;
- critério de pronto;
- fluxo de revisão;
- ambientes de desenvolvimento, teste e produção;
- como reverter uma versão.

### 28.2 Team Create e permissões

Conceda apenas permissões necessárias. Experiências de grupo facilitam ownership de assets e trabalho duradouro; decida o proprietário antes de publicar animações, áudio e packages, pois ownership de assets afeta o uso.

### 28.3 Packages

Packages agrupam instâncias reutilizáveis, possuem versionamento e podem atualizar cópias. São úteis para árvores, prédios, UI components e sistemas encapsulados. AutoUpdate economiza trabalho, mas uma atualização ruim pode afetar muitos lugares; teste a versão antes de promover.

Consulte [Packages](https://create.roblox.com/docs/projects/assets/packages).

### 28.4 Código no filesystem

O Script Sync oficial sincroniza arquivos `.luau` com o Studio e reconhece convenções como:

| Nome no disco | Instância/contexto |
|---|---|
| `name.luau` | ModuleScript |
| `name.server.luau` | Script servidor |
| `name.client.luau` | Script cliente |
| `init.luau` | script/módulo como raiz de diretório |

Ferramentas comunitárias também existem; escolha por necessidade e compreenda o mapeamento antes de migrar.

### 28.5 Versionamento

Commits pequenos e descritivos:

```text
feat(inventory): add stack limits
fix(combat): reject non-finite aim vectors
test(economy): cover simultaneous purchases
```

Não misture refatoração enorme, feature e atualização de assets num único pacote de revisão.

### 28.6 Revisão de código

Checklist:

- regra pertence ao lado correto?
- entrada externa validada?
- estado tem um dono?
- tipos públicos são claros?
- ciclo de vida limpa conexões/threads?
- erro externo é tratado?
- testes cobrem limite e abuso?
- mudança aumenta custo de rede/memória?
- migração de dados é compatível?

### 28.7 Ambientes e configuração

Use IDs/configurações separados para desenvolvimento, staging e produção quando possível. Nunca teste writes destrutivos no DataStore de produção. Chaves externas e segredos não devem estar em conteúdo replicado nem em repositórios públicos.

### 28.8 Release seguro

```text
branch/revisão → testes automáticos → teste multiplayer
→ staging privado → checklist de publicação
→ rollout monitorado → rollback se necessário
```

> **Prática 28.1:** transforme um modelo repetido em Package, publique uma atualização e teste sem AutoUpdate primeiro.

> **Prática 28.2:** revise um módulo usando o checklist e produza comentários acionáveis.

> **Prática 28.3:** documente como reverter a última versão sem perder schema novo.

**Critério de domínio:** outra pessoa consegue localizar, testar e revisar seu sistema sem depender de explicação oral.

---

## 29. Publicação, monetização e recibos

### 29.1 Antes de publicar

- nome, ícone, thumbnails e descrição honestos;
- dispositivos suportados testados;
- questionário de maturidade correto;
- permissões e ownership de assets;
- spawn e onboarding funcionais;
- dados em ambiente correto;
- compras em modo de teste;
- privacidade, texto e políticas;
- performance em mobile;
- plano de rollback.

### 29.2 Produtos

| Produto | Natureza | Exemplo |
|---|---|---|
| Pass | benefício durável de acesso | VIP, habilidade permanente |
| Developer Product | compra repetível/consumível | moeda, revive |
| Subscription | benefício recorrente | clube mensal |
| Paid access/private server | acesso | entrada/servidor privado |

Consulte [Monetization](https://create.roblox.com/docs/production/monetization) porque elegibilidade, políticas e produtos evoluem.

### 29.3 Passes

```lua
local MarketplaceService = game:GetService("MarketplaceService")

local function ownsPass(player, passId)
	local ok, result = pcall(function()
		return MarketplaceService:UserOwnsGamePassAsync(player.UserId, passId)
	end)
	return ok, if ok then result else nil
end
```

Falha de API não significa “não possui”. Trate estado desconhecido.

### 29.4 Developer Products e `ProcessReceipt`

O callback pode ser invocado novamente. Entrega deve ser idempotente e retornar `PurchaseGranted` somente quando o produto foi realmente concedido/registrado.

```lua
local productHandlers = {
	[123456789] = function(player, purchaseId)
		return ReceiptService:grantCurrencyOnce(player, purchaseId, 1000)
	end,
}

MarketplaceService.ProcessReceipt = function(receiptInfo)
	local player = Players:GetPlayerByUserId(receiptInfo.PlayerId)
	if not player then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end

	local handler = productHandlers[receiptInfo.ProductId]
	if not handler then
		warn("Unknown product", receiptInfo.ProductId)
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end

	local ok, granted = pcall(handler, player, receiptInfo.PurchaseId)
	if ok and granted then
		return Enum.ProductPurchaseDecision.PurchaseGranted
	end

	return Enum.ProductPurchaseDecision.NotProcessedYet
end
```

`grantCurrencyOnce` precisa registrar `PurchaseId` junto à concessão de forma resistente a repetição. Não mantenha idempotência apenas numa tabela em memória.

### 29.5 UX ética

- preço e benefício claros;
- confirmação deliberada;
- sem urgência falsa;
- sem botões enganosos;
- não interrompa continuamente o loop para vender;
- compras não substituem um jogo divertido;
- recursos aleatórios pagos respeitam política e divulgação;
- menores não devem receber pressão agressiva.

### 29.6 Economia e monetização

Não ajuste preços apenas para maximizar receita imediata. Observe retenção, satisfação, equilíbrio competitivo e confiança. Uma compra que destrói o motivo de jogar pode aumentar curto prazo e prejudicar o produto.

> **Prática 29.1:** desenhe fluxo de compra com sucesso, cancelamento, erro de API e entrega repetida.

> **Prática 29.2:** prove com teste que o mesmo `PurchaseId` concede uma única vez.

> **Prática 29.3:** audite a loja para urgência falsa, preço ambíguo e pressão indevida.

**Critério de domínio:** recibos são idempotentes e a loja apresenta valor/preço sem manipulação enganosa.

---

## 30. Analytics, experimentação e LiveOps

### 30.1 Métricas como perguntas

Não “adicione analytics” sem hipótese.

| Pergunta | Métrica/evento |
|---|---|
| jogadores entendem o tutorial? | funil por etapa e tempo |
| voltam amanhã? | retenção D1 |
| progressão trava? | nível/upgrade por tempo |
| economia infla? | fontes, sumidouros e saldo |
| atualização melhorou? | coortes antes/depois |
| compra agrega valor? | conversão, retenção e satisfação |

A Roblox oferece dashboards de retenção, engajamento, aquisição, monetização, economia, funil e eventos customizados. Veja [Analytics](https://create.roblox.com/docs/production/analytics) e [event types](https://create.roblox.com/docs/production/analytics/event-types).

### 30.2 Taxonomia de eventos

Nomeie de forma estável:

```text
onboarding_step_completed
item_purchased
quest_completed
match_started
match_finished
player_died
```

Campos devem ter significado documentado. Não mude silenciosamente `amount` de preço para quantidade entre versões.

### 30.3 Funis

```text
entrou no jogo 100%
  → iniciou tutorial 92%
    → aprendeu movimento 85%
      → concluiu primeira ação 63%
        → recebeu recompensa 61%
```

Investigue a maior queda com observação e testes. O número indica “onde”, não necessariamente “por quê”.

### 30.4 Coortes

Compare grupos pela data da primeira sessão, versão, dispositivo ou aquisição. Média geral pode esconder que novos usuários mobile estão com experiência pior.

### 30.5 Experimentos

Um teste A/B precisa de:

- hipótese e métrica primária antes do início;
- divisão estável e mutuamente exclusiva;
- tamanho/duração suficientes;
- guardrails de segurança e monetização;
- uma diferença controlada;
- decisão documentada.

Não encerre assim que o gráfico “parecer vencedor”.

### 30.6 LiveOps

Eventos sazonais e configurações remotas devem possuir:

- janela com horário do servidor;
- fallback se serviço falhar;
- versionamento e rollback;
- limites de recompensa;
- compatibilidade entre servidores em versões diferentes;
- comunicação clara ao jogador.

### 30.7 Observabilidade técnica

Além do comportamento do jogador, monitore:

- taxa/latência de load e save;
- erros por versão;
- rejeições de remotes;
- teleporte bem-sucedido;
- crashes/memória;
- heartbeat do servidor;
- duração de matchmaking;
- recibos pendentes.

### 30.8 Métricas não substituem design

Otimizar somente tempo de sessão pode incentivar fricção, espera e compulsão. Combine números com playtests, feedback qualitativo e princípios éticos.

> **Prática 30.1:** desenhe um funil de onboarding com no máximo sete eventos.

> **Prática 30.2:** escreva hipótese, métrica primária e guardrails para testar duas interfaces de loja.

> **Prática 30.3:** crie um dashboard técnico fictício com thresholds de alerta.

**Critério de domínio:** cada evento responde a uma pergunta e cada experimento possui hipótese e decisão pré-definidas.

---

# Parte VI — Prática deliberada

## 31. Projetos progressivos completos

Cada projeto possui requisitos funcionais, técnicos, testes e extensões. Faça commits pequenos e mantenha um diário: hipótese, decisão, bug, correção e aprendizado.

### Projeto 0 — Laboratório de Luau

**Objetivo:** dominar lógica sem a complexidade da Engine.

Construa módulos para:

- fila e pilha;
- inventário em tabela;
- cálculo de XP;
- escolha ponderada;
- máquina de estados;
- token bucket;
- migração de schema.

**Testes mínimos:** casos felizes, limites, tipos errados onde aplicável e invariantes.

**Pronto quando:** todos os módulos usam `--!strict`, não acessam `game` e possuem testes reproduzíveis.

---

### Projeto 1 — Obby sistêmico

**Objetivo:** aprender Studio, instâncias, eventos, servidor e ciclo de vida.

**Funcionalidades:**

- checkpoints tagueados;
- respawn no último checkpoint;
- cronômetro de tentativa;
- hazards com cooldown;
- HUD responsivo;
- placar da sessão;
- efeitos locais de checkpoint;
- suporte a teclado, gamepad e touch.

**Arquitetura:**

```text
CheckpointService (servidor)
RunService (servidor)
HUDController (cliente)
EffectsController (cliente)
Shared/CheckpointConfig
```

**Testes:**

- dois jogadores em checkpoints diferentes;
- tocar checkpoint repetidamente;
- morrer durante atualização;
- respawn dez vezes;
- checkpoint fora de ordem;
- mobile vertical;
- streaming ligado.

**Extensões:** medalhas por tempo, ghost local, fases com dificuldade e analytics do funil.

---

### Projeto 2 — Coletor e loja segura

**Objetivo:** aprender economia, inventário, remotes e dados.

**Funcionalidades:**

- coletáveis marcados por tag e configurados por atributos;
- recompensa validada no servidor;
- inventário por IDs;
- loja com preview no cliente e compra no servidor;
- UI com grid e filtros;
- salvamento versionado;
- autosave e tratamento de falha;
- analytics de fonte/sumidouro.

**Contrato de coleta:**

```text
interação → servidor confirma coletável ativo e distância
→ marca como coletado atomicamente → concede reward
→ replica resultado → cliente toca efeito
```

**Testes:**

- dois jogadores coletam no mesmo instante;
- cliente solicita item inexistente;
- preço visual foi alterado localmente;
- load falha;
- save é chamado duas vezes;
- schema antigo;
- inventário cheio.

**Extensões:** crafting, raridades, quests e mercado NPC com preços rotativos controlados pelo servidor.

---

### Projeto 3 — Simulador de mineração bem arquitetado

**Objetivo:** estudar loops de progressão sem criar um sistema frágil.

**Funcionalidades:**

- minérios com vida, resistência e tabela de drop;
- ferramentas com alcance, potência e velocidade;
- mochila com capacidade;
- venda em zona validada;
- upgrades e novas áreas;
- rebirth transacional;
- missões diárias idempotentes;
- UI/áudio/VFX com opções de redução;
- balanceamento documentado em tabela.

**Sistemas:**

```text
MiningService → RewardService → InventoryService
      ↓                               ↓
OreSystem                        DataService
      ↓
MiningController + EffectsController
```

**Restrições:**

- cliente nunca escolhe recompensa;
- ferramenta é confirmada no servidor;
- minério distante não recebe dano;
- remotes têm rate limit por ferramenta;
- rebirth não pode executar duas vezes;
- progressão funciona sem compra em Robux.

**Testes de balanceamento:** tempo até primeira venda, primeiro upgrade, nova área e primeiro rebirth para três perfis.

---

### Projeto 4 — Arena de combate

**Objetivo:** integrar previsão, raycast, estados, segurança e multiplayer.

**Funcionalidades:**

- lobby e round state machine;
- duas armas hitscan e uma melee;
- munição/reload;
- servidor valida tiro e dano;
- spawn protection;
- kill feed via evento confirmado;
- câmera/recoil locais;
- placar e espectador;
- mapa greybox com rotas medidas.

**Testes adversariais:**

- tiro com origem impossível;
- direção `NaN`;
- cadência 10× maior;
- arma não equipada;
- alvo atrás de parede;
- jogador sai no round;
- empate e último jogador desconecta;
- 150 ms de latência simulada.

**Extensões:** projectile weapon, lag compensation com histórico limitado, matchmaking por MemoryStore e servidor reservado.

---

### Projeto 5 — Dungeon cooperativa

**Objetivo:** IA, múltiplos sistemas e conteúdo repetível.

**Funcionalidades:**

- party/lobby;
- dungeon em place reservado;
- geração de salas por seed;
- NPCs com percepção/estados/pathfinding;
- roles complementares;
- loot idempotente no fim;
- retorno seguro ao lobby;
- dificuldade escalada pelo grupo;
- salvamento e recuperação de teleporte.

**Riscos a resolver:**

- teleporte parcial;
- jogador reconecta;
- path bloqueado;
- 50 NPCs atualizando juntos;
- reward duplicado;
- versão do lobby diferente da dungeon.

---

### Projeto 6 — Experiência pronta para operação

Escolha um dos projetos e leve-o a padrão de lançamento:

- onboarding medido;
- localização em pelo menos dois idiomas;
- acessibilidade básica;
- política/moderação;
- monetização ética e recibos idempotentes;
- performance mobile;
- testes de oito clientes quando relevante;
- staging separado;
- dashboards técnicos e de funil;
- plano de atualização e rollback;
- documentação da arquitetura.

### Rubrica de avaliação final

Pontue 0–4:

| Critério | 0 | 4 |
|---|---|---|
| Correção | quebra no fluxo básico | lida com limites e falhas |
| Segurança | cliente decide resultados | servidor valida todas as fronteiras |
| Arquitetura | estado duplicado/monólito | responsabilidades e ciclo de vida claros |
| Testes | somente Play Solo | unitário, multiplayer, adversarial e dispositivo |
| Performance | sem medição | baseline, profiler e melhora comprovada |
| UX/acessibilidade | um dispositivo, feedback ambíguo | adaptável e múltiplos canais |
| Dados | Get/Set ingênuo | migração, concorrência, falha e idempotência |
| Produção | sem rollback/telemetria | release observável e reversível |

Um projeto com média 3 demonstra autonomia real. Uma nota 4 exige evidência, não apenas presença de código.

---

## 32. Trilha de estudo de 24 semanas

Adapte horas, não pule a prática. Cada semana pressupõe 5–10 horas.

| Semana | Conteúdo | Entrega verificável |
|---:|---|---|
| 1 | Studio, Explorer, Properties, playtest | mapa pequeno organizado |
| 2 | Instances, atributos, tags, ciclo de vida | laboratório de objetos |
| 3 | valores, condições, loops, funções | 15 exercícios de Luau |
| 4 | tabelas e algoritmos | inventário puro testado |
| 5 | `--!strict`, tipos e módulos | biblioteca tipada |
| 6 | composição, estados e dependências | FSM de porta/NPC |
| 7 | cliente-servidor e replicação | laboratório de duas visões |
| 8 | remotes, contratos e rate limit | loja mínima segura |
| 9 | scheduler, deltaTime e eventos | sistema temporal estável |
| 10 | Vector3, CFrame, raycast | cone de visão e hitbox |
| 11 | física, constraints e ownership | mecanismo físico validado |
| 12 | streaming e mundo 3D | greybox grande streamável |
| 13 | character, humanoid, animação | controller resistente a respawn |
| 14 | input, câmera e multiplataforma | ação em PC/touch/gamepad |
| 15 | UI/UX, responsividade | inventário adaptativo |
| 16 | áudio, VFX, acessibilidade/localização | feedback em camadas |
| 17 | NPC e pathfinding | inimigo com FSM |
| 18 | arquitetura de serviços | refatoração documentada |
| 19 | DataStore, schema e migração | perfil v3 com testes |
| 20 | MemoryStore, Messaging, Teleport | desenho/teste de matchmaking |
| 21 | economia e sistemas | simulação de progressão |
| 22 | combate e segurança | arena adversarialmente testada |
| 23 | profiling, testes e colaboração | relatório antes/depois |
| 24 | publicação, analytics e operação | release candidate privado |

### Rotina semanal

```text
20% teoria e documentação
20% reprodução consciente de exemplos
45% projeto sem tutorial
15% testes, revisão e diário técnico
```

### Perguntas de revisão ao fim de cada semana

1. O que consigo construir sem consultar vídeo?
2. Que bug me obrigou a mudar meu modelo mental?
3. Que membro da API aprendi a pesquisar?
4. Que código apaguei ou simplifiquei?
5. Qual evidência prova que a entrega funciona?

---

## 33. Referência rápida, checklists e glossário

### 33.1 Onde colocar cada coisa

| Necessidade | Local comum |
|---|---|
| regra autoritativa | ServerScriptService |
| template secreto/modelo ainda não spawnado | ServerStorage |
| config não sensível e tipos compartilhados | ReplicatedStorage |
| remotes | ReplicatedStorage |
| UI inicial | StarterGui |
| Tool inicial | StarterPack |
| controller persistente do jogador | StarterPlayerScripts |
| comportamento recriado com Character | StarterCharacterScripts |
| mundo físico ativo | Workspace |

### 33.2 Serviços essenciais

| Serviço | Responsabilidade principal |
|---|---|
| Players | sessões e personagens |
| RunService | fases/frame e contexto de execução |
| ReplicatedStorage | objetos compartilhados |
| DataStoreService | persistência durável |
| MemoryStoreService | dados temporários entre servidores |
| MessagingService | mensagens best-effort entre servidores |
| TeleportService | mover jogadores entre places/servidores |
| CollectionService | tags |
| PhysicsService | grupos de colisão |
| PathfindingService | caminhos de agentes |
| ContextActionService | ações de input |
| UserInputService | input de baixo nível/capacidades |
| TweenService | interpolação de propriedades |
| MarketplaceService | compras e ownership de produtos |
| TextService | medição e filtragem de texto |
| TextChatService | chat moderno |
| LocalizationService | localização |
| AnalyticsService | eventos analíticos |
| PolicyService | elegibilidade baseada em políticas |

### 33.3 Data types frequentes

| Tipo | Modelo mental |
|---|---|
| `Vector2` | par 2D |
| `Vector3` | posição/direção/tamanho 3D |
| `CFrame` | transformação posição + orientação |
| `Color3` | cor linear/RGB |
| `UDim` | escala + offset em um eixo |
| `UDim2` | escala + offset em dois eixos |
| `RaycastParams` | filtro/config de raycast |
| `OverlapParams` | filtro/config de consulta de volume |
| `TweenInfo` | curva/duração de tween |
| `NumberSequence` | valor ao longo do tempo normalizado |
| `ColorSequence` | cor ao longo do tempo normalizado |

### 33.4 Escolha de comunicação

| Cenário | Ferramenta |
|---|---|
| evento dentro do mesmo script/módulo | callback/função |
| scripts no mesmo lado, desacoplados | sinal/bindable |
| cliente → servidor, sem retorno imediato | RemoteEvent |
| servidor → cliente(s) | RemoteEvent |
| estado visual frequente e descartável | UnreliableRemoteEvent |
| consulta remota pontual com retorno | RemoteFunction com cautela |
| servidores diferentes | MessagingService |

### 33.5 Checklist de feature

- [ ] objetivo do jogador definido;
- [ ] estado e fonte de verdade definidos;
- [ ] fluxo normal e falhas desenhados;
- [ ] cliente/servidor justificados;
- [ ] contratos de rede documentados;
- [ ] tipos e invariantes;
- [ ] ciclo de vida e limpeza;
- [ ] persistência/migração quando aplicável;
- [ ] testes felizes, limites, hostis e multiplayer;
- [ ] touch/gamepad/tela pequena;
- [ ] acessibilidade/localização;
- [ ] custo medido;
- [ ] analytics responde a pergunta;
- [ ] rollback possível.

### 33.6 Checklist de publicação

- [ ] primeira sessão completa sem intervenção;
- [ ] nenhum erro relevante no Output/console;
- [ ] teste servidor + vários clientes;
- [ ] dados de teste separados de produção;
- [ ] remotes adversarialmente testados;
- [ ] recibos idempotentes;
- [ ] texto de usuário filtrado;
- [ ] PolicyService onde necessário;
- [ ] questionário de maturidade atualizado;
- [ ] assets pertencem ao owner correto;
- [ ] teleporte testado no cliente publicado;
- [ ] performance mobile e memória prolongada;
- [ ] eventos analíticos validados;
- [ ] alertas e rollback definidos.

### 33.7 Glossário

| Termo | Definição |
|---|---|
| API | contrato público de classes, métodos, propriedades e eventos |
| authority | lado que decide o estado verdadeiro |
| callback | função chamada por outro sistema |
| cache | cópia para acesso rápido, com política de invalidação |
| client prediction | feedback local antes da confirmação do servidor |
| coorte | grupo analisado por característica/data comum |
| composição | formar comportamento combinando componentes |
| debounce | impedir repetição enquanto uma ação está ativa |
| delta | somente a mudança desde uma versão anterior |
| dependency injection | fornecer dependências de fora do módulo |
| determinístico | mesmas entradas geram o mesmo resultado |
| entidade | objeto lógico do domínio, como item ou inimigo |
| estado | dados mutáveis que descrevem o momento atual |
| funil | sequência de etapas e conversões |
| idempotência | repetição não duplica efeito |
| invariante | condição que deve permanecer verdadeira |
| latência | atraso entre envio e resposta/efeito |
| LiveOps | operação contínua após o lançamento |
| migration | transformação de schema antigo para novo |
| module cache | resultado reutilizado de `require` no mesmo ambiente |
| network ownership | responsabilidade de simular uma assembly física |
| observabilidade | logs, métricas e traces que explicam o sistema |
| payload | dados enviados numa mensagem |
| pooling | reutilização de objetos em vez de criar/destruir |
| profiling | medição de custo de execução |
| reconciliação | completar/ajustar dado ao formato esperado |
| regressão | bug em comportamento que antes funcionava |
| replicação | sincronização de estado entre servidor e clientes |
| rate limiting | limite de ações por intervalo |
| schema | forma/versionamento dos dados |
| session lock | exclusividade temporária de edição de perfil |
| snapshot | representação completa do estado num instante |
| streaming | carregamento/descarregamento dinâmico de conteúdo 3D |
| threat model | capacidades do atacante e proteções do sistema |
| transação | conjunto de mudanças que deve ocorrer por inteiro ou não ocorrer |
| yield | suspensão cooperativa de uma thread |

---

## 34. Fontes verificadas

### Documentação principal

- [Roblox Creator Hub](https://create.roblox.com/docs/)
- [Roblox Engine API reference](https://create.roblox.com/docs/reference/engine)
- [Scripting](https://create.roblox.com/docs/scripting)
- [Luau language documentation](https://luau.org/)
- [Type checking](https://create.roblox.com/docs/luau/type-checking)
- [Scope](https://create.roblox.com/docs/luau/scope)

### Engine, rede e execução

- [Remote events and callbacks](https://create.roblox.com/docs/scripting/events/remote)
- [Securing the client-server boundary](https://create.roblox.com/docs/scripting/security/client-server-boundary)
- [Network ownership](https://create.roblox.com/docs/physics/network-ownership)
- [Network ownership, movement validation and physics security](https://create.roblox.com/docs/scripting/security/network-ownership)
- [Task scheduler](https://create.roblox.com/docs/performance-optimization/microprofiler/task-scheduler)
- [Parallel Luau](https://create.roblox.com/docs/scripting/multithreading)
- [Instance streaming](https://create.roblox.com/docs/workspace/streaming)

### Mundo, personagens e interação

- [Assets](https://create.roblox.com/docs/assets)
- [Custom 3D assets](https://create.roblox.com/docs/art/modeling)
- [Environmental terrain](https://create.roblox.com/docs/parts/terrain)
- [Characters](https://create.roblox.com/docs/characters)
- [Use animations](https://create.roblox.com/docs/animation/using)
- [Customize the camera](https://create.roblox.com/docs/workspace/camera)
- [Raycasting](https://create.roblox.com/docs/workspace/raycasting)
- [Pathfinding](https://create.roblox.com/docs/characters/pathfinding)
- [ContextActionService reference](https://create.roblox.com/docs/reference/engine/classes/ContextActionService)

### UI, áudio e inclusão

- [User interface](https://create.roblox.com/docs/building-and-visuals/ui)
- [UI styling](https://create.roblox.com/docs/ui/styling)
- [UI and UX design](https://create.roblox.com/docs/production/game-design/ui-ux-design)
- [Adaptive design guidelines](https://create.roblox.com/docs/production/publishing/adaptive-design)
- [Localization](https://create.roblox.com/docs/production/localization)
- [Audio](https://create.roblox.com/docs/audio)
- [Sound](https://create.roblox.com/docs/sound)

### Dados e infraestrutura

- [Data stores](https://create.roblox.com/docs/cloud-services/data-stores)
- [Memory stores](https://create.roblox.com/docs/cloud-services/memory-stores)
- [MessagingService reference](https://create.roblox.com/docs/reference/engine/classes/MessagingService)
- [Teleport between places](https://create.roblox.com/docs/projects/teleport)

### Qualidade, produção e plataforma

- [Studio testing modes](https://create.roblox.com/docs/studio/testing-modes)
- [Developer Console](https://create.roblox.com/docs/studio/developer-console)
- [Performance optimization](https://create.roblox.com/docs/performance-optimization)
- [Improve performance](https://create.roblox.com/docs/performance-optimization/improve)
- [Packages](https://create.roblox.com/docs/projects/assets/packages)
- [Script Sync](https://create.roblox.com/docs/scripting/sync)
- [Safety](https://create.roblox.com/docs/safety)
- [Chat system guidelines](https://create.roblox.com/docs/chat/guidelines)
- [Monetization](https://create.roblox.com/docs/production/monetization)
- [Analytics](https://create.roblox.com/docs/production/analytics)
- [Analytics event types](https://create.roblox.com/docs/production/analytics/event-types)

### Playlists fornecidas

- [Roblox Advanced Scripting Tutorial Guide — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3WKkVHnadvhOOjz04AuMYAf)
- [Roblox Beginners Scripting Tutorial Guide — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3W_CGDzYOp7enyHlOuO3MtC)
- [Roblox GUI Tutorial Guide — BrawlDev](https://youtube.com/playlist?list=PLQ1Qd31Hmi3Xnlu8u9hCYClLurMQYJIrz)
- [Advanced Roblox Scripting Tutorials — TheDevKing](https://youtube.com/playlist?list=PLhieaQmOk7nIoGnFoACf33M3o0BOqB38a)
- [How to Make a Simulator on Roblox — MonzterDEV](https://youtube.com/playlist?list=PLl1Tso3TyF55UEnXsYkmsamFqKUBdgo1S)
- [Roblox Studio: FPS Game Tutorial — Xera](https://youtube.com/playlist?list=PLWNYI4_6C0wthAguFMjzcPnXGvqwcTwbL)

> As playlists são usadas como apoio prático. Afirmações técnicas desta edição foram priorizadas e verificadas contra documentação oficial. Tutoriais antigos podem usar membros obsoletos, padrões inseguros ou interfaces anteriores do Studio.

---

## Encerramento

Tornar-se desenvolvedor completo não significa conhecer todas as classes da API. Significa conseguir transformar um objetivo de design em regras claras, escolher uma arquitetura compatível, construir feedback compreensível, proteger fronteiras de confiança, preservar dados, medir qualidade e operar o resultado depois da publicação.

A ordem saudável é:

```text
faça funcionar em pequena escala
→ prove que está correto
→ torne seguro
→ torne compreensível
→ meça
→ otimize o que realmente custa
→ publique de forma reversível
→ aprenda com jogadores reais
```

Ao concluir os projetos e critérios desta apostila, você não terá apenas seguido uma coleção de tutoriais: terá praticado o processo completo de engenharia e produção de uma experiência Roblox.

