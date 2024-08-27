// to get the supervior name 
export const getSuperviorName = (supervior_id, employees) => {
  let supervior = "";

  employees?.count > 0 &&
    employees.data.map((item) => {
      if (Number(item.employees_aid) === Number(supervior_id)) {
        supervior = `${item.employees_lname}, ${item.employees_fname}`;
      }
    });
  return supervior;
};
// to get the subordinate name 
export const getSubordinateName = (subordinate_id, employees) => {
  let subordinate = "";

  employees?.count > 0 &&
    employees.data.map((item) => {
      if (Number(item.employees_aid) === Number(subordinate_id)) {
        subordinate = `${item.employees_lname}, ${item.employees_fname}`;
      }
    });
  return subordinate;
};
