export const getJobLevelName = (job_level, jobLevelId) => { // function para gawing number and jobLe
  let name = "";

  job_level?.data.map((item) => {
    if (Number(item.job_level_aid) === Number(jobLevelId)) {
      name = item.job_level_level;
    }
  });
  return name;
};
