export const getUserPlayers =
    `
    import FootballClipNFT from 0xc8af9ee840bc6aab
    import NonFungibleToken from 0x631e88ae7f1d7c20
    
 pub fun main(account:Address) : [&FootballClipNFT.Player] {

    
    let collection = getAccount(account).getCapability(FootballClipNFT.CollectionPublicPath)
     .borrow<&FootballClipNFT.Collection{FootballClipNFT.CollectionPublic}>()
                                                             ?? panic ("This collection does not exist here")

    let res: [&FootballClipNFT.Player] = []
    var ids = collection.getIDsOfPlayers()

    for id in ids{
      res.append(collection.borrowEntirePlayer(id: id))
    }

    return res                            
                                                       
} `
