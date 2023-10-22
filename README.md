<h1 align=center id=top>Electroshop</h1>

Electroshop is a fullstack ecommerce application built on the MERN stack and has been designed with simplicity in mind using MUI Components.

![Responsive Layout](/uploads/final-screenshot.png)

View live project [here](https://electroshop-dkjl.onrender.com/)

# [Table of Contents](#table-of-contents)

1. [User Experience](#user-experience)

- [User Stories](#user-stories)
- [Design](#design)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Imagery](#imagery)

2. [Features](#features)

- [Existing Features](#existing-features)
  - [Features On All Pages](#features-on-all-pages)
  - [Features Of Individual Pages](#features-of-individual-pages)
- [Features Left To Implement](#features-left-to-implement)

3. [Technologies Used](#technologies-used)

- [Front-End Technologies](#front-end-technologies)
- [Back-End Technologies](#back-end-technologies)
- [Database Schema](#database-schema)

4. [Deployment](#deployment)

5. [Credits](#credits)

# User Experience

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

Imagery is important to create an eye-catching site. The images are primarily of products and are shown in the homepage and product details page.

:arrow_up: [Back to top](#table-of-contents)

# Features

## Existing Features

### Features on all pages

#### Navbar

- The responsive navigation bar contains three main sections. The first is the Electroshop logo
- The second section is the search bar, where the user can search for products by their name.
- The next section is the cart and My Account buttons where the user is able to login/register and navigate to the cart to view added products there.
- For the logged in user the account and cart buttons will be changed to a gravatar with welcome user. It is clickable to get the cart, profile and logout. For the admin there will be 3 extra links which is products, orders, users to manage it all.

#### Footer

- The footer was included to keep up with standard site navigation. The footer includes a quick copyright write up as this project is only for educational purposes.

### Features of individual pages

#### Home Page

- The homepage contains a list of latest products with the pagination to easily navigate between listed products.

#### Product Details

- This where all the product details are listed and gives the user the ability to add the product to cart plus adding a review.

#### Profile Page

- Users will be able to navigate to their Profile page via the navigation bar at the top of site. This page is where they will be able to update their profile details like their name, email and password as well as uploading a profile image. Users will also be able to see an order history and has the option to view order details. If they have made purchases. They will see the order is paid. If the order is delivered they will see that as well.

#### Cart

- This were the user will be able to see all cart items and update any of the items easily before proceeding to checkout.

#### Checkout

- This is where the user will be able to confirm the shipping address, payment details and review the order. The user will be prompted to fill out their information to complete the order here. There will be two method of payment whether paypal or Stripe. I have implemented Paypal to manage payments and Stripe will be added later.

#### Order Details

- This is where all the order information are diplayed including whether the order is paid or delivered.

## Features Left To Implement

- Add Email confirmation after signing up.
- Add forget password functionality.
- Allow users to sort products according to price, rating.
- Add Stripe functionality to handle payment through stripe.
- Social Media Login: Allowing users to log in with their Facebook or Google credentials.

:arrow_up: [Back to top](#table-of-contents)

# Technologies Used

## Front-End Technologies

- [MUI](https://mui.com/)
- [React JS](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) For State Managment.
- [React Router DOM V6.4](https://reactrouter.com/en/main) For handling navigation
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

After careful consideration and taking into account all the different parts of the website and needs of the database, I designed the schema in the following models:

- **User:** This includes all the details of the user (name, email, password, image) and isAdmin to define if the user is admin or not. This model is used for singing in/up and to display user details in profile page.

- **Order:** This includes the overall order in full, including the delivery details from (from or added to the user profile) and the order_items.

- **Product:** This includes all the information related to each product, including the product item price, image, name, descriptions, brand, count in stock and number of reviews.

- **Review:** This review model used to display review rating, name and comment for products that is unreviewed before.

# Deployment

1.  Open up Render and log your account
3.  Create a new web service, called electroshop, and connect to the project GitHub repository.
4. Make sure to add all environment variables on order for the app to load fine. This can be done through the Environment tab when selecting the project on the Render website.

    Tada! Now the site should be deployed!

:arrow_up: [Back to top](#table-of-contents)

# Credits

## Media

- All of the product details including images were taken from [Amazon](https://amazon.com/) and [Best Buy](https://bestbuy.com/)
