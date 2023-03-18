import { GoogleLogin } from '@leecheuk/react-google-login';

const clientId = "241058858792-1bumls668p55plj4fcndvlguhqjkk8vo.apps.googleusercontent.com";

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