const axios = require('axios'),
    csv = require('csvtojson'),
    json2csv = require('json2csv'),
    fs = require('fs'),
    API_KEY = '&key=AIzaSyBfxUPn3ixXu0v_zngcuxii0_iTt6HrvhA',
    BASE_URL="https://maps.googleapis.com/maps/api/geocode/json?address=", 
    csvFilePath='./pools.csv';

let promises = [];
csv()
    .fromFile(csvFilePath)
    .on('json',(jsonObj)=>{
        promises.push(getGeoInfo(jsonObj))
    
    })
    .on('done',(error)=> {
        Promise.all(promises).then(function(values) {
            writeToFile(values);
        })
        .catch((err)=> console.log(err) );
    });

function getGeoInfo(data){
    return new Promise((resolve, reject)=> {
        let address = data.Address+ ", Toronto, ON";
        let result = address.split(' ').join('+');
        axios.get(BASE_URL+result+API_KEY)
        .then(response=> {
            data["lat"] = response.data.results[0].geometry.location.lat; 
            data["lng"] = response.data.results[0].geometry.location.lng;
            resolve(data);
        })
        .catch(err => reject('err here, ', err))
    })
}

function writeToFile(data){
    let fields = ["Location","Address","Phone","Open Date","Close Date","lat","lng"]; 
    let result = json2csv({data: data, fields: fields});
    fs.writeFile('./finalpool.csv', result);
}
