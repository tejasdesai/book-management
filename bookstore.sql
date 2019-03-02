-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 02, 2018 at 08:58 PM
-- Server version: 5.6.12
-- PHP Version: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookstore`
--
CREATE DATABASE IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bookstore`;

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--

CREATE TABLE IF NOT EXISTS `Books` (
  `book_id` int(100) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `available_copies` int(100) NOT NULL,
  `isbn` varchar(500) DEFAULT NULL,
  `authors` varchar(500) NOT NULL,
  `publishers` varchar(500) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `cost` float NOT NULL,
  `cover_image_path` varchar(500) NOT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `is_donated` tinyint(1) NOT NULL,
  `approved` int(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`book_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `Books`
--

INSERT INTO `Books` (`book_id`, `category`, `available_copies`, `isbn`, `authors`, `publishers`, `title`, `cost`, `cover_image_path`, `subject`, `is_donated`, `approved`) VALUES
(1, 'Biographies', 3, '', 'Chaturvedi Badrinath', '', 'Swami Vivkananda: The Living Vedanta', 10, 'uploads/4121hjNxVXL._SX325_BO1,204,203,200_.jpg', '', 0, 1),
(2, 'Biographies', 0, '', 'Paul Johnson', '', 'Socrates: A Man for Our Times', 14, 'uploads/42424635_2198429670187240_1379057279407489024_n.jpg', '', 0, 1),
(3, 'Biographies', 2, '', 'Walter Isaacson', '', 'Einstein: His Life and Universe', 15, 'uploads/eintein.jpg', '', 0, 1),
(4, 'Business', 2, '', 'David Allen', '', 'Getting Things Done', 15, 'uploads/gettingthings.jpg', '', 0, 1),
(5, 'Business', 1, '', 'Napoleon Hill', '', 'Think and Grow Rich', 8, 'uploads/51Uw5tYiqsL.jpg', '', 0, 1),
(6, 'Computer & Technology', 2, '', 'Brett Spell', '', 'Pro Java Programming', 45, 'uploads/pro java.jpg', '', 0, 1),
(7, 'Computer & Technology', 1, '', 'Doug Lowe', '', 'Networking for Dummies', 21, 'uploads/networking.jpg', '', 0, 1),
(8, 'Computer & Technology', 2, '', 'Joseph Schmuller', '', 'Statistical Analysis with R For Dummies', 20, 'uploads/Rprogramming.jpg', '', 0, 1),
(9, 'Computer & Technology', 2, '', 'Jon Duckett', '', 'Beginning Web Programming with HTML, XHTML, and CSS', 25, 'uploads/webprogramming.jpg', '', 0, 1),
(10, 'Health and Fitness', 3, '', 'Tim Ferriss', '', 'The 4-Hour Body', 10, 'uploads/4hrbody.jpg', '', 0, 1),
(11, 'Health and Fitness', 2, '', 'Alwyn Cosgrove and Lou Schuler', '', 'The new rules of lifting', 14, 'uploads/thenewrules.jpg', '', 0, 1),
(13, 'History', 2, '', 'Yuval Noah Harari', '', 'Sapiens: A Brief History of Humankind', 18, 'uploads/51Sn8PEXwcL.jpg', '', 0, 1),
(14, 'History', 2, '', 'Jared Diamond', '', 'Guns, Germs, and Steel', 15, 'uploads/guns.jpg', '', 0, 1),
(15, 'History', 1, '', 'Sun Tzu', '', 'The Art of War', 5, 'uploads/artofwar.jpg', '', 0, 1),
(16, 'History', 2, '', 'Stephen E. Ambrose', '', 'Band of Brothers', 13, 'uploads/band-of-brothers.jpg', '', 0, 1),
(17, 'History', 2, '', 'Barbara W. Tuchman', '', 'The Guns of August', 9, 'uploads/theguns.jpg', '', 0, 1),
(18, 'Science', 3, '', 'Charles Darwin', '', 'On the Origin of Species', 13, 'uploads/originofspecies.jpg', '', 0, 1),
(19, 'Science', 2, '', 'Rachel Carson', '', 'Silent Spring', 10, 'uploads/silentspring.jpg', '', 0, 1),
(20, 'Science', 3, '', 'Ben Goldacre', '', 'Bad Science', 10, 'uploads/badscience.jpg', '', 0, 1),
(21, 'Sports', 2, '', 'C. L. R. James', '', 'Beyond a Boundary', 25, 'uploads/beyondaboundary.jpg', '', 0, 1),
(22, 'Sports', 2, '', 'Jon Krakauer', '', 'Into Thin Air', 12, 'uploads/introThinAir.jpg', '', 0, 1),
(23, 'Sports', 2, '', 'Roger Kahn', '', 'The Boys of Summer', 10, 'uploads/boysofsummer.jpg', '', 0, 1),
(25, 'Others', 1, '', 'Daniel Kahneman', '', 'Thinking, Fast and Slow', 0, 'uploads/thinking.jpg', '', 1, 1),
(27, 'Others', 1, '', 'Charles Duhigg', '', 'The Power of Habit', 0, 'uploads/Powerofhabit.jpg', '', 1, 1),
(28, 'Health and Fitness', 3, '', 'Glen Cordoza and Kelly Starrett', '', 'Becoming a Supple Leopard', 13, 'uploads/supplement.jpg', '', 0, 1),
(29, 'Business', 1, '', 'John Brooks', '', 'Business Adventures', 0, 'uploads/businessAdventures.jpg', '', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE IF NOT EXISTS `Cart` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `customer_id` int(255) NOT NULL,
  `book_id` int(255) NOT NULL,
  `date_added` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`id`, `customer_id`, `book_id`, `date_added`) VALUES
(2, 1, 3, '1543709896650');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `category_id` int(100) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(500) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`category_id`, `category_name`) VALUES
(1, 'Biographies'),
(2, 'Business'),
(3, 'Computer & Technology'),
(4, 'Donated'),
(5, 'Health and Fitness'),
(6, 'History'),
(7, 'Science'),
(8, 'Sports'),
(9, 'All Books'),
(10, 'Kids'),
(12, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `Contacts`
--

CREATE TABLE IF NOT EXISTS `Contacts` (
  `contact_id` int(255) NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `contact_message` longtext NOT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `Contacts`
--

INSERT INTO `Contacts` (`contact_id`, `contact_name`, `contact_email`, `contact_phone`, `contact_message`) VALUES
(12, 'John', 'john@turnthepage.com', '', 'Do you guys have any discount for Christmas?');

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE IF NOT EXISTS `Customer` (
  `customer_id` int(100) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(500) NOT NULL,
  `last_name` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `isAdmin` int(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`customer_id`, `first_name`, `last_name`, `password`, `contact_number`, `email_id`, `address`, `isAdmin`) VALUES
(1, 'Tejas', 'Desai', 'dGVqYXMxMjM0', '660-238-2283', 'tdesai02@gmail.com', 'Warrensburg', 0),
(2, 'Peter', 'Parker', 'cGV0ZXIxMjM0', '6602382283', 'peter@turnthepage.com', 'Warrensburg', 1),
(5, 'Tejas', 'Desai', 'VGVqYXMxMjM=', '660-238-2283', 'tdesai1511@gmail.com', 'Warrensburg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Passcode`
--

CREATE TABLE IF NOT EXISTS `Passcode` (
  `email_id` varchar(255) NOT NULL,
  `passcode` varchar(255) NOT NULL,
  `generated_at` varchar(255) NOT NULL,
  `expiry` varchar(255) NOT NULL,
  UNIQUE KEY `email_id` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Passcode`
--

INSERT INTO `Passcode` (`email_id`, `passcode`, `generated_at`, `expiry`) VALUES
('tdesai02@gmail.com', '1PnWztQg', '1542679860', '1542680160'),
('tdesai1511@gmail.com', 'AQDGbvO4', '1543596546', '1543596846');

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

CREATE TABLE IF NOT EXISTS `Requests` (
  `req_id` int(50) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(100) NOT NULL,
  `customer_id` int(50) NOT NULL,
  `book_name` varchar(500) NOT NULL,
  `requested_on` varchar(100) NOT NULL,
  PRIMARY KEY (`req_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Requests`
--

INSERT INTO `Requests` (`req_id`, `email_id`, `customer_id`, `book_name`, `requested_on`) VALUES
(1, 'tdesai1511@gmail.com', 1, 'You can heal your life', '1543598289');

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE IF NOT EXISTS `Transaction` (
  `transaction_id` varchar(500) NOT NULL,
  `date` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `name` varchar(255) NOT NULL,
  `products` longtext NOT NULL,
  `tax_collected` float NOT NULL,
  `customer_id` int(20) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Transaction`
--

INSERT INTO `Transaction` (`transaction_id`, `date`, `email`, `address`, `city`, `state`, `zip`, `amount`, `name`, `products`, `tax_collected`, `customer_id`) VALUES
('1542815557DDE2', '1542815557678', 'tdesai02@gmail.com', '509 Anderson Street, Apt. D4', 'Warrensburg', 'MO', '64093', 64.22, 'Tejas Desai', '[{"book_id":"2","title":"Socrates: A Man for Our Times","author":"Paul Johnson","cost":"14","cimage":"uploads/42424635_2198429670187240_1379057279407489024_n.jpg"},{"book_id":"6","title":"Pro Java Programming","author":"Brett Spell","cost":"45","cimage":"uploads/pro java.jpg"}]', 5.22, 1),
('1542834948BE63', '1542834948237', 'tdesai02@gmail.com', '542 W Pine St', 'Warrensburg', 'MO', '64093', 30.48, 'Tejas Desai', '[{"book_id":"10","title":"The 4-Hour Body","author":"Tim Ferriss","cost":"10","cimage":"uploads/4hrbody.jpg"},{"book_id":"13","title":"Sapiens: A Brief History of Humankind","author":"Yuval Noah Harari","cost":"18","cimage":"uploads/51Sn8PEXwcL.jpg"}]', 2.48, 1),
('1543289164EE8D', '1543289164087', 'tdesai02@gmail.com', '509 Anderson Street, Apt. D4', 'Warrensburg', 'MO', '64093', 5.44, 'Tejas Desai', '[{"book_id":"15","title":"The Art of War","author":"Sun Tzu","cost":"5","cimage":"uploads/artofwar.jpg"}]', 0.44, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

--
-- Constraints for table `Requests`
--
ALTER TABLE `Requests`
  ADD CONSTRAINT `cid` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

--
-- Constraints for table `Transaction`
--
ALTER TABLE `Transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
