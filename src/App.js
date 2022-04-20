import './App.css';
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types";
import React, {useState, useEffect, useMemo} from 'react'
import {setUp} from "./cadence/transctions/setUpUser";
import {listFootballClipForSale} from "./cadence/transctions/listFootballClipForSale";
import {unlistFootballClipFromSale} from "./cadence/transctions/unlistFootballClipFromSale";
import {create} from 'ipfs-http-client'
import {getUserFootballClips} from "./cadence/scripts/getUserFootballClips";
import {getUserFootballClipsForSale} from "./cadence/scripts/getUserFootballClipsForSale";
import {purchaseFootballClip} from "./cadence/transctions/purchaseFootballClip";
import {createFootballClipTemplate} from "./cadence/transctions/createFootballClipTemplate";
import {getTemplatesOfFootballClips} from "./cadence/scripts/getTemplatesOfFootballClips";
import {deleteFootballClipTemplate} from "./cadence/transctions/deleteFootballClipTemplate";
import {makeFamily} from "./cadence/transctions/createFamily";
import {getFamilies} from "./cadence/scripts/getFamilies";
import {addTemplateToFamily} from "./cadence/transctions/addTemplateToFamily";
import {batchMintFootballClipsFromFamily} from "./cadence/transctions/batchMintFootballClipsFromFamily";
import TxDetails from "./components/TxDetails";
import {decode, getTransactionStatus, send, tx} from "@onflow/fcl";
import Spinner from "./components/Spinner";
import {addRegularChallenge} from "./cadence/transctions/addRegularChallenge";
import {removeChallenge} from "./cadence/transctions/removeChallenge";
import {getRegularCustomizedChallenges} from "./cadence/scripts/getRegularCustomizedChallenges";
import {mintReward} from "./cadence/transctions/mintRewardForCompletingChallenge";
import {getCompletedChallengesOfUser} from "./cadence/scripts/getCompletedChallangesOfUser";
import TextField from "@material-ui/core/TextField";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from "./components/Header";
import ChallengeScene from "./components/scenes/ChallengeScene";
import MyCollectionsScene from "./components/scenes/MyCollectionsScene";
import PackScene from "./components/scenes/PackScene";
import AdminScene from "./components/scenes/AdminScene";
import {Navigate} from "react-router";
import MarketplaceScene from "./components/scenes/MarketplaceScene";
import {getSellingNFTs} from "./cadence/scripts/getAllSellingFootballClips";
import {getSellingPlayers} from "./cadence/scripts/getAllSellingPlayers";
import "./styles/CollectionShow.css"
import ModalForSetUp from "./components/ModalForSetUp";
import {createPlayerTemplate} from "./cadence/transctions/createPlayerTemplate";
import {getTemplatesOfPlayers} from "./cadence/scripts/getTemplatesOfPlayers";
import {getUserPlayersForSale} from "./cadence/scripts/getUserPlayersForSale";
import {getUserPlayers} from "./cadence/scripts/getUserPlayers";
import {listPlayerForSale} from "./cadence/transctions/listPlayerForSale";
import {unlistPlayerFromSale} from "./cadence/transctions/unlistPlayerFromSale";
import {purchasePlayer} from "./cadence/transctions/purchasePlayer";
import {addSpecialChallenge} from "./cadence/transctions/addSpecialChallenge";
import {getSpecialCustomizedChallenges} from "./cadence/scripts/getSpecialCustomizedChallange";
import {destroyFamily} from "./cadence/transctions/destroyFamily";

const client = create('https://ipfs.infura.io:5001/api/v0');
  fcl.config()
        .put("accessNode.api", "https://access-testnet.onflow.org")
        .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

export const CollectionContext=React.createContext();
export const HeaderContext=React.createContext();
export const ChallengeContext=React.createContext();
export const MyCollectionsContext=React.createContext();
export const PackContext=React.createContext();
export const AdminContext=React.createContext();
export const MarketplaceContext=React.createContext();

function App(props) {
      const[user,setUser]=useState();
    const[nameOfNFT,setName]=useState('');
    const[nameOfPackLaunch,setNameOfPackLaunch]=useState('');
    const[rarity,setRarity]=useState('');
    const[templateID,setTemplateID]=useState('');
    const[packLaunchID,setPackLaunchID]=useState('');
    const[file,setFile]=useState();
    const[idOfNFT,setIdOfNFT]=useState();
    const[price,setPrice]=useState();
    const [nfts, setNFTs] = useState([]);
    const [playerNFTs, setPlayerNFTs] = useState([]);
    const [saleNfts, setSaleNFTs] = useState([]);
    const [salePlayerNFTs, setSalePlayerNFTs] = useState([]);
    const [templates,setTemplates]= useState([]);
    const [playerTemplates,setPlayerTemplates]=useState([]);
    const [families,setFamilies]= useState([]);
    const [challenges,setChallenges]=useState([]);
    const [specialChallenges,setSpecialChallenges]=useState([]);
    const [sellingNFTs,setSellingNFTs]=useState([]);
    const [sellingPlayers,setSellingPlayers]=useState([]);
    const[completedChallenges,setCompletedChallenges]=useState([]);
    const [searchableAddress,setSearchableAddress]=useState('');
    const [task,setTask]=useState([]);
    const [reward,setReward]=useState([]);
    const [challengeId,setChallengeId]=useState();
    const [isUserSearchingForCollection,setIsUserSearchingForCollection]=useState(false);
    const [isUserSearchingForPlayerCollection,setIsUserSearchingForPlayerCollection]=useState(false);
    const [isUserSearchingForSaleCollection,setIsUserSearchingForSaleCollection]=useState(false);
    const [isUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerSaleCollection]=useState(false);
    const [isUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForMarketplaceOfPlayers]=useState(false);
    const [isUserSearchingForMarketplaceOfFootballClips,setIsUserSearchingForMarketplaceOfFootballClips]=useState(false);
    const [isUserSearchingForRegularChallenges,setIsUserSearchingForRegularChallenges]=useState(false);
    const [isUserSearchingForSpecialChallenge,setIsUserSearchingForSpecialChallenge]=useState(false);
    let runningTxs=[];
    const[isAdmin,setIsAdmin]=useState(false);
    const[isSetUpMade,setSetUpMade]=useState(true);
    const [isModalWindowOpened,setIsModalWindowOpened]=useState();
    const [isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC]=useState();
    const [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
    const [favouriteTeam,setFavouriteTeam]=useState("");
    const[familyID,setFamilyID]=useState();


    const [txs, setTxs] = useState([])
    const [loading, setLoading] = useState(true)
    let userAddress="";

    const checkIfUserIsAdmin=async ()=>{
        const currentUser = await fcl.currentUser.snapshot();
        userAddress=currentUser.addr;
        console.log(userAddress);
        if(userAddress==0xc8af9ee840bc6aab){
            setIsAdmin(true);
            console.log("Hello")
            console.log(isAdmin); // this is for some reason is false always
        } else {
            setIsAdmin(false);
            console.log("Hi")
        }
        console.log(isAdmin);
    }

    const renderTxs = () => {
        return (
            <div className='txs__list'>
                {txs.map(tx => <TxDetails id={tx?.id} key={tx?.id} />)}
            </div>
        )
    }

    const getLocalTxs = async () => {
        const txString = window.localStorage.getItem('txs')

        if (!txString || txString.length === 0) {
            setLoading(false)
            return
        }

        const localTxs = txString?.split(",")

        for (let index = 0; index < localTxs.length; index++) {
            const id = localTxs[index];
            const t = await getTxStatus(id)
            if (t?.status === 4) {
                continue
            }
            tx(id).subscribe(s => updateTxStatus(s?.status, id))
            runningTxs.push(id)
        }

        localStorage.setItem('txs', runningTxs.toString())
        setTxs(runningTxs.map(t => ({ id: t })))
    }

    const addTx = (txID) => {
        let transaction = { id: txID }
        setTxs(prev => [...prev, transaction])
        tx(txID).subscribe(s => updateTxStatus(s?.status, transaction?.id))
        window.localStorage.setItem('txs', [...txs, transaction?.id].toString())
    }

    const updateTxStatus = (status, txID) => {
        if (status === 4) {
            removeTx(txID)
            return
        }
        let tx = txs.find(t => t.id === txID)
        let oldTxs = txs.filter(t => t.id !== txID)
        if (!tx) return
        let updatedTx = { ...tx, status }
        setTxs([...oldTxs, updatedTx])
    }

    const removeTx = (txID) => {
        let newTxs = txs.filter(t => t.id !== txID)
        setTxs(newTxs)
    }

    const getTxStatus = async (txID) => {
        const status = await send([
            getTransactionStatus(txID),
        ])
            .then(decode);
        return status
    }

      useEffect(async ()=>{

          const currentUser = await fcl.currentUser.snapshot()
          if(!currentUser.addr){
              window.localStorage.setItem("isUserLoggedIn",JSON.stringify(false));
          } else{
              window.localStorage.setItem("isUserLoggedIn",JSON.stringify(true));
          }
          console.log(window.localStorage.getItem("isUserLoggedIn"));
          userAddress=currentUser.addr;
          await getUserNFTs(currentUser.addr)
          console.log("Player nfts");
          await getUserPlayerNFTs()
          await listFamilies();
          await getFootballClipTemplates();
          await listChallenges();
          console.log("Special challenges of user: ")
          await listSpecialChallenges();
          console.log("Player templates:")
          await getPlayerTemplates();
          await listCompletedChallenges(currentUser.addr);
          window.localStorage.removeItem('txs');
          await getLocalTxs();
          fcl.currentUser.subscribe(setUser);
          console.log("Completed: "+completedChallenges)
          console.log("User nfts are "+nfts)
          await checkIfUserIsAdmin();
          setIsModalWindowOpened(false);

      },[])

      const login=async ()=>{

        await fcl.authenticate();
        const currentUser = await fcl.currentUser.snapshot();
        setUser(currentUser);
        setIsUserLoggedIn(true);
        window.localStorage.setItem("isUserLoggedIn",JSON.stringify(true));
        getUserNFTs(currentUser.addr);
        getUserSaleNFTs(currentUser.addr);
        getSellingFootballClips();
        getUserPlayerNFTs();
        getSellingPlayersOfUsers()
          await getFootballClipTemplates();
        listChallenges();
        listSpecialChallenges();
          listCompletedChallenges(currentUser.addr);
        // userAddress=user.addr;
        // console.log("Hello "+userAddress);
      }

      const logout=async ()=>{
          fcl.unauthenticate();
          const currentUser = await fcl.currentUser.snapshot();
          setIsAdmin(false);
          window.localStorage.setItem("isUserLoggedIn",JSON.stringify(false));
          setNFTs([]);
          setSaleNFTs([]);
          setSellingNFTs([]);
          setPlayerNFTs([]);
          setSellingPlayers([]);
          setSalePlayerNFTs([]);
          setChallenges([]);
          setIsUserLoggedIn(false);
          setSpecialChallenges([]);
          await getFootballClipTemplates();
          listFamilies();
          listChallenges();
          listCompletedChallenges(currentUser.addr);
      }

      const buyNFT =async (id,owner)=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            console.log(idOfNFT);
            console.log(searchableAddress)
            const transactionId = await fcl.send([
                fcl.transaction(purchaseFootballClip),
                fcl.args([
                    fcl.arg(owner, t.Address),
                    fcl.arg(parseInt(id), t.UInt64)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch(e){

        }
      }

    const chooseFavouriteFootballClub= (footballClub)=>{
        setFavouriteTeam(footballClub);
        console.log(footballClub);
    }

    const buyPlayer =async (id,owner)=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(purchasePlayer),
                fcl.args([
                    fcl.arg(owner, t.Address),
                    fcl.arg(parseInt(id), t.UInt64)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch(e){

        }
    }

      const createFamily=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(makeFamily),
                fcl.args([
                    fcl.arg(nameOfPackLaunch, t.String),
                    fcl.arg(price, t.UFix64)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            try {
                await fcl.tx(transactionId).onceSealed();
            } catch (e) {
                console.log("Hey");
            }
            return fcl.tx(transactionId).onceSealed();
        }catch (e){
            console.error("User rejected transaction")
        }
      }

    const addFootballClipToPackCollection=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(addTemplateToFamily),
                fcl.args([
                    fcl.arg(parseInt(packLaunchID), t.UInt32),
                    fcl.arg(parseInt(templateID), t.UInt32)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch (e){

        }
    }


    const listNFTForSale=async (id) =>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                await getLocalTxs();
                if (runningTxs.length > 0) {
                    alert("Transactions are still running. Please wait for them to finish first.")
                    return
                }
                const transactionId = await fcl.send([
                    fcl.transaction(listFootballClipForSale),
                    fcl.args([fcl.arg(parseInt(id), t.UInt64),
                        fcl.arg(price, t.UFix64),
                        fcl.arg(currentUser.addr,t.Address)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                addTx(transactionId);
                console.log(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (e) {

            }
        }
      }

    const listPlayerNFTForSale=async (id) =>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                await getLocalTxs();
                if (runningTxs.length > 0) {
                    alert("Transactions are still running. Please wait for them to finish first.")
                    return
                }
                const transactionId = await fcl.send([
                    fcl.transaction(listPlayerForSale),
                    fcl.args([fcl.arg(parseInt(id), t.UInt64),
                        fcl.arg(price, t.UFix64),
                        fcl.arg(currentUser.addr,t.Address)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                addTx(transactionId);
                console.log(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (e) {

            }
        }
    }

    const unListForSale = async (id) =>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(unlistFootballClipFromSale),
                fcl.args([fcl.arg(parseInt(id), t.UInt64)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch (e) {

        }
    }

    const removePack=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(destroyFamily),
                fcl.args([fcl.arg(parseInt(familyID), t.UInt32)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch (e) {

        }
    }

    const unListPlayerNftFromSale = async (id) =>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(unlistPlayerFromSale),
                fcl.args([fcl.arg(parseInt(id), t.UInt64)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch (e) {

        }
    }

      const setUpUser=async () =>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            const transactionId = await fcl.send([
                fcl.transaction(setUp),
                fcl.args([fcl.arg(favouriteTeam, t.String)]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(999)
            ]).then(fcl.decode);
            addTx(transactionId);
            console.log(transactionId);
            setSetUpMade(true);
            await listChallenges();
            return fcl.tx(transactionId).onceSealed();
        } catch (e){

        }
      }

    // const mint = async () => {
    //     // if (runningTxs) {
    //     //     alert("Transactions are still running. Please wait for them to finish first.")
    //     //     return
    //     // }
    //       try {
    //           const added = await client.add(file);
    //           const hash = added.path;
    //
    //           console.log(templateID);
    //
    //           const transactionId = await fcl.send([
    //               fcl.transaction(mintNFT),
    //               fcl.args([fcl.arg(parseInt(templateID), t.UInt32),
    //                   fcl.arg(hash, t.String)
    //               ]),
    //               fcl.payer(fcl.authz),
    //               fcl.proposer(fcl.authz),
    //               fcl.authorizations([fcl.authz]),
    //               fcl.limit(999)
    //           ]).then(fcl.decode);
    //           console.log(transactionId);
    //         //  addTx(transactionId);
    //           return fcl.tx(transactionId).onceSealed();
    //       }catch(error) {
    //           console.log('Error uploading file: ', error);
    //       }
    // }

    const getUserNFTs = async () => {
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getUserFootballClips),
                    fcl.args([
                        fcl.arg(currentUser.addr, t.Address)
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setNFTs(result);
                setSetUpMade(true);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setNFTs([]);
                setSetUpMade(false);
            }
        }
    }

    const getUserPlayerNFTs = async () => {
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getUserPlayers),
                    fcl.args([
                        fcl.arg(currentUser.addr, t.Address)
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setPlayerNFTs(result);
                setSetUpMade(true);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setPlayerNFTs([]);
                setSetUpMade(false);
            }
        }
    }

    const getSellingFootballClips=async ()=>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getSellingNFTs),
                    fcl.args([
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setSellingNFTs(result);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setSellingNFTs([]);
            }
        }
    }

    const getSellingPlayersOfUsers=async ()=>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getSellingPlayers),
                    fcl.args([
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setSellingPlayers(result);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setSellingPlayers([]);
            }
        }
    }

    const getUserSaleNFTs = async (address) =>{
        try{
            const result = await fcl.send([
                fcl.script(getUserFootballClipsForSale),
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ]).then(fcl.decode);

            console.log(result);
            setSaleNFTs(result);
        } catch (error) {
            console.log("Something went wrong...")
            console.log(error);
            setSaleNFTs([]);
        }
    }

    const getUserPlayerSaleNFTs = async (address) =>{
        try{
            const result = await fcl.send([
                fcl.script(getUserPlayersForSale),
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ]).then(fcl.decode);

            console.log(result);
            setSalePlayerNFTs(result);
        } catch (error) {
            console.log("Something went wrong...")
            console.log(error);
            setSalePlayerNFTs([]);
        }
    }

    const makeFootballClipTemplate = async () => {
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                const added = await client.add(file); //take too long to execute
                const hash = added.path;
                console.log(hash);
                const transactionId = await fcl.send([
                    fcl.transaction(createFootballClipTemplate),
                    fcl.args([fcl.arg(rarity, t.String),
                        fcl.arg(nameOfNFT, t.String),
                        fcl.arg(hash, t.String)]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong..."+error)
            }
        } catch (e){

        }
    }

    const makePlayerTemplate = async () => {
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                const added = await client.add(file); //take too long to execute
                const hash = added.path;
                console.log(hash);
                const transactionId = await fcl.send([
                    fcl.transaction(createPlayerTemplate),
                    fcl.args([fcl.arg(rarity, t.String),
                        fcl.arg(nameOfNFT, t.String),
                        fcl.arg(hash, t.String)]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong..."+error)
            }
        } catch (e){

        }
    }

    const getFootballClipTemplates = async () =>{
        try{
            const result = await fcl.send([
                fcl.script(getTemplatesOfFootballClips),
                fcl.args([
                ])
            ]).then(fcl.decode);

            console.log(result);
            setTemplates(result);
        } catch (error) {
            console.log("Something went wrong..."+error)
            setTemplates([]);
        }
    }

    const getPlayerTemplates = async () =>{
        try{
            const result = await fcl.send([
                fcl.script(getTemplatesOfPlayers),
                fcl.args([
                ])
            ]).then(fcl.decode);

            console.log(result);
            setPlayerTemplates(result);
        } catch (error) {
            console.log("Something went wrong..."+error)
            setPlayerTemplates({});
        }
    }

    const listFamilies=async ()=>{
          try {
              const result = await fcl.send([
                  fcl.script(getFamilies),
                  fcl.args([
                  ])
              ]).then(fcl.decode);

              console.log(result);
              setFamilies(result);
          } catch (error){
              console.log("Something went wrong..."+error)
              setFamilies([]);
          }

    }

    const listCompletedChallenges=async (address)=>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getCompletedChallengesOfUser),
                    fcl.args([
                        fcl.arg(address, t.Address)
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setCompletedChallenges(result);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setCompletedChallenges([]);
            }
        }
    }

    const removeTemplate=async () =>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                console.log("rfmikmferf")
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                const transactionId = await fcl.send([
                    fcl.transaction(deleteFootballClipTemplate),
                    fcl.args([fcl.arg(parseInt(templateID), t.UInt32)]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong...")
            }
        }catch (e){

        }

    }

    let footballClipsToMint=[];
    const chooseRandomFootballClipsFromPack=(packID)=>{
        families.map((family)=>{
              if(family.familyID==packID){
                  for(let index=0;index<family.templates.length;index++){
                      if(index>0) break;
                      const randomNumber=Math.floor(Math.random()*family.templates.length);
                      footballClipsToMint.push(family.templates[randomNumber]);
                  }
              }
          })
    }

    const openPack=async (packID)=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            chooseRandomFootballClipsFromPack(packID);
            console.log(footballClipsToMint);
            try {
                const transactionId = await fcl.send([
                    fcl.transaction(batchMintFootballClipsFromFamily),
                    fcl.args([fcl.arg(parseInt(packID), t.UInt32),
                        fcl.arg(footballClipsToMint, t.Array(t.UInt32))
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                console.log("SetUpMade "+isSetUpMade);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong..."+error);
                console.log("OpenPack error")
            }
            footballClipsToMint = [];
        } catch (e){

        }
    }

    const createChallenge=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                console.log(task);
                console.log(reward);
                const transactionId = await fcl.send([
                    fcl.transaction(addRegularChallenge),
                    fcl.args([fcl.arg(task, t.Array(t.UInt32)),
                        fcl.arg(reward, t.Array(t.UInt32)),
                        fcl.arg(favouriteTeam,t.String)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong...")
            }
        } catch (e){

        }
    }

    const createSpecialChallenge=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                console.log(task);
                console.log(reward);
                const transactionId = await fcl.send([
                    fcl.transaction(addSpecialChallenge),
                    fcl.args([fcl.arg(task, t.Array(t.UInt32)),
                        fcl.arg(reward, t.Array(t.UInt32)),
                        fcl.arg(favouriteTeam,t.String)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong...")
            }
        } catch (e){

        }
    }

    const deleteChallenge=async ()=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                const transactionId = await fcl.send([
                    fcl.transaction(removeChallenge),
                    fcl.args([fcl.arg(challengeId, t.UInt32)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong...")
            }
        } catch (e){

        }
    }

    const listChallenges=async()=>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getRegularCustomizedChallenges),
                    fcl.args([
                        fcl.arg(currentUser.addr, t.Address)
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setChallenges(result);
                console.log(challenges);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setChallenges([]);
            }
        }
    }

    const listSpecialChallenges=async()=>{
        const currentUser = await fcl.currentUser.snapshot();
        if(currentUser.addr) {
            try {
                const result = await fcl.send([
                    fcl.script(getSpecialCustomizedChallenges),
                    fcl.args([
                        fcl.arg(currentUser.addr, t.Address)
                    ])
                ]).then(fcl.decode);

                console.log(result);
                setSpecialChallenges(result);
            } catch (error) {
                console.log("Something went wrong..." + error)
                setSpecialChallenges([]);
            }
        }
    }

    const mintRewardForCompletingChallenge=async (challengeID)=>{
        try {
            await getLocalTxs();
            if (runningTxs.length > 0) {
                alert("Transactions are still running. Please wait for them to finish first.")
                return
            }
            try {
                console.log(challengeID);
                const transactionId = await fcl.send([
                    fcl.transaction(mintReward),
                    fcl.args([fcl.arg(parseInt(challengeID), t.UInt32)
                    ]),
                    fcl.payer(fcl.authz),
                    fcl.proposer(fcl.authz),
                    fcl.authorizations([fcl.authz]),
                    fcl.limit(999)
                ]).then(fcl.decode);
                console.log(transactionId);
                addTx(transactionId);
                return fcl.tx(transactionId).onceSealed();
            } catch (error) {
                console.log("Something went wrong..."+error)
            }
        } catch (e){

        }
    }

    const ProtectedRoute = ({
                                isAdmin,
                                redirectPath = '/',
                                children,
                            }) => {
        if (!isAdmin) {
            return <Navigate to={redirectPath} replace />;
        }

        return (
            <div>

            <TextField onChange={(e)=>{setRarity(e.target.value)}}/>
            {/*<HeaderContext.Provider value={{user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getTemplates,*/}
            {/*    listChallenges,*/}
            {/*    listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>*/}
            {/*    <Header/>*/}
            {/*</HeaderContext.Provider>*/}
            {/*<AdminContext.Provider value={{setTask,setReward,createChallenge,task,reward,removeTemplate,setFile,setName,setRarity,makeTemplate,*/}
            {/*    setNameOfPackLaunch,setPrice,createFamily,setPackLaunchID,addFootballClipToPackCollection,setTemplateID}}>*/}
            {/*    <AdminScene/>*/}
            {/*</AdminContext.Provider>*/}
        </div>
        )
    };

    if (loading) return <Spinner />
  return (
      // <Providers>
      <div style={{height:"100%"}}>
    <div className="App" style={{height:"100%",backgroundColor: "transparent"}}>
        {renderTxs()}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                    <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,getUserSaleNFTs,isUserLoggedIn,getSellingFootballClips,setIsUserSearchingForSaleCollection,logout,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                        listChallenges,setIsUserSearchingForCollection,
                        listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                        <Header/>
                    </HeaderContext.Provider>
                    </div>
                }/>
                <Route path="/userCollections"  element={
                    <div>
                    <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,getUserSaleNFTs,isUserLoggedIn,getSellingFootballClips,setIsUserSearchingForSaleCollection,logout,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                        listChallenges,setIsUserSearchingForCollection,
                        listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                        <Header/>
                    </HeaderContext.Provider>
                    <MyCollectionsContext.Provider value={{listPlayerNFTForSale,unListPlayerNftFromSale,isUserSearchingForPlayerCollection,isUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,getUserPlayerNFTs,getUserPlayerSaleNFTs,playerNFTs,salePlayerNFTs,setPlayerNFTs,setSalePlayerNFTs,setIsUserLoggedIn,isUserLoggedIn,loading,setLoading,setIdOfNFT,setPrice,setIsUserSearchingForCollection,setIsUserSearchingForSaleCollection,
                        getUserNFTs,getUserSaleNFTs,isUserSearchingForCollection,
                        isUserSearchingForSaleCollection,nfts,saleNfts,listNFTForSale,unListForSale}}>
                    <MyCollectionsScene style={{marginTop:"100px"}}/>
                    </MyCollectionsContext.Provider>
                    </div>
                }/>
                <Route path="/packs" element={
                    <div>
                        <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,isUserLoggedIn,getUserSaleNFTs,getSellingFootballClips,logout,setIsUserSearchingForSaleCollection,setIsUserSearchingForCollection,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                            listChallenges,
                            listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                            <Header/>
                        </HeaderContext.Provider>
                        <PackContext.Provider value={{chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,setUpUser,isModalWindowOpened,setIsModalWindowOpened,isSetUpMade,openPack,templates,
                        families,getFootballClipTemplates,listFamilies,getUserNFTs,listChallenges,listCompletedChallenges}}>
                            <PackScene/>
                        </PackContext.Provider>
                    </div>
                }/>
                <Route path="/challenges" element={
                    <div>
                    <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,isUserLoggedIn,getUserSaleNFTs,getSellingFootballClips,logout,setIsUserSearchingForSaleCollection,setIsUserSearchingForCollection,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                        listChallenges,
                        listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                        <Header/>
                    </HeaderContext.Provider>
                       <ChallengeContext.Provider value={{getUserPlayerNFTs,playerNFTs,isModalWindowOpened,setIsModalWindowOpened,chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,specialChallenges,setSpecialChallenges,listSpecialChallenges,isSetUpMade,setIsUserSearchingForRegularChallenges,setIsUserSearchingForSpecialChallenge,isUserSearchingForSpecialChallenge,isUserSearchingForRegularChallenges,setIsUserLoggedIn,isUserLoggedIn,setUpUser,setLoading,loading,getPlayerTemplates,getFootballClipTemplates,listCompletedChallenges,completedChallenges,user,
                    mintRewardForCompletingChallenge,listChallenges,getUserNFTs,
                    nfts,templates, challenges,playerTemplates}}>
                          <ChallengeScene/>
                        </ChallengeContext.Provider>
                    </div>
                }/>

                <Route path="/marketplace" element={

                       <div>
                       <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,isUserLoggedIn,getUserSaleNFTs,getSellingFootballClips,logout,setIsUserSearchingForSaleCollection,setIsUserSearchingForCollection,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                           listChallenges,
                           listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                           <Header/>
                       </HeaderContext.Provider>
                       <MarketplaceContext.Provider value={{chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,listChallenges,getUserPlayerNFTs,buyPlayer,unListPlayerNftFromSale,playerNFTs,getSellingPlayersOfUsers,setSellingPlayers,sellingPlayers,isUserSearchingForMarketplaceOfPlayers,isUserSearchingForMarketplaceOfFootballClips,setIsUserSearchingForMarketplaceOfFootballClips,setIsUserSearchingForMarketplaceOfPlayers,setIsUserLoggedIn,isUserLoggedIn,setUpUser,isModalWindowOpened,setIsModalWindowOpened,isSetUpMade,user,nfts,sellingNFTs,buyNFT,unListForSale,getUserNFTs,getSellingFootballClips,saleNfts,getUserSaleNFTs}}>
                           <MarketplaceScene/>
                       </MarketplaceContext.Provider>
                   </div>
                }/>

                {/*<Route element={<ProtectedRoute isAdmin={isAdmin}/>}>*/}
                {isAdmin&&(<Route path="/admin" element={
                    <div style={{height:"100%"}}>
                        <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForSpecialChallenge,getPlayerTemplates,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,isUserLoggedIn,getUserSaleNFTs,getSellingFootballClips,logout,setIsUserSearchingForSaleCollection,setIsUserSearchingForCollection,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                            listChallenges,
                            listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                            <Header/>
                        </HeaderContext.Provider>
                        <AdminContext.Provider value={{setFamilyID,removePack,chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,createSpecialChallenge,setFavouriteTeam,favouriteTeam,isSetUpMade,isModalWindowOpened,setIsModalWindowOpened,setUpUser,setTask,setReward,createChallenge,task,reward,removeTemplate,setFile,setName,setRarity,makePlayerTemplate,makeFootballClipTemplate,
                            setNameOfPackLaunch,setPrice,createFamily,setPackLaunchID,addFootballClipToPackCollection,setTemplateID}}>
                            <AdminScene/>
                        </AdminContext.Provider>
                    </div>
                }/>)}

                {/*</Route>*/}
                <Route
                    path="*"
                    element={
                        <div>
                        <HeaderContext.Provider value={{setIsUserSearchingForMarketplaceOfPlayers,getPlayerTemplates,setIsUserSearchingForSpecialChallenge,setIsUserSearchingForRegularChallenges,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,setIsUserLoggedIn,isUserLoggedIn,getUserSaleNFTs,getSellingFootballClips,logout,setIsUserSearchingForSaleCollection,setIsUserSearchingForCollection,user,isAdmin,setIsAdmin,login,setUpUser,getUserNFTs, getFootballClipTemplates,
                        listChallenges,
                        listCompletedChallenges,listFamilies,checkIfUserIsAdmin}}>
                        <Header/>
                    </HeaderContext.Provider>
                        </div>}
                />
            </Routes>
        </BrowserRouter>
        {/*<TemplateCreation setFile={setFile} setName={setName} setRarity={setRarity} makeTemplate={makeTemplate}/>*/}

        {/*<PackCollectionCreation setNameOfPackLaunch={setNameOfPackLaunch} setPrice={setPrice} createFamily={createFamily}/>*/}

        {/*<FootballClipToPackAddition setPackLaunchID={setPackLaunchID} setTemplateID={setTemplateID} addFootballClipToPackCollection={addFootballClipToPackCollection}/>*/}

        {/*<TradingOfNFT setIdOfNFT={setIdOfNFT} setPrice={setPrice} listNFTForSale={listNFTForSale} unListNFTForSale={unListForSale}/>*/}

        {/*<MintOfNFT setSearchableAddress={setSearchableAddress} setIdOfNFT={setIdOfNFT} buyNFT={buyNFT} openPack={openPack} setPackId={setPackId}/>*/}

        {/*<div style={{margin:"15px"}}>*/}
        {/*    <TextField style={{width:"250px",marginRight:"10px"}} size="small" placeholder="1,2" type="text" label="ids of NFTs user should collect" variant="filled" onChange={(e)=>{let input=e.target.value;setTask(Array.from(input.split(',')).map(i=>Number(i)))}}/>*/}
        {/*    <TextField style={{width:"325px",marginRight:"10px"}} size="small" placeholder="3,5" type="text" label="ids of NFTs user will receive as the reward" variant="filled" onChange={(e)=>{let input=e.target.value;setReward(Array.from(input.split(',')).map(i=>Number(i)))}}/>*/}
        {/*    <Button startIcon={<AddIcon/>} style={{marginLeft:"10px"}} color="primary" onClick={()=>{createChallenge(task,reward);}} variant="contained">Add challenge</Button>*/}
        {/*</div>*/}

        {/*<div style={{margin:"15px"}}>*/}
        {/*    <TextField style={{width:"190px",marginRight:"10px"}} size="small" type="text" label="TemplateID" variant="filled" onChange={(e)=>setTemplateID(e.target.value)}/>*/}
        {/*    <Button startIcon={<DeleteIcon/>} style={{marginLeft:"10px"}} color="secondary" onClick={()=>{removeTemplate()}} variant="contained">Delete template</Button>*/}
        {/*</div>*/}

        {/*/!*<CollectionContext.Provider value={{openPack,setPackId,listCompletedChallenges,completedChallenges,searchableAddress,user,changeChallengeId,isUserSearchingForAvailableChallenges,setIsUserSearchingForAvailableChallenges,setIsUserSearchingForCollection,setIsUserSearchingForSaleCollection,setIsUserSearchingForTemplates,*!/*/}
        {/*/!*    setIsUserSearchingForFamilies,mintRewardForCompletingChallenge,listChallenges,getUserNFTs,getUserSaleNFTs,getTemplates,listFamilies,setSearchableAddress,isUserSearchingForCollection,*!/*/}
        {/*/!*isUserSearchingForSaleCollection,nfts,saleNfts,isUserSearchingForTemplates,templates, challenges,setTemplateID,removeTemplate,isUserSearchingForFamilies,*!/*/}
        {/*/!*families}}>*!/*/}
        {/*/!*<CollectionShow/>*!/*/}
        {/*</CollectionContext.Provider>*/}
      </div>
      </div>
  );
}

export default App;
