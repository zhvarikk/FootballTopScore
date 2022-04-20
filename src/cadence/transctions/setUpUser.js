export const setUp = `
import FootballClipNFT from 0xc8af9ee840bc6aab
import NonFungibleToken from 0x631e88ae7f1d7c20
import Marketplace from 0xc8af9ee840bc6aab
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction(favouriteTeam:String) {

    
prepare(acct: AuthAccount) { //acct - account that calls the transaction
      acct.save(<-FootballClipNFT.createEmptyCollection(favouriteTeam:favouriteTeam),to: FootballClipNFT.CollectionStoragePath) 
      //creates empty collection in account storage of user that can be found: to:/storage/MySaxionNFTCollection
      acct.link<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>(FootballClipNFT.CollectionPublicPath,target: FootballClipNFT.CollectionStoragePath) 
      // link our newly created collection to the public that is restricted to CollectionPublic interface:
      //only deposit, borrowNFT, getIds are availbale
      acct.link<&FootballClipNFT.Collection>(FootballClipNFT.CollectionPrivatePath,target: FootballClipNFT.CollectionStoragePath) 
 
    let MyNFTCollection = acct.getCapability<&FootballClipNFT.Collection>(FootballClipNFT.CollectionPrivatePath)
    
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    
    let developerAccountAddress:Address=0xc8af9ee840bc6aab
    let FlowTokenVaultOfDeveloper = getAccount(developerAccountAddress).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    
    acct.save(<- Marketplace.createEmptySaleCollection(MyNFTCollection: MyNFTCollection, FlowTokenVault: FlowTokenVault,developerAccountAddress:developerAccountAddress), to: /storage/MySaleCollection)
    acct.link<&Marketplace.SaleCollection{Marketplace.SaleCollectionPublic}>(/public/MySaleCollection, target: /storage/MySaleCollection)
 }  

}
`