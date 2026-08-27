--!strict
local remote = game:GetService("ReplicatedStorage").Remotes.RequestCollect
local collectibles = workspace.Laboratorio.Coletaveis

local function connectCollectible(collectible: Instance)
 if not collectible:IsA("BasePart") then return end
 local prompt = collectible:FindFirstChildOfClass("ProximityPrompt")
 if not prompt then return end
 prompt.Triggered:Connect(function()
  remote:FireServer(collectible)
 end)
end

for _, collectible in collectibles:GetChildren() do connectCollectible(collectible) end
collectibles.ChildAdded:Connect(connectCollectible)
