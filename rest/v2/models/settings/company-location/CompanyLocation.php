<?php

class CompanyLocation
{
    public $company_location_aid;
    public $company_location_is_active;
    public $company_location_subscriber_id;
    public $company_location_subscriber_code;
    public $company_location_company_name;
    public $company_location_name;
    public $company_location_created;
    public $company_location_datetime;

    public $company_info_subscriber_id;

    public $connection;
    public $lastInsertedId;
    public $company_location_start;
    public $company_location_total;
    public $company_location_search;

    public $tblCompanyLocation;
    public $tblCompanyInfo;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCompanyLocation = "hris_company_location";
        $this->tblSubscribers = "hris_subscribers";
        $this->tblCompanyInfo = "hris_company_info";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
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
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->company_location_start - 1,
                "total" => $this->company_location_total,
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
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (location.company_location_company_name like :company_location_company_name ";
            $sql .= "or location.company_location_name like :company_location_name) ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_company_name" => "%{$this->company_location_search}%",
                "company_location_name" => "%{$this->company_location_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblCompanyLocation}";
            $sql .= "(company_location_is_active, ";
            $sql .= "company_location_subscriber_id, ";
            $sql .= "company_location_subscriber_code, ";
            $sql .= "company_location_company_name, ";
            $sql .= "company_location_name, ";
            $sql .= "company_location_created, ";
            $sql .= "company_location_datetime ) values ( ";
            $sql .= ":company_location_is_active, ";
            $sql .= ":company_location_subscriber_id, ";
            $sql .= ":company_location_subscriber_code, ";
            $sql .= ":company_location_company_name, ";
            $sql .= ":company_location_name, ";
            $sql .= ":company_location_created, ";
            $sql .= ":company_location_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_is_active" => $this->company_location_is_active,
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
                "company_location_subscriber_code" => $this->company_location_subscriber_code,
                "company_location_company_name" => $this->company_location_company_name,
                "company_location_name" => $this->company_location_name,
                "company_location_created" => $this->company_location_created,
                "company_location_datetime" => $this->company_location_datetime,
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
            $sql = "update {$this->tblCompanyLocation} set ";
            $sql .= "company_location_subscriber_id = :company_location_subscriber_id, ";
            $sql .= "company_location_subscriber_code = :company_location_subscriber_code, ";
            $sql .= "company_location_company_name = :company_location_company_name, ";
            $sql .= "company_location_name = :company_location_name, ";
            $sql .= "company_location_datetime = :company_location_datetime ";
            $sql .= "where company_location_aid = :company_location_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
                "company_location_subscriber_code" => $this->company_location_subscriber_code,
                "company_location_company_name" => $this->company_location_company_name,
                "company_location_name" => $this->company_location_name,
                "company_location_datetime" => $this->company_location_datetime,
                "company_location_aid" => $this->company_location_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblCompanyLocation} ";
            $sql .= "where company_location_aid = :company_location_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_aid" => $this->company_location_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblCompanyLocation} set ";
            $sql .= "company_location_is_active = :company_location_is_active, ";
            $sql .= "company_location_datetime = :company_location_datetime ";
            $sql .= "where company_location_aid = :company_location_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_is_active" => $this->company_location_is_active,
                "company_location_datetime" => $this->company_location_datetime,
                "company_location_aid" => $this->company_location_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select company_location_subscriber_id from {$this->tblCompanyLocation} ";
            $sql .= "where company_location_subscriber_id = :company_location_subscriber_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_subscriber_id" => "{$this->company_location_subscriber_id}",
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
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and location.company_location_subscriber_id = :company_location_subscriber_id ";
            $sql .= "and location.company_location_is_active = :company_location_is_active ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_is_active" => $this->company_location_is_active,
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filteByStatusSubscriberCodeAndSearch() // for search, subscriber code, and status
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_is_active = :company_location_is_active ";
            $sql .= "and location.company_location_subscriber_id = :company_location_subscriber_id ";
            $sql .= "and location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (location.company_location_company_name like :company_location_company_name ";
            $sql .= "or location.company_location_name like :company_location_name) ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_company_name" => "%{$this->company_location_search}%",
                "company_location_name" => "%{$this->company_location_search}%",
                "company_location_is_active" => $this->company_location_is_active,
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterBySubscriberCode() // for subscriber code 
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and location.company_location_subscriber_id = :company_location_subscriber_id ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filteByStatusAndSubscriberCode() // for subscriber code and status 
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and location.company_location_subscriber_id = :company_location_subscriber_id ";
            $sql .= "and location.company_location_is_active = :company_location_is_active ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
                "company_location_is_active" => $this->company_location_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filteBySubscriberCodeAndSearch() // for subscriber code and search 
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and location.company_location_subscriber_id = :company_location_subscriber_id ";
            $sql .= "and (location.company_location_company_name like :company_location_company_name ";
            $sql .= "or location.company_location_name like :company_location_name) ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_company_name" => "%{$this->company_location_search}%",
                "company_location_name" => "%{$this->company_location_search}%",
                "company_location_subscriber_id" => $this->company_location_subscriber_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchAndStatus() // for status and search 
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyLocation} as location, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where location.company_location_is_active = :company_location_is_active ";
            $sql .= "and location.company_location_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (location.company_location_company_name like :company_location_company_name ";
            $sql .= "or location.company_location_name like :company_location_name) ";
            $sql .= "order by location.company_location_is_active desc, ";
            $sql .= "location.company_location_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_location_company_name" => "%{$this->company_location_search}%",
                "company_location_name" => "%{$this->company_location_search}%",
                "company_location_is_active" => $this->company_location_is_active,
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
                "subscribers_company_name" => "%{$this->company_location_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
