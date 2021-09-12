# Dr-Net

Ever faced the need of getting consultation from a medical professional but dont want to go to clinic for it.

So here comes Dr-Net a web-portal where you can chat with any medical professional as per you choice and get consulted.

## Features





## Tech Stack 🗃

 <img src="https://img.shields.io/badge/-MongoDB-yellow?style=flat&logo=mongoDB"> <img src="https://img.shields.io/badge/-ExpressJS-grey?style=flat&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/ReactJS%20-%2320232a.svg?logo=react" >   <img src="https://img.shields.io/badge/-NodeJS%20-%2320232a?style=flat&logo=node.js"> 
 

##  Getting Started 👨‍💻
### Setup the repository to your local environment.

1. `Fork` the repository  - Creates a replica of repository to your local environment.
2. Clone the repository - Downloads all repo files to your machine, using
  ```git
  git clone https://github.com/YOUR-USERNAME/Dr-Net
  ``` 
3. Set working directory to the root directory of the project.
  ```sh
  cd Dr-Net
  ```
  ## Frontend ⚛️

Following are the steps to run the frontend of the Dr-Net on your local. All the frontend code will go in the `frontend` directory. 

1. Navigate to `frontend` folder.
  ```sh
  cd frontend
  ```
2. Install all the required packages and dependencies.
  ```node
  npm install
  ```
3. Run the server.
  ```node
  npm start
  ```
4. [Click here](http://localhost:3000) to view it in the browser OR navigate to
  ```text
  http://localhost:3000
  ```

  ## Backend 💻

Following are the steps to run the backend of the Dr-Net on your local. All the backend code will go in the `backend` folder.

1. Navigate to `backend` folder.
  ```sh
  cd backend
  ```
2. Install all the required packages and dependencies.
  ```node
  npm install
  ```
4. Create your account at [braintree](https://sandbox.braintreegateway.com/login) and get your api keys from [API section](https://sandbox.braintreegateway.com/merchants/82mh3grtnb22rfpz/users/dyk5dscspsbd9tby/api_keys) and save them in .env file of backend
```
BRAINTREE_MERCHANT_ID=
BRAINTREE_PUBLIC_KEY=
BRAINTREE_PRIVATE_KEY=
```  
3. Run the server.
  ```node
  npm start
  ```
4. [Click here](http://localhost:5000) to see the backend server runing in the browser OR navigate to
  ```text
  http://localhost:5000
  ```

## Socket 💬

Following are the steps to run the socket server of the Dr-Net on your local. All the socket code will go in the `socket` folder.

1. Navigate to `socket` folder.
  ```sh
  cd socket
  ```
2. Install all the required packages and dependencies.
  ```node
  npm install
  ```
3. Run the server.
  ```node
  npm start
  ```
4. [Click here](http://localhost:5003) to see the socket server runing in the browser OR navigate to
  ```text
  http://localhost:5003
  ```

## Testing Credentials 🤖

dummy login credential (patient)
```
email : authtest@gmail.com
pssword: authtest
```

dummy login credential (doctor)
```
email : doctor2@gmail.com
pssword: doctor2
```
For testing payment related info please refer [this](https://developer.paypal.com/braintree/docs/reference/general/testing#test-value-4500600000000061)
