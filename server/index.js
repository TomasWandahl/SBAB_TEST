const express = require('express');
require('dotenv').config();
const fs = require('fs');

const PORT = process.env.PORT_NUMBER || 1337;
const API_ENDPOINT = '/api/trafik';
const TRAFIKLAB_MODEL = 'JourneyPatternPointOnLine';
const TRAFIC_STOPS_URL = `https://api.sl.se/api2/LineData.json?model=${TRAFIKLAB_MODEL}&key=${process.env.TRAFIKLAB_API_KEY}`;



const app = express();

function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }

const fetch_data = async () => {
        //api_response = await fetch('./data.json');
        //const json_data = await api_response.json();

        const line_data = fs.readFileSync('./server/data.json');
        const local_line_data = JSON.parse(line_data).ResponseData.Result;

        const stoppoint_data = fs.readFileSync('./server/stoppoints.json');
        const local_stoppoint_data = JSON.parse(stoppoint_data).ResponseData.Result;

        const stoppoint_map = new Map();

        local_stoppoint_data.forEach(sp => {
                const key = sp.StopPointNumber;
                collection = stoppoint_map.get(key);

                if(!collection) stoppoint_map.set(key, sp.StopPointName);

        })


        const line_map = new Map();

        local_line_data.forEach(stopPoint => {
                const key = stopPoint.LineNumber;
                const collection = line_map.get(key);
                const item = stopPoint.JourneyPatternPointNumber;

                if(stoppoint_map.get(item) == undefined) return;

                if (!collection) {
                        line_map.set(key, [item]);
                    } else {
                        if(!collection.includes(item)) {
                                collection.push(item);
                        } 
                }
        });

        const readable_map = new Map();

        line_map.forEach((line, key) => {
                readable_map.set(key, []);
                line.forEach(stop_id => {
                        const collection = readable_map.get(key);
                        const stop_name = stoppoint_map.get(stop_id);
                        if((!collection.includes(stop_name)) && stop_name !== undefined)
                                collection.push(stop_name);
                })
        });

        const sortable_map = new Map();
        line_map.forEach((line, key) => sortable_map.set(key, readable_map.get(key).length));
        const sorted_array = [...sortable_map.entries()].sort((a,b) => b[1] - a[1]).slice(0, 10);

        const new_array = sorted_array.map(line => {
                return {
                        line: line[0],
                        numberOfStops: line[1],
                        stops: readable_map.get(line[0])
                }
        })

        return new_array;
}

app.get(API_ENDPOINT, (req, res) => {
        fetch_data().then(result => res.json({statuscode: 0, result}))
})

app.listen(PORT, () => {
        console.log('Server is currently listening on port: ' + PORT);
        console.log(TRAFIC_STOPS_URL);
})