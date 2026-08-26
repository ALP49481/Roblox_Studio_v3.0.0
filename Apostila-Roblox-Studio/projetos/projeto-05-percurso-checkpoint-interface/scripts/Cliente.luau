--!strict
local player = game:GetService("Players").LocalPlayer
local label = script.Parent:WaitForChild("CheckpointAtual") :: TextLabel
local function render() label.Text = "Checkpoint: " .. tostring(player:GetAttribute("CheckpointId") or "—") end
player:GetAttributeChangedSignal("CheckpointId"):Connect(render)
render()
