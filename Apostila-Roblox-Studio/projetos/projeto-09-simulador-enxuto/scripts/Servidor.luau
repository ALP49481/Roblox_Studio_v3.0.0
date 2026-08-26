--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remote = ReplicatedStorage.Remotes.MineOre
local lastMine: {[Player]: number} = {}

remote.OnServerEvent:Connect(function(player: Player, ore: unknown)
 if typeof(ore) ~= "Instance" or not ore:IsA("BasePart") or not ore:IsDescendantOf(workspace.Laboratorio.Ores) then return end
 local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
 local tool = player.Character and player.Character:FindFirstChild("Picareta")
 if not root or not tool or (root.Position - ore.Position).Magnitude > 14 then return end
 local now = os.clock(); if now - (lastMine[player] or 0) < 0.5 then return end; lastMine[player] = now
 local bag, capacity = player:GetAttribute("Bag") or 0, player:GetAttribute("Capacity") or 10
 if bag >= capacity then return end
 player:SetAttribute("Bag", math.min(bag + 1, capacity))
end)
