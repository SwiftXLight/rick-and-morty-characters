import { GoogleLogout } from '@leecheuk/react-google-login';

const clientId = "603726296182-jmg14kmnfj30cncg6f0addblg5ltfq8u.apps.googleusercontent.com";

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