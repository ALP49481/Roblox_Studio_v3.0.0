-- ERROS INTENCIONAIS
fire.OnServerEvent:Connect(function(player, alvo, dano)
 alvo.Humanoid:TakeDamage(dano) -- cliente escolhe alvo e dano
end)
-- Não valida finitude, arma, estado, cadência, distância ou parede.
