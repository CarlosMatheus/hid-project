import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
    console.log('Dispatching fetchEstimatedValues')
    const data = {
        latMatrix, lonMatrix
    }
    const proxy = "https://cors-anywhere.herokuapp.com/"
    const url = "https://obra-silenciosa-back.herokuapp.com/estimatedNoiseValues"
    return await axios.post(proxy + url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json;charset=utf-8',
        },
        ...data
    })
        .then(res => res.data.noiseMatrix)
        .then(res => {
            // console.log(res)
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
    console.log('Dispatching fetchSensorsPosition')
    const proxy = "https://cors-anywhere.herokuapp.com/"
    const url = "https://obra-silenciosa-back.herokuapp.com/sensorPositions"
    return await axios.get(proxy + url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
        .then(res => res.data)
        .then(res => {
            // console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

/*

*/