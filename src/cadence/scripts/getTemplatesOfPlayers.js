export const getTemplatesOfPlayers=`
import FootballClipNFT from 0xc8af9ee840bc6aab
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main() : {UInt32: FootballClipNFT.Template}  {

    
    let templates=FootballClipNFT.listPlayerTemplates()

    return templates                       
                                                       
}
`