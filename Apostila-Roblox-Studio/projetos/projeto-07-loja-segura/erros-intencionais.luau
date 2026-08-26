-- ERROS INTENCIONAIS
remote.OnServerEvent:Connect(function(player, itemId, precoDaTela)
 player:SetAttribute("Coins", player:GetAttribute("Coins") - precoDaTela)
 player:SetAttribute("Owns" .. itemId, true)
end)
-- Preço, item e repetição são controlados pelo cliente.
