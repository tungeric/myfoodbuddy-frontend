# myfoodbuddy

## Description and technologies

myfoodbuddy is a simple application where users can enter what they've eaten that day and can get information on how many calories and macronutrients they have consumed that day.

The application is features a GraphQL server built on a Ruby on Rails backend with a PostgreSQL database. The backend application is [hosted on Heroku](https://myfoodbuddy-backend.herokuapp.com/).

The frontend is bootstrapped from create-react-app, which takes care of some of the boilerplate that React requires. In lieu of using Redux, I elected to build the application purely on React, using the Apollo client to access the GraphQL server with queries and mutations.

## Installation and Usage

One issue that I ran into with this project was cross origin resource sharing, as I am trying to make requests onto the Heroku domain. I wasn't able to effectively fix this issue, so for the time being I installed the Chrome extension Allow-Control-Allow-Origin, which allows me to make requests from any source.

So let's walk through the steps to run this application:

1. Clone this repository

`git clone https://github.com/tungeric/myfoodbuddy-frontend.git`

2. Install dependencies

`npm install` or `yarn`

3. Download [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) for Chrome.

4. Start the application with `yarn start` or `npm start`