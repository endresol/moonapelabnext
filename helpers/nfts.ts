export function removeDuplicateApes(p_my_apes, p_staked_apes){
  let toDel = new Set(p_staked_apes);
  return p_my_apes.filter((name) => {
      return !toDel.has(name.toString()) && !toDel.has(parseInt(name));
  });
}
