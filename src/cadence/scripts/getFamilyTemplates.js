export const getFamilyTemplates=`
import FootballClipNFT from 0xc8af9ee840bc6aab
    
pub fun main(familyID: UInt32) : [UInt32]  {
    
    let templates=FootballClipNFT.listFamilyTemplates(familyID:familyID)
    return templates                     
                                                       
}
`