-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2024 at 09:55 AM
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
-- Table structure for table `hris_announcement`
--

CREATE TABLE `hris_announcement` (
  `announcement_aid` int(11) NOT NULL,
  `announcement_is_active` tinyint(1) NOT NULL,
  `announcement_subscriber` varchar(100) NOT NULL,
  `announcement_date` date NOT NULL,
  `announcement_title` varchar(100) NOT NULL,
  `announcement_description` varchar(200) NOT NULL,
  `announcement_created` datetime NOT NULL,
  `announcement_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_announcement`
--

INSERT INTO `hris_announcement` (`announcement_aid`, `announcement_is_active`, `announcement_subscriber`, `announcement_date`, `announcement_title`, `announcement_description`, `announcement_created`, `announcement_datetime`) VALUES
(1, 1, '1111', '2024-08-08', 'First', 'First Announcement', '2024-08-01 13:47:34', '2024-08-01 14:00:35'),
(2, 0, '222', '2024-01-03', 'Second', 'Second Announcement', '2024-08-01 14:01:47', '2024-08-01 14:04:14'),
(3, 1, '333', '2024-08-23', 'Third', 'Third Announcement', '2024-08-02 08:15:33', '2024-08-02 08:15:33');

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
(2, 1, 'Accounting', '2024-07-22 13:55:46', '2024-07-31 12:38:14'),
(3, 1, 'VA', '2024-07-25 10:05:18', '2024-07-31 12:38:18'),
(4, 1, 'Admin', '2024-07-25 10:05:23', '2024-07-25 10:05:23'),
(5, 1, 'Web', '2024-07-29 09:43:04', '2024-08-09 15:25:43'),
(6, 1, 'XXXX', '2024-07-29 09:47:56', '2024-07-29 09:47:56'),
(7, 0, 'YYYY', '2024-07-29 09:48:48', '2024-08-09 09:47:46'),
(20, 1, 'aaaaa', '2024-07-31 12:39:05', '2024-07-31 12:39:05');

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
  `employees_street` varchar(100) NOT NULL,
  `employees_city` varchar(100) NOT NULL,
  `employees_province` varchar(100) NOT NULL,
  `employees_country` varchar(100) NOT NULL,
  `employees_postal_code` varchar(20) NOT NULL,
  `employees_telephone_number` varchar(20) NOT NULL,
  `employees_mother_maiden` varchar(100) NOT NULL,
  `employees_mother_fname` varchar(100) NOT NULL,
  `employees_mother_mname` varchar(100) NOT NULL,
  `employees_father_lname` varchar(100) NOT NULL,
  `employees_father_fname` varchar(100) NOT NULL,
  `employees_father_mname` varchar(100) NOT NULL,
  `employees_family_contact` varchar(100) NOT NULL,
  `employees_family_address` varchar(100) NOT NULL,
  `employees_emergency_contact_name` varchar(100) NOT NULL,
  `employees_emergency_contact_relationship` varchar(100) NOT NULL,
  `employees_emergency_contact_number` varchar(100) NOT NULL,
  `employees_emergency_contact_address` varchar(100) NOT NULL,
  `employees_created` datetime NOT NULL,
  `employees_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_employees`
--

INSERT INTO `hris_employees` (`employees_aid`, `employees_is_active`, `employees_lname`, `employees_fname`, `employees_mname`, `employees_gender`, `employees_department_id`, `employees_personal_email`, `employees_birth_date`, `employees_marital_status`, `employees_date_employed`, `employees_mobile_number`, `employees_work_email`, `employees_number`, `employees_street`, `employees_city`, `employees_province`, `employees_country`, `employees_postal_code`, `employees_telephone_number`, `employees_mother_maiden`, `employees_mother_fname`, `employees_mother_mname`, `employees_father_lname`, `employees_father_fname`, `employees_father_mname`, `employees_family_contact`, `employees_family_address`, `employees_emergency_contact_name`, `employees_emergency_contact_relationship`, `employees_emergency_contact_number`, `employees_emergency_contact_address`, `employees_created`, `employees_datetime`) VALUES
(6, 1, 'Rubico', 'Louren', 'Macandili', 'female', '5', 'louren@gmail.com', '2024-07-29', 'single', '2024-07-29', '93434343', 'rubico@gmail.com', '111', 'gggggggggg', 'Dolores', 'ddd', 'ddd', '333', '333', 'Malou Macandili', 'hhh', 'malasmas', 'llllllll', 'sss', 'sss', 'sss', 'ss', 'ss', 'sss', 'ss', 'bulakin', '2024-07-29 09:44:56', '2024-08-12 07:53:49'),
(7, 1, 'Dela Cruz', 'Juan', 'Mendez', 'male', '2', 'juan@gmail.com', '2024-07-29', 'single', '2024-07-29', '435454', 'asasa@dsds', '222', 'Bulakin 1', 'Dolores', 'Quezon', 'Philippines', '4326', '+45656565', '', '', '', '', '', '', '', '', '', '', '', '', '2024-07-29 09:49:57', '2024-08-09 14:53:07'),
(8, 1, 'Lopez', 'Rona', 'sdsd', 'female', '4', 'rona@gmail.com', '2024-07-29', 'widow', '2024-07-29', '45454', 'dfdfdfd@sadfsd', '333', 'Dagatan', 'Dolores', 'Quezon', 'Philippines', '4326', '+89 76764545', '', '', '', '', '', '', '', '', '', '', '', '', '2024-07-29 09:56:10', '2024-08-09 14:53:19'),
(9, 0, 'sadf', 'fdsfsf', 'fdsfsdf', 'male', '6', 'sdfdsf', '2024-07-29', 'married', '2024-08-09', '324234', 'sdfsdf@sdf', '444', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2024-07-29 09:59:28', '2024-07-29 12:19:36'),
(30, 1, 'Manalo', 'Rena', '', 'female', '2', 'rena@gmail.com', '2007-01-17', 'single', '2024-08-01', '90909090', 'rena@frontline.com', '555', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2024-08-01 12:12:44', '2024-08-09 14:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `hris_job_job_level`
--

CREATE TABLE `hris_job_job_level` (
  `job_level_aid` int(11) NOT NULL,
  `job_level_is_active` tinyint(1) NOT NULL,
  `job_level_subscriber` varchar(100) NOT NULL,
  `job_level_level` varchar(100) NOT NULL,
  `job_level_created` datetime NOT NULL,
  `job_level_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_job_job_level`
--

INSERT INTO `hris_job_job_level` (`job_level_aid`, `job_level_is_active`, `job_level_subscriber`, `job_level_level`, `job_level_created`, `job_level_datetime`) VALUES
(3, 0, '1111', 'Entry-level', '2024-08-05 13:00:17', '2024-08-09 15:57:11'),
(4, 1, '222', 'Executive', '2024-08-05 13:00:35', '2024-08-09 15:30:59'),
(5, 1, '333', 'First-level Management', '2024-08-09 15:43:10', '2024-08-09 15:45:04');

-- --------------------------------------------------------

--
-- Table structure for table `hris_job_job_title`
--

CREATE TABLE `hris_job_job_title` (
  `job_title_aid` int(11) NOT NULL,
  `job_title_is_active` tinyint(1) NOT NULL,
  `job_title_subscriber` varchar(100) NOT NULL,
  `job_title_job_level_id` varchar(100) NOT NULL,
  `job_title_title` varchar(100) NOT NULL,
  `job_title_created` datetime NOT NULL,
  `job_title_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_job_job_title`
--

INSERT INTO `hris_job_job_title` (`job_title_aid`, `job_title_is_active`, `job_title_subscriber`, `job_title_job_level_id`, `job_title_title`, `job_title_created`, `job_title_datetime`) VALUES
(14, 1, '777', '4', 'Encoder', '2024-08-06 09:09:40', '2024-08-06 15:34:16'),
(16, 0, '222', '3', 'utility', '2024-08-06 09:16:08', '2024-08-09 15:57:28'),
(18, 0, '333', '4', 'VA', '2024-08-07 12:16:19', '2024-08-09 12:53:00'),
(19, 1, '444', '5', 'Rider', '2024-08-09 15:44:10', '2024-08-09 15:44:10');

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_leave_benefits`
--

CREATE TABLE `hris_leave_leave_benefits` (
  `leave_benefits_aid` int(11) NOT NULL,
  `leave_benefits_is_active` tinyint(1) NOT NULL,
  `leave_benefits_subscriber` varchar(100) NOT NULL,
  `leave_benefits_job_level_id` varchar(100) NOT NULL,
  `leave_benefits_job_title_id` varchar(100) NOT NULL,
  `leave_benefits_leave_type_id` varchar(100) NOT NULL,
  `leave_benefits_days` varchar(100) NOT NULL,
  `leave_benefits_created` datetime NOT NULL,
  `leave_benefits_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_leave_leave_benefits`
--

INSERT INTO `hris_leave_leave_benefits` (`leave_benefits_aid`, `leave_benefits_is_active`, `leave_benefits_subscriber`, `leave_benefits_job_level_id`, `leave_benefits_job_title_id`, `leave_benefits_leave_type_id`, `leave_benefits_days`, `leave_benefits_created`, `leave_benefits_datetime`) VALUES
(4, 1, '111', '3', '16', '1', '5', '2024-08-06 12:46:40', '2024-08-08 13:26:38'),
(5, 0, '222', '4', '14', '2', '3', '2024-08-06 15:35:01', '2024-08-09 09:47:24'),
(13, 1, '888', 'Entry-level', '16', '1', '9', '2024-08-08 12:49:04', '2024-08-08 12:49:04'),
(14, 1, '888', 'Entry-level', '16', '2', '7', '2024-08-08 12:49:40', '2024-08-08 12:49:40'),
(15, 1, '555', '3', '16', '2', '7', '2024-08-08 12:55:11', '2024-08-08 12:55:11'),
(16, 1, '333', '5', '19', '1', '3', '2024-08-09 15:44:43', '2024-08-09 15:44:43'),
(17, 1, '444', '4', '14', '3', '5', '2024-08-09 15:48:52', '2024-08-09 15:48:52');

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_leave_type`
--

CREATE TABLE `hris_leave_leave_type` (
  `leave_type_aid` int(11) NOT NULL,
  `leave_type_is_active` tinyint(1) NOT NULL,
  `leave_type_subscriber` varchar(100) NOT NULL,
  `leave_type_type` varchar(100) NOT NULL,
  `leave_type_created` datetime NOT NULL,
  `leave_type_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_leave_leave_type`
--

INSERT INTO `hris_leave_leave_type` (`leave_type_aid`, `leave_type_is_active`, `leave_type_subscriber`, `leave_type_type`, `leave_type_created`, `leave_type_datetime`) VALUES
(1, 0, '111', 'Sick Leave', '2024-08-02 13:05:05', '2024-08-09 15:57:41'),
(3, 1, '222', 'Vacation', '2024-08-09 15:48:04', '2024-08-09 15:50:10');

-- --------------------------------------------------------

--
-- Table structure for table `hris_notification`
--

CREATE TABLE `hris_notification` (
  `notification_aid` int(11) NOT NULL,
  `notification_is_active` tinyint(1) NOT NULL,
  `notification_subscriber` varchar(100) NOT NULL,
  `notification_employee_name_id` varchar(100) NOT NULL,
  `notification_purpose` varchar(100) NOT NULL,
  `notification_email` varchar(100) NOT NULL,
  `notification_created` datetime NOT NULL,
  `notification_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_notification`
--

INSERT INTO `hris_notification` (`notification_aid`, `notification_is_active`, `notification_subscriber`, `notification_employee_name_id`, `notification_purpose`, `notification_email`, `notification_created`, `notification_datetime`) VALUES
(5, 1, '111', '7', 'Leave', 'juan@gmail.com', '2024-08-09 13:50:45', '2024-08-09 14:45:42'),
(6, 1, '222', '6', 'Overtime', 'louren@gmail.com', '2024-08-09 14:03:07', '2024-08-09 14:45:41');

-- --------------------------------------------------------

--
-- Table structure for table `hris_subscribers`
--

CREATE TABLE `hris_subscribers` (
  `subscribers_aid` int(11) NOT NULL,
  `subscribers_is_active` tinyint(1) NOT NULL,
  `subscribers_code` int(11) NOT NULL,
  `subscribers_subscription_type` varchar(100) NOT NULL,
  `subscribers_payment_type` varchar(100) NOT NULL,
  `subscribers_date_start` datetime NOT NULL,
  `subscribers_contact_fname` varchar(100) NOT NULL,
  `subscribers_contact_lname` varchar(100) NOT NULL,
  `subscribers_contact_number` varchar(20) NOT NULL,
  `subscribers_contact_email` varchar(100) NOT NULL,
  `subscribers_company_name` varchar(100) NOT NULL,
  `subscribers_total_employees` varchar(100) NOT NULL,
  `subscribers_amount_per_employee` varchar(100) NOT NULL,
  `subscribers_address` varchar(100) NOT NULL,
  `subscribers_created` datetime NOT NULL,
  `subscribers_datetime` datetime NOT NULL
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
(11, 1, 'Isobel', 'Macandili', 'louren@gmail.com', '19', '2024-07-29 15:47:33', '2024-07-29 15:47:33'),
(12, 0, 'sa', 'as', 'as@gmail.com', '14', '2024-08-06 12:28:24', '2024-08-09 10:29:27');

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
(7, 1, 'Luke', 'Rubico', 'lukeisaac@gmail.com', '9', '2024-07-22 07:58:12', '2024-07-31 13:08:14'),
(8, 1, 'ssdsd', 'sdsd', 'sdsdsds@sad', '13', '2024-07-29 10:45:56', '2024-08-09 14:58:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hris_announcement`
--
ALTER TABLE `hris_announcement`
  ADD PRIMARY KEY (`announcement_aid`);

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
-- Indexes for table `hris_job_job_level`
--
ALTER TABLE `hris_job_job_level`
  ADD PRIMARY KEY (`job_level_aid`);

--
-- Indexes for table `hris_job_job_title`
--
ALTER TABLE `hris_job_job_title`
  ADD PRIMARY KEY (`job_title_aid`);

--
-- Indexes for table `hris_leave_leave_benefits`
--
ALTER TABLE `hris_leave_leave_benefits`
  ADD PRIMARY KEY (`leave_benefits_aid`);

--
-- Indexes for table `hris_leave_leave_type`
--
ALTER TABLE `hris_leave_leave_type`
  ADD PRIMARY KEY (`leave_type_aid`);

--
-- Indexes for table `hris_notification`
--
ALTER TABLE `hris_notification`
  ADD PRIMARY KEY (`notification_aid`);

--
-- Indexes for table `hris_subscribers`
--
ALTER TABLE `hris_subscribers`
  ADD PRIMARY KEY (`subscribers_aid`);

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
-- AUTO_INCREMENT for table `hris_announcement`
--
ALTER TABLE `hris_announcement`
  MODIFY `announcement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hris_department`
--
ALTER TABLE `hris_department`
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `hris_employees`
--
ALTER TABLE `hris_employees`
  MODIFY `employees_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `hris_job_job_level`
--
ALTER TABLE `hris_job_job_level`
  MODIFY `job_level_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hris_job_job_title`
--
ALTER TABLE `hris_job_job_title`
  MODIFY `job_title_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hris_leave_leave_benefits`
--
ALTER TABLE `hris_leave_leave_benefits`
  MODIFY `leave_benefits_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `hris_leave_leave_type`
--
ALTER TABLE `hris_leave_leave_type`
  MODIFY `leave_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hris_notification`
--
ALTER TABLE `hris_notification`
  MODIFY `notification_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hris_subscribers`
--
ALTER TABLE `hris_subscribers`
  MODIFY `subscribers_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_user_admin`
--
ALTER TABLE `hris_user_admin`
  MODIFY `user_admin_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hris_user_other`
--
ALTER TABLE `hris_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
