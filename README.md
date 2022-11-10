# DiscoverSongs

### Link: https://ad-discoversongs.herokuapp.com
Note: Heroku is getting rid of free dynos soon (end of November 2022), so if the link above doesn't work, then that means my free dynos have expired :( 
I will look for another (hopefully free) hosting service in the meantime!

## App Info
This is a web app that gives song recommendations based on a given song. The purpose of creating this app was to gain experience using the Spotify Web API, OAuth, React, NodeJS, and website deployment.

The landing page:
![image](https://user-images.githubusercontent.com/71189770/201004864-a91d6637-86bf-4a25-8a61-083c098c5880.png)

The song recommendation page:
![image](https://user-images.githubusercontent.com/71189770/201005059-a2ca5066-28fa-4a91-b573-6626b4be3d8e.png)

## Future Improvements
* The styling is definitely very bare-bones at the moment. I hope to make it more visually appealing by adding more color and possibly re-arranging elements.
* I'm thinking of adding more options for the song recommendations, such as selecting a specific genre or allowing the user to specify how many recommendations they want to get.
* The Spotify Web API allows you to get a song's musical analysis, so I'd love to display that somehow and maybe show how similar each recommended song is to the selected song.

## Running Instructions
To run the app locally, first run 'npm install' in both the parent and client folders. Then, run 'npm start' in the parent folder to start the server, then in another terminal, cd into the client folder and run 'npm start' to start the client.

## References
https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13 
    - sample code: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js

https://www.youtube.com/watch?v=1vR3m0HupGI&ab_channel=MakerAtPlayCoding 

https://www.newline.co/courses/build-a-spotify-connected-app/fetching--displaying-data-from-spotify
https://www.newline.co/courses/build-a-spotify-connected-app/using-local-storage-to-persist-login-state 
