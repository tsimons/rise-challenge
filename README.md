## The Rise Developer Challenge

This was a really fun challenge! I decided to take it a bit further to give you a better idea of my coding style. It was a good refresher into mongo db since I've used MySQL for the last couple years. I saw the variable storage that was originally there, and decided to implement a real db with a slightly more realistic api. I tried to put this into the perspective of actually writing this for the product, and not just write the knowledge block which led to creating a much more robust api. There are a few parts that acknoledge that this is a code challenge where it wasn't important for completing the challenge.

### Running the project

```sh
docker-compose build
docker-compose up
```

The front end will be available at http://localhost:4000, the api is at http://localhost:4001

### Overview

#### Unimplemented

- Automated tests
- Front end animations

#### Front End

The front end was created with `create-react-app`. I wanted to use nextjs to run the server and client since the scope of this code challenge is small and it would make things pretty easy to manage. I decided against it because I wanted to put myself in the position of writing this for the real rise.com product which I imagine splits up the front and back end.

To serve this, I do rely on the webpack dev server since it is just a code challenge. If it was the real deal, I would of course build the static files to be served elsewhere, or even distribute the code via an npm package for another service to import.

I would've liked to add animations, but I've spent far more time on the back end than I had planned to and I feel it's strong enough to submit.

#### Back End

THe backend is mongo/mongoose/express. The db gets seeded via db/mongo-init.js. I kept the business logic separate from the express route handlers to help maintain a separation of concerns and follow the single responsibility principle. I've got a typical REST api setup as well as some bff routes (Back-end For Front-end) that reduce the number of api requests to complete tasks. This reduces the number of requests needed from the front end to load/update the api. It also separates logic that involves multiple features to help keep them pure.
