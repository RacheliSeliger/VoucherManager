# VoucherManager

The Voucher Manager is a web application that allows you to manage vouchers with barcode and amount. It provides functionality to insert a new voucher, retrieve the oldest voucher barcode, and delete a voucher.

## Features
* Insert a voucher: You can enter a barcode and amount to add a new voucher to the system.
* Get oldest voucher: Retrieve the barcode of the oldest voucher in the system.
* Delete a voucher: Remove a voucher from the system using its barcode.

 ## Prerequisites

Before running the application, make sure you have the following installed:
* Node.js: Version 12 or higher.
* MongoDB: Make sure you have a MongoDB database set up.

## Installation
1. Clone the repository: git clone https://github.com/RacheliSeliger/VoucherManager.git
2. Navigate to the project directory: ``` cd VoucherManager```
3. Install dependencies: ``` npm install ```




## Configuration
* Open the .env file in the project directory.
* Update the MongoDB connection string with your own MongoDB database URL.


## Usage
1. Start the server: ``` npm start```
2. Open your web browser and go to http://localhost:3000 to access the Voucher Manager.
3. Enter a barcode and amount in the input fields and click "Save Voucher" to insert a new voucher.
4. Click "Get Voucher" to retrieve the barcode of the oldest voucher.
5. To delete a voucher, enter the barcode in the input field and click "Delete Voucher".

