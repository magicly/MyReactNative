import {
    Scale,
    BigSize,
    MiddleSize,
    SmallSize,
    DotSize,
} from './constants.js'

export function overlapData(width, height, ne, sw, data) {
    const start = Date.now();

    const markers = initMarkers();
    overlapMap();
    setMarkerSize();
    console.log('overlapData cost: ' + (Date.now() - start));

    return markers;

    // ----------------------以下为辅助函数----------------------

    function lngLat2Container(northeast, southwest, lnglat) {
        const xPos = lng => {
            let lngDiff = northeast.lng - southwest.lng;
            lngDiff = lngDiff < 0 ? lngDiff + 360 : lngDiff;
            const density = width / lngDiff;

            let diff = lng - southwest.lng;
            diff = diff < 0 ? diff + 360 : diff;

            return diff * density;
        }
        const yPos = lat => {
            const mercator = lat => Math.log(Math.tan((45 + lat / 2) / 180 * Math.PI));
            const zero = mercator(northeast.lat);
            const full = mercator(southwest.lat);
            const density = height / (full - zero);
            return (mercator(lat) - zero) * density;
        }

        return {x: xPos(lnglat.lng), y: yPos(lnglat.lat)};
    }

    // 初始化marker的大小， 以及根据经纬度计算对应的屏幕上的像素坐标位置
    function initMarkers() {
        let markers = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const marker = data[i][j];
                if (j === 0) {
                    marker.display = "big";
                } else if (j === 1 || j === 3) {
                    marker.display = "middle";
                } else if (j === 4 || j === 5) {
                    marker.display = "small";
                } else {
                    marker.display = "dot";
                }

                const {x, y} = lngLat2Container(ne, sw, marker.location);
                marker.x = x;
                marker.y = y;

                markers.push(marker);
            }
        }
        return markers;
    }

    function getSize(icon) {
        if (icon.display === 'big') return BigSize;
        else if (icon.display === 'middle') return MiddleSize;
        else if (icon.display === 'small') return SmallSize;
        else if (icon.display === 'dot') return DotSize;
        else return 0;
    }

    function overlapMap() {
        for (let i = 0; i < markers.length; i += 1) {
            for (let j = 0; j < i; j += 1) {
                doOverLap(markers[i], markers[j]);
            }
        }
        function doOverLap(px, old) {
            if (px.display === 'hidden' || old.display === 'hidden') {
                return;
            }
            const PixelX = getSize(px);
            const PixelY = getSize(old);
            let smaller = PixelX <= PixelY ? px : old;
            const isOverLap = () => {
                const PixelX = getSize(px);
                const PixelY = getSize(old);
                if (px.display === 'hidden' || old.display === 'hidden') {
                    return false;
                }

                const pixelDistanceX = px.x - old.x;
                const pixelDistanceY = px.y - old.y;
                const pixelDistance = Math.sqrt(pixelDistanceX * pixelDistanceX + pixelDistanceY * pixelDistanceY);
                return pixelDistance < (PixelX + PixelY) / 2;
            }

            if (!isOverLap()) {
                return;
            }
            smaller.display = 'middle';
            if (!isOverLap()) {
                return;
            }
            smaller.display = 'small';
            if (!isOverLap()) {
                return;
            }
            smaller.display = 'dot';
            if (!isOverLap()) {
                return;
            }
            smaller.display = 'hidden';
        }
    }

    function setMarkerSize() {
        markers.map(marker => {
            marker.size = getSize(marker)
            return marker;
        });
    }
}
