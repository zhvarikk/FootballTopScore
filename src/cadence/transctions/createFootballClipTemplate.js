export const createFootballClipTemplate = `
import FootballClipNFT from 0xc8af9ee840bc6aab

transaction(rarity:String, name:String, ipfs:String) {

prepare(acct:AuthAccount){
 
  let admin = acct.borrow<&FootballClipNFT.Admin>(from: FootballClipNFT.AdminStoragePath)
                                                             ?? panic ("This collection does not exist here")                                                           

  // access account storage of sender of transaction 

  admin.createFootballClipTemplate(rarity: rarity, name: name, ipfs:ipfs)
 
}
  
}
    `