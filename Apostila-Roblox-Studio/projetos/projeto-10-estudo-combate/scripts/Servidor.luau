--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local fire = ReplicatedStorage.Remotes.RequestFire
local lastShot: {[Player]: number} = {}

fire.OnServerEvent:Connect(function(player: Player, direction: unknown)
 if typeof(direction) ~= "Vector3" or not direction:FuzzyEq(direction) or direction.Magnitude < 0.99 then return end
 local character = player.Character; local root = character and character:FindFirstChild("HumanoidRootPart")
 local humanoid = character and character:FindFirstChildOfClass("Humanoid")
 if not root or not humanoid or humanoid.Health <= 0 or not character:FindFirstChild("Blaster") then return end
 local now = os.clock(); if now - (lastShot[player] or 0) < 0.25 then return end; lastShot[player] = now
 local result = workspace:Raycast(root.Position, direction.Unit * 200)
 local targetHumanoid = result and result.Instance.Parent:FindFirstChildOfClass("Humanoid")
 if targetHumanoid and Players:GetPlayerFromCharacter(targetHumanoid.Parent) ~= player then targetHumanoid:TakeDamage(15) end
end)
