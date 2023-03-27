## improved-ecomm

### About
Customized ecommerce store application built with Django REST Framework, React js and Redux.

[demo.webm](https://user-images.githubusercontent.com/17944945/228023750-ab3fa107-e81b-4ede-a620-a7a0bba73306.webm)


### Features

- django
- react redux
- postgres/docker img
- demo payments paypal sandbox

theme from https://bootswatch.com/
https://react-bootstrap.github.io/
icons https://cdnjs.com/libraries/font-awesome
redux react-redux redux-thunk @redux-devtools/extension

Product images should be served via AWS S3/boto/cloudflare cdn, however for this concept project - imgs are served from local dir

### Try it yourself
The best way to run this project is to use Docker. Go to `docker` folder, then run `docker-compose up`.  After building the project, run django migrations and create superuser. 
Also, remember to change paypal account ID (`client-id`) at OrderPage.js.
