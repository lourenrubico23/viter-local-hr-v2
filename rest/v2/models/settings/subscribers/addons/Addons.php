<?php

class Addons
{
    public $addons_aid;
    public $addons_is_active;
    public $addons_subscriber_id;
    public $addons_feature_code_id;
    public $addons_created;
    public $addons_datetime;

    public $connection;
    public $lastInsertedId;
    public $addons_start;
    public $addons_total;
    public $addons_search;

    public $tblAddons;
    public $tblSubscribers;
    public $tblFeatures;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAddons = "hris_addons";
        $this->tblSubscribers = "hris_subscribers";
        $this->tblFeatures = "hris_features";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblAddons} as addons, ";
            $sql .= "{$this->tblSubscribers} as subscribers, ";
            $sql .= "{$this->tblFeatures} as features ";
            $sql .= "where addons.addons_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and addons.addons_feature_code_id = features.features_aid ";
            $sql .= "order by addons.addons_is_active desc, ";
            $sql .= "addons.addons_subscriber_id asc ";
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
            $sql .= "{$this->tblAddons} as addons, ";
            $sql .= "{$this->tblSubscribers} as subscribers, ";
            $sql .= "{$this->tblFeatures} as features ";
            $sql .= "where addons.addons_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and addons.addons_feature_code_id = features.features_aid ";
            $sql .= "order by addons.addons_is_active desc, ";
            $sql .= "addons.addons_subscriber_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->addons_start - 1,
                "total" => $this->addons_total,
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
            $sql .= "{$this->tblAddons} as addons, ";
            $sql .= "{$this->tblSubscribers} as subscribers, ";
            $sql .= "{$this->tblFeatures} as features ";
            $sql .= "where addons.addons_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and addons.addons_feature_code_id = features.features_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or subscribers.subscribers_subscription_type like :subscribers_subscription_type ";
            $sql .= "or subscribers.subscribers_company_name like :subscribers_company_name ";
            $sql .= "or features.features_code like :features_code) ";
            $sql .= "order by addons.addons_is_active desc, ";
            $sql .= "addons.addons_subscriber_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->addons_search}%",
                "subscribers_subscription_type" => "%{$this->addons_search}%",
                "subscribers_company_name" => "%{$this->addons_search}%",
                "features_code" => "%{$this->addons_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblAddons}";
            $sql .= "(addons_is_active, ";
            $sql .= "addons_subscriber_id, ";
            $sql .= "addons_feature_code_id, ";
            $sql .= "addons_created, ";
            $sql .= "addons_datetime ) values ( ";
            $sql .= ":addons_is_active, ";
            $sql .= ":addons_subscriber_id, ";
            $sql .= ":addons_feature_code_id, ";
            $sql .= ":addons_created, ";
            $sql .= ":addons_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_is_active" => $this->addons_is_active,
                "addons_subscriber_id" => $this->addons_subscriber_id,
                "addons_feature_code_id" => $this->addons_feature_code_id,
                "addons_created" => $this->addons_created,
                "addons_datetime" => $this->addons_datetime,
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
            $sql = "update {$this->tblAddons} set ";
            $sql .= "addons_subscriber_id = :addons_subscriber_id, ";
            $sql .= "addons_feature_code_id = :addons_feature_code_id, ";
            $sql .= "addons_datetime = :addons_datetime ";
            $sql .= "where addons_aid = :addons_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_subscriber_id" => $this->addons_subscriber_id,
                "addons_feature_code_id" => $this->addons_feature_code_id,
                "addons_datetime" => $this->addons_datetime,
                "addons_aid" => $this->addons_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblAddons} ";
            $sql .= "where addons_aid = :addons_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_aid" => $this->addons_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblAddons} set ";
            $sql .= "addons_is_active = :addons_is_active, ";
            $sql .= "addons_datetime = :addons_datetime ";
            $sql .= "where addons_aid = :addons_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_is_active" => $this->addons_is_active,
                "addons_datetime" => $this->addons_datetime,
                "addons_aid" => $this->addons_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select addons_aid from {$this->tblAddons} ";
            $sql .= "where addons_feature_code_id = :addons_feature_code_id ";
            $sql .= "and addons_subscriber_id = :addons_subscriber_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_feature_code_id" => "{$this->addons_feature_code_id}",
                "addons_subscriber_id" => "{$this->addons_subscriber_id}",
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
            $sql .= "{$this->tblAddons} as addons, ";
            $sql .= "{$this->tblSubscribers} as subscribers, ";
            $sql .= "{$this->tblFeatures} as features ";
            $sql .= "where addons.addons_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and addons.addons_feature_code_id = features.features_aid ";
            $sql .= "and (addons.addons_subscriber_id = :addons_subscriber_id ";
            $sql .= "or addons.addons_feature_code_id = :addons_feature_code_id ";
            $sql .= "or addons.addons_is_active = :addons_is_active) ";
            $sql .= "order by addons.addons_is_active desc, ";
            $sql .= "addons.addons_subscriber_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "addons_is_active" => $this->addons_is_active,
                "addons_subscriber_id" => $this->addons_subscriber_id,
                "addons_feature_code_id" => $this->addons_feature_code_id,
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
            $sql .= "{$this->tblAddons} as addons, ";
            $sql .= "{$this->tblSubscribers} as subscribers, ";
            $sql .= "{$this->tblFeatures} as features ";
            $sql .= "where addons.addons_is_active = :addons_is_active ";
            $sql .= "and addons.addons_subscriber_id = subscribers.subscribers_aid ";
            $sql .= "and addons.addons_feature_code_id = features.features_aid ";
            $sql .= "and (subscribers.subscribers_code like :subscribers_code ";
            $sql .= "or subscribers.subscribers_subscription_type like :subscribers_subscription_type ";
            $sql .= "or subscribers.subscribers_company_name like :subscribers_company_name ";
            $sql .= "or features.features_code like :features_code) ";
            $sql .= "order by addons.addons_is_active desc, ";
            $sql .= "addons.addons_subscriber_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribers_code" => "%{$this->addons_search}%",
                "subscribers_subscription_type" => "%{$this->addons_search}%",
                "subscribers_company_name" => "%{$this->addons_search}%",
                "features_code" => "%{$this->addons_search}%",
                "addons_is_active" => $this->addons_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function searchFeatures() // for Features debounce
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblFeatures} ";
            $sql .= "where features_name like :features_name ";
            $sql .= "and features_is_active = 1 ";
            $sql .= "order by ";
            $sql .= "features_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "features_name" => "%{$this->addons_search}%",
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
                "subscribers_company_name" => "%{$this->addons_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    
}
