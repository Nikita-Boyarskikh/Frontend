/*
 * Parse the dme.ru site
 */
'use strict';
const trs = $("#table").children().children();
const arr = [];
trs.each(function(i, tr){
  arr.push(tr);
});
arr.shift();
arr.shift();
const result = arr.reduce(function(cont, tr, i){
  const tds = tr.children;
  const tds_arr = [];
  for(let i = 0; i < tds.length; i++) {
    tds_arr.push(tds[i]);
  }
  cont.push({
    number: tds_arr[0].innerText,
    company: tds_arr[1].innerText,
    direction: tds_arr[2].innerText,
    planed_time: tds_arr[3].innerText,
    fact_time: tds_arr[4].innerText,
    state: tds_arr[5].innerText
  });
  return cont;
}, []);