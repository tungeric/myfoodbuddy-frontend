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

3. Download [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) for Chrome and `Enable cross-origin resource sharing`. Be sure to turn this off as you're browsing other websites as you may get performance issues with authentication.

4. Start the application with `yarn start` or `npm start`

And you're in! Let's quickly navigate through the application.

## Navigate the App

![homepage](http://res.cloudinary.com/dfafbqoxx/image/upload/v1510638692/Screen_Shot_2017-11-13_at_9.47.51_PM_giifem.png)

The header nav bar is pretty self-explanatory. The `myfoodbuddy` logo takes you to the home page, while the `Create Food` button enables you to enter new foods. 

![create_food](http://res.cloudinary.com/dfafbqoxx/image/upload/v1510638688/Screen_Shot_2017-11-13_at_9.48.07_PM_fswrew.png)

Once you create a food the webpage will navigate you to the `Track Meals` page, where you will likely spend the majority of your time on the app.

![track_meals](http://res.cloudinary.com/dfafbqoxx/image/upload/v1510638689/Screen_Shot_2017-11-13_at_9.48.15_PM_o9nr2e.png)

The left side of the `Track Meals` page allows you to change the date (if you click on the date, a calendar will pop up and you can select a different date), and also displays the daily intake of calories and macronutrients. The right side of the page shows specifically what you've eaten that day, and allows you to also add more meals and food to the day. You can also delete any food you've errantly added by clicking on the trash can icon on the right.

![add_food](http://res.cloudinary.com/dfafbqoxx/image/upload/v1510638690/Screen_Shot_2017-11-13_at_9.48.33_PM_jesrzi.png)

Adding food is a two-step process. First, to narrow down the data, you first choose a category of food. I've broken it down into Meat, Vegetables, Fruit, Grain, and Misc, though the data is randomly seeded so you'll find some weird vegetables like, uh, "Sunflower Oil" and "Eggs". I simply used `Faker::Food` to seed data for the application.

![add_food2](http://res.cloudinary.com/dfafbqoxx/image/upload/v1510638690/Screen_Shot_2017-11-13_at_9.48.47_PM_da11uv.png)

Once you select a category, you can select any foods in that category by clicking on it or you can narrow it down some more by using the Search feature. The search results instantly update as you're typing in the search bar.

Once you have  a specific food selected, an Add button will show on the bottom of the modal, and you can add it to your meal!

You can also add meals to the day, which simply requires you to pick a meal type (Breakfast, Brunch, Lunch, Dinner, and of course Snack) as well as a date and time. Like the food-adding feature, the Add button appears when all necessary information is present.