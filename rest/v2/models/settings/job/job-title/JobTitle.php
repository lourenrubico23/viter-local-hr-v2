<?php

class JobTitle
{
    public $job_title_aid;
    public $job_title_is_active;
    public $job_title_subscriber;
    public $job_title_job_level_id;
    public $job_title_title;
    public $job_title_created;
    public $job_title_datetime;

    public $job_level_subscriber;

    public $connection;
    public $lastInsertedId;
    public $job_title_start;
    public $job_title_total;
    public $job_title_search;

    public $tblJobTitle;
    public $tblJobLevel;
    public $tblLeaveBenefits;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblJobTitle = "hris_job_job_title";
        $this->tblJobLevel = "hris_job_job_level";
        $this->tblLeaveBenefits = "hris_leave_leave_benefits";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "and title.job_title_subscriber = subscribers.subscribers_aid ";
            $sql .= "order by title.job_title_is_active desc, ";
            $sql .= "title.job_title_job_level_id asc ";
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
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "and title.job_title_subscriber = subscribers.subscribers_aid ";
            $sql .= "and title.job_title_job_level_id = job_title_job_level_id ";
            $sql .= "and title.job_title_subscriber = job_title_subscriber ";
            $sql .= "order by title.job_title_is_active desc, ";
            $sql .= "title.job_title_job_level_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->job_title_start - 1,
                "total" => $this->job_title_total,
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
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "and title.job_title_subscriber = subscribers.subscribers_aid ";
            $sql .= "and (title.job_title_subscriber like :job_title_subscriber ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or level.job_level_level like :job_level_level ";
            $sql .= "or title.job_title_title like :job_title_title) ";
            $sql .= "order by title.job_title_is_active desc, ";
            $sql .= "title.job_title_job_level_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->job_title_search}%",
                "job_level_level" => "%{$this->job_title_search}%",
                "job_title_title" => "%{$this->job_title_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblJobTitle}";
            $sql .= "(job_title_is_active, ";
            $sql .= "job_title_title, ";
            $sql .= "job_title_subscriber, ";
            $sql .= "job_title_job_level_id, ";
            $sql .= "job_title_created, ";
            $sql .= "job_title_datetime ) values ( ";
            $sql .= ":job_title_is_active, ";
            $sql .= ":job_title_title, ";
            $sql .= ":job_title_subscriber, ";
            $sql .= ":job_title_job_level_id, ";
            $sql .= ":job_title_created, ";
            $sql .= ":job_title_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_is_active" => $this->job_title_is_active,
                "job_title_title" => $this->job_title_title,
                "job_title_subscriber" => $this->job_title_subscriber,
                "job_title_job_level_id" => $this->job_title_job_level_id,
                "job_title_created" => $this->job_title_created,
                "job_title_datetime" => $this->job_title_datetime,
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
            $sql = "update {$this->tblJobTitle} set ";
            $sql .= "job_title_title = :job_title_title, ";
            $sql .= "job_title_subscriber = :job_title_subscriber, ";
            $sql .= "job_title_job_level_id = :job_title_job_level_id, ";
            $sql .= "job_title_datetime = :job_title_datetime ";
            $sql .= "where job_title_aid = :job_title_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_title" => $this->job_title_title,
                "job_title_subscriber" => $this->job_title_subscriber,
                "job_title_job_level_id" => $this->job_title_job_level_id,
                "job_title_datetime" => $this->job_title_datetime,
                "job_title_aid" => $this->job_title_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblJobTitle} ";
            $sql .= "where job_title_aid = :job_title_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_aid" => $this->job_title_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblJobTitle} set ";
            $sql .= "job_title_is_active = :job_title_is_active, ";
            $sql .= "job_title_datetime = :job_title_datetime ";
            $sql .= "where job_title_aid = :job_title_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_is_active" => $this->job_title_is_active,
                "job_title_datetime" => $this->job_title_datetime,
                "job_title_aid" => $this->job_title_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select job_title_title from {$this->tblJobTitle} ";
            $sql .= "where job_title_title = :job_title_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_title" => "{$this->job_title_title}",
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
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "and title.job_title_subscriber = subscribers.subscribers_aid ";
            $sql .= "and (title.job_title_job_level_id = :job_title_job_level_id ";
            $sql .= "or title.job_title_subscriber = :job_title_subscriber ";
            $sql .= "or title.job_title_is_active = :job_title_is_active) ";
            $sql .= "order by title.job_title_is_active desc, ";
            $sql .= "title.job_title_job_level_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_is_active" => $this->job_title_is_active,
                "job_title_job_level_id" => $this->job_title_job_level_id,
                "job_title_subscriber" => $this->job_title_subscriber,
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
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where title.job_title_is_active = :job_title_is_active ";
            $sql .= "and title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "and title.job_title_subscriber = subscribers.subscribers_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or level.job_level_level like :job_level_level ";
            $sql .= "or title.job_title_title like :job_title_title) ";
            $sql .= "order by title.job_title_is_active desc, ";
            $sql .= "title.job_title_job_level_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->job_title_search}%",
                "job_level_level" => "%{$this->job_title_search}%",
                "job_title_title" => "%{$this->job_title_search}%",
                "job_title_is_active" => $this->job_title_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchJobLevel() // for Job level debounce
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblJobLevel} ";
            $sql .= "where job_level_level like :job_level_level ";
            $sql .= "and job_level_is_active = 1 ";
            $sql .= "order by ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "%{$this->job_title_search}%",
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
                "subscribers_company_name" => "%{$this->job_title_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationLeaveBenefitsJobTitleName()
    {
        try {
            $sql = "select leave_benefits_job_title_id from {$this->tblLeaveBenefits} ";
            $sql .= "where leave_benefits_job_title_id = :leave_benefits_job_title_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_job_title_id" => $this->job_title_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterJobLevel() //for job level filter, when subscriber is selected, the active in job level is get. kukunin ang job level mula sa subscriber. 
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblJobLevel} ";
            $sql .= "where job_level_subscriber = :job_level_subscriber ";
            $sql .= "and job_level_is_active = 1 ";
            $sql .= "order by ";
            $sql .= "job_level_level asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_subscriber" => $this->job_level_subscriber
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
