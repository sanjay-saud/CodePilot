import { useState } from 'react';
import './App.css';
import Chat from './Components/Chat';
import { Login_Signup } from './Components/Login-Signup'; 
import {KindeProvider} from "@kinde-oss/kinde-auth-react";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <KindeProvider
        clientId="ec761b2d4875498bada75a572e2f2d18"
        domain="https://gorockshetty.kinde.com"
        logoutUri={window.location.origin}
        redirectUri={window.location.origin}
          onRedirectCallback={(user, app_state) => {
            console.log({user, app_state});
            setIsLoggedIn(true);  // Set logged in state to true upon successful redirection
        }}
    >
      {isLoggedIn ? <Chat /> : <Login_Signup />}
    </KindeProvider>
  );
}

export default App;
