--!strict
local tool = script.Parent
local light = tool:WaitForChild("Handle"):WaitForChild("PointLight") :: PointLight
local enabled = false

local function render()
 light.Enabled = enabled
 tool.ToolTip = enabled and "Lanterna ligada" or "Lanterna desligada"
end

tool.Activated:Connect(function()
 enabled = not enabled
 render()
end)

tool.Unequipped:Connect(function()
 enabled = false
 render()
end)

render()
