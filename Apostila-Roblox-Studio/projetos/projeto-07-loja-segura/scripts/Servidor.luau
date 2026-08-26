--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remote = ReplicatedStorage.Remotes.RequestPurchase
local catalog = {lanterna_dourada = {price = 25}}
local processed: {[Player]: {[string]: boolean}} = {}

Players.PlayerAdded:Connect(function(player: Player)
 if player:GetAttribute("Coins") == nil then player:SetAttribute("Coins", 50) end
end)

remote.OnServerEvent:Connect(function(player: Player, itemId: unknown, requestId: unknown)
 if typeof(itemId) ~= "string" or typeof(requestId) ~= "string" or #requestId > 64 then return end
 local item = catalog[itemId]
 if not item then return end
 processed[player] = processed[player] or {}
 if processed[player][requestId] then return end
 local coins = player:GetAttribute("Coins")
 if typeof(coins) ~= "number" or coins < item.price then return end
 processed[player][requestId] = true
 player:SetAttribute("Coins", coins - item.price)
 player:SetAttribute("OwnsGoldenLantern", true)
end)

Players.PlayerRemoving:Connect(function(player: Player)
 processed[player] = nil
end)
