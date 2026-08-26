--!strict
local door = workspace.Laboratorio.Porta
local panel = workspace.Laboratorio.Painel
local busy = false

local function setDoorOpen(open: boolean)
 door.CanCollide = not open
 door.Transparency = open and 0.65 or 0
end

panel.Touched:Connect(function(hit: BasePart)
 if busy or not hit.Parent:FindFirstChildOfClass("Humanoid") then return end
 busy = true
 setDoorOpen(true)
 task.wait(2)
 setDoorOpen(false)
 busy = false
end)
