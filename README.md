# assignment-portal
A backend system for an assignment submission portal where users can upload assignments and admins can accept or reject them.

**Step-by-step Process to run the Assignment submission portal backend.**

NOTE: Assuming that you have installed all the required software on your local system that are required to run this program successfully(like - MongoDB, Postman, Node.js, VsCode, etc).

Step-1: Clone the Repository(using the Submitted link), then navigate into the propject directory using the below given command:
         ** cd assignment-portal**

Step-2: Install Required Dependencies.
        Run the following command to install all necessary dependencies:

         ** npm install**

Step-3: Configure the .env file(if not done already).
        : Create a .env file in the project root directory.
        : Add the following configuration values(You can also change these values according to your requirements and system):

PORT=5000

MONGO_URI='mongodb://localhost:27017/assignment-portal'
    JWT_SECRET=9f100d7c91f295d81219632806fd6bf2c88742789351f581515f4067a3dd720124a757eba13d8d79bfa430a5aa59606c3be2319ad845992f8c462db8e4131eb9

Note: MongoDB server must be started/running(for successfull db connection) .

Step- 4: Run the application.
        Start the server using the following command:
        :**npm run dev**

        Note: The server will start at the URL: **http://localhost:5000**

Step - 5: Test the API Endpoints : 
          Tools used : Postman

          **Endpoints Overview:**
            1.User Endpoints:

              POST /api/users/register: Register a user.
              POST /api/users/login: Login and get a token.
              POST /api/users/upload: Upload an assignment (authenticated).
              GET /api/users/admins: Fetch all admin details (authenticated).

            2.Admin Endpoints:

              POST /api/admins/register: Register an admin.
              POST /api/admins/login: Login as admin.
              GET /api/admins/assignments: View assignments tagged to an admin (authenticated).
              POST /api/admins/assignments/:id: Accept or reject an assignment (authenticated).


Note: If all the above mentioned steps are performed successfully, then the entir porgram will function smoothly and perform all the mentioned functionalities. 
