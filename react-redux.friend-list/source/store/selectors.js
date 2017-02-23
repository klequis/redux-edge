export const getFriends = (state) => {
  // console.log("GetFriends()");
  // console.log(state);
  // console.log("end");
  const ret = state.ids.map((id) => state.friends[id]);
  // console.log(ret);
  return ret;
};
