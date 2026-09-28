# Clondle

A Wordle inspired game Built with React, Express, and PostgreSQL as a full-stack learning Project

## Features

- Play a daily or randomly generated word game
- Choose difficulty and word length
- Sign in with Auth0
- Save game results and view stats

## Tech stack

- Frontend: React, Vite
- Backend: Express
- Database: PostgreSQL
- Authentication: Auth0

### How to play / Information about mechanics

1. The game Starts when the board loads in and generates a random word
2. Typing on your keyboard will display the letters you have typed
3. When you reach the word length it will stop letting you type intill you hit enter on your keyboard.
4. On hitting Enter the game will Check the word and see if you have guessed the correct word, If the word is wrong but you have some correct letters the game will color the correct letters.
5. Colors used is Green/Yellow/Gray.

- Green means the letter is Correct and in the proper position in the word
- Yellow means the Letter is in the word but not in the Correct position.
- Gray means the letter is not in the Word.

#### What I learned During the project

Building react components and managin states.
connecting a Frontend to a Rest API.
Working With Express, PostgreSQL and Auth0.

##### Acknowledgemnts

The APIs Used in this Project Are
<a href ="https://random-word-api.herokuapp.com/home">Random-word-API</a>
<a href ="https://freedictionaryapi.com">Dictionary API</a>
