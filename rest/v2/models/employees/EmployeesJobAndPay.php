<?php

class EmployeesJobAndPay
{
    public $employees_aid;
    public $employees_subscribers_id;
    public $employees_subscriber_code;
    public $employees_number;
    public $employees_work_email;
    public $employees_department_id;
    public $employees_department_name;
    public $employees_job_level_id;
    public $employees_job_level_name;
    public $employees_job_title_id;
    public $employees_job_title_name;
    public $employees_date_hire;
    public $employees_regularized_date;
    public $employees_separated_date;
    public $employees_tin_number;
    public $employees_sss_number;
    public $employees_pagibig_number;
    public $employees_philhealth_number;
    public $employees_drive_link;
    public $employees_comment;
    public $employees_supervisor_name;
    public $employees_created;
    public $employees_datetime;

    public $job_level_subscriber_id;
    public $job_title_subscriber_id;
    public $department_subscribers_id;

    public $connection;
    public $lastInsertedId;
    public $employeesJobAndPay_search;

    public $tblEmployees;
    public $tblJobTitle;
    public $tblJobLevel;
    public $tblDepartment;
    public $tblDirectReport;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEmployees = "hris_employees";
        $this->tblJobTitle = "hris_job_job_title";
        $this->tblJobLevel = "hris_job_job_level";
        $this->tblDepartment = "hris_department";
        $this->tblDirectReport = "hris_direct_report";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as employees, ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblDirectReport} as report ";
            $sql .= "where employees.employees_job_title_id = title.job_title_aid ";
            $sql .= "and employees.employees_job_level_id = level.job_level_aid ";
            $sql .= "and employees.employees_supervisor_name = report.direct_report_aid  ";
            $sql .= "order by employees.employees_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as employees, ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblDirectReport} as report ";
            $sql .= "where employees.employees_job_title_id = title.job_title_aid ";
            $sql .= "and employees.employees_job_level_id = level.job_level_aid ";
            $sql .= "and employees.employees_supervisor_name = report.direct_report_aid  ";
            $sql .= "order by employees.employees_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_aid" => $this->employees_aid,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employees_subscriber_code = :employees_subscriber_code, ";
            $sql .= "employees_subscribers_id = :employees_subscribers_id, ";
            $sql .= "employees_number = :employees_number, ";
            $sql .= "employees_department_id = :employees_department_id, ";
            $sql .= "employees_department_name = :employees_department_name, ";
            $sql .= "employees_work_email = :employees_work_email, ";
            $sql .= "employees_job_level_id = :employees_job_level_id, ";
            $sql .= "employees_job_level_name = :employees_job_level_name, ";
            $sql .= "employees_job_title_id = :employees_job_title_id, ";
            $sql .= "employees_job_title_name = :employees_job_title_name, ";
            $sql .= "employees_date_hire = :employees_date_hire, ";
            $sql .= "employees_regularized_date = :employees_regularized_date, ";
            $sql .= "employees_separated_date = :employees_separated_date, ";
            $sql .= "employees_tin_number = :employees_tin_number, ";
            $sql .= "employees_sss_number = :employees_sss_number, ";
            $sql .= "employees_pagibig_number = :employees_pagibig_number, ";
            $sql .= "employees_philhealth_number = :employees_philhealth_number, ";
            $sql .= "employees_drive_link = :employees_drive_link, ";
            $sql .= "employees_comment = :employees_comment, ";
            $sql .= "employees_datetime = :employees_datetime ";
            $sql .= "where employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_subscriber_code" => $this->employees_subscriber_code,
                "employees_subscribers_id" => $this->employees_subscribers_id,
                "employees_number" => $this->employees_number,
                "employees_department_id" => $this->employees_department_id,
                "employees_department_name" => $this->employees_department_name,
                "employees_work_email" => $this->employees_work_email,
                "employees_job_level_id" => $this->employees_job_level_id,
                "employees_job_level_name" => $this->employees_job_level_name,
                "employees_job_title_id" => $this->employees_job_title_id,
                "employees_job_title_name" => $this->employees_job_title_name,
                "employees_date_hire" => $this->employees_date_hire,
                "employees_regularized_date" => $this->employees_regularized_date,
                "employees_separated_date" => $this->employees_separated_date,
                "employees_tin_number" => $this->employees_tin_number,
                "employees_sss_number" => $this->employees_sss_number,
                "employees_pagibig_number" => $this->employees_pagibig_number,
                "employees_philhealth_number" => $this->employees_philhealth_number,
                "employees_drive_link" => $this->employees_drive_link,
                "employees_comment" => $this->employees_comment,
                "employees_datetime" => $this->employees_datetime,
                "employees_aid" => $this->employees_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select * from {$this->tblEmployees} ";
            $sql .= "where employees_number = :employees_number ";
            $sql .= "and employees_subscribers_id = :employees_subscribers_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_number" => "{$this->employees_number}",
                "employees_subscribers_id" => "{$this->employees_subscribers_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterDepartment() //for job level, when subscriber is selected, the active in employees is get. kukunin ang employees mula sa subscriber. this is combination of filter and search
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblDepartment} ";
            $sql .= "where department_is_active = 1 ";
            $sql .= "and department_name like :department_name ";
            $sql .= "and department_subscribers_id = :department_subscribers_id ";
            $sql .= "order by ";
            $sql .= "department_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => "%{$this->employeesJobAndPay_search}%",
                "department_subscribers_id" => $this->department_subscribers_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterJobLevel() //for job level, when subscriber is selected, the active in employees is get. kukunin ang employees mula sa subscriber. this is combination of filter and search
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobLevel} ";
            $sql .= "where job_level_is_active = 1 ";
            $sql .= "and job_level_level like :job_level_level ";
            $sql .= "and job_level_subscriber_id = :job_level_subscriber_id ";
            $sql .= "order by ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "%{$this->employeesJobAndPay_search}%",
                "job_level_subscriber_id" => $this->job_level_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterJobTitle() //for job title, when subscriber is selected, the active in employees is get. kukunin ang employees mula sa subscriber. this is combination of filter and search
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobTitle} ";
            $sql .= "where job_title_is_active = 1 ";
            $sql .= "and job_title_title like :job_title_title ";
            $sql .= "and job_title_subscriber_id = :job_title_subscriber_id ";
            $sql .= "order by ";
            $sql .= "job_title_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_title" => "%{$this->employeesJobAndPay_search}%",
                "job_title_subscriber_id" => $this->job_title_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
