<?php

class Announcement
{
    public $announcement_aid;
    public $announcement_is_active;
    public $announcement_subscriber_id;
    public $announcement_subscriber_code;
    public $announcement_date;
    public $announcement_title;
    public $announcement_description;
    public $announcement_created;
    public $announcement_datetime;

    public $connection;
    public $lastInsertedId;
    public $announcement_start;
    public $announcement_total;
    public $announcement_search;

    public $tblAnnouncement;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAnnouncement = "hris_announcement";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblAnnouncement} as announcement, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where announcement.announcement_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by announcement.announcement_is_active desc, ";
            $sql .= "announcement.announcement_subscriber_id asc, ";
            $sql .= "announcement.announcement_date asc, ";
            $sql .= "announcement.announcement_title asc ";
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
            $sql .= "{$this->tblAnnouncement} as announcement, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where announcement.announcement_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by announcement.announcement_is_active desc, ";
            $sql .= "announcement.announcement_subscriber_id asc, ";
            $sql .= "announcement.announcement_date asc, ";
            $sql .= "announcement.announcement_title asc ";//para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->announcement_start - 1,
                "total" => $this->announcement_total,
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
            $sql .= "{$this->tblAnnouncement} as announcement, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where announcement.announcement_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (announcement.announcement_title like :announcement_title ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or DATE_FORMAT(announcement.announcement_date, '%M %e, %Y') LIKE :announcement_date ";
            $sql .= "or announcement.announcement_description like :announcement_description) ";
            $sql .= "order by announcement.announcement_is_active desc, ";
            $sql .= "announcement.announcement_date asc, ";
            $sql .= "announcement.announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "%{$this->announcement_search}%",
                "subscribers_code" => "%{$this->announcement_search}%",
                "announcement_date" => "%{$this->announcement_search}%",
                "announcement_description" => "%{$this->announcement_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblAnnouncement}";
            $sql .= "(announcement_is_active, ";
            $sql .= "announcement_subscriber_id, ";
            $sql .= "announcement_subscriber_code, ";
            $sql .= "announcement_date, ";
            $sql .= "announcement_title, ";
            $sql .= "announcement_description, ";
            $sql .= "announcement_created, ";
            $sql .= "announcement_datetime ) values ( ";
            $sql .= ":announcement_is_active, ";
            $sql .= ":announcement_subscriber_id, ";
            $sql .= ":announcement_subscriber_code, ";
            $sql .= ":announcement_date, ";
            $sql .= ":announcement_title, ";
            $sql .= ":announcement_description, ";
            $sql .= ":announcement_created, ";
            $sql .= ":announcement_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_subscriber_id" => $this->announcement_subscriber_id,
                "announcement_subscriber_code" => $this->announcement_subscriber_code,
                "announcement_date" => $this->announcement_date,
                "announcement_title" => $this->announcement_title,
                "announcement_description" => $this->announcement_description,
                "announcement_created" => $this->announcement_created,
                "announcement_datetime" => $this->announcement_datetime,
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
            $sql = "update {$this->tblAnnouncement} set ";
            $sql .= "announcement_subscriber_id = :announcement_subscriber_id, ";
            $sql .= "announcement_subscriber_code = :announcement_subscriber_code, ";
            $sql .= "announcement_date = :announcement_date, ";
            $sql .= "announcement_title = :announcement_title, ";
            $sql .= "announcement_description = :announcement_description, ";
            $sql .= "announcement_datetime = :announcement_datetime ";
            $sql .= "where announcement_aid = :announcement_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_subscriber_id" => $this->announcement_subscriber_id,
                "announcement_subscriber_code" => $this->announcement_subscriber_code,
                "announcement_date" => $this->announcement_date,
                "announcement_title" => $this->announcement_title,
                "announcement_description" => $this->announcement_description,
                "announcement_datetime" => $this->announcement_datetime,
                "announcement_aid" => $this->announcement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblAnnouncement} ";
            $sql .= "where announcement_aid = :announcement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_aid" => $this->announcement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblAnnouncement} set ";
            $sql .= "announcement_is_active = :announcement_is_active, ";
            $sql .= "announcement_datetime = :announcement_datetime ";
            $sql .= "where announcement_aid = :announcement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_datetime" => $this->announcement_datetime,
                "announcement_aid" => $this->announcement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select announcement_aid from {$this->tblAnnouncement} ";
            $sql .= "where announcement_title = :announcement_title ";
            $sql .= "and announcement_date = :announcement_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "{$this->announcement_title}",
                "announcement_date" => "{$this->announcement_date}",
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
            $sql .= "{$this->tblAnnouncement} as announcement, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where announcement.announcement_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (announcement.announcement_subscriber_id = :announcement_subscriber_id ";
            $sql .= "or announcement.announcement_is_active = :announcement_is_active) ";
            $sql .= "order by announcement.announcement_is_active desc, ";
            $sql .= "announcement.announcement_subscriber_id asc, ";
            $sql .= "announcement.announcement_date asc, ";
            $sql .= "announcement.announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_subscriber_id" => $this->announcement_subscriber_id,
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
            $sql .= "from ";
            $sql .= "{$this->tblAnnouncement} as announcement, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where announcement.announcement_is_active = :announcement_is_active ";
            $sql .= "and announcement.announcement_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (announcement.announcement_title like :announcement_title ";
            $sql .= "or subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or DATE_FORMAT(announcement.announcement_date, '%M %e, %Y') LIKE :announcement_date ";
            $sql .= "or announcement.announcement_description like :announcement_description) ";
            $sql .= "order by announcement.announcement_is_active desc, ";
            $sql .= "announcement.announcement_date asc, ";
            $sql .= "announcement.announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "%{$this->announcement_search}%",
                "subscribers_code" => "%{$this->announcement_search}%",
                "announcement_date" => "%{$this->announcement_search}%",
                "announcement_description" => "%{$this->announcement_search}%",
                "announcement_is_active" => $this->announcement_is_active,
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
                "subscribers_company_name" => "%{$this->announcement_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
