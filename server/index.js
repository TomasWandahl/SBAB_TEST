const express = require('express');
require('dotenv').config();
var cors = require('cors')
const fs = require('fs');
const fetch = require("node-fetch");

const TRAFIK_LAB_MODEL = {
        LINE: 'JourneyPatternPointOnLine',
        STOPS: 'StopPoint'
}

const PORT = process.env.PORT_NUMBER || 1337;
const API_ENDPOINT = '/api/trafik';
const TRAFIKLAB_TRANSPORT_MODE_CODE = 'BUS';
const TRAFIC_LAB_LINES_URL = `https://api.sl.se/api2/LineData.json?model=${TRAFIK_LAB_MODEL.LINE}&key=${process.env.TRAFIKLAB_API_KEY}&DefaultTransportModeCode=${TRAFIKLAB_TRANSPORT_MODE_CODE}`;
const TRAFIC_LAB_STOPS_URL = `https://api.sl.se/api2/LineData.json?model=${TRAFIK_LAB_MODEL.STOPS}&key=${process.env.TRAFIKLAB_API_KEY}&DefaultTransportModeCode=${TRAFIKLAB_TRANSPORT_MODE_CODE}`;



const app = express();
app.use(cors());

const fetch_data = async () => {
        const line_data = await fetch(TRAFIC_LAB_LINES_URL);
        const line_data_json = await line_data.json();


        const stop_point_data = await fetch(TRAFIC_LAB_STOPS_URL);
        const stop_point_data_json = await stop_point_data.json();

        const stoppoint_map = new Map();

        stop_point_data_json.ResponseData.Result.forEach(sp => {
                const key = sp.StopPointNumber;
                collection = stoppoint_map.get(key);

                if(!collection) stoppoint_map.set(key, sp.StopPointName);

        })

        const line_map = new Map();
        line_data_json.ResponseData.Result.forEach(stopPoint => {
                const key = stopPoint.LineNumber;
                const collection = line_map.get(key);
                const item = stopPoint.JourneyPatternPointNumber;

                if(stoppoint_map.get(item) == undefined) return;

                if (!collection) {
                        line_map.set(key, [item]);
                    } else {
                        if(!collection.includes(item)) collection.push(item);             
                }
        });

        const readable_map = new Map();
        line_map.forEach((line, key) => {
                readable_map.set(key, []);
                line.forEach(stop_id => {
                        const collection = readable_map.get(key);
                        const stop_name = stoppoint_map.get(stop_id);
                        if((!collection.includes(stop_name)) && stop_name !== undefined) collection.push(stop_name);
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
        fetch_data().then(lines => res.json({statuscode: 200, lines}))
})

app.listen(PORT, () => {
        console.log('Server is currently listening on port: ' + PORT);
})