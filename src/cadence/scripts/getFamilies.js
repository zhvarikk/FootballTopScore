export const getFamilies=`
import FootballClipNFT from 0xc8af9ee840bc6aab
    
pub fun main() : [FootballClipNFT.FamilyReport]  {
            
    let families = FootballClipNFT.listFamilies()
    return families                                                              
}
`