<?php

class Subscribers
{
    public $subscribers_aid;
    public $subscribers_is_active;
    public $subscribers_code;
    public $subscribers_subscription_type;
    public $subscribers_payment_type;
    public $subscribers_date_start;
    public $subscribers_contact_fname;
    public $subscribers_contact_lname;
    public $subscribers_contact_number;
    public $subscribers_contact_email;
    public $subscribers_company_name;
    public $subscribers_total_employees;
    public $subscribers_amount_per_employee;
    public $subscribers_address;
    public $subscribers_created;
    public $subscribers_datetime;

    public $subscribers_log_aid;
    public $subscribers_log_user_id;
    public $subscribers_log_fname;
    public $subscribers_log_lname;
    public $subscribers_log_subscriber_code;
    public $subscribers_log_subscriber_id;
    public $subscribers_log_subscriber_changes;
    public $subscribers_log_datetime;
    public $subscribers_log_created;

    public $connection;
    public $lastInsertedId;
    public $subscribers_start;
    public $subscribers_total;
    public $subscribers_search;

    public $tblSubscribers;
    public $tblSubscribersLog;
    public $tblAddons;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSubscribers = "hris_subscribers";
        $this->tblSubscribersLog = "hris_subscribers_log";
        $this->tblAddons = "hris_addons";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblSubscribers} ";
            $sql .= "order by subscribers_code asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAllSubscribersLogById()
    {
        try {
            $sql = "select * from {$this->tblSubscribersLog} ";
            $sql .= "where subscribers_log_subscriber_id = :subscribers_log_subscriber_id ";
            $sql .= "and subscribers_log_subscriber_code = :subscribers_log_subscriber_code ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_log_subscriber_id" => $this->subscribers_log_subscriber_id,
                "subscribers_log_subscriber_code" => $this->subscribers_log_subscriber_code,
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
            $sql .= "{$this->tblSubscribers} ";
            $sql .= "where subscribers_aid = subscribers_aid ";
            $sql .= "and subscribers_aid = :subscribers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_aid" => $this->subscribers_aid,
            ]);
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
            $sql .= "{$this->tblSubscribers} ";
            $sql .= "order by subscribers_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "subscribers_code asc "; //from mababa to pataas na code
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->subscribers_start - 1,
                "total" => $this->subscribers_total,
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
            $sql .= "from {$this->tblSubscribers} ";
            $sql .= "where subscribers_code = subscribers_code ";
            $sql .= "and (concat(subscribers_contact_fname, ' ',subscribers_contact_lname) like :full_name ";
            $sql .= "or subscribers_code like :subscribers_code ";
            $sql .= "or subscribers_subscription_type like :subscribers_subscription_type ";
            $sql .= "or subscribers_payment_type like :subscribers_payment_type ";
            $sql .= "or DATE_FORMAT(subscribers_date_start, '%M %e, %Y') like :subscribers_date_start ";
            $sql .= "or subscribers_contact_email like :subscribers_contact_email ";
            $sql .= "or subscribers_company_name like :subscribers_company_name ";
            $sql .= "or subscribers_total_employees like :subscribers_total_employees ";
            $sql .= "or subscribers_amount_per_employee like :subscribers_amount_per_employee) ";
            $sql .= "order by subscribers_code desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->subscribers_search}%",
                "full_name" => "%{$this->subscribers_search}%",
                "subscribers_subscription_type" => "%{$this->subscribers_search}%",
                "subscribers_payment_type" => "%{$this->subscribers_search}%",
                "subscribers_date_start" => "%{$this->subscribers_search}%",
                "subscribers_contact_email" => "%{$this->subscribers_search}%",
                "subscribers_company_name" => "%{$this->subscribers_search}%",
                "subscribers_total_employees" => "%{$this->subscribers_search}%",
                "subscribers_amount_per_employee" => "%{$this->subscribers_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSubscribers}";
            $sql .= "(subscribers_is_active, ";
            $sql .= "subscribers_code, ";
            $sql .= "subscribers_contact_fname, ";
            $sql .= "subscribers_contact_lname, ";
            $sql .= "subscribers_subscription_type, ";
            $sql .= "subscribers_payment_type, ";
            $sql .= "subscribers_date_start, ";
            $sql .= "subscribers_contact_email, ";
            $sql .= "subscribers_company_name, ";
            $sql .= "subscribers_total_employees, ";
            $sql .= "subscribers_amount_per_employee, ";
            $sql .= "subscribers_address, ";
            $sql .= "subscribers_contact_number, ";
            $sql .= "subscribers_created, ";
            $sql .= "subscribers_datetime ) values ( ";
            $sql .= ":subscribers_is_active, ";
            $sql .= ":subscribers_code, ";
            $sql .= ":subscribers_contact_fname, ";
            $sql .= ":subscribers_contact_lname, ";
            $sql .= ":subscribers_subscription_type, ";
            $sql .= ":subscribers_payment_type, ";
            $sql .= ":subscribers_date_start, ";
            $sql .= ":subscribers_contact_email, ";
            $sql .= ":subscribers_company_name, ";
            $sql .= ":subscribers_total_employees, ";
            $sql .= ":subscribers_amount_per_employee, ";
            $sql .= ":subscribers_address, ";
            $sql .= ":subscribers_contact_number, ";
            $sql .= ":subscribers_created, ";
            $sql .= ":subscribers_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_is_active" => $this->subscribers_is_active,
                "subscribers_code" => $this->subscribers_code,
                "subscribers_contact_fname" => $this->subscribers_contact_fname,
                "subscribers_contact_lname" => $this->subscribers_contact_lname,
                "subscribers_subscription_type" => $this->subscribers_subscription_type,
                "subscribers_payment_type" => $this->subscribers_payment_type,
                "subscribers_date_start" => $this->subscribers_date_start,
                "subscribers_contact_email" => $this->subscribers_contact_email,
                "subscribers_company_name" => $this->subscribers_company_name,
                "subscribers_total_employees" => $this->subscribers_total_employees,
                "subscribers_amount_per_employee" => $this->subscribers_amount_per_employee,
                "subscribers_address" => $this->subscribers_address,
                "subscribers_contact_number" => $this->subscribers_contact_number,
                "subscribers_created" => $this->subscribers_created,
                "subscribers_datetime" => $this->subscribers_datetime,
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
            $sql = "update {$this->tblSubscribers} set ";
            $sql .= "subscribers_contact_fname = :subscribers_contact_fname, ";
            $sql .= "subscribers_contact_lname = :subscribers_contact_lname, ";
            $sql .= "subscribers_subscription_type = :subscribers_subscription_type, ";
            $sql .= "subscribers_payment_type = :subscribers_payment_type, ";
            $sql .= "subscribers_date_start = :subscribers_date_start, ";
            $sql .= "subscribers_contact_email = :subscribers_contact_email, ";
            $sql .= "subscribers_company_name = :subscribers_company_name, ";
            $sql .= "subscribers_total_employees = :subscribers_total_employees, ";
            $sql .= "subscribers_amount_per_employee = :subscribers_amount_per_employee, ";
            $sql .= "subscribers_address = :subscribers_address, ";
            $sql .= "subscribers_contact_number = :subscribers_contact_number, ";
            $sql .= "subscribers_datetime = :subscribers_datetime ";
            $sql .= "where subscribers_aid = :subscribers_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_contact_fname" => $this->subscribers_contact_fname,
                "subscribers_contact_lname" => $this->subscribers_contact_lname,
                "subscribers_subscription_type" => $this->subscribers_subscription_type,
                "subscribers_payment_type" => $this->subscribers_payment_type,
                "subscribers_date_start" => $this->subscribers_date_start,
                "subscribers_payment_type" => $this->subscribers_payment_type,
                "subscribers_date_start" => $this->subscribers_date_start,
                "subscribers_contact_email" => $this->subscribers_contact_email,
                "subscribers_company_name" => $this->subscribers_company_name,
                "subscribers_total_employees" => $this->subscribers_total_employees,
                "subscribers_amount_per_employee" => $this->subscribers_amount_per_employee,
                "subscribers_address" => $this->subscribers_address,
                "subscribers_contact_number" => $this->subscribers_contact_number,
                "subscribers_datetime" => $this->subscribers_datetime,
                "subscribers_aid" => $this->subscribers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSubscribers} ";
            $sql .= "where subscribers_aid = :subscribers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_aid" => $this->subscribers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblSubscribers} set ";
            $sql .= "subscribers_is_active = :subscribers_is_active, ";
            $sql .= "subscribers_datetime = :subscribers_datetime ";
            $sql .= "where subscribers_aid = :subscribers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_is_active" => $this->subscribers_is_active,
                "subscribers_datetime" => $this->subscribers_datetime,
                "subscribers_aid" => $this->subscribers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select subscribers_contact_email from {$this->tblSubscribers} ";
            $sql .= "where subscribers_contact_email = :subscribers_contact_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_contact_email" => "{$this->subscribers_contact_email}",
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
            $sql .= "from {$this->tblSubscribers} ";
            $sql .= "where subscribers_is_active = :subscribers_is_active ";
            $sql .= "order by subscribers_is_active desc, ";
            $sql .= "subscribers_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_is_active" => $this->subscribers_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch() // for status and search
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblSubscribers} ";
            $sql .= "where subscribers_is_active = :subscribers_is_active ";
            $sql .= "and (concat(subscribers_contact_fname, ' ',subscribers_contact_lname) like :full_name ";
            $sql .= "or subscribers_code like :subscribers_code ";
            $sql .= "or subscribers_subscription_type like :subscribers_subscription_type ";
            $sql .= "or subscribers_payment_type like :subscribers_payment_type ";
            $sql .= "or DATE_FORMAT(subscribers_date_start, '%M %e, %Y') like :subscribers_date_start ";
            $sql .= "or subscribers_contact_email like :subscribers_contact_email ";
            $sql .= "or subscribers_company_name like :subscribers_company_name ";
            $sql .= "or subscribers_total_employees like :subscribers_total_employees ";
            $sql .= "or subscribers_amount_per_employee like :subscribers_amount_per_employee) ";
            $sql .= "order by subscribers_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->subscribers_search}%",
                "full_name" => "%{$this->subscribers_search}%",
                "subscribers_subscription_type" => "%{$this->subscribers_search}%",
                "subscribers_payment_type" => "%{$this->subscribers_search}%",
                "subscribers_date_start" => "%{$this->subscribers_search}%",
                "subscribers_contact_email" => "%{$this->subscribers_search}%",
                "subscribers_company_name" => "%{$this->subscribers_search}%",
                "subscribers_total_employees" => "%{$this->subscribers_search}%",
                "subscribers_amount_per_employee" => "%{$this->subscribers_search}%",
                "subscribers_is_active" => $this->subscribers_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkSubscriberCode() //set the code of subscribers
    {
        try {
            $sql = "select subscribers_code ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribers} ";
            $sql .= "order by subscribers_code desc ";
            $sql .= "limit 1 ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function createSubscriberLog() // create of subscribers log
    {
        try {
            $sql = "insert into {$this->tblSubscribersLog} ";
            $sql .= "(subscribers_log_user_id, ";
            $sql .= "subscribers_log_fname, ";
            $sql .= "subscribers_log_lname, ";
            $sql .= "subscribers_log_subscriber_code, ";
            $sql .= "subscribers_log_subscriber_id, ";
            $sql .= "subscribers_log_subscriber_changes, ";
            $sql .= "subscribers_log_datetime, ";
            $sql .= "subscribers_log_created ) values ( ";
            $sql .= ":subscribers_log_user_id, ";
            $sql .= ":subscribers_log_fname, ";
            $sql .= ":subscribers_log_lname, ";
            $sql .= ":subscribers_log_subscriber_code, ";
            $sql .= ":subscribers_log_subscriber_id, ";
            $sql .= ":subscribers_log_subscriber_changes, ";
            $sql .= ":subscribers_log_datetime, ";
            $sql .= ":subscribers_log_created )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_log_user_id" => $this->subscribers_log_user_id,
                "subscribers_log_fname" => $this->subscribers_log_fname,
                "subscribers_log_lname" => $this->subscribers_log_lname,
                "subscribers_log_subscriber_code" => $this->subscribers_log_subscriber_code,
                "subscribers_log_subscriber_id" => $this->subscribers_log_subscriber_id,
                "subscribers_log_subscriber_changes" => $this->subscribers_log_subscriber_changes,
                "subscribers_log_datetime" => $this->subscribers_log_datetime,
                "subscribers_log_created" => $this->subscribers_log_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationAddonsSubscribersCode()
    {
        try {
            $sql = "select addons_subscriber_id from {$this->tblAddons} ";
            $sql .= "where addons_subscriber_id = :addons_subscriber_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_subscriber_id" => $this->subscribers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
