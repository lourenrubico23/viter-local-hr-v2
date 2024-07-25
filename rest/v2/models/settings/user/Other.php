<?php

class Other
{
    public $user_other_aid;
    public $user_other_is_active;
    public $user_other_fname;
    public $user_other_lname;
    public $user_other_email;
    public $user_other_role_id;
    public $user_other_created;
    public $user_other_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_other_start;
    public $user_other_total;
    public $user_other_search;

    public $tblUserOther;
    public $tblUserRole;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserOther = "hris_user_other";
        $this->tblUserRole = "hris_user_role";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblUserOther} as other, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where other.user_other_role_id = role.user_role_aid ";
            $sql .= "order by other.user_other_is_active desc, ";
            $sql .= "other.user_other_aid asc ";
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
            $sql .= "{$this->tblUserOther} as other, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where other.user_other_role_id = role.user_role_aid ";
            $sql .= "order by other.user_other_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "other.user_other_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_other_start - 1,
                "total" => $this->user_other_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblUserOther} as other, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where other.user_other_role_id = role.user_role_aid ";
            $sql .= "where other.user_other_aid = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_aid" => $this->user_other_aid,
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
            $sql .= "{$this->tblUserOther} as other, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where other.user_other_role_id = role.user_role_aid ";
            $sql .= "and other.user_other_fname like :user_other_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_fname" => "%{$this->user_other_search}%",

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserOther}";
            $sql .= "(user_other_is_active, ";
            $sql .= "user_other_fname, ";
            $sql .= "user_other_lname, ";
            $sql .= "user_other_email, ";
            $sql .= "user_other_role_id, ";
            $sql .= "user_other_created, ";
            $sql .= "user_other_datetime ) values ( ";
            $sql .= ":user_other_is_active, ";
            $sql .= ":user_other_fname, ";
            $sql .= ":user_other_lname, ";
            $sql .= ":user_other_email, ";
            $sql .= ":user_other_role_id, ";
            $sql .= ":user_other_created, ";
            $sql .= ":user_other_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->user_other_is_active,
                "user_other_fname" => $this->user_other_fname,
                "user_other_lname" => $this->user_other_lname,
                "user_other_email" => $this->user_other_email,
                "user_other_role_id" => $this->user_other_role_id,
                "user_other_created" => $this->user_other_created,
                "user_other_datetime" => $this->user_other_datetime,
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
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_fname = :user_other_fname, ";
            $sql .= "user_other_lname = :user_other_lname, ";
            $sql .= "user_other_email = :user_other_email, ";
            $sql .= "user_other_role_id = :user_other_role_id, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_aid = :user_other_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_fname" => $this->user_other_fname,
                "user_other_lname" => $this->user_other_lname,
                "user_other_email" => $this->user_other_email,
                "user_other_role_id" => $this->user_other_role_id,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblUserOther} ";
            $sql .= "where user_other_aid = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_is_active = :user_other_is_active, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_aid = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->user_other_is_active,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readAllRole()
    {
        try {
            $sql = "select * from {$this->tblUserRole} ";
            $sql .= "where user_role_name = :user_role_name ";
            $sql .= "order by user_role_is_active desc, ";
            $sql .= "user_role_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select user_other_fname from {$this->tblUserOther} ";
            $sql .= "where user_other_fname = :user_other_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_fname" => "{$this->user_other_fname}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
