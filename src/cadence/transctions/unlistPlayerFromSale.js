export const unlistPlayerFromSale =
    `
import FootballClipNFT from 0xc8af9ee840bc6aab
import NonFungibleToken from 0x631e88ae7f1d7c20
import Marketplace from 0xc8af9ee840bc6aab
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction(id:UInt64) {

    
prepare(acct: AuthAccount) { //acct - account that calls the transaction
    
      let saleCollection = acct.borrow<&Marketplace.SaleCollection>(from: /storage/MySaleCollection)
                                                             ?? panic ("This collection does not exist here")
   
  saleCollection.unlistPlayerFromSale(id: id)
  
 }  
}
        `