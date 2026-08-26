--!strict
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local store = DataStoreService:GetDataStore("Progress_v1")
local profiles: {[Player]: {version: number, coins: number, checkpointId: string}} = {}

local function load(player: Player)
 local ok, data = pcall(function() return store:GetAsync(`player_{player.UserId}`) end)
 if not ok then player:Kick("Não foi possível carregar seus dados com segurança."); return end
 local profile = typeof(data) == "table" and data or {version = 1, coins = 0, checkpointId = "Checkpoint1"}
 profile.version = 2
 profile.checkpointId = profile.checkpointId or "Checkpoint1"
 profiles[player] = profile
end

local function save(player: Player)
 local profile = profiles[player]
 if not profile then return end
 local ok, message = pcall(function()
  store:UpdateAsync(`player_{player.UserId}`, function() return profile end)
 end)
 if not ok then warn("Save falhou", message) end
end

Players.PlayerAdded:Connect(load)
Players.PlayerRemoving:Connect(function(player) save(player); profiles[player] = nil end)
game:BindToClose(function() for _, player in Players:GetPlayers() do task.spawn(save, player) end; task.wait(3) end)
