# Entry Management Software. 
Innovaccer SDE internship assignment.

Quick Start
# Install dependencies
npm install for both frontend and backend

# Create Database
Create a MongoDb datbase by the name of Test

# Run the Express server
npm start

# Run the React client
npm run start

# Server runs on http://localhost:3000 and client on http://localhost:3001

Create a .env file in the root folder for the apikey, apisecret for nexmo and username, password, key for sgMail

```
apisecret = Nexmo_Secretkey
apikey=Nexmo_Apikey
username=EmailId_FOR_sgMail
pass=Password_for_sgMail
sgkey = sgMail_key
```

## Technology Used
NodeJS
ReactJS
Mongoose
ExpressJS
Sgmail (for mailing)
Nexmo (for sending SMS)
## Approach
- Upon visiting, a visitor has to fill up the check-in form that comprises of all the mandatory fields. A unique id is provided to the User for todays meeting
- On submit, the visit entry is made into the database with all the necessary details.
- Mail is sent to the host telling him about the details of he visitor so the he can proceed for the meeting.
- To check-out, the visitor has to provide its unique id which was provided at time of entry for authenticaion of user.
- The check out time is stored and a mail is sent to the visitor providing him the details of his visit. 
## APIs
POST /api/entry
To check-in a visitor
POST /api/checkout
To check-out a visitor
