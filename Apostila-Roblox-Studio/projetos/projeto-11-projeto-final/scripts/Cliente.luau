--!strict
local remote = game:GetService("ReplicatedStorage").Remotes.RequestCollectCrystal
local crystals = workspace.Laboratorio.Crystals

local function connectCrystal(crystal: Instance)
 if not crystal:IsA("BasePart") then return end
 local prompt = crystal:FindFirstChildOfClass("ProximityPrompt")
 if not prompt then return end
 prompt.Triggered:Connect(function()
  remote:FireServer(crystal)
 end)
end

for _, crystal in crystals:GetChildren() do connectCrystal(crystal) end
crystals.ChildAdded:Connect(connectCrystal)
