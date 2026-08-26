--!strict
local Players = game:GetService("Players")
local hazard = workspace.Laboratorio.Perigo
local DAMAGE = 20
local COOLDOWN = 1.5
local lastHit: {[Player]: number} = {}

hazard.Touched:Connect(function(part: BasePart)
 local character = part.Parent
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 local player = character and Players:GetPlayerFromCharacter(character)
 if not humanoid or not player then return end
 local now = os.clock()
 if now - (lastHit[player] or 0) < COOLDOWN then return end
 lastHit[player] = now
 humanoid:TakeDamage(DAMAGE)
end)

Players.PlayerRemoving:Connect(function(player) lastHit[player] = nil end)
