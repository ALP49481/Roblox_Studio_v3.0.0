--!strict
local Players = game:GetService("Players")
local checkpoints = workspace.Laboratorio.Checkpoints

local function moveToCheckpoint(player: Player, character: Model)
 local id = player:GetAttribute("CheckpointId")
 local checkpoint = typeof(id) == "string" and checkpoints:FindFirstChild(id) or nil
 if checkpoint and checkpoint:IsA("BasePart") then character:PivotTo(checkpoint.CFrame + Vector3.new(0, 4, 0)) end
end

for _, checkpoint in checkpoints:GetChildren() do
 if checkpoint:IsA("BasePart") then
  checkpoint.Touched:Connect(function(part)
   local player = Players:GetPlayerFromCharacter(part.Parent)
   if player then player:SetAttribute("CheckpointId", checkpoint.Name) end
  end)
 end
end

Players.PlayerAdded:Connect(function(player)
 player:SetAttribute("CheckpointId", "Checkpoint1")
 player.CharacterAdded:Connect(function(character) moveToCheckpoint(player, character) end)
end)
