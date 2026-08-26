--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local request = ReplicatedStorage.Remotes.RequestCollectCrystal
local claimed: {[Instance]: boolean} = {}

request.OnServerEvent:Connect(function(player: Player, crystal: unknown)
 if typeof(crystal) ~= "Instance" or not crystal:IsA("BasePart") or not crystal:IsDescendantOf(workspace.Laboratorio.Crystals) then return end
 if claimed[crystal] then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 if not root or (root.Position - crystal.Position).Magnitude > 12 then return end
 claimed[crystal] = true
 player:SetAttribute("RoundCrystals", (player:GetAttribute("RoundCrystals") or 0) + 1)
 crystal.Transparency = 1; crystal.CanTouch = false
end)
