## improved-ecomm

### About
Customized ecommerce store application built with Django REST Framework, React js and Redux.

[demo.webm](https://user-images.githubusercontent.com/17944945/228023750-ab3fa107-e81b-4ede-a620-a7a0bba73306.webm)


### Features
- Admin users/orders/products management
- Checkout process (integrated PayPal sandbox API)
- Fully featured shopping cart
- Products search feature
- JWT authentication (JSON Web Tokens) between DRF/react
- Products ratings and reviews
- Docker to quickly build this project

### Try it yourself
The best way to run this project is to use Docker. Go to `docker` folder, then run `docker-compose up`.  After building the project, run django migrations and create superuser. `.env` (backend) variables are prepared for docker. Remember to change paypal account ID (`client-id`) at OrderPage.js.
