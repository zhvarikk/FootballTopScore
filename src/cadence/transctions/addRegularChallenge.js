export const addRegularChallenge=
    `import FootballClipNFT from 0xc8af9ee840bc6aab

transaction(task:[UInt32], reward:[UInt32],favouriteTeam:String) {

prepare(acct:AuthAccount){
 
  let admin = acct.borrow<&FootballClipNFT.Admin>(from: FootballClipNFT.AdminStoragePath)
                                                             ?? panic ("This collection does not exist here")                                                           

  // access account storage of sender of transaction 

  admin.addChallenge(task:task,reward:reward,favouriteTeam:favouriteTeam)
}

}
    `