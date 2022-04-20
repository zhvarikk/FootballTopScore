export const getUserFootballClips =
    `
    import FootballClipNFT from 0xc8af9ee840bc6aab
    import NonFungibleToken from 0x631e88ae7f1d7c20
    
  pub fun main(account:Address) : [&FootballClipNFT.FootballClip] {

    
    let collection = getAccount(account).getCapability(FootballClipNFT.CollectionPublicPath)
     .borrow<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")

    let res: [&FootballClipNFT.FootballClip] = []
    var ids = collection.getIDsOfFootballClips()

    for id in ids{
      res.append(collection.borrowEntireFootballClip(id: id))
    }

    return res                            
                                                       
}                          
                                                       
    `