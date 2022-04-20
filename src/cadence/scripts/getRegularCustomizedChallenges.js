export const getRegularCustomizedChallenges=`
import FootballClipNFT from 0xc8af9ee840bc6aab
import NonFungibleToken from 0x631e88ae7f1d7c20
    
pub fun main(account:Address) : {UInt32: FootballClipNFT.Challenge}  {
let collection = getAccount(account).getCapability(FootballClipNFT.CollectionPublicPath)
     .borrow<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")  
    

     let challenges=collection.getCustomizedRegularChallenges()
    
    return challenges                        
                                                       
}
`