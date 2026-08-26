-- ERROS INTENCIONAIS
remote.OnServerEvent:Connect(function(player, quantidade)
 player:SetAttribute("Bag", player:GetAttribute("Bag") + quantidade)
end)
-- Não há alvo, distância, Tool, capacidade, área, cooldown ou perfil carregado.
