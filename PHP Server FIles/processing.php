<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$values = (array) $request;

include 'config.php';        //cofig file include
global $details;

$conn = new mysqli($details['server_host'], $details['mysql_name'],$details['mysql_password'], $details['mysql_database']);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if($_REQUEST['method'] == "register") {

	$fname = $lname = $password = $contact = $email = $address = $tablename = '';
	
	$fname = $values['fname'];
	$lname = $values['lname'];
	$password = $values['password'];
	$contact = $values['contact'];
	$email = $values['email'];
	$address = $values['address'];
	$isAdmin = $values['isAdmin'];

	$sql = "Select * from `Customer` where email_id = '".$email."'";
	$result = mysqli_query($conn, $sql);

	if(mysqli_num_rows($result) > 0){
		echo 'User Exists';
	} else {
		$sql = "INSERT INTO `Customer` (`first_name`, `last_name`, `password`, `contact_number`, `email_id`, `address`, `isAdmin` )VALUES ('".$fname."','".$lname."','".base64_encode($password)."','".$contact."','".$email."','".$address."', '".$isAdmin."')";
		
		if(mysqli_query($conn, $sql)){
			echo 'User Created';
		} else {
			echo "Error: " . $sql . "" . mysqli_error($conn);
			exit;
		}
	}
} else if($_REQUEST['method'] == "login") {
	
	$email = $password = '';
	
	$email = $values['email'];
	$password = $values['password'];
	$loginas = $values['loginas'];
	$count = 0;

	$sql = "Select * from `Customer` where email_id = '".$email."' and password = '".base64_encode($password)."'";
	
	if($result = mysqli_query($conn, $sql)){

		if(mysqli_num_rows($result) > 0){
			$row = mysqli_fetch_assoc($result);

			if(($loginas == '0' && $row['isAdmin'] == '0') || ($loginas == '0' && $row['isAdmin'] == '1')){
				$id = $row['customer_id'];
				$sql2 = "select * from Cart where customer_id = '".$row['customer_id']."'";
				$result2 = mysqli_query($conn, $sql2);
				$count = mysqli_num_rows($result2);
			} else if($loginas == '1' && $row['isAdmin'] == '0') {
				echo "Not Allowed";
				exit;
			} else {
				$id = $row['customer_id'];
			}

			echo $id."==".$row['first_name']."==".$row['isAdmin']."==".$count;
		} else {
			$response = 'Invalid User';
			echo $response;
		}
	}
} else if($_REQUEST['method'] == "addcategory"){
	
	$category = $values['cname'];

	$sql = "Select * from `Category` where category_name = '".$category."'";
	$result = mysqli_query($conn, $sql);

	if(mysqli_num_rows($result) > 0){
		echo 'Category Exists';
	} else {
		$sql = "INSERT INTO `Category` (`category_name`)VALUES ('".$category."')";
	
		if(mysqli_query($conn, $sql)){
			echo 'Category Created Successfully';
		} else {
			echo "Error: " . $sql . "" . mysqli_error($conn);
			exit;
		}
	}

	$conn->close();	
} else if($_REQUEST['method'] == 'getcategories'){
	
	$sql = "SELECT * FROM `Category` WHERE `category_name` != 'All Books'";
	$result = mysqli_query($conn, $sql);
	$categories = array();
	if($result){
		while ($row = mysqli_fetch_assoc($result)) {
		    array_push($categories, $row['category_name']);
		}
		$cat_names_json = json_encode($categories);
		echo $cat_names_json;

	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'addbook'){
	$isbn = $publisher = $subject = '';
	$approved = $values['approved'];

	$category = $values['category'];
    $copies = $values['copies'];
    if(isset($values['isbn'])){
    	$isbn = $values['isbn'];	
    }
    
    $author = $values['author'];
    
    if(isset($values['publisher'])){
    	$publisher = $values['publisher'];	
    }

    $title = $values['title'];
    $cost = $values['cost'];
    
    if(isset($values['subject'])){
    	$subject = $values['subject'];	
    }

    $filename = $values['cimage'];
    $donate = $values['donate'];
    if($donate == 'yes'){
    	$donate = '1';
    } else if($donate == 'no'){
    	$donate = '0';
    }

   
    $sql = "Select * from `Books` where title = '".$title."'";
	$result = mysqli_query($conn, $sql);

	if(mysqli_num_rows($result) > 0){
		echo 'Book Exists';
	} else if($title != '') {
		$target_dir = "uploads/";
		$target_file = $target_dir.$filename;

		$sql = "INSERT INTO `Books` (`category`, `available_copies`, `isbn`, `authors`, `publishers`, `title`, `cost`, `cover_image_path`, `subject`, `is_donated`, `approved`)VALUES ('".$category."','".$copies."','".$isbn."','".$author."','".$publisher."','".$title."','".$cost."','".$target_file."','".$subject."','".$donate."','".$approved."')";
		
		if(mysqli_query($conn, $sql)){
			echo 'Book Added';
		} else {
			echo "Error: " . $sql . "" . mysqli_error($conn);
			exit;
		}
	}
} else if($_REQUEST['method'] == 'uploadfile'){
	$target_dir = "uploads/";
	$target_file = $target_dir.$_FILES['image']['name'];
	
	if (file_exists($target_file)) {
	    echo "Sorry, file already exists.";
	    exit;
	} else {
		if(move_uploaded_file($_FILES['image']['tmp_name'], $target_file)){
			echo "Uploaded Successfully";
		} else {
			echo "Upload failed";
		}
	}
	exit;
} else if($_REQUEST['method'] == 'getbooks'){
	$selectedcat = '';
	$andcondition = '';
	$where = '';
	
	if(empty($values['selectedcat']) || $values['selectedcat']=='All Books'){
		$where = "`approved` = '1'";
	} else {
		$where = "category = '".$values['selectedcat']."' and `approved` = '1'";
	}

	if(!empty($values['searchkey'])){
		$andcondition = " and (`isbn` like '%".$values['searchkey']."%' or `title` like '%".$values['searchkey']."%' or `authors` like '%".$values['searchkey']."%')";
	}

	if(isset($_REQUEST['getall'])){
		$where = "1";
	}
	$sql = "Select * from `Books` where ".$where.$andcondition;
	$result = mysqli_query($conn, $sql);
	$books = array();
	if($result){
		while ($row = mysqli_fetch_assoc($result)) {
		    $books[] = $row;
		}
		$books_json = json_encode($books);
		echo $books_json;

	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'getbookdetail'){
	$book_id = $values['book-id'];

	$sql = "Select * from `Books` where book_id=".$book_id;
	$result = mysqli_query($conn, $sql);
	$books = array();
	if($result){
		while ($row = mysqli_fetch_assoc($result)) {
		    $books[] = $row;
		}
		$books_json = json_encode($books);
		echo $books_json;

	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'addtocart') {
	$custid = $values['customer-id'];
	$bookid = $values['book-id'];
	$timestamp = $values['timestamp'];

	$sql = "INSERT INTO `Cart` (`customer_id`, `book_id`, `date_added`)VALUES ('".$custid."','".$bookid."','".$timestamp."')";
	if(mysqli_query($conn, $sql)){
		echo 'Added';
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'getcartitems') {
	$custid = $values['cust-id'];
	$sql = "SELECT b.`book_id`, b.`title` title, b.`authors` author, b.`cost` cost, b.`cover_image_path` cimage FROM `Books` b LEFT JOIN `Cart` c ON b.`book_id` = c.`book_id` WHERE c.`customer_id` = '".$custid."'";

	$result = mysqli_query($conn, $sql);
	$cartitems = array();
	if($result){
		while ($row = mysqli_fetch_assoc($result)) {
		    $cartitems[] = $row;
		}
		$cartitems_json = json_encode($cartitems);
		echo $cartitems_json;

	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}

} else if($_REQUEST['method'] == 'deletecartitem'){
	$custid = $values['cust-id'];
	$book_id = $values['book-id'];
	$sql = "DELETE from `Cart` where `customer_id` ='".$custid."' and `book_id` = '".$book_id."'";
	if(mysqli_query($conn, $sql)){
		echo "Item Deleted";
	}
} else if($_REQUEST['method'] == 'addtransaction'){
	$transaction_id = time().strtoupper(substr(uniqid(sha1(time())),0,4));
	$date = $values['date'];
	$email = $values['email'];
	$address = $values['address'];
	$city = $values['city'];
	$state = $values['state'];
	$zip = $values['zip'];
	$amount = $values['amount'];
	$fullname = $values['fullname'];
	$products = $values['products'];
	$tax_collected = $values['tax_collected'];
	$customer_id = $values['customer_id'];

	$productids = array();

	for($i=0; $i < sizeof($products); $i++){
		array_push($productids, $products[$i]->book_id);
	}
	$bookids = join(",",$productids);

	$sql = "INSERT INTO `Transaction` (`transaction_id`, `date`, `email`, `address`, `city`, `state`, `zip`, `amount`, `name`, `products`, `tax_collected`, `customer_id`)VALUES ('".$transaction_id."','".$date."','".$email."','".$address."','".$city."','".$state."','".$zip."','".$amount."','".$fullname."','".json_encode($products)."','".$tax_collected."','".$customer_id."')";
	
	if(mysqli_query($conn, $sql)){
		$sql1 = "DELETE from Cart where customer_id='".$customer_id."' and book_id IN (".$bookids.");";
		$sql1 .= "UPDATE Books set available_copies= available_copies-1 where book_id IN (".$bookids.")";
		if(!mysqli_multi_query($conn, $sql1)){echo "Error: " . $sql . "" . mysqli_error($conn);}
		echo 'Success';
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'resetpassword'){
	$cust_id = $values['cid'];
	$oldpass = $values['oldpass'];
	$newpass = $values['newpass'];

	$sql = "SELECT * from `Customer` where `customer_id` = '".$cust_id."' and `password` = '".base64_encode($oldpass)."'";
	$result = mysqli_query($conn, $sql);

	if(mysqli_num_rows($result) > 0){
		$sql1 = "UPDATE `Customer` set `password` = '".base64_encode($newpass)."' where `customer_id` = '".$cust_id."'";
		if(mysqli_query($conn, $sql1)){
			echo "Updated";
		} else {
			echo "Error: " . $sql . "" . mysqli_error($conn);
			exit;
		}

	} else {
		echo "Incorrect";
	}

} else if($_REQUEST['method'] == 'resetadminpassword'){
	$admin_id = $values['cid'];
	$oldpass = $values['oldpass'];
	$newpass = $values['newpass'];

	$sql = "SELECT * from `Customer` where `customer_id` = '".$admin_id."' and `password` = '".base64_encode($oldpass)."'";
	$result = mysqli_query($conn, $sql);
	
	if(mysqli_num_rows($result) > 0){
		$sql1 = "UPDATE `Customer` set `password` = '".base64_encode($newpass)."' where `customer_id` = '".$admin_id."'";
		if(mysqli_query($conn, $sql1)){
			echo "Updated";
		} else {
			echo "Error: " . $sql . "" . mysqli_error($conn);
			exit;
		}

	} else {
		echo "Incorrect";
	}
} else if($_REQUEST['method'] == 'checkifregistered'){
	$emailid = $values['email'];
	$passcode = $values['passcode'];
	$currenttime = time();
	$expiry = $currenttime + 300;
	
	$sql = "SELECT a.`email_id` from `Customer` a where a.`email_id` = '".$emailid."'";
	$result = mysqli_query($conn, $sql);
	
	if(mysqli_num_rows($result) > 0){
		
		$sql1 = "INSERT INTO `Passcode` (`email_id`, `passcode`, `generated_at`, `expiry`) VALUES ('".$emailid."', '".$passcode."', '".$currenttime."', '".$expiry."') ON DUPLICATE KEY UPDATE `passcode` = '".$passcode."', `generated_at` = '".$currenttime."', `expiry` = '".$expiry."'";

		if(mysqli_query($conn, $sql1)){
			echo "Found";
		}
	}else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'recoverpassword'){
	$email = $values['email'];
	$passcode = $values['passcode'];
	$password = $values['password'];

	$sql = "SELECT * from `Passcode` where `email_id` = '".$email."'";
	$result = mysqli_query($conn, $sql);
	if(mysqli_num_rows($result) > 0){
		$row = mysqli_fetch_assoc($result);
		if($row['passcode'] != $passcode){
			echo "Incorrect Passcode";
			exit;
		} else if($row['expiry'] < time()){
			echo "Passcode Expired";
			exit;
		} else {
			$sql1 = "UPDATE `Customer` SET `password` = '".base64_encode($password)."' where `email_id` = '".$email."'";
			mysqli_query($conn, $sql1);
			echo "Password Updated";
			exit;
		}

	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'manageavailability'){
	$bookid = $values['bookid'];
	$action = $values['action'];

	$sql = "UPDATE `Books` set `approved` = '".$action."' where `book_id` = '".$bookid."'";
	if(mysqli_query($conn, $sql)){
		if($action == '1'){
			echo "Available";
		} else {
			echo "Unavailable";
		}
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'deletebook'){
	$bookid = $values['bookid'];

	$sql = "DELETE from `Books` where `book_id` = '".$bookid."'";
	if(mysqli_query($conn, $sql)){
		echo "Removed";
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'updatebook'){
	$bookid = $values['bookid'];
	$isbn = $publisher = $subject = '';
	// $approved = $values['approved'];

	$category = $values['category'];
    $copies = $values['copies'];
    if(isset($values['isbn'])){
    	$isbn = $values['isbn'];	
    }
    
    $author = $values['author'];
    
    if(isset($values['publisher'])){
    	$publisher = $values['publisher'];	
    }

    $title = $values['title'];
    $cost = $values['cost'];
    
    if(isset($values['subject'])){
    	$subject = $values['subject'];	
    }

    // $filename = $values['cimage'];
    $donate = $values['donate'];
    if($donate == 'yes'){
    	$donate = '1';
    } else if($donate == 'no'){
    	$donate = '0';
    }

   	$target_dir = "uploads/";
	//$target_file = $target_dir.$filename;

	$sql = "UPDATE `Books` SET `category` = '".$category."', `available_copies` = '".$copies."', `isbn` = '".$isbn."', `authors` = '".$author."', `publishers` = '".$publisher."', `title` = '".$title."', `cost` = '".$cost."', `subject` = '".$subject."', `is_donated` = '".$donate."' where `book_id` = '".$bookid."'";
	
	if(mysqli_query($conn, $sql)){
		echo 'Book Updated';
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'getorders'){
	$userid = $values['cust-id'];

	$sql = "SELECT * from `Transaction` where `customer_id` = '".$userid."'";
	$result = mysqli_query($conn, $sql);
	
	$orders = array();
	$books = array();
	if(mysqli_num_rows($result) > 0){
		while ($row = mysqli_fetch_assoc($result)) {
		    $cartitems[] = $row;
		}
		$cartitems_json = json_encode($cartitems);
		echo $cartitems_json;
		exit;

	} else {
		echo "No orders";
	}

} else if($_REQUEST['method'] == 'requestbook'){
	$userid = $values['userid'];
	$email = $values['email'];
	$title = $values['title'];

	$sql = "INSERT INTO `Requests` (`email_id`, `customer_id`, `book_name`, `requested_on`) VALUES ('".$email."', '".$userid."', '".$title."', '".time()."')";

	if(mysqli_query($conn, $sql)){
		echo "Success";
	}
} else if($_REQUEST['method'] == 'getrequestedbooks'){
	
	$books = array();

	$sql = "SELECT r.*, c.`first_name`, c.`last_name` from `Requests` r , `Customer` c  where r.`customer_id` = c.`customer_id`";
	if($result = mysqli_query($conn, $sql)){
		if(mysqli_num_rows($result) > 0){
			while ($row = mysqli_fetch_assoc($result)) {
			    $books[] = $row;
			}
			$books_json = json_encode($books);
			echo $books_json;
			exit;

		} else {
			echo json_encode($books);
		}
	}
} else if($_REQUEST['method'] == 'deleterequest'){
	$reqid = $values['reqid'];
	$sql = "DELETE from `Requests` where `req_id` = '".$reqid."'";
	if(mysqli_query($conn, $sql)){
		echo "deleted";
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'getstats'){
	$sales = array();
	$sql = "SELECT sum(amount) AS totalsale from `Transaction`
			UNION ALL
			SELECT sum(amount) AS yearlysale  From `Transaction` WHERE YEAR(DATE_FORMAT( DATE( FROM_UNIXTIME( `date` /1000 ) ) ,  '%Y-%m-%d' )) = YEAR(NOW())
			UNION ALL
			SELECT sum(amount) AS monthlysale from `Transaction` group by  DATE_FORMAT(DATE(FROM_UNIXTIME(DATE / 1000)), '%m-%Y') 
			UNION ALL
			SELECT sum(amount) AS weeklysale FROM `Transaction` WHERE  YEARWEEK( DATE_FORMAT( DATE( FROM_UNIXTIME( `date` /1000 ) ) ,  '%Y-%m-%d' ) , 1 ) = YEARWEEK(CURDATE(), 1)
			UNION ALL
			SELECT sum(amount) AS dailysale  From `Transaction` WHERE CONCAT(YEAR(DATE_FORMAT( DATE( FROM_UNIXTIME( `date` /1000 ) ) ,  '%Y-%m-%d' )),DAY(DATE_FORMAT( DATE( FROM_UNIXTIME( `date` /1000 ) ) ,  '%Y-%m-%d' ))) = CONCAT(YEAR(NOW()), DAY(NOW()))
			UNION ALL
			SELECT count(*) FROM `Customer` WHERE `isAdmin` = '0'
			UNION ALL
			SELECT count(*) FROM `Customer` WHERE `isAdmin` = '1'
			UNION ALL
			SELECT count(*) FROM `Books`
			UNION ALL
			SELECT count(*) FROM `Books` WHERE `is_donated` = '1'
			UNION ALL
			SELECT count(*) FROM `Requests`
			";
	if($result = mysqli_query($conn, $sql)){
		while ($row = mysqli_fetch_assoc($result)) {
			$sales[] = $row;
		}
		echo json_encode($sales);
	}
} else if($_REQUEST['method'] == 'addmessage'){
	if(!isset($values['contactname'])){return;}
	$contactname = $values['contactname'];
	$contactemail = $values['contactemail'];
	$contactphone = '';
	if(isset($values['contactphone'])){
    	$contactphone = $values['contactphone'];	
    }
	$contactmessage = $values['contactmessage'];

	$sql = "INSERT INTO `Contacts` (`contact_name`, `contact_email`, `contact_phone`, `contact_message`) VALUES ('".$contactname."', '".$contactemail."', '".$contactphone."', '".mysqli_real_escape_string($conn, $contactmessage)."')";
	
	if(mysqli_query($conn, $sql)){
		echo "Success";
	} else {
		echo "Error: " . $sql . "" . mysqli_error($conn);
		exit;
	}
} else if($_REQUEST['method'] == 'getmessages'){
	$messages = array();

	$sql = "SELECT * from `Contacts`";
	$result = mysqli_query($conn, $sql);
	
	if(mysqli_num_rows($result) > 0){
		while ($row = mysqli_fetch_assoc($result)) {
		    $messages[] = $row;
		}
		
		echo json_encode($messages);
		exit;

	} else {
		echo "No message";
	}
} else if($_REQUEST['method'] == 'deletemessage'){
	$mid = $values['messagenumber'];

	$sql = "DELETE from `Contacts` where `contact_id` ='".$mid."'";
	if(mysqli_query($conn, $sql)){
		echo "Message Deleted";
	}
}

$conn->close();

?>











