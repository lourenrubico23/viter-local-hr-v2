<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_subscriber;
    public $notification_employee_name_id;
    public $notification_purpose;
    public $notification_email;
    public $notification_created;
    public $notification_datetime;

    public $connection;
    public $lastInsertedId;
    public $notification_start;
    public $notification_total;
    public $notification_search;

    public $tblNotification;
    public $tblEmployees;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblNotification = "hris_notification";
        $this->tblEmployees = "hris_employees";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblNotification} as notif, ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "where notif.notification_employee_name_id = emp.employees_aid ";
            $sql .= "order by notif.notification_is_active desc, ";
            $sql .= "notif.notification_employee_name_id asc, ";
            $sql .= "notif.notification_purpose asc ";
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
            $sql .= "{$this->tblNotification} as notif, ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "where notif.notification_employee_name_id = emp.employees_aid ";
            $sql .= "and notif.notification_employee_name_id = notification_employee_name_id ";
            $sql .= "order by notif.notification_is_active desc, ";
            $sql .= "notif.notification_employee_name_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->notification_start - 1,
                "total" => $this->notification_total,
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
            $sql .= "{$this->tblNotification} as notif, ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "where notif.notification_employee_name_id = emp.employees_aid ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or notif.notification_purpose like :notification_purpose ";
            $sql .= "or notif.notification_email like :notification_email ";
            $sql .= "or notif.notification_subscriber like :notification_subscriber) ";
            $sql .= "order by notif.notification_is_active desc, ";
            $sql .= "notif.notification_employee_name_id asc, ";
            $sql .= "notif.notification_purpose asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_subscriber" => "%{$this->notification_search}%",
                "notification_purpose" => "%{$this->notification_search}%",
                "notification_email" => "%{$this->notification_search}%",
                "full_name" => "%{$this->notification_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblNotification}";
            $sql .= "(notification_is_active, ";
            $sql .= "notification_subscriber, ";
            $sql .= "notification_employee_name_id, ";
            $sql .= "notification_purpose, ";
            $sql .= "notification_email, ";
            $sql .= "notification_created, ";
            $sql .= "notification_datetime ) values ( ";
            $sql .= ":notification_is_active, ";
            $sql .= ":notification_subscriber, ";
            $sql .= ":notification_employee_name_id, ";
            $sql .= ":notification_purpose, ";
            $sql .= ":notification_email, ";
            $sql .= ":notification_created, ";
            $sql .= ":notification_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_subscriber" => $this->notification_subscriber,
                "notification_employee_name_id" => $this->notification_employee_name_id,
                "notification_purpose" => $this->notification_purpose,
                "notification_email" => $this->notification_email,
                "notification_created" => $this->notification_created,
                "notification_datetime" => $this->notification_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_subscriber = :notification_subscriber, ";
            $sql .= "notification_employee_name_id = :notification_employee_name_id, ";
            $sql .= "notification_purpose = :notification_purpose, ";
            $sql .= "notification_email = :notification_email, ";
            $sql .= "notification_datetime = :notification_datetime ";
            $sql .= "where notification_aid = :notification_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_subscriber" => $this->notification_subscriber,
                "notification_employee_name_id" => $this->notification_employee_name_id,
                "notification_purpose" => $this->notification_purpose,
                "notification_email" => $this->notification_email,
                "notification_datetime" => $this->notification_datetime,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblNotification} ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_datetime = :notification_datetime ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_datetime" => $this->notification_datetime,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select notification_employee_name_id from {$this->tblNotification} ";
            $sql .= "where notification_employee_name_id = :notification_employee_name_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_employee_name_id" => "{$this->notification_employee_name_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatus() // this is for status only
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblNotification} as notif, ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "where notif.notification_employee_name_id = emp.employees_aid ";
            $sql .= "and (notif.notification_employee_name_id = :notification_employee_name_id ";
            $sql .= "or notif.notification_is_active = :notification_is_active) ";
            $sql .= "order by notif.notification_is_active desc, ";
            $sql .= "notif.notification_employee_name_id asc, ";
            $sql .= "notif.notification_purpose asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_employee_name_id" => $this->notification_employee_name_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch() // for search only
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblNotification} as notif, ";
            $sql .= "{$this->tblEmployees} as emp ";
            $sql .= "where notif.notification_employee_name_id = emp.employees_aid ";
            $sql .= "and notif.notification_is_active = :notification_is_active ";
            $sql .= "and (concat(emp.employees_fname, ' ', emp.employees_lname) like :full_name ";
            $sql .= "or notif.notification_purpose like :notification_purpose ";
            $sql .= "or notif.notification_email like :notification_email ";
            $sql .= "or notif.notification_subscriber like :notification_subscriber) ";
            $sql .= "order by notif.notification_is_active desc, ";
            $sql .= "notif.notification_employee_name_id asc, ";
            $sql .= "notif.notification_purpose asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_subscriber" => "%{$this->notification_search}%",
                "notification_purpose" => "%{$this->notification_search}%",
                "notification_email" => "%{$this->notification_search}%",
                "full_name" => "%{$this->notification_search}%",
                "notification_is_active" => $this->notification_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchEmployeeName() // for employees debounce
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblEmployees} ";
            $sql .= "where employees_fname = employees_fname ";
            $sql .= "and concat(employees_fname, ' ',employees_lname) like :full_name ";
            $sql .= "and employees_is_active = 1 ";
            $sql .= "order by ";
            $sql .= "employees_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->notification_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
