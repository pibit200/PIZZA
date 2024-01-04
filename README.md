Realtime pizza app using Node-express-mongo-socket.io

![Screenshot 2023-07-13 125711](https://github.com/pibit200/pizza-ordering-app/assets/134590398/1bf9be21-1e53-4b4d-893b-f12afcf40134)

The real-time pizza ordering website is a user-friendly platform that allows customers to order pizzas online and receive real-time updates on their order status. The website is built using HTML, CSS, and JavaScript for the front-end, Express.js as the web application framework, Socket.io for real-time communication, MongoDB for the database, EJS (Embedded JavaScript) and Node.js as the templating engine.

The website has a visually appealing and responsive design, ensuring a seamless experience across different devices. The homepage welcomes the users with an attractive layout, showcasing various pizza options and special offers. The navigation bar provides easy access to different sections of the website, including the menu, cart, and user profile.

Users can browse through the menu section, which displays a wide range of pizzas with enticing descriptions, images, and prices. They can add their desired pizzas to the cart and customize quantity. The cart dynamically updates as items are added, providing an overview of the selected items along with the total cost.

To place an order, users are required to create an account or log in if they already have one. The user profile section allows customers to manage their personal information, view order history, and track the status of their current orders.

Upon placing an order, the website utilizes Socket.io to provide real-time updates to the user. Customers can track the progress of their order, from the moment it is received to the preparation, baking, and delivery stages. They receive notifications whenever there is a change in the order status, ensuring they are always informed.
It communicates with the MongoDB database to store and retrieve data related to pizzas, user profiles, and order details. EJS templates are used to generate dynamic HTML pages, rendering data from the server and providing a seamless user experience.
