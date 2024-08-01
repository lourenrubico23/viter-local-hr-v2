<?php

class EmployeesInfo
{
  public $employees_aid;
  public $employees_fname;
  public $employees_lname;
  public $employees_mname;
  public $employees_gender;
  public $employees_department_id;
  public $employees_personal_email;
  public $employees_birth_date;
  public $employees_marital_status;
  public $employees_date_employed;
  public $employees_mobile_number;
  public $employees_work_email;
  public $employees_number;
  public $employees_is_active;
  public $employees_street;
  public $employees_city;
  public $employees_province;
  public $employees_country;
  public $employees_postal_code;
  public $employees_telephone_number;
  public $employees_mother_maiden;
  public $employees_mother_fname;
  public $employees_mother_mname;
  public $employees_father_lname;
  public $employees_father_fname;
  public $employees_father_mname;
  public $employees_family_contact;
  public $employees_family_address;
  public $employees_emergency_contact_name;
  public $employees_emergency_contact_relationship;
  public $employees_emergency_contact_number;
  public $employees_emergency_contact_address;
  public $employees_created;
  public $employees_datetime;

  public $connection;
  public $lastInsertedId;

  public $tblEmployees;

  public function __construct($db)
  {
    $this->connection = $db;
    $this->tblEmployees = "hris_employees";
  }


  public function readAll()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblEmployees} ";
      $sql .= "order by employees_is_active desc ";
      $query = $this->connection->query($sql);
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
      $sql .= "{$this->tblEmployees} ";
      $sql .= "where employees_aid = employees_aid ";
      $sql .= "and employees_aid = :employees_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_aid" => $this->employees_aid,

      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function update()
  {
    try {
      $sql = "update {$this->tblEmployees} set ";
      $sql .= "employees_fname = :employees_fname, ";
      $sql .= "employees_lname = :employees_lname, ";
      $sql .= "employees_mname = :employees_mname, ";
      $sql .= "employees_number = :employees_number, ";
      $sql .= "employees_birth_date = :employees_birth_date, ";
      $sql .= "employees_street = :employees_street, ";
      $sql .= "employees_city = :employees_city, ";
      $sql .= "employees_province = :employees_province, ";
      $sql .= "employees_country = :employees_country, ";
      $sql .= "employees_postal_code = :employees_postal_code, ";
      $sql .= "employees_marital_status = :employees_marital_status, ";
      $sql .= "employees_mobile_number = :employees_mobile_number, ";
      $sql .= "employees_telephone_number = :employees_telephone_number, ";
      $sql .= "employees_personal_email = :employees_personal_email, ";
      $sql .= "employees_datetime = :employees_datetime ";
      $sql .= "where employees_aid = :employees_aid";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_fname" => $this->employees_fname,
        "employees_lname" => $this->employees_lname,
        "employees_mname" => $this->employees_mname,
        "employees_number" => $this->employees_number,
        "employees_birth_date" => $this->employees_birth_date,
        "employees_street" => $this->employees_street,
        "employees_city" => $this->employees_city,
        "employees_province" => $this->employees_province,
        "employees_country" => $this->employees_country,
        "employees_postal_code" => $this->employees_postal_code,
        "employees_marital_status" => $this->employees_marital_status,
        "employees_mobile_number" => $this->employees_mobile_number,
        "employees_telephone_number" => $this->employees_telephone_number,
        "employees_personal_email" => $this->employees_personal_email,
        "employees_datetime" => $this->employees_datetime,
        "employees_aid" => $this->employees_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function updateFamilyInfo()
  {
    try {
      $sql = "update {$this->tblEmployees} set ";
      $sql .= "employees_mother_maiden = :employees_mother_maiden, ";
      $sql .= "employees_mother_fname = :employees_mother_fname, ";
      $sql .= "employees_mother_mname = :employees_mother_mname, ";
      $sql .= "employees_father_lname = :employees_father_lname, ";
      $sql .= "employees_father_fname = :employees_father_fname, ";
      $sql .= "employees_father_mname = :employees_father_mname, ";
      $sql .= "employees_family_contact = :employees_family_contact, ";
      $sql .= "employees_family_address = :employees_family_address, ";
      $sql .= "employees_emergency_contact_name = :employees_emergency_contact_name, ";
      $sql .= "employees_emergency_contact_relationship = :employees_emergency_contact_relationship, ";
      $sql .= "employees_emergency_contact_number = :employees_emergency_contact_number, ";
      $sql .= "employees_emergency_contact_address = :employees_emergency_contact_address, ";
      $sql .= "employees_datetime = :employees_datetime ";
      $sql .= "where employees_aid = :employees_aid";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_mother_maiden" => $this->employees_mother_maiden,
        "employees_mother_fname" => $this->employees_mother_fname,
        "employees_mother_mname" => $this->employees_mother_mname,
        "employees_father_lname" => $this->employees_father_lname,
        "employees_father_fname" => $this->employees_father_fname,
        "employees_father_mname" => $this->employees_father_mname,
        "employees_family_contact" => $this->employees_family_contact,
        "employees_family_address" => $this->employees_family_address,
        "employees_emergency_contact_name" => $this->employees_emergency_contact_name,
        "employees_emergency_contact_relationship" => $this->employees_emergency_contact_relationship,
        "employees_emergency_contact_number" => $this->employees_emergency_contact_number,
        "employees_emergency_contact_address" => $this->employees_emergency_contact_address,
        "employees_datetime" => $this->employees_datetime,
        "employees_aid" => $this->employees_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function checkName()
  {
    try {
      $sql = "select * from {$this->tblEmployees} ";
      $sql .= "where employees_fname = :employees_fname ";
      $sql .= "and employees_mother_fname = :employees_mother_fname ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_fname" => "{$this->employees_fname}",
        "employees_mother_fname" => "{$this->employees_mother_fname}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}
