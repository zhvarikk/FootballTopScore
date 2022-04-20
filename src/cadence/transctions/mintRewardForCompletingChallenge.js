export const mintReward=`
import FootballClipNFT from 0xc8af9ee840bc6aab
transaction(challengeID:UInt32) {

prepare(acct:AuthAccount){
  let collection = acct.borrow<&FootballClipNFT.Collection>(from: FootballClipNFT.CollectionStoragePath)
                                                             ?? panic ("This collection does not exist here")

   FootballClipNFT.mintReward(userCollection:collection,challengeID:challengeID)
}
  
}
`