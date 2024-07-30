-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 10:00 AM
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
-- Table structure for table `hris_department`
--

CREATE TABLE `hris_department` (
  `department_aid` int(11) NOT NULL,
  `department_is_active` tinyint(1) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_created` datetime NOT NULL,
  `department_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_department`
--

INSERT INTO `hris_department` (`department_aid`, `department_is_active`, `department_name`, `department_created`, `department_datetime`) VALUES
(2, 0, 'Accounting', '2024-07-22 13:55:46', '2024-07-29 12:21:10'),
(3, 0, 'VA', '2024-07-25 10:05:18', '2024-07-29 13:19:26'),
(4, 1, 'Admin', '2024-07-25 10:05:23', '2024-07-25 10:05:23'),
(5, 1, 'Web', '2024-07-29 09:43:04', '2024-07-29 09:43:04'),
(6, 1, 'XXXX', '2024-07-29 09:47:56', '2024-07-29 09:47:56'),
(7, 1, 'YYYY', '2024-07-29 09:48:48', '2024-07-29 09:48:48'),
(9, 1, 'ddddd', '2024-07-29 13:02:48', '2024-07-29 13:02:48'),
(10, 1, 'ffffff', '2024-07-29 13:02:52', '2024-07-29 13:02:52'),
(11, 1, 'tttttt', '2024-07-29 13:02:57', '2024-07-29 13:02:57'),
(12, 1, 'uuuuuu', '2024-07-29 13:03:02', '2024-07-29 13:03:02'),
(13, 1, 'iiiiiii', '2024-07-29 13:03:07', '2024-07-29 13:03:07'),
(15, 1, 'oooo', '2024-07-29 13:04:47', '2024-07-29 13:04:47'),
(16, 1, 'pppp', '2024-07-29 13:05:21', '2024-07-29 13:05:21'),
(17, 1, 'lllll', '2024-07-29 13:05:34', '2024-07-29 13:05:34'),
(18, 1, 'mmmm', '2024-07-29 13:05:46', '2024-07-29 13:05:46'),
(19, 1, 'nnnn', '2024-07-29 13:26:59', '2024-07-29 13:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `hris_employees`
--

CREATE TABLE `hris_employees` (
  `employees_aid` int(11) NOT NULL,
  `employees_is_active` tinyint(1) NOT NULL,
  `employees_lname` varchar(100) NOT NULL,
  `employees_fname` varchar(100) NOT NULL,
  `employees_mname` varchar(100) NOT NULL,
  `employees_gender` varchar(20) NOT NULL,
  `employees_department_id` varchar(20) NOT NULL,
  `employees_personal_email` varchar(100) NOT NULL,
  `employees_birth_date` varchar(20) NOT NULL,
  `employees_marital_status` varchar(20) NOT NULL,
  `employees_date_employed` varchar(20) NOT NULL,
  `employees_mobile_number` varchar(20) NOT NULL,
  `employees_work_email` varchar(50) NOT NULL,
  `employees_number` varchar(20) NOT NULL,
  `employees_created` datetime NOT NULL,
  `employees_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_employees`
--

INSERT INTO `hris_employees` (`employees_aid`, `employees_is_active`, `employees_lname`, `employees_fname`, `employees_mname`, `employees_gender`, `employees_department_id`, `employees_personal_email`, `employees_birth_date`, `employees_marital_status`, `employees_date_employed`, `employees_mobile_number`, `employees_work_email`, `employees_number`, `employees_created`, `employees_datetime`) VALUES
(6, 1, 'Rubico', 'Louren', '', 'female', '5', 'louren@gmail.com', '2024-07-29', 'single', '2024-07-29', '93434343', 'rubico@gmail.com', '111', '2024-07-29 09:44:56', '2024-07-29 09:44:56'),
(7, 1, 'Dela Cruz', 'Juan', '', 'male', '2', 'sasas@asa', '2024-07-29', 'married', '2024-07-29', '435454', 'asasa@dsds', '222', '2024-07-29 09:49:57', '2024-07-29 09:49:57'),
(8, 1, 'wsdsd', 'sdsd', 'sdsd', 'female', '4', 'sdsdsd', '2024-07-29', 'widow', '2024-07-29', '45454', 'dfdfdfd@sadfsd', '333', '2024-07-29 09:56:10', '2024-07-29 12:27:33'),
(9, 0, 'sadf', 'fdsfsf', 'fdsfsdf', 'male', '6', 'sdfdsf', '2024-07-29', 'married', '2024-08-09', '324234', 'sdfsdf@sdf', '444', '2024-07-29 09:59:28', '2024-07-29 12:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `hris_employees_info`
--

CREATE TABLE `hris_employees_info` (
  `employees_info_aid` int(11) NOT NULL,
  `employees_info_is_active` tinyint(1) NOT NULL,
  `employees_info_employees_id` varchar(20) NOT NULL,
  `employees_info_employees_fname_id` varchar(100) NOT NULL,
  `employees_info_employees_lname_id` varchar(100) NOT NULL,
  `employees_info_employees_mname_id` varchar(100) NOT NULL,
  `employees_info_employees_birth_date_id` varchar(100) NOT NULL,
  `employees_info_employees_marital_status_id` varchar(20) NOT NULL,
  `employees_info_street` varchar(100) NOT NULL,
  `employees_info_city` varchar(100) NOT NULL,
  `employees_info_province` varchar(100) NOT NULL,
  `employees_info_country` varchar(100) NOT NULL,
  `employees_info_postal_code` varchar(20) NOT NULL,
  `employees_info_employees_mobile_number_id` varchar(20) NOT NULL,
  `employees_info_telephone_number` varchar(20) NOT NULL,
  `employees_info_employees_personal_email_id` varchar(100) NOT NULL,
  `employees_info_created` datetime NOT NULL,
  `employees_info_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `user_admin_created` datetime NOT NULL,
  `user_admin_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_admin`
--

INSERT INTO `hris_user_admin` (`user_admin_aid`, `user_admin_is_active`, `user_admin_fname`, `user_admin_lname`, `user_admin_email`, `user_admin_created`, `user_admin_datetime`) VALUES
(1, 1, 'Louren', 'Rubico', 'Louren18@gmail.com', '2024-07-19 14:42:34', '2024-07-22 10:05:17'),
(2, 1, 'ooo', 'ooo', 'iii', '2024-07-19 14:48:53', '2024-07-19 14:48:53'),
(3, 0, 'dfdf', 'dfdf', 'dfdf', '2024-07-19 15:40:24', '2024-07-19 15:41:59');

-- --------------------------------------------------------

--
-- Table structure for table `hris_user_other`
--

CREATE TABLE `hris_user_other` (
  `user_other_aid` int(11) NOT NULL,
  `user_other_is_active` tinyint(1) NOT NULL,
  `user_other_fname` varchar(100) NOT NULL,
  `user_other_lname` varchar(100) NOT NULL,
  `user_other_email` varchar(100) NOT NULL,
  `user_other_role_id` varchar(20) NOT NULL,
  `user_other_created` datetime NOT NULL,
  `user_other_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_other`
--

INSERT INTO `hris_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_fname`, `user_other_lname`, `user_other_email`, `user_other_role_id`, `user_other_created`, `user_other_datetime`) VALUES
(8, 1, 'sdsdsd', 'sdsds', 'sdsdsds@sdsd', '18', '2024-07-29 10:40:47', '2024-07-29 10:40:47'),
(10, 1, 'bbbbb', 'bbbbb', 'bbbbbb@bbbb', '14', '2024-07-29 12:09:21', '2024-07-29 12:09:21'),
(11, 1, 'Isobel', 'Macandili', 'louren@gmail.com', '19', '2024-07-29 15:47:33', '2024-07-29 15:47:33');

-- --------------------------------------------------------

--
-- Table structure for table `hris_user_role`
--

CREATE TABLE `hris_user_role` (
  `user_role_aid` int(11) NOT NULL,
  `user_role_is_active` tinyint(1) NOT NULL,
  `user_role_name` varchar(100) NOT NULL,
  `user_role_description` text NOT NULL,
  `user_role_created` datetime NOT NULL,
  `user_role_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_role`
--

INSERT INTO `hris_user_role` (`user_role_aid`, `user_role_is_active`, `user_role_name`, `user_role_description`, `user_role_created`, `user_role_datetime`) VALUES
(13, 1, 'Developer', 'Web team', '2024-07-29 10:29:06', '2024-07-29 12:35:21'),
(14, 1, 'Admin', 'Managing documents', '2024-07-29 10:29:58', '2024-07-29 12:53:08'),
(19, 1, 'XXXX', 'xxxx', '2024-07-29 12:02:44', '2024-07-29 12:09:03');

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
  `user_system_role_id` varchar(20) NOT NULL,
  `user_system_created` datetime NOT NULL,
  `user_system_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_system`
--

INSERT INTO `hris_user_system` (`user_system_aid`, `user_system_is_active`, `user_system_fname`, `user_system_lname`, `user_system_email`, `user_system_role_id`, `user_system_created`, `user_system_datetime`) VALUES
(6, 1, 'Louren', 'Rubico', 'louren@gmail.com', '9', '2024-07-22 06:59:19', '2024-07-29 12:35:44'),
(7, 1, 'Luke', 'Rubico', 'luke@gmail.com', '9', '2024-07-22 07:58:12', '2024-07-22 07:58:12'),
(8, 1, 'ssdsd', 'sdsd', 'sdsdsds@sad', '13', '2024-07-29 10:45:56', '2024-07-29 10:45:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hris_department`
--
ALTER TABLE `hris_department`
  ADD PRIMARY KEY (`department_aid`);

--
-- Indexes for table `hris_employees`
--
ALTER TABLE `hris_employees`
  ADD PRIMARY KEY (`employees_aid`);

--
-- Indexes for table `hris_employees_info`
--
ALTER TABLE `hris_employees_info`
  ADD PRIMARY KEY (`employees_info_aid`);

--
-- Indexes for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  ADD PRIMARY KEY (`user_admin_aid`);

--
-- Indexes for table `hris_user_other`
--
ALTER TABLE `hris_user_other`
  ADD PRIMARY KEY (`user_other_aid`);

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
-- AUTO_INCREMENT for table `hris_department`
--
ALTER TABLE `hris_department`
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hris_employees`
--
ALTER TABLE `hris_employees`
  MODIFY `employees_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `hris_employees_info`
--
ALTER TABLE `hris_employees_info`
  MODIFY `employees_info_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  MODIFY `user_admin_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hris_user_other`
--
ALTER TABLE `hris_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hris_user_role`
--
ALTER TABLE `hris_user_role`
  MODIFY `user_role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hris_user_system`
--
ALTER TABLE `hris_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
