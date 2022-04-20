export const getSellingPlayers =`
import Marketplace from 0xc8af9ee840bc6aab

pub fun main() : {UInt64: Marketplace.PlayerForSale} {

    return Marketplace.getSalePlayers()

}`