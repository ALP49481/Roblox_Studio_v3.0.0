--!strict
export type Item = {price: number}
local catalog: {[string]: Item} = {lanterna_dourada = {price = 25}}
return table.freeze(catalog)
