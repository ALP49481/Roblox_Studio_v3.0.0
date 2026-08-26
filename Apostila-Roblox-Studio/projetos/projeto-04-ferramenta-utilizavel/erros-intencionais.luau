-- ERROS INTENCIONAIS
local light = workspace.PointLight -- contexto e caminho errados
script.Parent.Activated:Connect(function()
 light.Enabled = "sim" -- boolean esperado
end)
-- Não há limpeza ao desequipar nem alternativa de input acessível.
