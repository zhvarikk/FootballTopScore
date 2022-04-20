export const getCompletedChallengesOfUser=
    `import FootballClipNFT from 0xc8af9ee840bc6aab

    
pub fun main(account:Address) : [UInt32] {
      
    let collection = getAccount(account).getCapability(FootballClipNFT.CollectionPublicPath)
     .borrow<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")
    return collection.listCompletedChallenges()                        
                                                       
}`