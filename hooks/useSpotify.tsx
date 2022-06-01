import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

const useSpotify = () => {
    const { data: session, status } = useSession()
    let userToken: any;

    useEffect(() => {
      if (session) {
          //If refresh access token attempt fails, direct user to login
          if (session.error == "RefreshTokenError") {
              signIn();
          }
          userToken = session.user;
          spotifyApi.setAccessToken(userToken.accessToken);
      }
    }, [session])
    

    return spotifyApi;
}

export default useSpotify;