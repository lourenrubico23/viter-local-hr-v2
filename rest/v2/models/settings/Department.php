<?php

class Department
{
    public $department_aid;
    public $department_is_active;
    public $department_name;
    public $department_created;
    public $department_datetime;

    public $connection;
    public $lastInsertedId;
    public $department_start;
    public $department_total;
    public $department_search;

    public $tblDepartment;
    public $tblEmployees;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDepartment = "hris_department";
        $this->tblEmployees = "hris_employees";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblDepartment} ";
            $sql .= "order by department_is_active desc, ";
            $sql .= "department_name asc ";
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
            $sql .= "{$this->tblDepartment} ";
            $sql .= "order by department_is_active desc, ";
            $sql .= "department_name asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->department_start - 1,
                "total" => $this->department_total,
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
            $sql .= "from {$this->tblDepartment} ";
            $sql .= "where department_name like :department_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => "%{$this->department_search}%",

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblDepartment}";
            $sql .= "(department_is_active, ";
            $sql .= "department_name, ";
            $sql .= "department_created, ";
            $sql .= "department_datetime ) values ( ";
            $sql .= ":department_is_active, ";
            $sql .= ":department_name, ";
            $sql .= ":department_created, ";
            $sql .= ":department_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_name" => $this->department_name,
                "department_created" => $this->department_created,
                "department_datetime" => $this->department_datetime,
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
            $sql = "update {$this->tblDepartment} set ";
            $sql .= "department_name = :department_name, ";
            $sql .= "department_datetime = :department_datetime ";
            $sql .= "where department_aid = :department_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
                "department_datetime" => $this->department_datetime,
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblDepartment} ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblDepartment} set ";
            $sql .= "department_is_active = :department_is_active, ";
            $sql .= "department_datetime = :department_datetime ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_datetime" => $this->department_datetime,
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select department_name from {$this->tblDepartment} ";
            $sql .= "where department_name = :department_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => "{$this->department_name}",
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
            $sql .= "from {$this->tblDepartment} ";
            $sql .= "where department_is_active = :department_is_active ";
            $sql .= "order by department_is_active desc, ";
            $sql .= "department_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
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
            $sql .= "from {$this->tblDepartment} ";
            $sql .= "where department_is_active = :department_is_active ";
            $sql .= "and department_name like :department_name ";
            $sql .= "order by department_is_active desc, ";
            $sql .= "department_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => "%{$this->department_search}%",
                "department_is_active" => $this->department_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationEmployeesDepartmentName()
    {
        try {
            $sql = "select employees_department_id from {$this->tblEmployees} ";
            $sql .= "where employees_department_id = :employees_department_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_department_id" => $this->department_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
