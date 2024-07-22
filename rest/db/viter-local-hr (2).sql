-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 09:52 AM
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
  `department_created` varchar(20) NOT NULL,
  `department_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_department`
--

INSERT INTO `hris_department` (`department_aid`, `department_is_active`, `department_name`, `department_created`, `department_datetime`) VALUES
(1, 1, 'Web', '2024-07-22 13:48:32', '2024-07-22 13:50:32'),
(2, 0, 'Accounting', '2024-07-22 13:55:46', '2024-07-22 13:55:49');

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
  `employees_department_id` int(11) NOT NULL,
  `employees_personal_email` varchar(100) NOT NULL,
  `employees_birth_date` date NOT NULL,
  `employees_marital_status` varchar(20) NOT NULL,
  `employees_date_employed` date NOT NULL,
  `employees_mobile_number` int(11) NOT NULL,
  `employees_work_email` varchar(50) NOT NULL,
  `employees_number` int(11) NOT NULL,
  `employees_created` varchar(20) NOT NULL,
  `employees_datetime` varchar(20) NOT NULL
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
  `user_admin_created` varchar(20) NOT NULL,
  `user_admin_datetime` varchar(20) NOT NULL
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
  `user_other_role_id` int(11) NOT NULL,
  `user_other_created` varchar(20) NOT NULL,
  `user_other_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_user_other`
--

INSERT INTO `hris_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_fname`, `user_other_lname`, `user_other_email`, `user_other_role_id`, `user_other_created`, `user_other_datetime`) VALUES
(2, 0, 'Luke', 'Rubico', 'luke@gmail.com', 8, '2024-07-22 09:33:05', '2024-07-22 10:03:25');

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
(8, 1, 'Virtual Assistant', 'Handle social media and other documents of clients.', '2024-07-19 14:00:51', '2024-07-22 10:03:19'),
(9, 1, 'Developer', 'Finance', '2024-07-22 08:07:21', '2024-07-22 08:40:33'),
(10, 1, 'Accounting', 'Finance', '2024-07-22 08:07:21', '2024-07-22 08:07:21'),
(11, 1, 'Admin', 'Administration', '2024-07-22 08:07:41', '2024-07-22 09:58:40'),
(12, 1, 'sssss', 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2024-07-22 08:07:53', '2024-07-22 10:07:32');

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
(6, 1, 'Louren', 'Rubico', 'louren@gmail.com', '9', '2024-07-22 06:59:19', '2024-07-22 09:55:33'),
(7, 1, 'Luke', 'Rubico', 'luke@gmail.com', '9', '2024-07-22 07:58:12', '2024-07-22 07:58:12');

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
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_employees`
--
ALTER TABLE `hris_employees`
  MODIFY `employees_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  MODIFY `user_admin_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hris_user_other`
--
ALTER TABLE `hris_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_user_role`
--
ALTER TABLE `hris_user_role`
  MODIFY `user_role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hris_user_system`
--
ALTER TABLE `hris_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
