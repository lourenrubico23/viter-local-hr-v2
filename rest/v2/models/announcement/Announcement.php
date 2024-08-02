<?php

class Announcement
{
    public $announcement_aid;
    public $announcement_is_active;
    public $announcement_subscriber;
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

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAnnouncement = "hris_announcement";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblAnnouncement} ";
            $sql .= "order by announcement_is_active desc, ";
            $sql .= "announcement_date asc, ";
            $sql .= "announcement_title asc ";
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
            $sql .= "{$this->tblAnnouncement} ";
            $sql .= "order by announcement_is_active desc, ";
            $sql .= "announcement_date asc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "announcement_title asc "; //para nasa baba ng table ang mga inactive or archived
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
            $sql .= "from {$this->tblAnnouncement} ";
            $sql .= "where announcement_title = announcement_title ";
            $sql .= "and (announcement_title like :announcement_title ";
            $sql .= "or announcement_subscriber like :announcement_subscriber ";
            $sql .= "or DATE_FORMAT(announcement_date, '%M %e, %Y') LIKE :announcement_date ";
            $sql .= "or announcement_description like :announcement_description) ";
            $sql .= "order by announcement_is_active desc, ";
            $sql .= "announcement_date asc, ";
            $sql .= "announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "%{$this->announcement_search}%",
                "announcement_subscriber" => "%{$this->announcement_search}%",
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
            $sql .= "announcement_subscriber, ";
            $sql .= "announcement_date, ";
            $sql .= "announcement_title, ";
            $sql .= "announcement_description, ";
            $sql .= "announcement_created, ";
            $sql .= "announcement_datetime ) values ( ";
            $sql .= ":announcement_is_active, ";
            $sql .= ":announcement_subscriber, ";
            $sql .= ":announcement_date, ";
            $sql .= ":announcement_title, ";
            $sql .= ":announcement_description, ";
            $sql .= ":announcement_created, ";
            $sql .= ":announcement_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_subscriber" => $this->announcement_subscriber,
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
            $sql .= "announcement_subscriber = :announcement_subscriber, ";
            $sql .= "announcement_date = :announcement_date, ";
            $sql .= "announcement_title = :announcement_title, ";
            $sql .= "announcement_description = :announcement_description, ";
            $sql .= "announcement_datetime = :announcement_datetime ";
            $sql .= "where announcement_aid = :announcement_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_subscriber" => $this->announcement_subscriber,
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
            $sql = "select announcement_title from {$this->tblAnnouncement} ";
            $sql .= "where announcement_title = :announcement_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "{$this->announcement_title}",
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
            $sql .= "from {$this->tblAnnouncement} ";
            $sql .= "where announcement_is_active = :announcement_is_active ";
            $sql .= "order by announcement_is_active desc, ";
            $sql .= "announcement_date asc, ";
            $sql .= "announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
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
            $sql .= "from {$this->tblAnnouncement} ";
            $sql .= "where announcement_is_active = :announcement_is_active ";
            $sql .= "and (announcement_title like :announcement_title ";
            $sql .= "or announcement_subscriber like :announcement_subscriber ";
            $sql .= "or DATE_FORMAT(announcement_date, '%M %e, %Y') LIKE :announcement_date ";
            $sql .= "or announcement_description like :announcement_description) ";
            $sql .= "order by announcement_is_active desc, ";
            $sql .= "announcement_date asc, ";
            $sql .= "announcement_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_title" => "%{$this->announcement_search}%",
                "announcement_subscriber" => "%{$this->announcement_search}%",
                "announcement_date" => "%{$this->announcement_search}%",
                "announcement_description" => "%{$this->announcement_search}%",
                "announcement_is_active" => $this->announcement_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
