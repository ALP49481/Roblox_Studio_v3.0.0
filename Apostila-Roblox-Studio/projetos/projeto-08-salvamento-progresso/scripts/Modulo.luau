--!strict
local Schema = {}
Schema.CURRENT_VERSION = 2
function Schema.default() return {version = 2, coins = 0, checkpointId = "Checkpoint1"} end
return table.freeze(Schema)
