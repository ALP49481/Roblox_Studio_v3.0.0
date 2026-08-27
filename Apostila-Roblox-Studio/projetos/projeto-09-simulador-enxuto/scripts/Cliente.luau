--!strict
local Players = game:GetService("Players")
local remote = game:GetService("ReplicatedStorage").Remotes.MineOre
local tool = script.Parent

tool.Activated:Connect(function()
 local root = Players.LocalPlayer.Character and Players.LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
 if not root then return end
 local nearest: BasePart? = nil
 local distance = math.huge
 for _, ore in workspace.Laboratorio.Ores:GetChildren() do
  if ore:IsA("BasePart") then
   local current = (root.Position - ore.Position).Magnitude
   if current < distance then nearest, distance = ore, current end
  end
 end
 if nearest then remote:FireServer(nearest) end
end)
