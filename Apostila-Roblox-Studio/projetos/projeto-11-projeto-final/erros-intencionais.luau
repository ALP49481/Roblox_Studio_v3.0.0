-- ERROS INTENCIONAIS
request.OnServerEvent:Connect(function(player, quantidade, recompensa)
 player:SetAttribute("RoundCrystals", quantidade)
 player:SetAttribute("Coins", player:GetAttribute("Coins") + recompensa)
end)
-- Cliente controla progresso e recompensa; não existe idempotência nem contexto de rodada.
