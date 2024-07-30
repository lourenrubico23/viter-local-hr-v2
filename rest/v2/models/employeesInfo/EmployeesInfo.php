<?php

class EmployeesInfo
{
  public $employees_info_aid;
    public $employees_info_is_active;
    public $employees_info_employees_id;
    public $employees_info_employees_fname_id;
    public $employees_info_employees_lname_id;
    public $employees_info_employees_mname_id;
    public $employees_info_employees_birth_date_id;
    public $employees_info_employees_marital_status_id;
    public $employees_info_street;
    public $employees_info_city;
    public $employees_info_province;
    public $employees_info_country;
    public $employees_info_postal_code;
    public $employees_info_employees_mobile_number_id;
    public $employees_info_telephone_number;
    public $employees_info_employees_personal_email_id;
    public $employees_info_created;
    public $employees_info_datetime;

  public $connection;
  public $lastInsertedId;
  public $employees_info_start;
  public $employees_info_total;
  public $employees_info_search;

  public $tblEmployees_info;
  public $tblEmployees;

  public function __construct($db)
  {
    $this->connection = $db;
    $this->tblEmployeesInfo = "hris_employees_info";
    $this->tblEmployees = "hris_employees";
  }



  // public function readLimit() 
  // {
  //     try {
  //       $sql = "select * ";
  //       $sql .= "from ";
  //       $sql .= "{$this->tblProfile} as pro, ";
  //       $sql .= "{$this->tblEmployees} as emp ";
  //       $sql .= "where pro.profile_lname_id = emp.employees_aid ";
  //         $sql .= "order by profile_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
  //         $sql .= "profile_aid asc ";
  //         $sql .= "limit :start, ";
  //         $sql .= ":total ";
  //         $query = $this->connection->prepare($sql);
  //         $query->execute([
  //             "start" => $this->profile_start - 1,
  //             "total" => $this->profile_total,
  //         ]);
  //     } catch (PDOException $ex) {
  //         $query = false;
  //     }
  //     return $query;
  // }

  public function readById()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblEmployeesInfo} as p, ";
      $sql .= "{$this->tblEmployees} as e ";
      $sql .= "where e.employees_aid = p.employees_info_employees_id ";
      $sql .= "and p.employees_info_employees_id = :employees_info_employees_id ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_info_employees_id" => $this->employees_info_employees_id,

      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function create()
  {
    try {
      $sql = "insert into {$this->tblEmployeesInfo}";
      $sql .= "(employees_info_is_active, ";
      $sql .= "employees_info_employees_fname_id, ";
      $sql .= "employees_info_employees_lname_id, ";
      $sql .= "employees_info_employees_mname_id, ";
      $sql .= "employees_info_employees_birth_date_id, ";
      $sql .= "employees_info_employees_marital_status_id, ";
      $sql .= "employees_info_street, ";
      $sql .= "employees_info_city, ";
      $sql .= "employees_info_province, ";
      $sql .= "employees_info_country, ";
      $sql .= "employees_info_postal_code, ";
      $sql .= "employees_info_employees_mobile_number_id, ";
      $sql .= "employees_info_telephone_number, ";
      $sql .= "employees_info_employees_personal_email_id, ";
      $sql .= "employees_info_created, ";
      $sql .= "employees_info_datetime ) values ( ";
      $sql .= ":employees_info_is_active, ";
      $sql .= ":employees_info_employees_fname_id, ";
      $sql .= ":employees_info_employees_lname_id, ";
      $sql .= ":employees_info_employees_mname_id, ";
      $sql .= ":employees_info_employees_birth_date_id, ";
      $sql .= ":employees_info_employees_marital_status_id, ";
      $sql .= ":employees_info_street, ";
      $sql .= ":employees_info_city, ";
      $sql .= ":employees_info_province, ";
      $sql .= ":employees_info_country, ";
      $sql .= ":employees_info_postal_code, ";
      $sql .= ":employees_info_employees_mobile_number_id, ";
      $sql .= ":employees_info_telephone_number, ";
      $sql .= ":employees_info_employees_personal_email_id, ";
      $sql .= ":employees_info_created, ";
      $sql .= ":employees_info_datetime )";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_info_is_active" => $this->employees_info_is_active,
        "employees_info_employees_fname_id" => $this->employees_info_employees_fname_id,
        "employees_info_employees_lname_id" => $this->employees_info_employees_lname_id,
        "employees_info_employees_mname_id" => $this->employees_info_employees_mname_id,
        "employees_info_employees_birth_date_id" => $this->employees_info_employees_birth_date_id,
        "employees_info_employees_marital_status_id" => $this->employees_info_employees_marital_status_id,
        "employees_info_street" => $this->employees_info_street,
        "employees_info_city" => $this->employees_info_city,
        "employees_info_province" => $this->employees_info_province,
        "employees_info_country" => $this->employees_info_country,
        "employees_info_postal_code" => $this->employees_info_postal_code,
        "employees_info_employees_mobile_number_id" => $this->employees_info_employees_mobile_number_id,
        "employees_info_telephone_number" => $this->employees_info_telephone_number,
        "employees_info_employees_personal_email_id" => $this->employees_info_employees_personal_email_id,
        "employees_info_created" => $this->employees_info_created,
        "employees_info_datetime" => $this->employees_info_datetime,
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
      $sql = "update {$this->tblEmployeesInfo} set ";
      $sql .= "employees_info_employees_fname_id = :employees_info_employees_fname_id, ";
      $sql .= "employees_info_employees_lname_id = :employees_info_employees_lname_id, ";
      $sql .= "employees_info_employees_mname_id = :employees_info_employees_mname_id, ";
      $sql .= "employees_info_employees_birth_date_id = :employees_info_employees_birth_date_id, ";
      $sql .= "employees_info_employees_marital_status_id = :employees_info_employees_marital_status_id, ";
      $sql .= "employees_info_street = :employees_info_street, ";
      $sql .= "employees_info_city = :employees_info_city, ";
      $sql .= "employees_info_province = :employees_info_province, ";
      $sql .= "employees_info_country = :employees_info_country, ";
      $sql .= "employees_info_postal_code = :employees_info_postal_code, ";
      $sql .= "employees_info_employees_mobile_number_id = :employees_info_employees_mobile_number_id, ";
      $sql .= "employees_info_telephone_number = :employees_info_telephone_number, ";
      $sql .= "employees_info_employees_personal_email_id = :employees_info_employees_personal_email_id, ";
      $sql .= "employees_info_datetime = :employees_info_datetime ";
      $sql .= "where employees_info_aid = :employees_info_aid";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_info_employees_fname_id" => $this->employees_info_employees_fname_id,
        "employees_info_employees_lname_id" => $this->employees_info_employees_lname_id,
        "employees_info_employees_mname_id" => $this->employees_info_employees_mname_id,
        "employees_info_employees_birth_date_id" => $this->employees_info_employees_birth_date_id,
        "employees_info_employees_marital_status_id" => $this->employees_info_employees_marital_status_id,
        "employees_info_street" => $this->employees_info_street,
        "employees_info_city" => $this->employees_info_city,
        "employees_info_province" => $this->employees_info_province,
        "employees_info_country" => $this->employees_info_country,
        "employees_info_postal_code" => $this->employees_info_postal_code,
        "employees_info_employees_mobile_number_id" => $this->employees_info_employees_mobile_number_id,
        "employees_info_telephone_number" => $this->employees_info_telephone_number,
        "employees_info_employees_personal_email_id" => $this->employees_info_employees_personal_email_id,
        "employees_info_datetime" => $this->employees_info_datetime,
        "employees_info_aid" => $this->employees_info_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function checkName()
  {
    try {
      $sql = "select employees_info_employees_fname_id from {$this->tblEmployeesInfo} ";
      $sql .= "where employees_info_employees_fname_id = :employees_info_employees_fname_id ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_info_employees_fname_id" => "{$this->employees_info_employees_fname_id}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}
