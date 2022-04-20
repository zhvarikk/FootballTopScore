export const mintNFT = `
import FootballClipNFT from 0xc8af9ee840bc6aab
import FlowToken from 0x7e60df042a9c0868

transaction(templateID:UInt32) {

prepare(acct:AuthAccount){
  let collection = acct.borrow<&FootballClipNFT.Collection>(from: FootballClipNFT.CollectionStoragePath)
                                                             ?? panic ("This collection does not exist here")

  let payment <- acct.borrow<&FlowToken.Vault>(from:/storage/flowTokenVault)!.withdraw(amount: 0.0) as! @FlowToken.Vault 
  
   let nft <- FootballClipNFT.mintFootballClip(templateID:templateID, paymentVault:<-payment)

   collection.deposit(token:<-nft)
}
   

\texecute {
\t  \tlog("A user stored collection inside his account")
\t}
}
`