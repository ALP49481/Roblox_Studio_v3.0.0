-- ERROS INTENCIONAIS
local porta = workspace.Porta -- caminho errado: Porta está em Laboratorio
porta.Transparency = "invisivel" -- tipo errado
while true do porta.Transparency = 1 end -- loop sem espera bloqueia a execução
