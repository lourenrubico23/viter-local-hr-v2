<?php

class LeaveType {
    public $leave_type_aid;
    public $leave_type_is_active;
    public $leave_type_subscriber;
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

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblLeaveType = "hris_leave_leave_type";
        $this->tblLeaveBenefits = "hris_leave_leave_benefits";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblLeaveType} ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_type asc ";
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
            $sql .= "{$this->tblLeaveType} ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_type asc "; //para nasa baba ng table ang mga inactive or archived
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
            $sql .= "from {$this->tblLeaveType} ";
            $sql .= "where leave_type_type = leave_type_type ";
            $sql .= "and (leave_type_type like :leave_type_type ";
            $sql .= "or leave_type_subscriber like :leave_type_subscriber) ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_type asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => "%{$this->leave_type_search}%",
                "leave_type_subscriber" => "%{$this->leave_type_search}%",
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
            $sql .= "leave_type_subscriber, ";
            $sql .= "leave_type_created, ";
            $sql .= "leave_type_datetime ) values ( ";
            $sql .= ":leave_type_is_active, ";
            $sql .= ":leave_type_type, ";
            $sql .= ":leave_type_subscriber, ";
            $sql .= ":leave_type_created, ";
            $sql .= ":leave_type_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_type" => $this->leave_type_type,
                "leave_type_subscriber" => $this->leave_type_subscriber,
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
            $sql .= "leave_type_subscriber = :leave_type_subscriber, ";
            $sql .= "leave_type_datetime = :leave_type_datetime ";
            $sql .= "where leave_type_aid = :leave_type_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => $this->leave_type_type,
                "leave_type_subscriber" => $this->leave_type_subscriber,
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
            $sql .= "from {$this->tblLeaveType} ";
            $sql .= "where leave_type_is_active = :leave_type_is_active ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_type asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
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
            $sql .= "from {$this->tblLeaveType} ";
            $sql .= "where leave_type_is_active = :leave_type_is_active ";
            $sql .= "and (leave_type_type like :leave_type_type ";
            $sql .= "or leave_type_subscriber like :leave_type_subscriber) ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_type asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_type" => "%{$this->leave_type_search}%",
                "leave_type_subscriber" => "%{$this->leave_type_search}%",
                "leave_type_is_active" => $this->leave_type_is_active,
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