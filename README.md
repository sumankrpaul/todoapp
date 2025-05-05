# TodoApp

A basic TODO App using __Node.Js__ with __Fastify.Js__ framework for API Developement . FrontEnd in __Vue.Js__, using __Pinia__ and State management with __Vite__ .

  

# File Structure

  

-  __./**__ : Containing the Docker Compose File with set up to run the applications and PGSql Server in Development Mode

  

-  __./fontend/**/*__ : Cotaining the Front End Application

  

-  __./backend/**/*__ : Backend API Server Application

  
  

# Starts Up

  

## First Step

This app depends on Firebase for Authentications. So you would need __Firebase Config Json__ and __Service Account Credentials__  *(for Firebase Admin)* to run properly. First download __Firebase Config Json__ & __Firebase Service Account Credentials__ from [Firebase Console ](https://console.firebase.google.com/)

  

## Second Step

Create two Config file named __configs.ts__ in the following locations

  

- __Backend__: For backend create file here `backend\src\lib\configs.ts`

  

- __Frontend__: For FrontEnd create File here `fontend\src\plugins\configs.ts`

  

## Third Step

Copy the Firebase Jsons in the files:

  

- For Backend copy __Service Account Credentials__ in the file `backend\src\lib\configs.ts` as follow

```
	export const firebaseConfig ={
		"type": "service_account",
		"project_id": YOUR PROJECT ID,
		"private_key_id": YOUR PRIVATE KEY ID,
		"private_key": PRIVATE KEY
		"client_email": CLIENT EMAIL,
		"client_id": CLIENT ID,
		"auth_uri": AUTH URL,
		"token_uri": AUTH TOKEN URI,
		"auth_provider_x509_cert_url": PROVIDER CERT,
		"client_x509_cert_url": CERT URL,
		"universe_domain": UNIVERSAL DOMAIN
	}
```

- For Front End copy __Firebase Config Json__ in the file `fontend\src\plugins\configs.ts` as follows

  

```
	export const firebaseConfig = {
		apiKey: API KEY,
		authDomain: AUTH DOMAIN,
		projectId: PROJECT ID,
		storageBucket: STORAGE BUCKET,
		messagingSenderId: SENDER ID,
		appId: APP ID
	};
```

  

## Last Step

  

Finally start the server using the following command to run the docker-compose file

` docker-compose up `

  
  

> **Note:** The Docker Compose may not work smoothly in the first attempt, in such a case kindly try seccond time.

> **Note:** The Docker Compose file is running the app in **Developpment Mode** hence using volumes for node_modules.