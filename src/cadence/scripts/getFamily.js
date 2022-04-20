export const getFamily=`
import FootballClipNFT from 0xc8af9ee840bc6aab
    
pub fun main(familyID: UInt32) : FootballClipNFT.FamilyReport  {
    
    let family=FootballClipNFT.getFamily(familyID:familyID)
    return family                     
                                                       
}
`