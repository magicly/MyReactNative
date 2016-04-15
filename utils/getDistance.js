/**
 * Created by liyan on 2015-11-25.
 */
'use strict';
const EARTH_RADIUS = 6378.137;//地球半径

function rad(d) {
  return d * Math.PI / 180.0;
}

// 算法参考
// 1. http://www.cnblogs.com/zhoug2020/p/3950933.html
// 2. http://www.cnblogs.com/ycsfwhh/archive/2010/12/20/1911232.html
// 3. http://iamzhongyong.iteye.com/blog/1399333
// 4. http://www.storyday.com/wp-content/uploads/2008/09/latlung_dis.html
// 两个算法等价的，通过三角函数可以转化，个人觉得getDistance2比较简单容易理解，计算量也小一些
/*eslint no-unused-vars: 0*/
function getDistance(pointA, pointB) {
  const lat1 = rad(pointA.lat);
  const long1 = rad(pointA.long);
  const lat2 = rad(pointB.lat);
  const long2 = rad(pointB.long);

  const a = lat1 - lat2;
  const b = long1 - long2;

  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin(a / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(b / 2), 2)
    ));

  const s1 = d * EARTH_RADIUS;
  const s2 = Math.round(s1 * 10000) / 10000;

  return s2;
}

function getDistance2(pointA, pointB) {
  const lat1 = rad(pointA.lat);
  const long1 = rad(pointA.long);
  const lat2 = rad(pointB.lat);
  const long2 = rad(pointB.long);

  let d = Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(long1 - long2)
    + Math.sin(lat1) * Math.sin(lat2));

  const s1 = d * EARTH_RADIUS;
  const s2 = Math.round(s1 * 10000) / 10000;

  return s2;
}

module.exports = {
  getDistance2: getDistance2,
  getDistance: getDistance
};