
# 🩺 Dr-Net

Ever faced the need of getting quick consultation from a medical professional but dont want to go to clinic for it.

So here comes Dr-Net a web-portal where you can chat with any medical professional as per you choice and pay his/her consulation fees and get access to chat with him/her and resolve your queries.

## ⭐ Features

- ✅ Easy signin/signup.
![image](https://user-images.githubusercontent.com/70805691/178355243-e4860609-2686-4b43-a3db-b96051b5fc09.png)
- ✅ Simple and quick payment.
![image](https://user-images.githubusercontent.com/70805691/178361134-9ea338d1-eb76-4b1a-adf4-2f6d5d1e1d30.png)
- ✅ Shows the online activity of user and realtime chat.
![image](https://user-images.githubusercontent.com/70805691/178369000-4b497bdd-bf89-4f7b-8546-9e571505d8fa.png)
- ✅ Simple UI.
![image](https://user-images.githubusercontent.com/70805691/178361245-f35b00fd-1953-4a08-8cd7-a953a33ccfc4.png)
![image](https://user-images.githubusercontent.com/70805691/178368583-6005befc-3df7-4b32-a34e-7031597152c9.png)






## 🗃 Tech Stack 

 <img src="https://img.shields.io/badge/-MongoDB-yellow?style=flat&logo=mongoDB"> <img src="https://img.shields.io/badge/-ExpressJS-grey?style=flat&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/ReactJS%20-%2320232a.svg?logo=react" >   <img src="https://img.shields.io/badge/-NodeJS%20-%2320232a?style=flat&logo=node.js"> 
 

## 👨‍💻 Getting Started 
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
  ## ⚛️Frontend Setup
  ```sh
  cd frontend
  npm install
  npm start
  ```
4. [Click here](http://localhost:3000) to view it in the browser OR navigate to
  ```text
  http://localhost:3000
  ```

  ## 💻 Backend Setup
  ```sh
  cd backend
  npm install
  ```
Create your account at [braintree](https://sandbox.braintreegateway.com/login) and get your api keys from [API section](https://sandbox.braintreegateway.com/merchants/82mh3grtnb22rfpz/users/dyk5dscspsbd9tby/api_keys) and save them in .env file of backend
```
BRAINTREE_MERCHANT_ID=
BRAINTREE_PUBLIC_KEY=
BRAINTREE_PRIVATE_KEY=
```  
Run the server.
  ```node
  npm start
  ```
4. [Click here](http://localhost:5000) to see the backend server runing in the browser OR navigate to
  ```text
  http://localhost:5000
  ```

## 💬 Socket Server

Following are the steps to run the socket server of the Dr-Net on your local. All the socket code will go in the `socket` folder.

1. Navigate to `socket` folder.
  ```sh
  cd socket
  npm install
  npm start
  ```
4. [Click here](http://localhost:5003) to see the socket server runing in the browser OR navigate to
  ```text
  http://localhost:5003
  ```

## 🤖 Testing Credentials 

dummy login credential (patient)
```
email : dummypatient@gmail.com
pssword: 123456
```

dummy login credential (doctor)
```
email : demo_doc1@gmail.com
pssword: 123456
```
For testing payment related info please refer [this](https://developer.paypal.com/braintree/docs/reference/general/testing#test-value-4500600000000061)
| Purpose | Test Card Number| Extra Info |
|--|--|--|
| successful transaction | 4500600000000061  | Valid expiry date and amount bwteen 0.01 to 1999.99 |
| unsuccessful transaction | 4000111111111115 | Invalid Expiry date or amount between 2000 to 2999 |
