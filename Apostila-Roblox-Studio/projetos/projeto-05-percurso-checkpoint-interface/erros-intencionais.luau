-- ERROS INTENCIONAIS
local checkpointAtual = "Checkpoint1" -- global para todos os jogadores
game.Players.PlayerAdded:Connect(function(player)
 player.Character:MoveTo(workspace.Checkpoints[checkpointAtual].Position) -- Character pode ainda não existir
end)
