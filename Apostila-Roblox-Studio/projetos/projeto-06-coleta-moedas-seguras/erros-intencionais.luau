-- ERROS INTENCIONAIS
game.ReplicatedStorage.Remotes.RequestCollect.OnServerEvent:Connect(function(player, item, valor)
 player:SetAttribute("Coins", player:GetAttribute("Coins") + valor) -- confia no valor do cliente
 item:Destroy() -- não valida tipo, pasta, distância ou repetição
end)
