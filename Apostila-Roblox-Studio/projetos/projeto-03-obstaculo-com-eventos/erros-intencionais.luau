-- ERROS INTENCIONAIS
local bloqueado = false -- um debounce global mistura todos os jogadores
workspace.Laboratorio.Perigo.Touched:Connect(function(part)
 part.Parent.Humanoid.Health -= 500 -- assume Humanoid e não limita dano
 bloqueado = true -- nunca volta a false
end)
