<?php

class JobLevel
{
    public $job_level_aid;
    public $job_level_is_active;
    public $job_level_subscriber_id;
    public $job_level_level;
    public $job_level_created;
    public $job_level_datetime;

    public $connection;
    public $lastInsertedId;
    public $job_level_start;
    public $job_level_total;
    public $job_level_search;

    public $tblJobLevel;
    public $tblJobTitle;
    public $tblLeaveBenefits;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblJobLevel = "hris_job_job_level";
        $this->tblJobTitle = "hris_job_job_title";
        $this->tblLeaveBenefits = "hris_leave_leave_benefits";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where level.job_level_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_level asc ";
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
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where level.job_level_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and level.job_level_subscriber_id = job_level_subscriber_id ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_level asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->job_level_start - 1,
                "total" => $this->job_level_total,
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
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where level.job_level_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (level.job_level_level like :job_level_level ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code) ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "%{$this->job_level_search}%",
                "subscribers_code" => "%{$this->job_level_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblJobLevel}";
            $sql .= "(job_level_is_active, ";
            $sql .= "job_level_level, ";
            $sql .= "job_level_subscriber_id, ";
            $sql .= "job_level_created, ";
            $sql .= "job_level_datetime ) values ( ";
            $sql .= ":job_level_is_active, ";
            $sql .= ":job_level_level, ";
            $sql .= ":job_level_subscriber_id, ";
            $sql .= ":job_level_created, ";
            $sql .= ":job_level_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_is_active" => $this->job_level_is_active,
                "job_level_level" => $this->job_level_level,
                "job_level_subscriber_id" => $this->job_level_subscriber_id,
                "job_level_created" => $this->job_level_created,
                "job_level_datetime" => $this->job_level_datetime,
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
            $sql = "update {$this->tblJobLevel} set ";
            $sql .= "job_level_level = :job_level_level, ";
            $sql .= "job_level_subscriber_id = :job_level_subscriber_id, ";
            $sql .= "job_level_datetime = :job_level_datetime ";
            $sql .= "where job_level_aid = :job_level_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => $this->job_level_level,
                "job_level_subscriber_id" => $this->job_level_subscriber_id,
                "job_level_datetime" => $this->job_level_datetime,
                "job_level_aid" => $this->job_level_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblJobLevel} ";
            $sql .= "where job_level_aid = :job_level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_aid" => $this->job_level_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblJobLevel} set ";
            $sql .= "job_level_is_active = :job_level_is_active, ";
            $sql .= "job_level_datetime = :job_level_datetime ";
            $sql .= "where job_level_aid = :job_level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_is_active" => $this->job_level_is_active,
                "job_level_datetime" => $this->job_level_datetime,
                "job_level_aid" => $this->job_level_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select job_level_level from {$this->tblJobLevel} ";
            $sql .= "where job_level_level = :job_level_level ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "{$this->job_level_level}",
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
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where level.job_level_is_active = :job_level_is_active ";
            $sql .= "and level.job_level_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and level.job_level_subscriber_id = :job_level_subscriber_id ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_is_active" => $this->job_level_is_active,
                "job_level_subscriber_id" => $this->job_level_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch() // for search and status
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where level.job_level_is_active = :job_level_is_active ";
            $sql .= "and level.job_level_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (level.job_level_level like :job_level_level ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code) ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "%{$this->job_level_search}%",
                "subscribers_code" => "%{$this->job_level_search}%",
                "job_level_is_active" => $this->job_level_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationJobTitleJobLevelName()
    {
        try {
            $sql = "select job_title_job_level_id from {$this->tblJobTitle} ";
            $sql .= "where job_title_job_level_id = :job_title_job_level_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_job_level_id" => $this->job_level_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationLeaveBenefitsJobLevelName()
    {
        try {
            $sql = "select leave_benefits_job_level_id from {$this->tblLeaveBenefits} ";
            $sql .= "where leave_benefits_job_level_id = :leave_benefits_job_level_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_job_level_id" => $this->job_level_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
