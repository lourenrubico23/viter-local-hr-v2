<?php

class LeaveType {
    public $leave_type_aid;
    public $leave_type_is_active;
    public $leave_type_subscriber_id;
    public $leave_type_subscriber_code;
    public $leave_type_type;
    public $leave_type_created;
    public $leave_type_datetime;

    public $connection;
    public $lastInsertedId;
    public $leave_type_start;
    public $leave_type_total;
    public $leave_type_search;

    public $tblLeaveType;
    public $tblLeaveBenefits;
    public $tblSubscribers;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblLeaveType = "hris_leave_leave_type";
        $this->tblLeaveBenefits = "hris_leave_leave_benefits";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where type.leave_type_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by type.leave_type_is_active desc, ";
            $sql .= "type.leave_type_subscriber_code asc ";
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
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where type.leave_type_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by type.leave_type_is_active desc, ";
            $sql .= "type.leave_type_subscriber_code asc ";//para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->leave_type_start - 1,
                "total" => $this->leave_type_total,
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
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where type.leave_type_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (leave_type_type like :leave_type_type ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code) ";
            $sql .= "order by type.leave_type_is_active desc, ";
            $sql .= "type.leave_type_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => "%{$this->leave_type_search}%",
                "subscribers_code" => "%{$this->leave_type_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblLeaveType}";
            $sql .= "(leave_type_is_active, ";
            $sql .= "leave_type_type, ";
            $sql .= "leave_type_subscriber_id, ";
            $sql .= "leave_type_subscriber_code, ";
            $sql .= "leave_type_created, ";
            $sql .= "leave_type_datetime ) values ( ";
            $sql .= ":leave_type_is_active, ";
            $sql .= ":leave_type_type, ";
            $sql .= ":leave_type_subscriber_id, ";
            $sql .= ":leave_type_subscriber_code, ";
            $sql .= ":leave_type_created, ";
            $sql .= ":leave_type_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_type" => $this->leave_type_type,
                "leave_type_subscriber_id" => $this->leave_type_subscriber_id,
                "leave_type_subscriber_code" => $this->leave_type_subscriber_code,
                "leave_type_created" => $this->leave_type_created,
                "leave_type_datetime" => $this->leave_type_datetime,
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
            $sql = "update {$this->tblLeaveType} set ";
            $sql .= "leave_type_type = :leave_type_type, ";
            $sql .= "leave_type_subscriber_id = :leave_type_subscriber_id, ";
            $sql .= "leave_type_subscriber_code = :leave_type_subscriber_code, ";
            $sql .= "leave_type_datetime = :leave_type_datetime ";
            $sql .= "where leave_type_aid = :leave_type_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => $this->leave_type_type,
                "leave_type_subscriber_id" => $this->leave_type_subscriber_id,
                "leave_type_subscriber_code" => $this->leave_type_subscriber_code,
                "leave_type_datetime" => $this->leave_type_datetime,
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblLeaveType} ";
            $sql .= "where leave_type_aid = :leave_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblLeaveType} set ";
            $sql .= "leave_type_is_active = :leave_type_is_active, ";
            $sql .= "leave_type_datetime = :leave_type_datetime ";
            $sql .= "where leave_type_aid = :leave_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_datetime" => $this->leave_type_datetime,
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select leave_type_type from {$this->tblLeaveType} ";
            $sql .= "where leave_type_type = :leave_type_type ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => "{$this->leave_type_type}",
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
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where type.leave_type_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and type.leave_type_subscriber_code = subscribers.subscribers_code ";
            $sql .= "and (type.leave_type_subscriber_id = :leave_type_subscriber_id ";
            $sql .= "or type.leave_type_subscriber_code = :leave_type_subscriber_code ";
            $sql .= "or type.leave_type_is_active = :leave_type_is_active) ";
            $sql .= "order by type.leave_type_is_active desc, ";
            $sql .= "type.leave_type_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_subscriber_id" => $this->leave_type_subscriber_id,
                "leave_type_subscriber_code" => $this->leave_type_subscriber_code,
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
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where type.leave_type_is_active = :leave_type_is_active ";
            $sql .= "and type.leave_type_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (leave_type_type like :leave_type_type ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code) ";
            $sql .= "order by type.leave_type_is_active desc, ";
            $sql .= "type.leave_type_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => "%{$this->leave_type_search}%",
                "subscribers_code" => "%{$this->leave_type_search}%",
                "leave_type_is_active" => $this->leave_type_is_active,
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
                "subscribers_company_name" => "%{$this->leave_type_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationLeaveBenefitsLeaveTypeName()
    {
        try {
            $sql = "select leave_benefits_leave_type_id from {$this->tblLeaveBenefits} ";
            $sql .= "where leave_benefits_leave_type_id = :leave_benefits_leave_type_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_leave_type_id" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}