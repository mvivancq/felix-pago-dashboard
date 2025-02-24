Felix Pago Dashboard
Description
This project is a transaction management dashboard that allows users to view and manage transaction details such as:

Amount sent and received.
Transaction status (Pending, Completed, Failed).
Exchange rate and fees.
Ability to filter and customize the columns displayed in the table.
Pagination for handling large datasets.
Detailed transaction views in modals.
Prerequisites
Before you can set up the project, ensure that you have the following tools installed:

Node.js (managed by NVM for version management)
NVM (Node Version Manager)
Step 1: Install NVM (Node Version Manager)
NVM allows you to easily install and switch between different versions of Node.js.

Installing NVM:
For macOS/Linux: Open a terminal and run the following command to install NVM:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
For Windows: Follow the instructions provided in the NVM for Windows GitHub page.

Verify NVM Installation:
After installing, restart your terminal and check the installation with:

nvm --version
You should see the version of NVM installed.

Step 2: Install Node.js
Once NVM is installed, you can install the required version of Node.js for the project.

Install Node.js Version 16.x:
The project requires Node.js version 16.x. Run the following command to install it:

nvm install 16
Use Node.js Version 16.x:
To switch to Node.js 16.x, run:

nvm use 16
Set Node.js Version 16 as Default (optional):
If you want Node.js version 16 to be used by default every time you open a new terminal window, run:

nvm alias default 16
Verify Node.js Version:
Make sure Node.js 16 is active by running:

node -v
It should return something like:

v16.x.x
Step 3: Clone the Project Repository
Clone the project to your local machine by running:

git clone https://github.com/your-username/your-project-name.git
Navigate into the project directory:

cd your-project-name
Step 4: Install Project Dependencies
Once inside the project folder, install the necessary dependencies by running:

npm install
This will install all the packages listed in package.json.

Step 5: Run the Development Server
To run the project locally, use the following command:

npm run dev
This will start the development server and you can access the project in your browser at http://localhost:3000.

Step 6: Run Tests (Optional)
If the project has tests, you can run them with:

npm test
Project Structure
Here’s an overview of the project structure:

felix-pago-dashboard/
├── public/                # Public assets (images, index.html, etc.)
├── src/                   # Source code
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main App component
├── package.json           # Project metadata and dependencies
└── README.md              # This file


Features
Transaction Details: Displays detailed transaction data such as amount sent, receiver, status, etc.
Pagination: Allows users to paginate through large datasets of transactions.
Filters: Includes the ability to filter transactions based on attributes like status, amount, etc.
Customizable Columns: Users can choose which columns to display in the transaction table.
Modal View: Shows detailed transaction information in a modal with the option to close.
Technologies Used
React: Frontend framework for building the user interface.
TypeScript: Type safety for the project.
MUI (Material-UI): Component library for UI elements.
Recharts (optional): Charting library for data visualization.
Axios: For API calls.