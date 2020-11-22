/*
points

1.............2...........3

or
points

1
.
.
2
.
.
3
*/
function getThirdPoint(lat1, lon1, lat2, lon2, d12, d13) {
    return {
        lat: (lat2 - lat1) * d13 / d12 + lat1,
        lon: (lon2 - lon1) * d13 / d12 + lon1
    }
}

function getLatLonValues(
    topLeftLat,
    topLeftLon,
    bottomRightLat,
    bottomRightLon,
    bottomLeftLat,
    bottomLeftLon,
    topRightLat,
    topRightLon,
    baseLength
) {
    let latMatrix = [], lonMatrix = []
    // We will find all points on the line formed by a left and a right point
    for (let i = 0; i < 2 * baseLength + lenOfHeight; i++) {
        // Get right point coordinate by interpolating bottom right and top right
        const d12Right = getDistance(topRightLat, topRightLon, bottomRightLat, bottomRightLon)
        const d13Right = i - baseLength
        const { latRight, lonRight } = getThirdPoint(topRightLat, topRightLon, bottomRightLat, bottomRightLon, d12Right, d13Right)


        // Get left point coordinate by interpolating left right and left right
        const d12Left = getDistance(topLeftLat, topLeftLon, bottomLeftLat, bottomLeftLon)
        const d13Left = i - baseLength
        const { latLeft, lonLeft } = getThirdPoint(topLeftLat, topLeftLon, bottomLeftLat, bottomLeftLon, d12Left, d13Left)

        let latArray = [], lonArray = []
        // Find all points on the line formed by the left and right point
        for (let j = 0; j < 2 * baseLength + lenOfWidth; j++) {
            const d12 = getDistance(latLeft, lonLeft, latRight, lonRight)
            const d13 = j - baseLength
            const { lat, lon } = getThirdPoint({ latLeft, lonLeft, latRight, lonRight, d12, d13 })

            latArray.push(lat)
            lonArray.push(lon)
        }
        latMatrix.push(latArray)
        lonMatrix.push(lonArray)
    }
}

export {
    getLatLonValues
}