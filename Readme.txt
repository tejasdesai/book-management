Setting up the project


Step 1: Install XAMPP Server and Start Apache and MySQL server from Control Panel of XAMPP Server.

Step 2: Setup database

		1. Visit <ServerName>/phpmyadmin from web browser. This wil open phpMyAdmin to run MySQL queries.

		2. Create database named "bookstore"

		3. Create folowing tables in above database
			"Books" -> 	i. book_id (int 100)
						ii.	category (varchar 100)
						iii. available_copies (int 100)
						iv.	isbn (varchar 500)
						v.	authors (varchar 500) 
						vi.	publishers (varchar 500)
						vii. title (varchar 500)
						viii. cost (float)
						ix. cover_image_path (varchar 500)
						x. subject (varchar 500)
						xi.	is_donated (tinyint 1)
						xii. approved (int 255)

			"Cart" -> i. id (int 255)
					  ii. customer_id (int 255)
					  iii. book_id (int 255)
					  iv. date_added (varchar 255)

			"Category" -> i. category_id (int 100)
						  ii. category_name (varchar 500)

			"Contacts" -> i. contact_id (int 255)
						  ii. contact_name (varchar 255)
						  iii. contact_email (varchar 255)
						  iv. contact_phone (varchar 255)
						  v. contact_message (longtext)

			"Customer" -> i. customer_id (int 100)
						  ii. first_name (varchar 500)
						  iii. last_name (varchar 500)
						  iv. contact_number (varchar 500)
						  v. email_id (varchar 500)
						  vi. address (text)
						  vii. isAdmin (int 100)

			"Passcode" -> i. email_id (varchar 255)
						  ii. passcode (varchar 255)
						  iii. generated_at (varchar 255)
						  iv. expiry (varchar 255)

			"Requests" -> i. req_id (int 50)
						  ii. email_id (varchar 100)
						  iii. customer_id (int 50)
						  iv. book_name (varchar 500)
						  v. requested_on (varchar 100)

			"Transaction" -> i. transaction_id (varchar 255)
							 ii. date (varchar 255)
							 iii. email (varchar 255)
							 iv. address (varchar 255)
							 v. city (varchar 255)
							 vi. state (varchar 255)
							 vii. zip (varchar 255)
							 viii. amount (float)
							 ix. name (varchar 255)
							 x. products (longtext)
							 xi. tax_collected (float)
							 xii. customer_id (int 20)

Step 3: Create a folder named 'Book' inside 'XAMPP/htdocs'. Create folder named 'uploads' inside 'Book' folder. Place 'processing.php' and 'config.php' inside 'Book' folder.

Step 4: Setting up Angular 6 environment
		
		1. Open Terminal / Command Prompt
		2. Run following command to install Angular CLI
			npm install -g @angular/cli
		3. Browse to the folder where you want to keep your front end
		4. Run following command to create a 'book' app
			ng new book
		5. Now, paste the content of attached 'book' folder in this newly created 'book' app folder.
		6. To start run the website in web browser, run following command
			ng serve --port 4201
		7. Open a web browser and visit following url
			http://<Servername>:4201 

Step 5: Setting up Node.js server for sending emails

		1. Open another terminal window
		2. Browse to the folder where you want to keep your node server
		3. Run following commands to install node.js
			ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
			brew install node
		4. Broswe to the Node server folder and place attached 'server.js' inside the folder
		5. Run following command to start Node.js server
			node server.js



I hope everything works perfect after following all these steps. If you face any issue, please email me at tdesai1511@gmail.com











 
