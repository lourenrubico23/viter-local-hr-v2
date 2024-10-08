<?php

class Employees
{
    public $employees_aid;
    public $employees_is_active;
    public $employees_subscribers_id;
    public $employees_subscriber_code;
    public $employees_fname;
    public $employees_lname;
    public $employees_mname;
    public $employees_gender;
    public $employees_department_id;
    public $employees_department_name;
    public $employees_personal_email;
    public $employees_birth_date;
    public $employees_marital_status;
    public $employees_date_employed;
    public $employees_mobile_number;
    public $employees_work_email;
    public $employees_created;
    public $employees_datetime;


    public $connection;
    public $lastInsertedId;
    public $employees_start;
    public $employees_total;
    public $employees_search;
    public $department_search;

    public $tblEmployees;
    public $tblDepartment;
    public $tblNotification;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEmployees = "hris_employees";
        $this->tblDepartment = "hris_department";
        $this->tblNotification = "hris_notification";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->employees_start - 1,
                "total" => $this->employees_total,
            ]);
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
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and emp.employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_aid" => $this->employees_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or emp.employees_fname like :employees_fname ";
            $sql .= "or emp.employees_lname like :employees_lname ";
            $sql .= "or emp.employees_work_email like :employees_work_email) ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->employees_search}%",
                "subscribers_code" => "%{$this->employees_search}%",
                "employees_fname" => "%{$this->employees_search}%",
                "employees_lname" => "%{$this->employees_search}%",
                "employees_work_email" => "%{$this->employees_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblEmployees}";
            $sql .= "(employees_is_active, ";
            $sql .= "employees_subscribers_id, ";
            $sql .= "employees_subscriber_code, ";
            $sql .= "employees_fname, ";
            $sql .= "employees_lname, ";
            $sql .= "employees_mname, ";
            $sql .= "employees_gender, ";
            $sql .= "employees_department_id, ";
            $sql .= "employees_department_name, ";
            $sql .= "employees_personal_email, ";
            $sql .= "employees_birth_date, ";
            $sql .= "employees_marital_status, ";
            $sql .= "employees_date_employed, ";
            $sql .= "employees_mobile_number, ";
            $sql .= "employees_work_email, ";
            $sql .= "employees_created, ";
            $sql .= "employees_datetime ) values ( ";
            $sql .= ":employees_is_active, ";
            $sql .= ":employees_subscribers_id, ";
            $sql .= ":employees_subscriber_code, ";
            $sql .= ":employees_fname, ";
            $sql .= ":employees_lname, ";
            $sql .= ":employees_mname, ";
            $sql .= ":employees_gender, ";
            $sql .= ":employees_department_id, ";
            $sql .= ":employees_department_name, ";
            $sql .= ":employees_personal_email, ";
            $sql .= ":employees_birth_date, ";
            $sql .= ":employees_marital_status, ";
            $sql .= ":employees_date_employed, ";
            $sql .= ":employees_mobile_number, ";
            $sql .= ":employees_work_email, ";
            $sql .= ":employees_created, ";
            $sql .= ":employees_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_is_active" => $this->employees_is_active,
                "employees_subscribers_id" => $this->employees_subscribers_id,
                "employees_subscriber_code" => $this->employees_subscriber_code,
                "employees_fname" => $this->employees_fname,
                "employees_lname" => $this->employees_lname,
                "employees_mname" => $this->employees_mname,
                "employees_gender" => $this->employees_gender,
                "employees_department_id" => $this->employees_department_id,
                "employees_department_name" => $this->employees_department_name,
                "employees_personal_email" => $this->employees_personal_email,
                "employees_birth_date" => $this->employees_birth_date,
                "employees_marital_status" => $this->employees_marital_status,
                "employees_date_employed" => $this->employees_date_employed,
                "employees_mobile_number" => $this->employees_mobile_number,
                "employees_work_email" => $this->employees_work_email,
                "employees_created" => $this->employees_created,
                "employees_datetime" => $this->employees_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblEmployees} ";
            $sql .= "where employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_aid" => $this->employees_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employees_is_active = :employees_is_active, ";
            $sql .= "employees_datetime = :employees_datetime ";
            $sql .= "where employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_is_active" => $this->employees_is_active,
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
            $sql = "select employees_fname from {$this->tblEmployees} ";
            $sql .= "where employees_fname = :employees_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_fname" => "{$this->employees_fname}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and (emp.employees_department_id = :employees_department_id ";
            $sql .= "or emp.employees_subscribers_id = :employees_subscribers_id ";
            $sql .= "or emp.employees_is_active = :employees_is_active) ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_is_active" => $this->employees_is_active,
                "employees_department_id" => $this->employees_department_id,
                "employees_subscribers_id" => $this->employees_subscribers_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusDepartmentAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_is_active = :employees_is_active ";
            $sql .= "and emp.employees_department_id = :employees_department_id ";
            $sql .= "and emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or emp.employees_fname like :employees_fname ";
            $sql .= "or emp.employees_lname like :employees_lname ";
            $sql .= "or emp.employees_work_email like :employees_work_email) ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->employees_search}%",
                "subscribers_code" => "%{$this->employees_search}%",
                "employees_fname" => "%{$this->employees_search}%",
                "employees_lname" => "%{$this->employees_search}%",
                "employees_work_email" => "%{$this->employees_search}%",
                "employees_is_active" => $this->employees_is_active,
                "employees_department_id" => $this->employees_department_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByDepartment()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and emp.employees_department_id = :employees_department_id ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_department_id" => $this->employees_department_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndDepartment()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and emp.employees_department_id = :employees_department_id ";
            $sql .= "and emp.employees_is_active = :employees_is_active ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_department_id" => $this->employees_department_id,
                "employees_is_active" => $this->employees_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchAndDepartment()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_department_id = :employees_department_id ";
            $sql .= "and emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or emp.employees_fname like :employees_fname ";
            $sql .= "or emp.employees_lname like :employees_lname ";
            $sql .= "or emp.employees_work_email like :employees_work_email) ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->employees_search}%",
                "subscribers_code" => "%{$this->employees_search}%",
                "employees_fname" => "%{$this->employees_search}%",
                "employees_lname" => "%{$this->employees_search}%",
                "employees_work_email" => "%{$this->employees_search}%",
                "employees_department_id" => $this->employees_department_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchAndStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartment} as dept, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where emp.employees_is_active = :employees_is_active ";
            $sql .= "and emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_subscribers_id = subscribers.subscribers_aid ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or emp.employees_fname like :employees_fname ";
            $sql .= "or emp.employees_lname like :employees_lname ";
            $sql .= "or emp.employees_work_email like :employees_work_email) ";
            $sql .= "order by emp.employees_is_active desc, ";
            $sql .= "emp.employees_subscribers_id asc, ";
            $sql .= "emp.employees_fname asc, ";
            $sql .= "emp.employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->employees_search}%",
                "subscribers_code" => "%{$this->employees_search}%",
                "employees_fname" => "%{$this->employees_search}%",
                "employees_lname" => "%{$this->employees_search}%",
                "employees_work_email" => "%{$this->employees_search}%",
                "employees_is_active" => $this->employees_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationNotificationEmployeesName()
    {
        try {
            $sql = "select notification_employee_name_id from {$this->tblNotification} ";
            $sql .= "where notification_employee_name_id = :notification_employee_name_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_employee_name_id" => $this->employees_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchSubcribers() // for Subscribers debounce
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblSubscribers} ";
            $sql .= "where subscribers_company_name like :subscribers_company_name ";
            $sql .= "and subscribers_is_active = 1 ";
            $sql .= "order by ";
            $sql .= "subscribers_company_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_company_name" => "%{$this->employees_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
