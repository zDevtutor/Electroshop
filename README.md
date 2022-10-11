<h1 align=center id=top>Electroshop</h1>

Electroshop is a fullstack ecommerce application build on the MERN stack and has been designed with simplicity in mind using MUI Components.

![Responsive Layout](/uploads/responsive-layout.png)

View live project [here](https://elctroshop-ecommerce-app.herokuapp.com/)

# [Table of Contents](#table-of-contents)

1. [User Experience](<#user-experience(ux)>)

- [User Stories](#user-stories)
- [Design](#design)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Imagery](#imagery)

2. [Wireframes](#wireframes)
3. [Features](#features)

- [Existing Features](#existing-features)
  - [Features On All Pages](#features-on-all-pages)
  - [Features Of Individual Pages](#features-of-individual-pages)
- [Features Left To Implement](#features-left-to-implement)

4. [Technologies Used](#technologies-used)

- [Front-End Technologies](#front-end-technologies)
- [Back-End Technologies](#back-end-technologies)
- [Other Tools](#other-tools)
- [Database Schema](#database-schema)

5. [Testing](#testing)
6. [Deployment](#deployment)

- [Local Deployment](#local-deployment)
- [Remote Deployment](#remote-deployment)

7. [Credits](#credits)
8. [Acknowledgements](#acknowledgements)

# User Experience (UX)

## User Stories

### As a site user, I want to be able to:

- Easily register for an account, so that I can be able to have a personal account and be able to view my profile
- Easily login and logout, so that I can access my personal account and easily logout to quit the session
- Have a personalised user account so that I can view my personal order history and order confirmations.
- Easily leave product reviews after purchase and delivery

### As a site owner, I want to be able to:

- Easily add new products to sell, so that I can keep my store reflecting new products in my inventory
- Easily edit/update existing products that are listed, so that I can keep my products listing up to date with the correct information
- Quickly delete products should they no longer be available to the shopper, so that I can make sure the shopper does not select a product that is no longer available
- Review all orders and mark delivered order as delivered.
- Review all users and has the ability to delete misbehaved users.

### As a shopper, I want to be able to:

- Easily see what I have searched for so that I can quickly see if the product I have searched for is available
- Easily select the quantity of a product when purchasing it so that I can ensure I dont select the wrong product, or quantity
- Adjust the quantity of items I would like to buy, so that I can make sure that I am buying the desired amount
- Easily see the subtotal for each item, so that I can get an idea of how much I am spending on each item
- Safely and securely use my card details to make the payment, so that I can have peace of mind that the payment is safe
- Save my details on the site, so that I can be a return shopper without the hassle of re-entering all of my details
- View an order confirmation after checkout, so that I can verify that I have not made any mistakes

## Design

Electoshop was designed with functionality in mind, the design is meant to be kept simple with the use of MUI components and with minimal use of colors.

### Colour Scheme

Electoshop was not intented to be overly colourful. As mentioned, it was designed with functionality in mind.

So, the colors are mainly of MUI colors (Primary, Secondary, Danger, Info, Success)

### Typography

The primary font used is Roboto, using four different weights: 300,400,500,700

### Imagery

Imagery is important to create an eye-catching site. There are images primarily on the products pages

:arrow_up: [Back to top](#table-of-contents)

# Features

## Existing Features

### Features on all pages

#### Navbar

- The responsive navigation bar contains three main sections. The first is the Electroshop logo
- The second section is the search bar, where the user can search for products by their name.
- The next section is the cart and My Account buttons where the user is able to login/register and navigate to the cart and view added products there.
- For the logged in user the account and cart buttons will be changed to a gravatar with welcome user. It is clickable to get the cart, profile and logout. For the admin there will be 3 extra links which is products, orders, users to manage it all.

#### Footer

- The footer was included to keep up with standard site navigation. The footer includes a quick copyright write up as this project is only for educational purposes.

### Features of individual pages

#### Home Page

- The homepage contains a list of latest products with the navigation to easily navigate between listed products.

#### Profile Page

- Users will be able to navigate to their Profile page via the navigation bar at the top of site. This page is where they will be able to update their profile details like their name, email and password as well as uploading profile image. Users will also be able to see an order history details. If they have made purchases. They will see the order is paid. If the order is delivered they will be able to see that as well.

#### Checkout

- This is where the user will be able to confirm the shipping address, payment details and review the order. The user will be prompted to fill out their information to complete the order here. There will be two method of payment whether paypal or Stripe. I have implemented Paypal to manage payments and Stripe will be added later.

## Features Left To Implement

- Add sorting of products
- Add Stripe functionality to handle payment through stripe.
- Social Media Login: Allowing users to log in with their Facebook or Google credentials.

:arrow_up: [Back to top](#table-of-contents)

# Technologies Used

## Front-End Technologies

- [MUI](https://mui.com/)
- [React JS](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) For State Managment.
- [Axios](https://axios-http.com/) For handling http requests
- [@Paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) For handling payment functionality

## Back-End Technologies

- [Node JS](https://nodejs.org/en/) The backend programming language
- [Express JS](https://expressjs.com/) the backend framework for rapid development & clean designs
- [Heroku](http://heroku.com/) the hosting platform used for deployment
- [MongoDB](https://www.mongodb.com/) Database used.
- [Mongoose](https://mongoosejs.com/) For building schemas and connect to database.
- [Multer](https://www.npmjs.com/package/multer) For handling image uploads
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) For Password encryption
- [Express Async Handler](https://www.npmjs.com/package/express-async-handler) For Handling repeatitive try catch blocks

## Database Schema

- Django makes use of the SQL Database,
  - Throughout development, I used the SQLite Database.
  - Once deployed, the database was moved over to PostgreSQL which was provided by Heroku.

After careful consideration and taking into account all the different parts of the website and needs of the database, I designed the schema in the following sections/models:

- **User:** This includes all the details of the user (name, email, password, image) and isAdmin to define if the user is admin or not. This model is used for singing in/up and to display user details in profile page.

- **Order:** This includes the overall order in full, including the delivery details from (from or added to the user profile) and the order_items.

- **Product:** This includes all the information related to each product, including the product item price, image, name, descriptions, brand, count in stock and number of reviews.

- **Review:** This review model used to display review rating, comment and name for paid and delivered products.

# Deployment

1. Open up Heroku and log your account
2. Create a new app, called electroshop-ecommerce-app.
3. Install Heroku CLI and make sure git is already installed
4. Under the ‘Resources’ tab, search for and add the ‘Heroku Postgress DB’ app
5. In the project terminal, install `dj_database_url` and `psycopg2` by using the following commands:

Tada! Now the site should be deployed!

:arrow_up: [Back to top](#table-of-contents)

# Credits

## Media

- All of the Images were taken from [Unsplash](https://unsplash.com/)
- The majority of the images were by [Joeyy Lee](https://unsplash.com/@joeyy_anne) and [Anna Elizabeth](https://unsplash.com/@shopannaelizabeth)

## Code

- Some sections of the code layout were taken from the [MDBoostrap design block page.](https://mdbootstrap.com/docs/standard/design-blocks/trending/)
- The blog model and implementation was based on the [Django Girls Tutorial.](https://tutorial.djangogirls.org/en/)
- The blog comments model and implementation was adapted from the [Django Girls Comment Extension Tutorial.](https://tutorial-extensions.djangogirls.org/en/homework_create_more_models)
- The products and checkout sections of the course was adapted from the [Boutique Ado Mini Project](https://github.com/lucyrush/boutique_ado_v1) from the [Code Institute](https://codeinstitute.net/) Full Stack course.

## Content

- The product details were written by myself
- The blog content was adapted from the [Gemologue by Liza Urla](https://gemologue.com/)

# Acknowledgements

(Prep for my Oscar Winning Speech)

I would like to thank the [Code Institute](https://codeinstitute.net/) for allowing me to complete the course! It has been an amazing learning journey; tough, long but most importantly - INSPIRING!

Special thanks to the wonderful team I work with in Student Care. Neil, Claire, and Mark, you guys are amazing and I could not have done it without you.

A massive thanks is also owed to the fantastic Tutor Support for their help through the trickier parts of this project.

Thanks to my fantastic mentor, Spencer Barriball for the help with the project too and for also introducing me to the power of Django that I cannot wait to learn more about.

Lastly a big thanks to my partner, David, who would sit up on late nights with me and remind me that life does not have to be as stressful as we can make it to be.

Now, for the big bottle of bubbles that is waiting to be popped!

:arrow_up: [Back to top](#table-of-contents)
