import * as fcl from "@onflow/fcl";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


function Register(props) {

    // useEffect( ()=>{
    //     if(props.user){
    //        isUserLoggedIn2=true;
    //     }else{
    //        isUserLoggedIn2=false;
    //     }
    //     console.log(isUserLoggedIn2)
    // })


    return (
        // <Providers>
        <div style={{margin:"15px"}} className="Register">
            <h1>Account address: {props.user&&props.user.addr?props.user.addr: ''}</h1>
            <Button style={{marginRight:"10px"}} startIcon={<LoginIcon/>} color="primary"  onClick={async ()=>{await props.login()}} variant="contained">Login</Button>
            <Button style={{marginRight:"10px"}} startIcon={<LogoutIcon/>} color="secondary" onClick={()=>{fcl.unauthenticate()}} variant="contained">Logout</Button>
            <Button style={{marginRight:"10px"}} startIcon={<PowerSettingsNewIcon/>} color="primary" onClick={()=>props.setUpUser()} variant="contained">Set up</Button>
        </div>
        //  </Providers>
    );
}

export default Register;