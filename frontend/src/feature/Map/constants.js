// icon thùng rác
export {default as green_bin} from '../../asset/map/green_bin.png';
export {default as red_bin} from '../../asset/map/red_bin.png';
export {default as yellow_bin} from '../../asset/map/yellow_bin.png';
export {default as bien_cam} from '../../asset/map/bienbao/biencam.jpg';
// icon xe
export {default as green_vehicle} from '../../asset/map/green_vehicle.png';

export const _getAngle = (startx, starty, endx, endy) => {
  let tan = Math.atan2(endy - starty, endx - startx) * 180 / Math.PI;
  let rotate = tan - 90;
  if (rotate === 0) {
    return -90;
  }
  if (rotate < 0 && Math.abs(rotate) > 180) {
    return 360 + rotate;
  }

  return rotate;
}

// export const checkDistance = (vehicles, bins) => {
//     for (let i = 0; i < bins.length; i++) {
//         let marker = L.marker(bins[i], { icon: iconGreen }).addTo(map);
//         let binCoor = new L.latLng(area[i][j])
//         vehicles.forEach((vehicle, index) => {
//             let vehicleCoor = new L.latLng(vehicle)
//             if(binCoor.distanceTo(vehicleCoor) < 100) {
//                 marker.setIcon(iconRed);
//             }
//         })
//     }
// }