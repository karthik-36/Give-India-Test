# Give-India-Test
transaction-api

Multi-doc-transactions requires MongoDB version 4.0+ and replica-set to work.

So, First you need to create a replica-set with mongodb, then add 
db named 'giveindia' and collection named 'Users'. Now you can inport data from 'sample data -3 users with multiple accounts' JSON file (file is in root directory) or
you can add users and their accounts yourself using '/addUser' and '/addAccount' in my API.

Refer to Postman Documentation for API details : https://documenter.getpostman.com/view/5175244/TVCjwkYv

Follow this with 'npm install' in your cloned directory to install any missing packages and run 'node server.js'.
