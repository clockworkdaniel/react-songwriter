export default function niceDate(jsDate) {
  console.log(typeof jsDate);

  const re = /^\d\d(\d\d).(\d\d).(\d\d)T(\d\d:\d\d)/;
  const c = re.exec(jsDate);
  return !c ? undefined : `${c[3]}-${c[2]}-${c[1]} at ${c[4]}`;
}
