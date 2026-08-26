--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remote = ReplicatedStorage.Remotes.RequestCollect
local lastRequest: {[Player]: number} = {}

remote.OnServerEvent:Connect(function(player: Player, collectible: unknown)
 if typeof(collectible) ~= "Instance" or not collectible:IsA("BasePart") then return end
 if not collectible:IsDescendantOf(workspace.Laboratorio.Coletaveis) or collectible:GetAttribute("Available") == false then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 if not root or (root.Position - collectible.Position).Magnitude > 12 then return end
 local now = os.clock()
 if now - (lastRequest[player] or 0) < 0.25 then return end
 lastRequest[player] = now
 collectible:SetAttribute("Available", false)
 player:SetAttribute("Coins", (player:GetAttribute("Coins") or 0) + 1)
 collectible.Transparency = 1
 task.delay(3, function()
  if collectible.Parent then collectible.Transparency = 0; collectible:SetAttribute("Available", true) end
 end)
end)

Players.PlayerRemoving:Connect(function(player) lastRequest[player] = nil end)
