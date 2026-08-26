"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projectsRoot = path.join(root, "projetos");

const projects = [
  {
    number: 1, slug: "primeira-sala", title: "Primeira sala", start: "1.3", finish: "1.4",
    summary: "Greybox navegável, organizado e iluminado, ainda sem programação.",
    behavior: "Entrar → contornar obstáculo → alcançar chegada",
    tests: ["Percorrer a sala sem atravessar paredes.", "Confirmar que todas as peças estruturais estão ancoradas.", "Comparar duas atmosferas sem alterar a rota."],
    server: "-- Projeto de construção: nenhum Script é necessário.\n-- Use este arquivo para registrar decisões de medidas, nomes e iluminação.\n",
    error: "-- ERROS INTENCIONAIS PARA DIAGNÓSTICO\n-- 1. Uma parede está sem Anchored e cai no teste.\n-- 2. A chegada ficou dentro do BlocoCentral.\n-- 3. Um Model importado não foi inspecionado.\n-- Corrija no Studio e registre a evidência; este arquivo não deve ser executado.\n"
  },
  {
    number: 2, slug: "primeira-sala-interativa", title: "Primeira sala interativa", start: "2.1", finish: "3.1",
    summary: "Uma porta reage a evento com estado e debounce observáveis.", behavior: "Tocar painel → porta abre → espera → porta fecha",
    tests: ["Tocar o painel uma vez e observar um único ciclo.", "Tocar repetidamente e confirmar que os ciclos não se sobrepõem.", "Verificar mensagens no Output sem erros."],
    server: `--!strict
local door = workspace.Laboratorio.Porta
local panel = workspace.Laboratorio.Painel
local busy = false

local function setDoorOpen(open: boolean)
 door.CanCollide = not open
 door.Transparency = open and 0.65 or 0
end

panel.Touched:Connect(function(hit: BasePart)
 if busy or not hit.Parent:FindFirstChildOfClass("Humanoid") then return end
 busy = true
 setDoorOpen(true)
 task.wait(2)
 setDoorOpen(false)
 busy = false
end)
`,
    error: `-- ERROS INTENCIONAIS
local porta = workspace.Porta -- caminho errado: Porta está em Laboratorio
porta.Transparency = "invisivel" -- tipo errado
while true do porta.Transparency = 1 end -- loop sem espera bloqueia a execução
`
  },
  {
    number: 3, slug: "obstaculo-com-eventos", title: "Obstáculo com eventos", start: "3.1", finish: "4.1",
    summary: "Obstáculo temporário com dano e estado independente por jogador.", behavior: "Personagem toca perigo → recebe dano uma vez → cooldown individual",
    tests: ["Dois jogadores recebem cooldown independente.", "Uma peça sem Humanoid não causa erro.", "Contato contínuo não aplica dano a cada frame."],
    server: `--!strict
local Players = game:GetService("Players")
local hazard = workspace.Laboratorio.Perigo
local DAMAGE = 20
local COOLDOWN = 1.5
local lastHit: {[Player]: number} = {}

hazard.Touched:Connect(function(part: BasePart)
 local character = part.Parent
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 local player = character and Players:GetPlayerFromCharacter(character)
 if not humanoid or not player then return end
 local now = os.clock()
 if now - (lastHit[player] or 0) < COOLDOWN then return end
 lastHit[player] = now
 humanoid:TakeDamage(DAMAGE)
end)

Players.PlayerRemoving:Connect(function(player) lastHit[player] = nil end)
`,
    error: `-- ERROS INTENCIONAIS
local bloqueado = false -- um debounce global mistura todos os jogadores
workspace.Laboratorio.Perigo.Touched:Connect(function(part)
 part.Parent.Humanoid.Health -= 500 -- assume Humanoid e não limita dano
 bloqueado = true -- nunca volta a false
end)
`
  },
  {
    number: 4, slug: "ferramenta-utilizavel", title: "Ferramenta utilizável", start: "4.3", finish: "4.6",
    summary: "Lanterna utilizável em teclado, gamepad e touch com estado local acessível.", behavior: "Equipar → acionar → luz alterna → respawn restaura estado",
    tests: ["Equipar, ativar, desequipar e equipar novamente.", "Testar teclado, gamepad e botão touch.", "Confirmar foco visual e texto de estado."],
    client: `--!strict
local tool = script.Parent
local light = tool:WaitForChild("Handle"):WaitForChild("PointLight") :: PointLight
local enabled = false

local function render()
 light.Enabled = enabled
 tool.ToolTip = enabled and "Lanterna ligada" or "Lanterna desligada"
end

tool.Activated:Connect(function()
 enabled = not enabled
 render()
end)

tool.Unequipped:Connect(function()
 enabled = false
 render()
end)

render()
`,
    error: `-- ERROS INTENCIONAIS
local light = workspace.PointLight -- contexto e caminho errados
script.Parent.Activated:Connect(function()
 light.Enabled = "sim" -- boolean esperado
end)
-- Não há limpeza ao desequipar nem alternativa de input acessível.
`
  },
  {
    number: 5, slug: "percurso-checkpoint-interface", title: "Percurso com checkpoint e interface", start: "4.1", finish: "4.6",
    summary: "Checkpoint de sessão restaurado no respawn e mostrado em HUD responsivo.", behavior: "Tocar checkpoint → atributo atualiza → respawn retorna → HUD confirma",
    tests: ["Ativar checkpoint e reiniciar o personagem.", "Testar dois jogadores com checkpoints diferentes.", "Validar HUD em 375, 768 e desktop, além de gamepad."],
    server: `--!strict
local Players = game:GetService("Players")
local checkpoints = workspace.Laboratorio.Checkpoints

local function moveToCheckpoint(player: Player, character: Model)
 local id = player:GetAttribute("CheckpointId")
 local checkpoint = typeof(id) == "string" and checkpoints:FindFirstChild(id) or nil
 if checkpoint and checkpoint:IsA("BasePart") then character:PivotTo(checkpoint.CFrame + Vector3.new(0, 4, 0)) end
end

for _, checkpoint in checkpoints:GetChildren() do
 if checkpoint:IsA("BasePart") then
  checkpoint.Touched:Connect(function(part)
   local player = Players:GetPlayerFromCharacter(part.Parent)
   if player then player:SetAttribute("CheckpointId", checkpoint.Name) end
  end)
 end
end

Players.PlayerAdded:Connect(function(player)
 player:SetAttribute("CheckpointId", "Checkpoint1")
 player.CharacterAdded:Connect(function(character) moveToCheckpoint(player, character) end)
end)
`,
    client: `--!strict
local player = game:GetService("Players").LocalPlayer
local label = script.Parent:WaitForChild("CheckpointAtual") :: TextLabel
local function render() label.Text = "Checkpoint: " .. tostring(player:GetAttribute("CheckpointId") or "—") end
player:GetAttributeChangedSignal("CheckpointId"):Connect(render)
render()
`,
    error: `-- ERROS INTENCIONAIS
local checkpointAtual = "Checkpoint1" -- global para todos os jogadores
game.Players.PlayerAdded:Connect(function(player)
 player.Character:MoveTo(workspace.Checkpoints[checkpointAtual].Position) -- Character pode ainda não existir
end)
`
  },
  {
    number: 6, slug: "coleta-moedas-seguras", title: "Coleta e moedas seguras", start: "3.2", finish: "5.4",
    summary: "Coleta com autoridade do servidor, distância, frequência e recompensa definida no catálogo.", behavior: "Pedir coleta → servidor valida → moeda sobe uma vez → item reaparece",
    tests: ["Repetir a solicitação rapidamente sem duplicar moedas.", "Tentar coletar de longe e com item inexistente.", "Enviar tipo errado e confirmar recusa sem erro no servidor."],
    server: `--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remote = ReplicatedStorage.Remotes.RequestCollect
local lastRequest: {[Player]: number} = {}

remote.OnServerEvent:Connect(function(player: Player, collectible: unknown)
 if typeof(collectible) ~= "Instance" or not collectible:IsA("BasePart") then return end
 if not collectible:IsDescendantOf(workspace.Laboratorio.Coletaveis) or collectible:GetAttribute("Available") == false then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 if not root or (root.Position - collectible.Position).Magnitude > 12 then return end
 local now = os.clock()
 if now - (lastRequest[player] or 0) < 0.25 then return end
 lastRequest[player] = now
 collectible:SetAttribute("Available", false)
 player:SetAttribute("Coins", (player:GetAttribute("Coins") or 0) + 1)
 collectible.Transparency = 1
 task.delay(3, function()
  if collectible.Parent then collectible.Transparency = 0; collectible:SetAttribute("Available", true) end
 end)
end)

Players.PlayerRemoving:Connect(function(player) lastRequest[player] = nil end)
`,
    error: `-- ERROS INTENCIONAIS
game.ReplicatedStorage.Remotes.RequestCollect.OnServerEvent:Connect(function(player, item, valor)
 player:SetAttribute("Coins", player:GetAttribute("Coins") + valor) -- confia no valor do cliente
 item:Destroy() -- não valida tipo, pasta, distância ou repetição
end)
`
  },
  {
    number: 7, slug: "loja-segura", title: "Loja segura", start: "5.5", finish: "6.3",
    summary: "Catálogo no servidor, transação idempotente e responsabilidades modulares.", behavior: "Pedir item → validar catálogo/saldo/requestId → cobrar e conceder uma vez",
    tests: ["Comprar com saldo exato, insuficiente e item inexistente.", "Repetir o mesmo requestId e clicar rapidamente.", "Alterar o preço na interface sem afetar o servidor."],
    server: `--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remote = ReplicatedStorage.Remotes.RequestPurchase
local catalog = {lanterna_dourada = {price = 25}}
local processed: {[Player]: {[string]: boolean}} = {}

Players.PlayerAdded:Connect(function(player: Player)
 if player:GetAttribute("Coins") == nil then player:SetAttribute("Coins", 50) end
end)

remote.OnServerEvent:Connect(function(player: Player, itemId: unknown, requestId: unknown)
 if typeof(itemId) ~= "string" or typeof(requestId) ~= "string" or #requestId > 64 then return end
 local item = catalog[itemId]
 if not item then return end
 processed[player] = processed[player] or {}
 if processed[player][requestId] then return end
 local coins = player:GetAttribute("Coins")
 if typeof(coins) ~= "number" or coins < item.price then return end
 processed[player][requestId] = true
 player:SetAttribute("Coins", coins - item.price)
 player:SetAttribute("OwnsGoldenLantern", true)
end)

Players.PlayerRemoving:Connect(function(player: Player)
 processed[player] = nil
end)
`,
    module: `--!strict
export type Item = {price: number}
local catalog: {[string]: Item} = {lanterna_dourada = {price = 25}}
return table.freeze(catalog)
`,
    error: `-- ERROS INTENCIONAIS
remote.OnServerEvent:Connect(function(player, itemId, precoDaTela)
 player:SetAttribute("Coins", player:GetAttribute("Coins") - precoDaTela)
 player:SetAttribute("Owns" .. itemId, true)
end)
-- Preço, item e repetição são controlados pelo cliente.
`
  },
  {
    number: 8, slug: "salvamento-progresso", title: "Salvamento de progresso", start: "7.1", finish: "7.3",
    summary: "Perfil versionado com migração, load seguro e UpdateAsync protegido por pcall.", behavior: "Carregar → migrar → jogar → salvar somente perfil válido → fechar",
    tests: ["Migrar um perfil v1 para o schema atual.", "Simular falha de load e provar que nenhum save acontece.", "Testar duas sessões concorrentes e encerramento."],
    server: `--!strict
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local store = DataStoreService:GetDataStore("Progress_v1")
local profiles: {[Player]: {version: number, coins: number, checkpointId: string}} = {}

local function load(player: Player)
 local ok, data = pcall(function() return store:GetAsync(\`player_{player.UserId}\`) end)
 if not ok then player:Kick("Não foi possível carregar seus dados com segurança."); return end
 local profile = typeof(data) == "table" and data or {version = 1, coins = 0, checkpointId = "Checkpoint1"}
 profile.version = 2
 profile.checkpointId = profile.checkpointId or "Checkpoint1"
 profiles[player] = profile
end

local function save(player: Player)
 local profile = profiles[player]
 if not profile then return end
 local ok, message = pcall(function()
  store:UpdateAsync(\`player_{player.UserId}\`, function() return profile end)
 end)
 if not ok then warn("Save falhou", message) end
end

Players.PlayerAdded:Connect(load)
Players.PlayerRemoving:Connect(function(player) save(player); profiles[player] = nil end)
game:BindToClose(function() for _, player in Players:GetPlayers() do task.spawn(save, player) end; task.wait(3) end)
`,
    module: `--!strict
local Schema = {}
Schema.CURRENT_VERSION = 2
function Schema.default() return {version = 2, coins = 0, checkpointId = "Checkpoint1"} end
return table.freeze(Schema)
`,
    error: `-- ERROS INTENCIONAIS
local data = store:GetAsync(key) or {coins = 0} -- sem pcall: falha vira interrupção
store:SetAsync(key, data) -- pode sobrescrever concorrência
-- Mesmo quando load falha, o fluxo cria padrão salvável e destrói dados antigos.
`
  },
  {
    number: 9, slug: "simulador-enxuto", title: "Simulador enxuto", start: "7.4", finish: "7.5",
    summary: "Vertical slice autoritativa de mineração, venda, upgrade, área e missão.", behavior: "Minerar → mochila → vender → melhorar → liberar área → repetir",
    tests: ["Validar Tool, alvo, área, distância, cooldown e capacidade.", "Repetir missão e provar concessão única.", "Simular falha de dados e bloquear consequências persistentes."],
    server: `--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remote = ReplicatedStorage.Remotes.MineOre
local lastMine: {[Player]: number} = {}

remote.OnServerEvent:Connect(function(player: Player, ore: unknown)
 if typeof(ore) ~= "Instance" or not ore:IsA("BasePart") or not ore:IsDescendantOf(workspace.Laboratorio.Ores) then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 local tool = player.Character and player.Character:FindFirstChild("Picareta")
 if not root or not tool or (root.Position - ore.Position).Magnitude > 14 then return end
 local now = os.clock(); if now - (lastMine[player] or 0) < 0.5 then return end; lastMine[player] = now
 local bag, capacity = player:GetAttribute("Bag") or 0, player:GetAttribute("Capacity") or 10
 if bag >= capacity then return end
 player:SetAttribute("Bag", math.min(bag + 1, capacity))
end)
`,
    module: `--!strict
return table.freeze({stone = {yield = 1, area = 1}, crystal = {yield = 2, area = 2}})
`,
    error: `-- ERROS INTENCIONAIS
remote.OnServerEvent:Connect(function(player, quantidade)
 player:SetAttribute("Bag", player:GetAttribute("Bag") + quantidade)
end)
-- Não há alvo, distância, Tool, capacidade, área, cooldown ou perfil carregado.
`
  },
  {
    number: 10, slug: "estudo-combate", title: "Estudo de combate", start: "8.3", finish: "8.5",
    summary: "Arena com feedback local e dano confirmado no servidor por raycast e estado.", behavior: "Input → efeito local → pedido mínimo → servidor valida → dano",
    tests: ["Rejeitar origem impossível, NaN, spam e alvo atrás de parede.", "Testar estado morto, sem arma e fora da cadência.", "Simular latência sem conceder dano duas vezes."],
    server: `--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local fire = ReplicatedStorage.Remotes.RequestFire
local lastShot: {[Player]: number} = {}

fire.OnServerEvent:Connect(function(player: Player, direction: unknown)
 if typeof(direction) ~= "Vector3" or not direction:FuzzyEq(direction) or direction.Magnitude < 0.99 then return end
 local character = player.Character; local root = character and character:FindFirstChild("HumanoidRootPart")
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not root or not humanoid or humanoid.Health <= 0 or not character:FindFirstChild("Blaster") then return end
 local now = os.clock(); if now - (lastShot[player] or 0) < 0.25 then return end; lastShot[player] = now
 local result = workspace:Raycast(root.Position, direction.Unit * 200)
 local targetHumanoid = result and result.Instance.Parent:FindFirstChildOfClass("Humanoid")
 if targetHumanoid and Players:GetPlayerFromCharacter(targetHumanoid.Parent) ~= player then targetHumanoid:TakeDamage(15) end
end)
`,
    client: `--!strict
local remote = game:GetService("ReplicatedStorage").Remotes.RequestFire
local tool = script.Parent
tool.Activated:Connect(function()
 local camera = workspace.CurrentCamera
 if camera then remote:FireServer(camera.CFrame.LookVector) end
end)
`,
    error: `-- ERROS INTENCIONAIS
fire.OnServerEvent:Connect(function(player, alvo, dano)
 alvo.Humanoid:TakeDamage(dano) -- cliente escolhe alvo e dano
end)
-- Não valida finitude, arma, estado, cadência, distância ou parede.
`
  },
  {
    number: 11, slug: "projeto-final", title: "Expedição de cristais", start: "11.1", finish: "11.4",
    summary: "Projeto final com rodada curta, coleta segura, progressão, acessibilidade e operação.", behavior: "Entrar → preparar → coletar/combater → extrair → recompensar → retornar",
    tests: ["Completar o ciclo principal com dois clientes.", "Executar matriz hostil, falha de dados e reconexão.", "Testar teclado, touch, gamepad, movimento reduzido e rollback."],
    server: `--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local request = ReplicatedStorage.Remotes.RequestCollectCrystal
local claimed: {[Instance]: boolean} = {}

request.OnServerEvent:Connect(function(player: Player, crystal: unknown)
 if typeof(crystal) ~= "Instance" or not crystal:IsA("BasePart") or not crystal:IsDescendantOf(workspace.Laboratorio.Crystals) then return end
 if claimed[crystal] then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 if not root or (root.Position - crystal.Position).Magnitude > 12 then return end
 claimed[crystal] = true
 player:SetAttribute("RoundCrystals", (player:GetAttribute("RoundCrystals") or 0) + 1)
 crystal.Transparency = 1; crystal.CanTouch = false
end)
`,
    module: `--!strict
return table.freeze({roundSeconds = 180, extractionRequirement = 5, collectionDistance = 12})
`,
    error: `-- ERROS INTENCIONAIS
request.OnServerEvent:Connect(function(player, quantidade, recompensa)
 player:SetAttribute("RoundCrystals", quantidade)
 player:SetAttribute("Coins", player:GetAttribute("Coins") + recompensa)
end)
-- Cliente controla progresso e recompensa; não existe idempotência nem contexto de rodada.
`
  }
];

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function cdata(value) {
  return String(value).replace(/]]>/g, "]]]]><![CDATA[>");
}

function properties(name, extra = "") {
  return `<Properties><string name="Name">${escapeXml(name)}</string>${extra}</Properties>`;
}

function folder(name, children = "") {
  return `<Item class="Folder">${properties(name)}${children}</Item>`;
}

function instance(className, name, children = "", extra = "") {
  return `<Item class="${className}">${properties(name, extra)}${children}</Item>`;
}

function part(name, x, y, z, sx, sy, sz) {
  return `<Item class="Part">${properties(name, `<bool name="Anchored">true</bool><CoordinateFrame name="CFrame"><X>${x}</X><Y>${y}</Y><Z>${z}</Z><R00>1</R00><R01>0</R01><R02>0</R02><R10>0</R10><R11>1</R11><R12>0</R12><R20>0</R20><R21>0</R21><R22>1</R22></CoordinateFrame><Vector3 name="size"><X>${sx}</X><Y>${sy}</Y><Z>${sz}</Z></Vector3>`)}</Item>`;
}

function scriptItem(className, name, source) {
  return `<Item class="${className}">${properties(name, `<ProtectedString name="Source"><![CDATA[${cdata(source)}]]></ProtectedString>`)}</Item>`;
}

function placeXml(project, solved) {
  const room = [
    part("Base", 0, 0, 0, 60, 1, 60),
    part("Entrada", 0, 3, 24, 10, 1, 6),
    part("Objetivo", 0, 2, -20, 8, 2, 8),
    part(project.number >= 2 ? "Painel" : "BlocoCentral", -8, 3, 0, 6, 6, 6),
    project.number >= 2 ? part("Porta", 0, 5, -10, 8, 10, 1) : "",
    project.number >= 3 ? part("Perigo", 8, 1, 2, 10, 1, 10) : "",
    project.number === 5 ? folder("Checkpoints", part("Checkpoint1", 0, 1, 18, 8, 1, 8) + part("Checkpoint2", 0, 1, -14, 8, 1, 8)) : "",
    project.number === 6 ? folder("Coletaveis", part("Item1", -10, 2, -4, 2, 2, 2) + part("Item2", 10, 2, -4, 2, 2, 2)) : "",
    project.number === 9 ? folder("Ores", part("Item1", -10, 2, -4, 2, 2, 2) + part("Item2", 10, 2, -4, 2, 2, 2)) : "",
    project.number === 11 ? folder("Crystals", part("Crystal1", -12, 2, -12, 2, 3, 2) + part("Crystal2", 12, 2, -12, 2, 3, 2)) : ""
  ].join("");
  const serverScripts = solved && project.server ? scriptItem("Script", `Projeto${project.number}Server`, project.server) : "";
  const clientScripts = solved && project.client ? scriptItem("LocalScript", `Projeto${project.number}Client`, project.client) : "";
  const moduleScripts = solved && project.module ? scriptItem("ModuleScript", `Projeto${project.number}Config`, project.module) : "";
  const remotes = project.number >= 6 ? folder("Remotes", `<Item class="RemoteEvent">${properties(project.number === 6 ? "RequestCollect" : project.number === 7 ? "RequestPurchase" : project.number === 9 ? "MineOre" : project.number === 10 ? "RequestFire" : "RequestCollectCrystal")}</Item>`) : "";
  const starterPlayerScripts = instance("StarterPlayerScripts", "StarterPlayerScripts");
  let starterGuiContent = "";
  let starterPackContent = "";

  if (solved && project.number === 4) {
    const light = instance("PointLight", "PointLight", "", '<bool name="Enabled">false</bool>');
    const handle = instance("Part", "Handle", light, '<bool name="Anchored">false</bool><Vector3 name="size"><X>1</X><Y>1</Y><Z>2</Z></Vector3>');
    starterPackContent = instance("Tool", "Lanterna", handle + clientScripts, '<string name="ToolTip">Lanterna desligada</string><bool name="RequiresHandle">true</bool>');
  } else if (solved && project.number === 5) {
    const label = instance("TextLabel", "CheckpointAtual", "", '<string name="Text">Checkpoint: —</string>');
    starterGuiContent = instance("ScreenGui", "CheckpointGui", label + clientScripts, '<bool name="ResetOnSpawn">false</bool>');
  } else if (solved && project.number === 9) {
    starterPackContent = instance("Tool", "Picareta", "", '<bool name="RequiresHandle">false</bool>');
  } else if (solved && project.number === 10) {
    starterPackContent = instance("Tool", "Blaster", clientScripts, '<bool name="RequiresHandle">false</bool>');
  }
  return `<?xml version="1.0" encoding="utf-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="4">
  <External>null</External><External>nil</External>
  <Item class="Workspace">${properties("Workspace")}${folder("Laboratorio", room)}</Item>
  <Item class="ReplicatedStorage">${properties("ReplicatedStorage")}${remotes}</Item>
  <Item class="ServerScriptService">${properties("ServerScriptService")}${serverScripts}${moduleScripts}</Item>
  <Item class="StarterPlayer">${properties("StarterPlayer")}${starterPlayerScripts}</Item>
  <Item class="StarterGui">${properties("StarterGui")}${starterGuiContent}</Item>
  <Item class="StarterPack">${properties("StarterPack")}${starterPackContent}</Item>
  <Item class="Lighting">${properties("Lighting")}</Item>
</roblox>`;
}

function checklist(project) {
  return `# Checklist de testes — Projeto ${project.number}: ${project.title}

Capítulos: começa em ${project.start} e é concluído em ${project.finish}.

## Preparação

- [ ] Abri uma cópia do arquivo, não o único original.
- [ ] Mantive Output, Explorer e Properties visíveis.
- [ ] Testei no modo indicado pela apostila.

## Evidências específicas

${project.tests.map((test) => `- [ ] ${test}`).join("\n")}

## Encerramento

- [ ] Output sem erro relevante conhecido.
- [ ] Resultado reproduzido depois de Stop e novo teste.
- [ ] Alteração pessoal feita sem copiar a solução literalmente.
- [ ] Diferenças entre minha solução e resolvido.rbxlx registradas.
`;
}

function previewSvg(project) {
  const steps = project.behavior.split("→").map((step) => step.trim());
  const width = 1000;
  const cardWidth = Math.floor((width - 100 - (steps.length - 1) * 34) / steps.length);
  const cards = steps.map((step, index) => {
    const x = 50 + index * (cardWidth + 34);
    const arrow = index < steps.length - 1 ? `<text x="${x + cardWidth + 17}" y="235" text-anchor="middle" font-size="30" fill="#8eaeff">→</text>` : "";
    return `<rect x="${x}" y="165" width="${cardWidth}" height="120" rx="18" fill="#172945" stroke="#8eaeff"/><text x="${x + cardWidth / 2}" y="225" text-anchor="middle" font-size="20" fill="#edf2ff">${escapeXml(step)}</text>${arrow}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" viewBox="0 0 1000 420" role="img" aria-labelledby="title desc"><title id="title">Projeto ${project.number}: ${escapeXml(project.title)}</title><desc id="desc">${escapeXml(project.behavior)}</desc><rect width="1000" height="420" fill="#0d1320"/><text x="50" y="70" font-family="system-ui" font-size="18" font-weight="700" fill="#72d8bf">PROJETO ${project.number}</text><text x="50" y="116" font-family="system-ui" font-size="36" font-weight="800" fill="#edf2ff">${escapeXml(project.title)}</text><g font-family="system-ui">${cards}</g><text x="50" y="355" font-family="system-ui" font-size="18" fill="#b8c2d6">Comportamento esperado · confirme no Roblox Studio usando o checklist</text></svg>`;
}

function projectReadme(project) {
  return `# Projeto ${project.number} — ${project.title}

${project.summary}

- Início pedagógico: capítulo ${project.start}
- Conclusão pedagógica: capítulo ${project.finish}
- Comportamento: ${project.behavior}

## Arquivos

- inicio.rbxlx: cenário-base sem a solução.
- resolvido.rbxlx: referência mínima funcional; compare depois de tentar.
- scripts/: fontes separadas para leitura e reconstrução.
- erros-intencionais.luau: laboratório de diagnóstico; não coloque em produção.
- CHECKLIST-TESTES.md: evidências para concluir.
- preview.svg: diagrama do comportamento esperado.

A referência resolvida é uma solução possível, não a única. Reproduza no Studio e adapte usando somente conceitos já estudados.
`;
}

function projectsIndex() {
  const cards = projects.map((project) => `<article class="module-card available"><span class="module-number">Projeto ${project.number}</span><h2>${escapeXml(project.title)}</h2><p>${escapeXml(project.summary)}</p><p><strong>${project.start} → ${project.finish}</strong></p><img class="project-preview" src="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/preview.svg" alt="Fluxo esperado do projeto ${project.number}"><div class="button-row"><a class="button primary" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/inicio.rbxlx" download>Baixar início</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/resolvido.rbxlx" download>Baixar resolvido</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/CHECKLIST-TESTES.md">Checklist</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/erros-intencionais.luau">Erros</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/scripts/Servidor.luau">Servidor</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/scripts/Cliente.luau">Cliente</a><a class="button" href="projeto-${String(project.number).padStart(2, "0")}-${project.slug}/scripts/Modulo.luau">Módulo</a></div></article>`).join("\n");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Kits dos projetos progressivos da Apostila Roblox Studio."><title>Kits práticos — Apostila Roblox Studio</title><link rel="stylesheet" href="../assets/styles.css?v=20260826-study"><script src="../assets/app.js?v=20260826-study" defer></script></head><body><a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="header-inner"><a class="brand" href="../index.html"><span class="brand-mark" aria-hidden="true">R+</span><span>Apostila Roblox Studio</span></a><div class="header-actions"><a class="button" href="../index.html#modulos">Módulos</a><a class="button" href="../avaliacoes.html">Avaliações</a><button class="icon-button" type="button" data-theme-toggle aria-pressed="false">☾ Modo escuro</button></div></div></header><main id="conteudo"><section class="page-section assessment-hero"><div class="section-heading"><span class="eyebrow">Do arquivo vazio à evidência</span><h1>Kits práticos dos 11 projetos</h1><p class="lead">Tente primeiro no arquivo de início. Abra a solução somente depois de registrar sua hipótese e use os erros intencionais como laboratório de diagnóstico.</p></div><aside class="callout warning"><strong>Arquivos .rbxlx são modelos de laboratório</strong><p>Abra no Roblox Studio, salve uma cópia e reconstrua as interfaces/objetos indicados pelo capítulo. A solução é mínima e não substitui as instruções da apostila.</p></aside></section><section class="page-section"><div class="project-grid">${cards}</div></section></main><footer class="site-footer"><p>Kits autorais da Apostila Roblox Studio.</p></footer></body></html>`;
}

fs.mkdirSync(projectsRoot, { recursive: true });
for (const project of projects) {
  const directory = path.join(projectsRoot, `projeto-${String(project.number).padStart(2, "0")}-${project.slug}`);
  const scriptsDirectory = path.join(directory, "scripts");
  fs.mkdirSync(scriptsDirectory, { recursive: true });
  fs.writeFileSync(path.join(directory, "inicio.rbxlx"), placeXml(project, false), "utf8");
  fs.writeFileSync(path.join(directory, "resolvido.rbxlx"), placeXml(project, true), "utf8");
  fs.writeFileSync(path.join(directory, "README.md"), projectReadme(project), "utf8");
  fs.writeFileSync(path.join(directory, "CHECKLIST-TESTES.md"), checklist(project), "utf8");
  fs.writeFileSync(path.join(directory, "erros-intencionais.luau"), project.error, "utf8");
  fs.writeFileSync(path.join(directory, "preview.svg"), previewSvg(project), "utf8");
  fs.writeFileSync(path.join(scriptsDirectory, "Servidor.luau"), project.server || "-- Este projeto não precisa de Script no servidor.\n", "utf8");
  fs.writeFileSync(path.join(scriptsDirectory, "Cliente.luau"), project.client || "-- Este projeto não precisa de LocalScript no cliente.\n", "utf8");
  fs.writeFileSync(path.join(scriptsDirectory, "Modulo.luau"), project.module || "-- Este projeto não precisa de ModuleScript separado.\n", "utf8");
}
fs.writeFileSync(path.join(projectsRoot, "index.html"), projectsIndex(), "utf8");
fs.writeFileSync(path.join(projectsRoot, "manifest.json"), JSON.stringify({ generatedAt: "2026-08-26", projects: projects.map(({ number, slug, title, start, finish, summary, behavior }) => ({ number, slug, title, start, finish, summary, behavior })) }, null, 2) + "\n", "utf8");
console.log(`${projects.length} kits práticos gerados.`);
