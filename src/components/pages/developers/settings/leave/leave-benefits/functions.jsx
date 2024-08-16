export const getJobLevelName = (job_level, jobLevelId) => { // function para hindi ma over right ng text ang id ng job level
  let name = "";

  job_level?.data.map((item) => {
    if (Number(item.job_level_aid) === Number(jobLevelId)) {
      name = item.job_level_level;
    }
  });
  return name;
};
