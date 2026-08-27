--!strict
local HttpService = game:GetService("HttpService")
local remote = game:GetService("ReplicatedStorage").Remotes.RequestPurchase
local prompt = workspace.Laboratorio.Loja:WaitForChild("ProximityPrompt") :: ProximityPrompt

prompt.Triggered:Connect(function()
 remote:FireServer("lanterna_dourada", HttpService:GenerateGUID(false))
end)
