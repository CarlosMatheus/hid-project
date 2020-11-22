/*
Expected request body:
{
    lonMatrix: [
        [
            -46.682009518288844,
            -46.68200695045289,
        ],
        [
            -46.68200438261693,
            -46.68200181478098,
        ]
    ], latMatrix: [
        [
            -23.588490802845133,
            -23.58849948271186,
        ],
        [
            -23.588508162578584,
            -23.588516842445312,
        ]
    ]
}

Expected response body:
{
    noiseMatrix: [
        [
            100,
            98
        ],
        [
            105,
            103
        ]
    ]
}
*/
export const fetchEstimatedValues = async (latMatrix, lonMatrix) => {
    const data = {
        latMatrix, lonMatrix
    }
    return await fetch("http://localhost:5000/estimatedNoiseValues",
        {
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

/*
Expected response:
{
    sensorsLatList: [-23.588826342902333],
    sensorLonList: [-46.682215230240686]
}
*/
export const fetchSensorsPosition = async () => {
    return await fetch("http://localhost:5000/sensorPositions")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

/*

*/