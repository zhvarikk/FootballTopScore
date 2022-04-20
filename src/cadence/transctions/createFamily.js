export const makeFamily=`
import FootballClipNFT from 0xc8af9ee840bc6aab

transaction(name:String, price: UFix64) {

prepare(acct:AuthAccount){
 
  let admin = acct.borrow<&FootballClipNFT.Admin>(from: FootballClipNFT.AdminStoragePath)
                                                             ?? panic ("This collection does not exist here")                                                           

  // access account storage of sender of transaction 

  admin.createFamily(name:name,price:price);
  
}

}`