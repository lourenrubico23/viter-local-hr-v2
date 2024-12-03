// to get the supervior name
export const getSuperviorName = (employees_supervior_id, employees) => {
  let supervior = "";

  employees?.count > 0 &&
    employees.data.map((item) => {
      if (Number(item.employees_aid) === Number(employees_supervior_id)) {
        supervior = `${item.employees_lname}, ${item.employees_fname}`;
      }
    });
  return supervior;
};