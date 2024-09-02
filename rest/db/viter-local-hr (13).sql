-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2024 at 05:04 AM
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
-- Table structure for table `hris_addons`
--

CREATE TABLE `hris_addons` (
  `addons_aid` int(11) NOT NULL,
  `addons_is_active` tinyint(1) NOT NULL,
  `addons_subscriber_id` varchar(20) NOT NULL,
  `addons_subscriber_code` varchar(20) NOT NULL,
  `addons_feature_code_id` varchar(20) NOT NULL,
  `addons_created` datetime NOT NULL,
  `addons_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_addons`
--

INSERT INTO `hris_addons` (`addons_aid`, `addons_is_active`, `addons_subscriber_id`, `addons_subscriber_code`, `addons_feature_code_id`, `addons_created`, `addons_datetime`) VALUES
(7, 1, '10', 'FBS001', '15', '2024-08-21 12:06:43', '2024-08-21 12:06:43'),
(8, 1, '11', 'FBS002', '1', '2024-08-21 12:07:28', '2024-08-21 12:07:28'),
(9, 1, '10', 'FBS001', '1', '2024-08-21 12:07:42', '2024-08-21 12:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `hris_announcement`
--

CREATE TABLE `hris_announcement` (
  `announcement_aid` int(11) NOT NULL,
  `announcement_is_active` tinyint(1) NOT NULL,
  `announcement_subscriber_id` varchar(20) NOT NULL,
  `announcement_subscriber_code` varchar(20) NOT NULL,
  `announcement_date` date NOT NULL,
  `announcement_title` varchar(100) NOT NULL,
  `announcement_description` varchar(200) NOT NULL,
  `announcement_created` datetime NOT NULL,
  `announcement_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_announcement`
--

INSERT INTO `hris_announcement` (`announcement_aid`, `announcement_is_active`, `announcement_subscriber_id`, `announcement_subscriber_code`, `announcement_date`, `announcement_title`, `announcement_description`, `announcement_created`, `announcement_datetime`) VALUES
(7, 1, '10', 'FBS001', '2024-08-21', 'First Announcement', 'First Announcement Description', '2024-08-21 09:37:30', '2024-08-21 09:48:24'),
(8, 1, '11', 'FBS002', '2024-08-22', 'First Announcement', 'Second Announcement Description', '2024-08-21 09:38:17', '2024-08-21 10:10:23'),
(9, 1, '14', 'FBS003', '2021-09-07', 'Third Announcement', 'Third Announcement Description', '2024-08-21 09:39:19', '2024-08-21 09:39:19'),
(10, 1, '10', 'FBS001', '2024-08-23', 'first announcement', 'first announcement', '2024-08-21 10:09:06', '2024-08-21 10:17:37'),
(11, 1, '10', 'FBS001', '2024-08-24', 'first announcement', 'first announcement', '2024-08-21 10:17:07', '2024-08-21 10:17:07'),
(12, 1, '10', 'FBS001', '2024-08-30', 'first announcement', 'first announcement', '2024-08-21 10:20:16', '2024-08-21 10:20:39');

-- --------------------------------------------------------

--
-- Table structure for table `hris_company_info`
--

CREATE TABLE `hris_company_info` (
  `company_info_aid` int(11) NOT NULL,
  `company_info_is_active` tinyint(1) NOT NULL,
  `company_info_subscriber_id` varchar(20) NOT NULL,
  `company_info_subscriber_code` varchar(20) NOT NULL,
  `company_info_subscriber_company_name` varchar(100) NOT NULL,
  `company_info_phone` varchar(20) NOT NULL,
  `company_info_email` varchar(50) NOT NULL,
  `company_info_street` varchar(100) NOT NULL,
  `company_info_city` varchar(100) NOT NULL,
  `company_info_province` varchar(100) NOT NULL,
  `company_info_postal` varchar(100) NOT NULL,
  `company_info_country` varchar(100) NOT NULL,
  `company_info_primary_color` varchar(20) NOT NULL,
  `company_info_secondary_color` varchar(20) NOT NULL,
  `company_info_accent_color` varchar(20) NOT NULL,
  `company_info_image` varchar(100) NOT NULL,
  `company_info_created` datetime NOT NULL,
  `company_info_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_company_info`
--

INSERT INTO `hris_company_info` (`company_info_aid`, `company_info_is_active`, `company_info_subscriber_id`, `company_info_subscriber_code`, `company_info_subscriber_company_name`, `company_info_phone`, `company_info_email`, `company_info_street`, `company_info_city`, `company_info_province`, `company_info_postal`, `company_info_country`, `company_info_primary_color`, `company_info_secondary_color`, `company_info_accent_color`, `company_info_image`, `company_info_created`, `company_info_datetime`) VALUES
(2, 1, '11', 'FBS002', 'Manalo', '09121212121', 'manalo@gmail.com', 'Brgy. Bulakin 1', 'Dolores', 'Quezon', '34343', 'Philippines', '#b6ca4e', '#d25151', '#768ed5', '', '2024-08-21 14:18:40', '2024-09-02 10:10:34'),
(6, 1, '10', 'FBS001', 'Louren222', '678679', 'louren@gmail.com', 'Brgy. Bulakin 1', 'Dolores', 'Quezon', '6565', '', '#054c70', '#0c63c0', '#d5e8ec', 'logo-fbs.png', '2024-08-22 13:32:42', '2024-09-02 10:31:14'),
(7, 1, '14', 'FBS003', 'mmm', '78787', 'mmm@gmail.com', '', '', '', '', '', '#000000', '#000000', '#000000', 'fbs-logo.png', '2024-08-29 13:45:58', '2024-08-29 13:45:58');

-- --------------------------------------------------------

--
-- Table structure for table `hris_company_location`
--

CREATE TABLE `hris_company_location` (
  `company_location_aid` int(11) NOT NULL,
  `company_location_is_active` tinyint(1) NOT NULL,
  `company_location_subscriber_id` varchar(20) NOT NULL,
  `company_location_subscriber_code` varchar(50) NOT NULL,
  `company_location_company_name` varchar(100) NOT NULL,
  `company_location_name` varchar(100) NOT NULL,
  `company_location_created` datetime NOT NULL,
  `company_location_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_company_location`
--

INSERT INTO `hris_company_location` (`company_location_aid`, `company_location_is_active`, `company_location_subscriber_id`, `company_location_subscriber_code`, `company_location_company_name`, `company_location_name`, `company_location_created`, `company_location_datetime`) VALUES
(1, 1, '14', 'FBS003', 'Frontline Business Solutions', 'Balok Road San Ignacio San Pablo City', '2024-08-28 13:23:04', '2024-08-28 14:38:46'),
(2, 1, '11', 'FBS002', 'Shoe Mart', 'San Pablo City', '2024-08-28 15:00:24', '2024-08-28 15:00:24');

-- --------------------------------------------------------

--
-- Table structure for table `hris_department`
--

CREATE TABLE `hris_department` (
  `department_aid` int(11) NOT NULL,
  `department_is_active` tinyint(1) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_subscribers_id` varchar(20) NOT NULL,
  `department_subscriber_code` varchar(20) NOT NULL,
  `department_created` datetime NOT NULL,
  `department_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_department`
--

INSERT INTO `hris_department` (`department_aid`, `department_is_active`, `department_name`, `department_subscribers_id`, `department_subscriber_code`, `department_created`, `department_datetime`) VALUES
(24, 1, 'APIL- MESA LIPAfff', '10', 'FBS001', '2024-08-20 15:29:59', '2024-08-20 15:59:34'),
(25, 1, 'ENEB- MESA CALAMBA', '11', 'FBS002', '2024-08-20 15:30:22', '2024-08-20 15:32:08');

-- --------------------------------------------------------

--
-- Table structure for table `hris_direct_report`
--

CREATE TABLE `hris_direct_report` (
  `direct_report_aid` int(11) NOT NULL,
  `direct_report_is_active` tinyint(1) NOT NULL,
  `direct_report_subscriber_id` varchar(20) NOT NULL,
  `direct_report_subscriber_code` varchar(20) NOT NULL,
  `direct_report_supervisor_id` varchar(20) NOT NULL,
  `direct_report_subordinate_id` varchar(20) NOT NULL,
  `direct_report_supervisor_name` varchar(100) NOT NULL,
  `direct_report_subordinate_name` varchar(100) NOT NULL,
  `direct_report_created` datetime NOT NULL,
  `direct_report_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_direct_report`
--

INSERT INTO `hris_direct_report` (`direct_report_aid`, `direct_report_is_active`, `direct_report_subscriber_id`, `direct_report_subscriber_code`, `direct_report_supervisor_id`, `direct_report_subordinate_id`, `direct_report_supervisor_name`, `direct_report_subordinate_name`, `direct_report_created`, `direct_report_datetime`) VALUES
(24, 1, '11', 'FBS002', '39', '38', 'Aagaard, Ally', 'Dela Cruz, Juan', '2024-08-27 12:33:58', '2024-08-27 12:33:58'),
(33, 0, '10', 'FBS001', '37', '41', 'Manalo, Rona', 'Acevedo, Reily', '2024-08-27 14:57:58', '2024-08-28 07:45:47'),
(46, 1, '10', 'FBS001', '36', '37', 'Rubico, Louren Isobel', 'Manalo, Rona', '2024-08-27 16:02:19', '2024-08-28 07:43:09'),
(47, 1, '14', 'FBS003', '43', '45', 'Barber, Lane', 'Lopez, Mika', '2024-09-02 09:14:42', '2024-09-02 09:14:42'),
(48, 1, '11', 'FBS002', '39', '46', 'Aagaard, Ally', 'yyyyy, yyyy', '2024-09-02 10:51:54', '2024-09-02 10:51:54');

-- --------------------------------------------------------

--
-- Table structure for table `hris_employees`
--

CREATE TABLE `hris_employees` (
  `employees_aid` int(11) NOT NULL,
  `employees_is_active` tinyint(1) NOT NULL,
  `employees_subscribers_id` varchar(20) NOT NULL,
  `employees_subscriber_code` varchar(20) NOT NULL,
  `employees_number` varchar(20) NOT NULL,
  `employees_lname` varchar(100) NOT NULL,
  `employees_fname` varchar(100) NOT NULL,
  `employees_mname` varchar(100) NOT NULL,
  `employees_gender` varchar(20) NOT NULL,
  `employees_department_id` varchar(20) NOT NULL,
  `employees_department_name` varchar(100) NOT NULL,
  `employees_personal_email` varchar(100) NOT NULL,
  `employees_birth_date` varchar(20) NOT NULL,
  `employees_marital_status` varchar(20) NOT NULL,
  `employees_date_employed` varchar(20) NOT NULL,
  `employees_mobile_number` varchar(20) NOT NULL,
  `employees_work_email` varchar(50) NOT NULL,
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
  `employees_job_level_id` varchar(20) NOT NULL,
  `employees_job_level_name` varchar(100) NOT NULL,
  `employees_job_title_id` varchar(20) NOT NULL,
  `employees_job_title_name` varchar(100) NOT NULL,
  `employees_date_hire` varchar(20) NOT NULL,
  `employees_regularized_date` varchar(20) NOT NULL,
  `employees_separated_date` varchar(20) NOT NULL,
  `employees_tin_number` varchar(20) NOT NULL,
  `employees_sss_number` varchar(20) NOT NULL,
  `employees_pagibig_number` varchar(20) NOT NULL,
  `employees_philhealth_number` varchar(20) NOT NULL,
  `employees_supervisor_id` varchar(20) NOT NULL,
  `employees_drive_link` varchar(50) NOT NULL,
  `employees_comment` varchar(100) NOT NULL,
  `employees_eligibility` tinyint(1) NOT NULL,
  `employees_bank_account` varchar(20) NOT NULL,
  `employees_pay_type` varchar(50) NOT NULL,
  `employees_per_hour` varchar(50) NOT NULL,
  `employees_hour_per_pay` varchar(50) NOT NULL,
  `employees_pay_frequency` varchar(50) NOT NULL,
  `employees_working_days` varchar(50) NOT NULL,
  `employees_rest_day` varchar(20) NOT NULL,
  `employees_working_hours_start` varchar(20) NOT NULL,
  `employees_working_hours_end` varchar(20) NOT NULL,
  `employees_created` datetime NOT NULL,
  `employees_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_employees`
--

INSERT INTO `hris_employees` (`employees_aid`, `employees_is_active`, `employees_subscribers_id`, `employees_subscriber_code`, `employees_number`, `employees_lname`, `employees_fname`, `employees_mname`, `employees_gender`, `employees_department_id`, `employees_department_name`, `employees_personal_email`, `employees_birth_date`, `employees_marital_status`, `employees_date_employed`, `employees_mobile_number`, `employees_work_email`, `employees_street`, `employees_city`, `employees_province`, `employees_country`, `employees_postal_code`, `employees_telephone_number`, `employees_mother_maiden`, `employees_mother_fname`, `employees_mother_mname`, `employees_father_lname`, `employees_father_fname`, `employees_father_mname`, `employees_family_contact`, `employees_family_address`, `employees_emergency_contact_name`, `employees_emergency_contact_relationship`, `employees_emergency_contact_number`, `employees_emergency_contact_address`, `employees_job_level_id`, `employees_job_level_name`, `employees_job_title_id`, `employees_job_title_name`, `employees_date_hire`, `employees_regularized_date`, `employees_separated_date`, `employees_tin_number`, `employees_sss_number`, `employees_pagibig_number`, `employees_philhealth_number`, `employees_supervisor_id`, `employees_drive_link`, `employees_comment`, `employees_eligibility`, `employees_bank_account`, `employees_pay_type`, `employees_per_hour`, `employees_hour_per_pay`, `employees_pay_frequency`, `employees_working_days`, `employees_rest_day`, `employees_working_hours_start`, `employees_working_hours_end`, `employees_created`, `employees_datetime`) VALUES
(36, 1, '10', 'FBS001', '001', 'Rubico', 'Louren Isobel', 'Macandili', 'female', '24', 'APIL- MESA LIPAfff', 'louren@gmail.com', '2024-08-22', 'single', '2024-08-22', '932424', 'louren.rubico@frontline.business.com', 'Brgy. Bulakin 1', 'Dolores', 'Quezon', 'Philippines', '4326', '65765756', '', '', '', '', '', '', '', '', '', '', '', '', '17', 'Utility', '25', 'CEO', '2024-01-01', '2024-09-02', '2027-06-10', '999999', '999999', '999999', '9999999', '', 'pppppppppp', 'ppppppppppp', 0, '', '', '', '', '', '', 'monday,tuesday', '', '', '2024-08-22 15:22:50', '2024-09-02 07:51:18'),
(37, 1, '10', 'FBS001', '0002', 'Manalo', 'Rona', '', 'female', '24', 'APIL- MESA LIPAfff', 'manalo@gmail.com', '2024-08-22', 'single', '2023-12-07', '564564654', 'rona.manalo@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '15', 'Entry-level', '25', 'Utility', '2023-11-01', '2024-12-29', '2026-07-29', '1313131313', '1313131313', '131313131', '999999', '', 'GFGFGFGF', 'FGFGFGFG', 0, '', '', '', '', '', '', '', '', '', '2024-08-22 15:40:31', '2024-08-29 14:08:45'),
(38, 1, '11', 'FBS002', '', 'Dela Cruz', 'Juan', '', 'male', '24', '', 'delacruz@gmail.com', '2024-02-14', 'married', '2022-06-07', '786876876', 'juan.delacruz@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-22 15:42:25', '2024-08-22 15:42:25'),
(39, 1, '11', 'FBS002', '', 'Aagaard', 'Ally', '', 'female', '25', '', 'ally@gmail.com', '2024-08-23', 'single', '2024-08-23', '435353', 'ally@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-23 12:06:08', '2024-08-23 12:06:08'),
(40, 1, '14', 'FBS003', '', 'Abbatiello', 'Nicole', 'Lyla', 'female', '24', '', 'nicole@gmail.com', '2024-08-23', 'married', '2024-08-23', '98762834', 'nicole@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-23 12:07:07', '2024-08-23 12:07:07'),
(41, 1, '10', 'FBS001', '', 'Acevedo', 'Reily', '', 'male', '24', '', 'reily@gmail.com', '2024-02-07', 'widow', '2024-08-23', '67567567', 'reily@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-23 12:08:12', '2024-08-23 12:08:12'),
(42, 1, '14', 'FBS003', '', 'Banks', 'Madison', '', 'female', '25', '', 'madison@gmail.com', '2024-08-01', 'married', '2024-08-27', '435353', 'banks.madison@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-27 08:06:13', '2024-08-27 08:06:13'),
(43, 1, '14', 'FBS003', '', 'Barber', 'Lane', '', 'male', '24', '', 'lane@gmail.com', '2024-04-10', 'widow', '2024-08-27', '45345', 'lane.barber@frontlinebusiness.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-08-27 08:07:08', '2024-08-27 08:07:08'),
(44, 1, '10', 'FBS001', '002', 'xxxx', 'xxxxx', 'xxxxx', 'male', '24', 'APIL- MESA LIPAfff', 'xxxxx@xxxxx', '2024-08-29', 'single', '2024-08-29', '5345435345', 'xxxx@xxxxx', '', '', '', '', '', '', 'mother', 'sdsd', 'sdsdsd', 'sdsdsds', 'sdsdsd', 'sdsdsd', 'sdsdsd', 'sdsds', 'sdsd', 'sdsds', 'sdsds', 'sdsd', '17', '', '25', '', '2023-10-04', '2024-08-01', '2026-03-19', '666666', '66666666', '66666666', '66666666', '', 'hhhhhhhh', 'kkkklkkk', 0, '', '', '', '', '', '', '', '', '', '2024-08-29 10:44:56', '2024-08-30 09:43:37'),
(45, 1, '14', 'FBS003', '001', 'Lopez', 'Mika', '', 'female', '25', 'ENEB- MESA CALAMBA', 'lopez@gmail.com', '2024-02-06', 'single', '2023-08-30', '9343433434', 'lopez.mika@frontlinebusiness.com.ph', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '13', 'HR', '27', 'Executive', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-09-02 09:13:54', '2024-09-02 10:33:07'),
(46, 1, '11', 'FBS002', '', 'yyyyy', 'yyyy', '', 'male', '24', 'ENEB- MESA CALAMBA', 'yyyyy@yyyy', '2024-09-02', 'married', '2024-09-02', '454545', 'yyyy@yyyyyyy', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '2024-09-02 10:51:14', '2024-09-02 10:51:14');

-- --------------------------------------------------------

--
-- Table structure for table `hris_features`
--

CREATE TABLE `hris_features` (
  `features_aid` int(11) NOT NULL,
  `features_is_active` tinyint(1) NOT NULL,
  `features_name` varchar(100) NOT NULL,
  `features_code` varchar(100) NOT NULL,
  `features_created` datetime NOT NULL,
  `features_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_features`
--

INSERT INTO `hris_features` (`features_aid`, `features_is_active`, `features_name`, `features_code`, `features_created`, `features_datetime`) VALUES
(1, 1, 'Rest Day Tagging', 'rd-tagging', '2024-08-14 09:13:51', '2024-08-16 10:28:52'),
(6, 0, 'Payroll', 'daily-payroll', '2024-08-14 09:36:31', '2024-08-16 13:16:16'),
(15, 1, 'Company Branding', 'cb', '2024-08-16 10:04:47', '2024-08-16 10:04:47');

-- --------------------------------------------------------

--
-- Table structure for table `hris_job_job_level`
--

CREATE TABLE `hris_job_job_level` (
  `job_level_aid` int(11) NOT NULL,
  `job_level_is_active` tinyint(1) NOT NULL,
  `job_level_subscriber_id` varchar(50) NOT NULL,
  `job_level_subscribers_code` varchar(20) NOT NULL,
  `job_level_level` varchar(100) NOT NULL,
  `job_level_created` datetime NOT NULL,
  `job_level_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_job_job_level`
--

INSERT INTO `hris_job_job_level` (`job_level_aid`, `job_level_is_active`, `job_level_subscriber_id`, `job_level_subscribers_code`, `job_level_level`, `job_level_created`, `job_level_datetime`) VALUES
(13, 1, '14', 'FBS003', 'Executive', '2024-08-20 12:36:07', '2024-08-21 08:09:36'),
(15, 1, '10', 'FBS001', 'Entry-level', '2024-08-20 13:11:02', '2024-08-21 08:09:32'),
(16, 1, '11', 'FBS002', 'First level management', '2024-08-20 13:11:30', '2024-08-21 08:09:34'),
(17, 1, '10', 'FBS001', 'CEO', '2024-08-23 13:22:30', '2024-08-23 13:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `hris_job_job_title`
--

CREATE TABLE `hris_job_job_title` (
  `job_title_aid` int(11) NOT NULL,
  `job_title_is_active` tinyint(1) NOT NULL,
  `job_title_subscriber_id` varchar(20) NOT NULL,
  `job_title_subscriber_code` varchar(20) NOT NULL,
  `job_title_job_level_id` varchar(100) NOT NULL,
  `job_title_title` varchar(100) NOT NULL,
  `job_title_created` datetime NOT NULL,
  `job_title_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_job_job_title`
--

INSERT INTO `hris_job_job_title` (`job_title_aid`, `job_title_is_active`, `job_title_subscriber_id`, `job_title_subscriber_code`, `job_title_job_level_id`, `job_title_title`, `job_title_created`, `job_title_datetime`) VALUES
(25, 1, '10', 'FBS001', '15', 'Utility', '2024-08-20 13:27:16', '2024-08-20 13:27:16'),
(26, 1, '11', 'FBS002', '16', 'Stockman', '2024-08-20 15:06:28', '2024-08-20 15:06:28'),
(27, 1, '14', 'FBS003', '13', 'HR', '2024-08-20 15:06:48', '2024-08-27 07:50:19');

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_leave_benefits`
--

CREATE TABLE `hris_leave_leave_benefits` (
  `leave_benefits_aid` int(11) NOT NULL,
  `leave_benefits_is_active` tinyint(1) NOT NULL,
  `leave_benefits_subscriber_id` varchar(20) NOT NULL,
  `leave_benefits_subscriber_code` varchar(20) NOT NULL,
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

INSERT INTO `hris_leave_leave_benefits` (`leave_benefits_aid`, `leave_benefits_is_active`, `leave_benefits_subscriber_id`, `leave_benefits_subscriber_code`, `leave_benefits_job_level_id`, `leave_benefits_job_title_id`, `leave_benefits_leave_type_id`, `leave_benefits_days`, `leave_benefits_created`, `leave_benefits_datetime`) VALUES
(19, 1, '10', 'FBS001', '15', '25', '6', '6', '2024-08-20 15:12:31', '2024-08-21 08:06:48'),
(20, 0, '11', 'FBS002', '16', '26', '4', '3', '2024-08-20 15:13:14', '2024-08-21 08:08:04'),
(21, 1, '10', 'FBS001', '15', '25', '4', '9', '2024-08-21 09:08:52', '2024-08-21 09:08:52');

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_leave_type`
--

CREATE TABLE `hris_leave_leave_type` (
  `leave_type_aid` int(11) NOT NULL,
  `leave_type_is_active` tinyint(1) NOT NULL,
  `leave_type_subscriber_id` varchar(20) NOT NULL,
  `leave_type_subscriber_code` varchar(20) NOT NULL,
  `leave_type_type` varchar(100) NOT NULL,
  `leave_type_created` datetime NOT NULL,
  `leave_type_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_leave_leave_type`
--

INSERT INTO `hris_leave_leave_type` (`leave_type_aid`, `leave_type_is_active`, `leave_type_subscriber_id`, `leave_type_subscriber_code`, `leave_type_type`, `leave_type_created`, `leave_type_datetime`) VALUES
(4, 1, '10', 'FBS001', 'Sick Leave', '2024-08-20 14:13:37', '2024-08-21 07:53:49'),
(5, 1, '11', 'FBS002', 'Vacation Leave', '2024-08-20 14:14:56', '2024-08-20 14:17:45'),
(6, 1, '14', 'FBS003', 'Official Business', '2024-08-20 14:16:40', '2024-08-20 14:16:40');

-- --------------------------------------------------------

--
-- Table structure for table `hris_notification`
--

CREATE TABLE `hris_notification` (
  `notification_aid` int(11) NOT NULL,
  `notification_is_active` tinyint(1) NOT NULL,
  `notification_subscriber_id` varchar(20) NOT NULL,
  `notification_subscriber_code` varchar(20) NOT NULL,
  `notification_employee_name_id` varchar(100) NOT NULL,
  `notification_purpose` varchar(100) NOT NULL,
  `notification_email` varchar(100) NOT NULL,
  `notification_created` datetime NOT NULL,
  `notification_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_notification`
--

INSERT INTO `hris_notification` (`notification_aid`, `notification_is_active`, `notification_subscriber_id`, `notification_subscriber_code`, `notification_employee_name_id`, `notification_purpose`, `notification_email`, `notification_created`, `notification_datetime`) VALUES
(16, 1, '10', 'FBS001', '37', 'Leave', 'manalo@gmail.com', '2024-08-22 15:42:55', '2024-08-22 15:42:55'),
(17, 1, '11', 'FBS002', '38', 'Overtime', 'delacruz@gmail.com', '2024-08-22 15:43:03', '2024-08-22 15:43:03');

-- --------------------------------------------------------

--
-- Table structure for table `hris_subscribers`
--

CREATE TABLE `hris_subscribers` (
  `subscribers_aid` int(11) NOT NULL,
  `subscribers_is_active` tinyint(1) NOT NULL,
  `subscribers_code` varchar(50) NOT NULL,
  `subscribers_subscription_type` varchar(100) NOT NULL,
  `subscribers_payment_type` varchar(100) NOT NULL,
  `subscribers_date_start` date NOT NULL,
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

--
-- Dumping data for table `hris_subscribers`
--

INSERT INTO `hris_subscribers` (`subscribers_aid`, `subscribers_is_active`, `subscribers_code`, `subscribers_subscription_type`, `subscribers_payment_type`, `subscribers_date_start`, `subscribers_contact_fname`, `subscribers_contact_lname`, `subscribers_contact_number`, `subscribers_contact_email`, `subscribers_company_name`, `subscribers_total_employees`, `subscribers_amount_per_employee`, `subscribers_address`, `subscribers_created`, `subscribers_datetime`) VALUES
(10, 1, 'FBS001', 'Payroll', 'Annual', '2024-07-31', 'Louren', 'Rubico', '09343434', 'louren@gmail.com', 'Louren222', '100', '200', 'asdasdad', '2024-08-13 14:59:37', '2024-08-13 15:31:01'),
(11, 1, 'FBS002', 'Hris', 'Monthly', '2024-08-13', 'Rona', 'Manalo', '0909090', 'manalo@gmail.com', 'Manalo', '100', '130', 'fghfhgh', '2024-08-13 15:00:40', '2024-08-13 15:00:40'),
(14, 1, 'FBS003', 'Payroll', 'Monthly', '2024-08-13', 'mmmm', 'mmm', '676767', 'mmm@gmail.com', 'mmm', '300', '120', 'hyhjtyh', '2024-08-13 15:04:20', '2024-08-16 10:24:11'),
(17, 0, 'FBS004', 'Hris', 'Monthly', '2024-08-14', 'yyyy', 'yyyyy', '66665', 'yyyy@yyyy', 'yyyyy', '100', '78', 'sdfsdfs', '2024-08-14 15:30:38', '2024-08-16 10:24:15');

-- --------------------------------------------------------

--
-- Table structure for table `hris_subscribers_log`
--

CREATE TABLE `hris_subscribers_log` (
  `subscribers_log_aid` int(11) NOT NULL,
  `subscribers_log_user_id` varchar(20) NOT NULL,
  `subscribers_log_fname` varchar(100) NOT NULL,
  `subscribers_log_lname` varchar(100) NOT NULL,
  `subscribers_log_subscriber_code` varchar(50) NOT NULL,
  `subscribers_log_subscriber_id` varchar(50) NOT NULL,
  `subscribers_log_subscriber_changes` varchar(100) NOT NULL,
  `subscribers_log_datetime` datetime NOT NULL,
  `subscribers_log_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hris_subscribers_log`
--

INSERT INTO `hris_subscribers_log` (`subscribers_log_aid`, `subscribers_log_user_id`, `subscribers_log_fname`, `subscribers_log_lname`, `subscribers_log_subscriber_code`, `subscribers_log_subscriber_id`, `subscribers_log_subscriber_changes`, `subscribers_log_datetime`, `subscribers_log_created`) VALUES
(0, '1', 'First name', 'Last Name', 'FBS002', '9', '150 employees', '2024-08-13 14:42:00', '2024-08-13 14:42:00'),
(0, '1', 'First name', 'Last Name', 'FBS001', '10', '130 employees', '2024-08-13 14:59:37', '2024-08-13 14:59:37'),
(0, '1', 'First name', 'Last Name', 'FBS002', '11', '100 employees', '2024-08-13 15:00:40', '2024-08-13 15:00:40'),
(0, '1', 'First name', 'Last Name', 'FBS002', '12', '120 employees', '2024-08-13 15:01:10', '2024-08-13 15:01:10'),
(0, '1', 'First name', 'Last Name', 'FBS002', '13', '100 employees', '2024-08-13 15:01:53', '2024-08-13 15:01:53'),
(0, '1', 'First name', 'Last Name', 'FBS003', '14', '230 employees', '2024-08-13 15:04:20', '2024-08-13 15:04:20'),
(0, '1', 'First name', 'Last Name', 'FBS003', '14', '400 employees', '2024-08-13 15:48:23', '2024-08-13 15:48:23'),
(0, '1', 'First name', 'Last Name', 'FBS003', '14', '300 employees', '2024-08-14 06:52:05', '2024-08-14 06:52:05'),
(0, '1', 'First name', 'Last Name', 'FBS004', '15', '600 employees', '2024-08-14 15:00:15', '2024-08-14 15:00:15'),
(0, '1', 'First name', 'Last Name', 'FBS005', '16', '400 employees', '2024-08-14 15:01:17', '2024-08-14 15:01:17'),
(0, '1', 'First name', 'Last Name', 'FBS004', '17', '67 employees', '2024-08-14 15:30:38', '2024-08-14 15:30:38'),
(0, '1', 'First name', 'Last Name', 'FBS004', '17', '100 employees', '2024-08-15 07:12:49', '2024-08-15 07:12:49');

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
-- Indexes for table `hris_addons`
--
ALTER TABLE `hris_addons`
  ADD PRIMARY KEY (`addons_aid`);

--
-- Indexes for table `hris_announcement`
--
ALTER TABLE `hris_announcement`
  ADD PRIMARY KEY (`announcement_aid`);

--
-- Indexes for table `hris_company_info`
--
ALTER TABLE `hris_company_info`
  ADD PRIMARY KEY (`company_info_aid`);

--
-- Indexes for table `hris_company_location`
--
ALTER TABLE `hris_company_location`
  ADD PRIMARY KEY (`company_location_aid`);

--
-- Indexes for table `hris_department`
--
ALTER TABLE `hris_department`
  ADD PRIMARY KEY (`department_aid`);

--
-- Indexes for table `hris_direct_report`
--
ALTER TABLE `hris_direct_report`
  ADD PRIMARY KEY (`direct_report_aid`);

--
-- Indexes for table `hris_employees`
--
ALTER TABLE `hris_employees`
  ADD PRIMARY KEY (`employees_aid`);

--
-- Indexes for table `hris_features`
--
ALTER TABLE `hris_features`
  ADD PRIMARY KEY (`features_aid`);

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
-- AUTO_INCREMENT for table `hris_addons`
--
ALTER TABLE `hris_addons`
  MODIFY `addons_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hris_announcement`
--
ALTER TABLE `hris_announcement`
  MODIFY `announcement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hris_company_info`
--
ALTER TABLE `hris_company_info`
  MODIFY `company_info_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hris_company_location`
--
ALTER TABLE `hris_company_location`
  MODIFY `company_location_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_department`
--
ALTER TABLE `hris_department`
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `hris_direct_report`
--
ALTER TABLE `hris_direct_report`
  MODIFY `direct_report_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `hris_employees`
--
ALTER TABLE `hris_employees`
  MODIFY `employees_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `hris_features`
--
ALTER TABLE `hris_features`
  MODIFY `features_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `hris_job_job_level`
--
ALTER TABLE `hris_job_job_level`
  MODIFY `job_level_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `hris_job_job_title`
--
ALTER TABLE `hris_job_job_title`
  MODIFY `job_title_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `hris_leave_leave_benefits`
--
ALTER TABLE `hris_leave_leave_benefits`
  MODIFY `leave_benefits_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `hris_leave_leave_type`
--
ALTER TABLE `hris_leave_leave_type`
  MODIFY `leave_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hris_notification`
--
ALTER TABLE `hris_notification`
  MODIFY `notification_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `hris_subscribers`
--
ALTER TABLE `hris_subscribers`
  MODIFY `subscribers_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
