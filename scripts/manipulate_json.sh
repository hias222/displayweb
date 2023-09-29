#!/bin/bash
jsonFile=package.json;

# ./manipulate_json.sh $APP_MODE $LANE_NR 

deploy_nr=$1

if [ $# -eq 1 ]; then 
    hiitlane=1
    homepage="/mode/${deploy_nr}"
else
    hiitlane=$2
    homepage="/mode/${deploy_nr}-${hiitlane}"
fi

echo build $homepage

rm out_${jsonFile} 

node > out_${jsonFile} <<EOF
//Read data
var data = require('./${jsonFile}');

//Manipulate data
//delete data.key3
data.config.mode = ${deploy_nr};
data.config.hiitlane = $hiitlane;
data.homepage= '${homepage}'
//Output data
console.log(JSON.stringify(data, null, 2));

EOF
