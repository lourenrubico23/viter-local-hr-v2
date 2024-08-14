<?php

class Features
{
    public $features_aid;
    public $features_is_active;
    public $features_name;
    public $features_code;
    public $features_created;
    public $features_datetime;

    public $connection;
    public $lastInsertedId;
    public $features_start;
    public $features_total;
    public $features_search;

    public $tblFeatures;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblFeatures = "hris_features";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblFeatures} ";
            $sql .= "order by features_is_active desc, ";
            $sql .= "features_name asc ";
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
            $sql .= "{$this->tblFeatures} ";
            $sql .= "order by features_is_active desc, ";
            $sql .= "features_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->features_start - 1,
                "total" => $this->features_total,
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
            $sql .= "from {$this->tblFeatures} ";
            $sql .= "where features_name = features_name ";
            $sql .= "and (features_name like :features_name ";
            $sql .= "or features_code like :features_code) ";
            $sql .= "order by features_is_active desc, ";
            $sql .= "features_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_name" => "%{$this->features_search}%",
                "features_code" => "%{$this->features_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblFeatures}";
            $sql .= "(features_is_active, ";
            $sql .= "features_name, ";
            $sql .= "features_code, ";
            $sql .= "features_created, ";
            $sql .= "features_datetime ) values ( ";
            $sql .= ":features_is_active, ";
            $sql .= ":features_name, ";
            $sql .= ":features_code, ";
            $sql .= ":features_created, ";
            $sql .= ":features_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_is_active" => $this->features_is_active,
                "features_name" => $this->features_name,
                "features_code" => $this->features_code,
                "features_created" => $this->features_created,
                "features_datetime" => $this->features_datetime,
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
            $sql = "update {$this->tblFeatures} set ";
            $sql .= "features_name = :features_name, ";
            $sql .= "features_code = :features_code, ";
            $sql .= "features_datetime = :features_datetime ";
            $sql .= "where features_aid = :features_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_name" => $this->features_name,
                "features_code" => $this->features_code,
                "features_datetime" => $this->features_datetime,
                "features_aid" => $this->features_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblFeatures} ";
            $sql .= "where features_aid = :features_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_aid" => $this->features_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblFeatures} set ";
            $sql .= "features_is_active = :features_is_active, ";
            $sql .= "features_datetime = :features_datetime ";
            $sql .= "where features_aid = :features_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_is_active" => $this->features_is_active,
                "features_datetime" => $this->features_datetime,
                "features_aid" => $this->features_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select features_aid from {$this->tblFeatures} ";
            $sql .= "where features_code = :features_code ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_code" => $this->features_code,
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
            $sql .= "from {$this->tblFeatures} ";
            $sql .= "where features_is_active = :features_is_active ";
            $sql .= "order by features_is_active desc, ";
            $sql .= "features_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_is_active" => $this->features_is_active,
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
            $sql .= "from {$this->tblFeatures} ";
            $sql .= "where features_is_active = :features_is_active ";
            $sql .= "and (features_name like :features_name ";
            $sql .= "or features_code like :features_code) ";
            $sql .= "order by features_is_active desc, ";
            $sql .= "features_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_name" => "%{$this->features_search}%",
                "features_code" => "%{$this->features_search}%",
                "features_is_active" => $this->features_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}
