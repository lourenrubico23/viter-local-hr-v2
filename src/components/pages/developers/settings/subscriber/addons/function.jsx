export const getFeaturesName = (dataFeatures, featuresId) => { // function para gawing number and jobLe
    let name = "";
  
    dataFeatures?.data.map((item) => {
      if (Number(item.features_aid) === Number(featuresId)) {
        name = item.features_name;
      }
    });
    return name;
  };