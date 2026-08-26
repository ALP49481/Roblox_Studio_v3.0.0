-- ERROS INTENCIONAIS
local data = store:GetAsync(key) or {coins = 0} -- sem pcall: falha vira interrupção
store:SetAsync(key, data) -- pode sobrescrever concorrência
-- Mesmo quando load falha, o fluxo cria padrão salvável e destrói dados antigos.
