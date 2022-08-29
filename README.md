### About FakeBnB:

FakeBnB is a website clone of AirBnB. FakeBnB can be used as a marketplace for temporary home stays for vacations and things like it

### Wiki Links

- [Redux State Shape](https://github.com/ConnorLam/AirBnB_clone_project/wiki/Redux-state-shape)
- [DataBase Schema](https://github.com/ConnorLam/AirBnB_clone_project/wiki/Data-base-schema)
- [Features List](https://github.com/ConnorLam/AirBnB_clone_project/wiki/Feature-List)
- [API Routes](https://github.com/ConnorLam/AirBnB_clone_project/wiki/API-Routes)


### This project is built with:

 * JavaScript
 * Sequelize
 * PostgreSQL
 * Express
 * React
 * Redux
 * CSS

### How to run locally:

 1. Clone the repo 
 2. Go into backend directory and run **npm install** to grab dependencies needed
 3. create a .env fileadd add values to variables listed
   * PORT
   * DB_FILE (database location)
   * JWT_SECRET
   * JWT_EXPIRES_IN
 4. Migrate and seed data in the backend **npx dotenv sequelize db:migrate, npx dotenv sequelize db:seed:all**
 5. Run server using npm start
 6. Open another terminal and go to the frontend folder and run another npm start (opens a broswer at localhost:3000)
 7. Look around app!
   


### Features Directions:

## Home Page Demo User:

User will be able to test the features without sign up by clicking on the "Demo User" button inside of the login modal

<img width="654" alt="Screen Shot 2022-08-29 at 1 22 13 AM" src="https://user-images.githubusercontent.com/104233383/187157305-391b0bc9-b3fc-40f0-8452-e9d0a5b95da4.png">

User can look through each spot by simply clicking on any of the spots

<img width="1440" alt="Screen Shot 2022-08-29 at 12 32 32 AM" src="https://user-images.githubusercontent.com/104233383/187148020-192ec509-d0e1-47bf-bb6a-6a553af50262.png">

User can create a spot if logged in with the Host A Spot button at top right and filling out form with proper validations


![Screen Shot 2022-08-29 at 1 24 03 AM](https://user-images.githubusercontent.com/104233383/187157688-afb8f6f9-11c3-47b7-9c53-f336d4fe6cc7.png)


User can see their created spots and edit/delete them in this page, by going to the your spots button via the top right profile button

![Screen Shot 2022-08-29 at 1 25 21 AM](https://user-images.githubusercontent.com/104233383/187157893-29595a25-9d8c-4d86-9323-e00578efa3a1.png)


User can view reviews by clicking on a spot and looking at the bottom of the page!

[Screen Shot 2022-08-29 at 1 26 56 AM](https://user-images.githubusercontent.com/104233383/187158176-c527ea22-1c21-42ea-9a54-d738651086cd.png)


User can delete a review that they have created by clicking on delete button where they wrote the review

![Screen Shot 2022-08-29 at 1 28 05 AM](https://user-images.githubusercontent.com/104233383/187158420-741279a6-c031-45c6-8754-44733739aa5b.png)

