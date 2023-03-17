import { GoogleLogout } from 'react-google-login';

const clientId = "241058858792-1bumls668p55plj4fcndvlguhqjkk8vo.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log('Log out successfull!');
        alert('Log out successfull!');
    }

    return(
        <div id="signInButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;