﻿# wovthesunvanished
Code from my bot THESUNVANISHED.

## What is it ?
It's a bot for Wolvesville which go in french advanced games lobby to scrap players number and username to store them, then leave three second after the game started to join the new lobby.
The actual lobby is stored in a JSON file and when the game launched, it's stored in another JSON and a lobby is deleted after six hours (not exactly but still).
It's using NodeJS with Playwright library.

## How to use it ?
You have to install NodeJS. [Here's a link](https://nodejs.org/en).
Download the code as a ZIP file and then extract it. When it's done, you must change credentials.
Edit the **main.js** file with anything, like notepad or a code editor. You should see in the first lines this :
```
let credentials = {
    email: '',
    password: ''
}
```
Here's an exemple of what you must type :
```
let credentials = {
    email: 'example@domain.ext',
    password: 'password'
}
```
When it's done, the script is ready. To launch your code, you have to open a CMD window. In this window, enter this code :
```
cd disk:/your/folder/location
npm i
node main.js
```
You don't need to type `npm i` everytime but one time is always good to do.
You shouldn't see any line in the CMD window because I didn't do any log but you should see the JSONs change, of course if the account you've set is able to go in advanced game.

## Why tf ?
Yeah, this script isn't really usefull. I just wanted to give a base of a bot in this game, so people can remix it.
If you look at into the code, everything is kinda explicit and I explained what are referring the weird classes. 
It's really easy to make your own bot.
