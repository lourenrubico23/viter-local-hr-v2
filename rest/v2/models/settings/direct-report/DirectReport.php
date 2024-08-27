<?php

class DirectReport
{
    public $direct_report_aid;
    public $direct_report_is_active;
    public $direct_report_subscriber_id;
    public $direct_report_subscriber_code;
    public $direct_report_supervisor_id;
    public $direct_report_subordinate_id;
    public $direct_report_supervisor_name;
    public $direct_report_subordinate_name;
    public $direct_report_created;
    public $direct_report_datetime;

    public $employees_subscribers_id;

    public $connection;
    public $lastInsertedId;
    public $direct_report_start;
    public $direct_report_total;
    public $direct_report_search;

    public $tblDirectReport;
    public $tblSubscribers;
    public $tblEmployees;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDirectReport = "hris_direct_report";
        $this->tblSubscribers = "hris_subscribers";
        $this->tblEmployees = "hris_employees";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblDirectReport} as direct, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where direct.direct_report_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by direct.direct_report_is_active desc, ";
            $sql .= "direct.direct_report_subscriber_code asc ";
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
            $sql .= "{$this->tblDirectReport} as direct, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where direct.direct_report_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by direct.direct_report_is_active desc, ";
            $sql .= "direct.direct_report_subscriber_code asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->direct_report_start - 1,
                "total" => $this->direct_report_total,
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
            $sql .= "{$this->tblDirectReport} as direct, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where direct.direct_report_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or direct.direct_report_supervisor_name like :direct_report_supervisor_name ";
            $sql .= "or direct.direct_report_subordinate_name like :direct_report_subordinate_name) ";
            $sql .= "order by direct.direct_report_is_active desc, ";
            $sql .= "direct.direct_report_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->direct_report_search}%",
                "direct_report_supervisor_name" => "%{$this->direct_report_search}%",
                "direct_report_subordinate_name" => "%{$this->direct_report_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblDirectReport}";
            $sql .= "(direct_report_is_active, ";
            $sql .= "direct_report_subscriber_id, ";
            $sql .= "direct_report_subscriber_code, ";
            $sql .= "direct_report_supervisor_id, ";
            $sql .= "direct_report_subordinate_id, ";
            $sql .= "direct_report_supervisor_name, ";
            $sql .= "direct_report_subordinate_name, ";
            $sql .= "direct_report_created, ";
            $sql .= "direct_report_datetime ) values ( ";
            $sql .= ":direct_report_is_active, ";
            $sql .= ":direct_report_subscriber_id, ";
            $sql .= ":direct_report_subscriber_code, ";
            $sql .= ":direct_report_supervisor_id, ";
            $sql .= ":direct_report_subordinate_id, ";
            $sql .= ":direct_report_supervisor_name, ";
            $sql .= ":direct_report_subordinate_name, ";
            $sql .= ":direct_report_created, ";
            $sql .= ":direct_report_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_is_active" => $this->direct_report_is_active,
                "direct_report_subscriber_id" => $this->direct_report_subscriber_id,
                "direct_report_subscriber_code" => $this->direct_report_subscriber_code,
                "direct_report_supervisor_id" => $this->direct_report_supervisor_id,
                "direct_report_subordinate_id" => $this->direct_report_subordinate_id,
                "direct_report_supervisor_name" => $this->direct_report_supervisor_name,
                "direct_report_subordinate_name" => $this->direct_report_subordinate_name,
                "direct_report_created" => $this->direct_report_created,
                "direct_report_datetime" => $this->direct_report_datetime,
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
            $sql = "update {$this->tblDirectReport} set ";
            $sql .= "direct_report_subscriber_id = :direct_report_subscriber_id, ";
            $sql .= "direct_report_subscriber_code = :direct_report_subscriber_code, ";
            $sql .= "direct_report_supervisor_id = :direct_report_supervisor_id, ";
            $sql .= "direct_report_subordinate_id = :direct_report_subordinate_id, ";
            $sql .= "direct_report_supervisor_name = :direct_report_supervisor_name, ";
            $sql .= "direct_report_subordinate_name = :direct_report_subordinate_name, ";
            $sql .= "direct_report_datetime = :direct_report_datetime ";
            $sql .= "where direct_report_aid = :direct_report_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_subscriber_id" => $this->direct_report_subscriber_id,
                "direct_report_subscriber_code" => $this->direct_report_subscriber_code,
                "direct_report_supervisor_id" => $this->direct_report_supervisor_id,
                "direct_report_subordinate_id" => $this->direct_report_subordinate_id,
                "direct_report_supervisor_name" => $this->direct_report_supervisor_name,
                "direct_report_subordinate_name" => $this->direct_report_subordinate_name,
                "direct_report_datetime" => $this->direct_report_datetime,
                "direct_report_aid" => $this->direct_report_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblDirectReport} ";
            $sql .= "where direct_report_aid = :direct_report_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_aid" => $this->direct_report_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblDirectReport} set ";
            $sql .= "direct_report_is_active = :direct_report_is_active, ";
            $sql .= "direct_report_datetime = :direct_report_datetime ";
            $sql .= "where direct_report_aid = :direct_report_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_is_active" => $this->direct_report_is_active,
                "direct_report_datetime" => $this->direct_report_datetime,
                "direct_report_aid" => $this->direct_report_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select direct_report_aid from {$this->tblDirectReport} ";
            $sql .= "where direct_report_supervisor_id = :direct_report_supervisor_id ";
            $sql .= "and direct_report_subordinate_id = :direct_report_subordinate_id ";
            $sql .= "and direct_report_subscriber_code = :direct_report_subscriber_code ";
            $sql .= "or direct_report_supervisor_id = :direct_report_subordinate_id_name "; // Validation to prevent a supervisor from being saved as a subordinate.
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_supervisor_id" => "{$this->direct_report_supervisor_id}",
                "direct_report_subordinate_id" => "{$this->direct_report_subordinate_id}",
                "direct_report_subscriber_code" => "{$this->direct_report_subscriber_code}",
                "direct_report_subordinate_id_name" => "{$this->direct_report_subordinate_id}",
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
            $sql .= "{$this->tblDirectReport} as direct, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where direct.direct_report_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (direct.direct_report_subscriber_id = :direct_report_subscriber_id ";
            $sql .= "or direct.direct_report_is_active = :direct_report_is_active) ";
            $sql .= "order by direct.direct_report_is_active desc, ";
            $sql .= "direct.direct_report_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_is_active" => $this->direct_report_is_active,
                "direct_report_subscriber_id" => $this->direct_report_subscriber_id
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch() // for filter with search
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblDirectReport} as direct, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where direct.direct_report_is_active = :direct_report_is_active ";
            $sql .= "and direct.direct_report_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or direct.direct_report_supervisor_name like :direct_report_supervisor_name ";
            $sql .= "or direct.direct_report_subordinate_name like :direct_report_subordinate_name) ";
            $sql .= "order by direct.direct_report_is_active desc, ";
            $sql .= "direct.direct_report_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->direct_report_search}%",
                "direct_report_supervisor_name" => "%{$this->direct_report_search}%",
                "direct_report_subordinate_name" => "%{$this->direct_report_search}%",
                "direct_report_is_active" => $this->direct_report_is_active,
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
                "subscribers_company_name" => "%{$this->direct_report_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // public function filterEmployees()
    // {
    //     try {
    //         $sql = "select *, concat(employees_lname, ', ', employees_fname) as full_name_display ";
    //         $sql .= "from {$this->tblEmployees} ";
    //         $sql .= "where employees_is_active = 1 "; // common condition
    //         // Check if a search term is provided
    //         if (!empty($this->direct_report_search)) {
    //             $sql .= "and concat(employees_lname, ', ', employees_fname) like :full_name ";
    //         }
    //         // Check if a subscriber ID is provided
    //         if (!empty($this->employees_subscribers_id)) {
    //             $sql .= "and employees_subscribers_id = :employees_subscribers_id ";
    //         }
    //         $sql .= "order by employees_lname asc ";
    //         $query = $this->connection->prepare($sql);
    //         // Prepare the parameters for the query
    //         $params = [];
    //         if (!empty($this->direct_report_search)) {
    //             $params['full_name'] = "%{$this->direct_report_search}%";
    //         }
    //         if (!empty($this->employees_subscribers_id)) {
    //             $params['employees_subscribers_id'] = $this->employees_subscribers_id;
    //         }
    //         $query->execute($params);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }

    //     return $query;
    // }

    public function filterEmployees() //for employees filter, when subscriber is selected, the active in employees is get. kukunin ang employees mula sa subscriber. this is combination of filter and search
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} ";
            $sql .= "where employees_is_active = 1 ";
            $sql .= "and concat(employees_lname, ', ', employees_fname) like :full_name ";
            $sql .= "and employees_subscribers_id = :employees_subscribers_id ";
            $sql .= "order by ";
            $sql .= "employees_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->direct_report_search}%",
                "employees_subscribers_id" => $this->employees_subscribers_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
