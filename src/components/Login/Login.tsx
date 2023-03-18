import { GoogleLogin } from '@leecheuk/react-google-login';

const clientId = "603726296182-jmg14kmnfj30cncg6f0addblg5ltfq8u.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res: any) => {
        console.log('Login success! Current user:', res.profileObj);
        alert(`Login success!`);
    }

    const onFailure = (res: any) => {
        console.log('Login success! Current user:', res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin 
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;