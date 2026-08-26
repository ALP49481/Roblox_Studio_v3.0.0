--!strict
local remote = game:GetService("ReplicatedStorage").Remotes.RequestFire
local tool = script.Parent
tool.Activated:Connect(function()
 local camera = workspace.CurrentCamera
 if camera then remote:FireServer(camera.CFrame.LookVector) end
end)
