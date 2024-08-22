<?php

class CompanyInfo
{
    public $company_info_aid;
    public $company_info_is_active;
    public $company_info_subscriber_id;
    public $company_info_subscriber_code;
    public $company_info_subscriber_company_name;
    public $company_info_phone;
    public $company_info_email;
    public $company_info_street;
    public $company_info_city;
    public $company_info_province;
    public $company_info_postal;
    public $company_info_country;
    public $company_info_primary_color;
    public $company_info_secondary_color;
    public $company_info_accent_color;
    public $company_info_image;
    public $company_info_created;
    public $company_info_datetime;

    public $connection;
    public $lastInsertedId;
    public $company_info_start;
    public $company_info_total;
    public $company_info_search;

    public $tblCompanyInfo;
    public $tblSubscribers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCompanyInfo = "hris_company_info";
        $this->tblSubscribers = "hris_subscribers";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblCompanyInfo} as companyInfo, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where companyInfo.company_info_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by companyInfo.company_info_is_active desc, ";
            $sql .= "companyInfo.company_info_subscriber_code asc ";
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
            $sql .= "{$this->tblCompanyInfo} as companyInfo, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where companyInfo.company_info_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "order by companyInfo.company_info_is_active desc, ";
            $sql .= "companyInfo.company_info_subscriber_code asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->company_info_start - 1,
                "total" => $this->company_info_total,
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
            $sql .= "{$this->tblCompanyInfo} as companyInfo, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where companyInfo.company_info_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or companyInfo.company_info_subscriber_company_name like :company_info_subscriber_company_name ";
            $sql .= "or companyInfo.company_info_phone like :company_info_phone ";
            $sql .= "or companyInfo.company_info_email like :company_info_email ";
            $sql .= "or concat(companyInfo.company_info_street, ' ', companyInfo.company_info_city, ' ', companyInfo.company_info_province, ' ', companyInfo.company_info_postal, ' ', companyInfo.company_info_country ) like :address) ";
            $sql .= "order by companyInfo.company_info_is_active desc, ";
            $sql .= "companyInfo.company_info_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->company_info_search}%",
                "address" => "%{$this->company_info_search}%",
                "company_info_subscriber_company_name" => "%{$this->company_info_search}%",
                "company_info_phone" => "%{$this->company_info_search}%",
                "company_info_email" => "%{$this->company_info_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblCompanyInfo}";
            $sql .= "(company_info_is_active, ";
            $sql .= "company_info_subscriber_id, ";
            $sql .= "company_info_subscriber_code, ";
            $sql .= "company_info_subscriber_company_name, ";
            $sql .= "company_info_phone, ";
            $sql .= "company_info_email, ";
            $sql .= "company_info_street, ";
            $sql .= "company_info_city, ";
            $sql .= "company_info_province, ";
            $sql .= "company_info_postal, ";
            $sql .= "company_info_country, ";
            $sql .= "company_info_primary_color, ";
            $sql .= "company_info_secondary_color, ";
            $sql .= "company_info_accent_color, ";
            $sql .= "company_info_image, ";
            $sql .= "company_info_created, ";
            $sql .= "company_info_datetime ) values ( ";
            $sql .= ":company_info_is_active, ";
            $sql .= ":company_info_subscriber_id, ";
            $sql .= ":company_info_subscriber_code, ";
            $sql .= ":company_info_subscriber_company_name, ";
            $sql .= ":company_info_phone, ";
            $sql .= ":company_info_email, ";
            $sql .= ":company_info_street, ";
            $sql .= ":company_info_city, ";
            $sql .= ":company_info_province, ";
            $sql .= ":company_info_postal, ";
            $sql .= ":company_info_country, ";
            $sql .= ":company_info_primary_color, ";
            $sql .= ":company_info_secondary_color, ";
            $sql .= ":company_info_accent_color, ";
            $sql .= ":company_info_image, ";
            $sql .= ":company_info_created, ";
            $sql .= ":company_info_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_is_active" => $this->company_info_is_active,
                "company_info_subscriber_id" => $this->company_info_subscriber_id,
                "company_info_subscriber_code" => $this->company_info_subscriber_code,
                "company_info_subscriber_company_name" => $this->company_info_subscriber_company_name,
                "company_info_phone" => $this->company_info_phone,
                "company_info_email" => $this->company_info_email,
                "company_info_street" => $this->company_info_street,
                "company_info_city" => $this->company_info_city,
                "company_info_province" => $this->company_info_province,
                "company_info_postal" => $this->company_info_postal,
                "company_info_country" => $this->company_info_country,
                "company_info_primary_color" => $this->company_info_primary_color,
                "company_info_secondary_color" => $this->company_info_secondary_color,
                "company_info_accent_color" => $this->company_info_accent_color,
                "company_info_image" => $this->company_info_image,
                "company_info_created" => $this->company_info_created,
                "company_info_datetime" => $this->company_info_datetime,
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
            $sql = "update {$this->tblCompanyInfo} set ";
            $sql .= "company_info_subscriber_id = :company_info_subscriber_id, ";
            $sql .= "company_info_subscriber_code = :company_info_subscriber_code, ";
            $sql .= "company_info_subscriber_company_name = :company_info_subscriber_company_name, ";
            $sql .= "company_info_phone = :company_info_phone, ";
            $sql .= "company_info_email = :company_info_email, ";
            $sql .= "company_info_street = :company_info_street, ";
            $sql .= "company_info_city = :company_info_city, ";
            $sql .= "company_info_province = :company_info_province, ";
            $sql .= "company_info_postal = :company_info_postal, ";
            $sql .= "company_info_country = :company_info_country, ";
            $sql .= "company_info_primary_color = :company_info_primary_color, ";
            $sql .= "company_info_secondary_color = :company_info_secondary_color, ";
            $sql .= "company_info_accent_color = :company_info_accent_color, ";
            $sql .= "company_info_image = :company_info_image, ";
            $sql .= "company_info_datetime = :company_info_datetime ";
            $sql .= "where company_info_aid = :company_info_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_subscriber_id" => $this->company_info_subscriber_id,
                "company_info_subscriber_code" => $this->company_info_subscriber_code,
                "company_info_subscriber_company_name" => $this->company_info_subscriber_company_name,
                "company_info_phone" => $this->company_info_phone,
                "company_info_email" => $this->company_info_email,
                "company_info_street" => $this->company_info_street,
                "company_info_city" => $this->company_info_city,
                "company_info_province" => $this->company_info_province,
                "company_info_postal" => $this->company_info_postal,
                "company_info_country" => $this->company_info_country,
                "company_info_primary_color" => $this->company_info_primary_color,
                "company_info_secondary_color" => $this->company_info_secondary_color,
                "company_info_accent_color" => $this->company_info_accent_color,
                "company_info_image" => $this->company_info_image,
                "company_info_datetime" => $this->company_info_datetime,
                "company_info_aid" => $this->company_info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblCompanyInfo} ";
            $sql .= "where company_info_aid = :company_info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_aid" => $this->company_info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblCompanyInfo} set ";
            $sql .= "company_info_is_active = :company_info_is_active, ";
            $sql .= "company_info_datetime = :company_info_datetime ";
            $sql .= "where company_info_aid = :company_info_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_is_active" => $this->company_info_is_active,
                "company_info_datetime" => $this->company_info_datetime,
                "company_info_aid" => $this->company_info_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select company_info_subscriber_id from {$this->tblCompanyInfo} ";
            $sql .= "where company_info_subscriber_id = :company_info_subscriber_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_subscriber_id" => "{$this->company_info_subscriber_id}",
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
            $sql .= "{$this->tblCompanyInfo} as companyInfo, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where companyInfo.company_info_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (companyInfo.company_info_subscriber_id = :company_info_subscriber_id ";
            $sql .= "or companyInfo.company_info_is_active = :company_info_is_active) ";
            $sql .= "order by companyInfo.company_info_is_active desc, ";
            $sql .= "companyInfo.company_info_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_info_is_active" => $this->company_info_is_active,
                "company_info_subscriber_id" => $this->company_info_subscriber_id,
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
            $sql .= "{$this->tblCompanyInfo} as companyInfo, ";
            $sql .= "{$this->tblSubscribers} as subscribers ";
            $sql .= "where companyInfo.company_info_is_active = :company_info_is_active ";
            $sql .= "and companyInfo.company_info_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or companyInfo.company_info_subscriber_company_name like :company_info_subscriber_company_name ";
            $sql .= "or companyInfo.company_info_phone like :company_info_phone ";
            $sql .= "or companyInfo.company_info_email like :company_info_email ";
            $sql .= "or concat(companyInfo.company_info_street, ' ', companyInfo.company_info_city, ' ', companyInfo.company_info_province, ' ', companyInfo.company_info_postal, ' ', companyInfo.company_info_country ) like :address) ";
            $sql .= "order by companyInfo.company_info_is_active desc, ";
            $sql .= "companyInfo.company_info_subscriber_code asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->company_info_search}%",
                "address" => "%{$this->company_info_search}%",
                "company_info_subscriber_company_name" => "%{$this->company_info_search}%",
                "company_info_phone" => "%{$this->company_info_search}%",
                "company_info_email" => "%{$this->company_info_search}%",
                "company_info_is_active" => $this->company_info_is_active,
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
                "subscribers_company_name" => "%{$this->company_info_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
