export const batchMintFootballClipsFromFamily =`
import FootballClipNFT from 0xc8af9ee840bc6aab
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction(familyID: UInt32, templateIDs: [UInt32] ) {
 
  prepare(acct: AuthAccount) {
    let receiverReference: &FootballClipNFT.Collection{FootballClipNFT.Receiver} = acct.borrow<&FootballClipNFT.Collection>(from: FootballClipNFT.CollectionStoragePath) 
        ?? panic("Cannot borrow")
        let family=FootballClipNFT.getFamily(familyID:familyID)
        let price=family.price;
     let payment <- acct.borrow<&FlowToken.Vault>(from:/storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault   
      let collection <- FootballClipNFT.batchMintFootballClipsFromFamily(familyID: familyID, templateIDs: templateIDs, paymentVault: <-payment)
    receiverReference.batchDeposit(collection: <-collection)
  }

}
`