export const getUserPlayersForSale =
    `
    import FootballClipNFT from 0xc8af9ee840bc6aab
import NonFungibleToken from 0x631e88ae7f1d7c20
import Marketplace from 0xc8af9ee840bc6aab
    
pub fun main(account:Address) : {UInt64: Marketplace.SalePlayer} {

    
    let collection = getAccount(account).getCapability(FootballClipNFT.CollectionPublicPath)
     .borrow<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")

    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
     .borrow<&Marketplace.SaleCollection{Marketplace.SaleCollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")

                
let saleIDs = saleCollection.getIdsOfPlayers()
   let returnVals: {UInt64: Marketplace.SalePlayer} = {}
  for saleID in saleIDs {
    let price = saleCollection.getPriceOfPlayer(id: saleID)
    let nftRef = collection.borrowEntirePlayer(id: saleID)
    returnVals.insert(key: nftRef.id, Marketplace.SalePlayer(_price: price, _nftRef: nftRef))
  }
  return returnVals
                                                       
}
    `