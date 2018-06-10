-- Host: localhost
-- Generation Time: 2018-02-12 08:49:09
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+08:00";

SET @IMAGE_BASE_URL = "https://arm-books-1256660579.cos.ap-shanghai.myqcloud.com/"; -- FOR EXAMPLE: https://*****.ap-shanghai.myqcloud.com/

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--

-- --------------------------------------------------------

--
-- Relation `books`
-- --
-- drop table `books`;
-- CREATE TABLE `books` (
--   `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   `isbn` varchar(13) NOT NULL,
--   `name` varchar(64) CHARACTER SET utf8 NOT NULL,
--   `author` varchar(64) CHARACTER SET utf8 NOT NULL,
--   `image` varchar(255)  NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- --
-- -- Insert some sample data
-- --
--
-- INSERT INTO `books`(id, isbn, name, author, image) VALUES
-- (1, '9787040217872', '微积分（上） 第二版', '苏德矿', CONCAT(@IMAGE_BASE_URL, 'calculus-one.jpg')),
-- (2, '9787040216578', '微积分（下） 第二版', '苏德矿', CONCAT(@IMAGE_BASE_URL, 'calculus-two.jpg'));
-- INSERT INTO `books` (`id`, `isbn`, `name`, `author`, `image`) VALUES
-- ('2', '9787040216578', '微积分（下） 第二版', '苏德矿', 'https://arm-books-1256660579.cos.ap-shanghai.myqcloud.com/calculus-two.jpg');
-- --
-- -- ---------------------------------------------------------
--
-- --
-- -- Relation `user`
-- -- Ｉ may alter this later to adopt it WeChat ID
-- --
--
-- CREATE TABLE `users` (
--   `id` int  NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   `name` varchar(64) CHARACTER SET utf8 NOT NULL,
--   `credit` int(4) DEFAULT 0
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- ----------------------------------------------------------

--
-- Relation `deposit`
--

CREATE TABLE `transaction` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int NOT NULL FOREIGN KEY REFERENCES `users`(`id`),
    `book_id` int NOT NULL FOREIGN KEY REFERENCES `books`(`id`),
    `in_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `out_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- ----------------------------------------------------------

--
--  Relation `withdraw`
--

-- CREATE TABLE `deposit` (
--   `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   `user_id` int NOT NULL FOREIGN KEY REFERENCES `users`(`id`),
--   `book_id` int NOT NULL FOREIGN KEY REFERENCES `users`(`id`),
--   `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
