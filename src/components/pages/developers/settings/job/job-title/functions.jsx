export const getSubscriberCode = (subscribers, subscriberId) => { // function para hindi ma over right ng text ang id ng subscriber code
  let name = "";

  subscribers?.data.map((item) => {
    if (Number(item.subscribers_aid) === Number(subscriberId)) {
      name = item.subscribers_code;
    }
  });
  return name;
};