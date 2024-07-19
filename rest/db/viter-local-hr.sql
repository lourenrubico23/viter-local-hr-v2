-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 09:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter-local-hr`
--

-- --------------------------------------------------------

--
-- Table structure for table `hris_user_admin`
--

CREATE TABLE `hris_user_admin` (
  `user_admin_aid` int(11) NOT NULL,
  `user_admin_is_active` tinyint(1) NOT NULL,
  `user_admin_fname` varchar(100) NOT NULL,
  `user_admin_lname` varchar(100) NOT NULL,
  `user_admin_email` varchar(100) NOT NULL,
  `user_admin_created` varchar(20) NOT NULL,
  `user_admin_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_admin`
--

INSERT INTO `hris_user_admin` (`user_admin_aid`, `user_admin_is_active`, `user_admin_fname`, `user_admin_lname`, `user_admin_email`, `user_admin_created`, `user_admin_datetime`) VALUES
(1, 1, 'Louren', 'Rubico', 'Louren18@gmail.com', '2024-07-19 14:42:34', '2024-07-19 14:46:18'),
(2, 1, 'ooo', 'ooo', 'iii', '2024-07-19 14:48:53', '2024-07-19 14:48:53');

-- --------------------------------------------------------

--
-- Table structure for table `hris_user_role`
--

CREATE TABLE `hris_user_role` (
  `user_role_aid` int(11) NOT NULL,
  `user_role_is_active` tinyint(1) NOT NULL,
  `user_role_name` varchar(100) NOT NULL,
  `user_role_description` text NOT NULL,
  `user_role_created` varchar(20) NOT NULL,
  `user_role_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_role`
--

INSERT INTO `hris_user_role` (`user_role_aid`, `user_role_is_active`, `user_role_name`, `user_role_description`, `user_role_created`, `user_role_datetime`) VALUES
(7, 1, 'wwww', 'wwww', '2024-07-19 12:53:33', '2024-07-19 12:53:33'),
(8, 0, 'fgfg', 'fgfg', '2024-07-19 14:00:51', '2024-07-19 14:01:05');

-- --------------------------------------------------------

--
-- Table structure for table `hris_user_system`
--

CREATE TABLE `hris_user_system` (
  `user_system_aid` int(11) NOT NULL,
  `user_system_is_active` tinyint(1) NOT NULL,
  `user_system_fname` varchar(100) NOT NULL,
  `user_system_lname` varchar(100) NOT NULL,
  `user_system_email` varchar(50) NOT NULL,
  `user_system_role_id` varchar(100) NOT NULL,
  `user_system_created` varchar(20) NOT NULL,
  `user_system_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_system`
--

INSERT INTO `hris_user_system` (`user_system_aid`, `user_system_is_active`, `user_system_fname`, `user_system_lname`, `user_system_email`, `user_system_role_id`, `user_system_created`, `user_system_datetime`) VALUES
(1, 1, 'fdfd', 'dfdf', 'dfdf', '', '2024-07-19 12:54:51', '2024-07-19 14:20:32'),
(2, 1, 'asa', 'asa', 'asa', '', '2024-07-19 12:56:28', '2024-07-19 12:56:28'),
(3, 1, 'hhhh', 'hhh', 'hhhh', '', '2024-07-19 13:08:44', '2024-07-19 13:08:44'),
(4, 1, 'zfdf', 'sdfsdf', 'dsfsdf', '', '2024-07-19 13:55:20', '2024-07-19 13:55:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  ADD PRIMARY KEY (`user_admin_aid`);

--
-- Indexes for table `hris_user_role`
--
ALTER TABLE `hris_user_role`
  ADD PRIMARY KEY (`user_role_aid`);

--
-- Indexes for table `hris_user_system`
--
ALTER TABLE `hris_user_system`
  ADD PRIMARY KEY (`user_system_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  MODIFY `user_admin_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_user_role`
--
ALTER TABLE `hris_user_role`
  MODIFY `user_role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `hris_user_system`
--
ALTER TABLE `hris_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
