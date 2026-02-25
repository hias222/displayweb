#!/bin/bash

# change mode in package.json same as APP_MODE
# change 2 times (issue with run build)

if [ "$#" -lt 2 ]; then
    echo "Internal error - Illegal number of parameters"
    exit 1
fi

APP_MODE=$1
ROUND_LENGTH=$2

if [ "$#" -eq 3 ]; then
    LANE_NR=$3
fi

#######

#REMOTE_SERVER_NAME=rockpie.fritz.box
#REMOTE_SERVER_USER=rock

# REMOTE_SERVER_NAME=rockpi-4b.fritz.box
# REMOTE_SERVER_USER=rock

# need ssh certs
# REMOTE_SERVER_NAME=jetson.fritz.box
# REMOTE_SERVER_USER=jetson

REMOTE_SERVER_NAME=colorado.fritz.box
REMOTE_SERVER_USER=ubuntu

#REMOTE_SERVER_NAME=swim.fritz.box
#REMOTE_SERVER_USER=pi

# BASE_DIR=/Users/matthiasfuchs/Projects/schwimmen/displayweb
BASE_DIR=/home/ubuntu/github/displayweb

cp $BASE_DIR/package.json $BASE_DIR/package.json_org

TEMP_DIR=/tmp
REMOTE_TMP=/tmp
NGINX_DIR=/usr/share/nginx/html
APP_NAME=display

. ../.env
. ../.env.production

echo "Layout:                         $APP_MODE"
echo "Round Length (50/100):          $ROUND_LENGTH"
echo "Hiit Bahn:                      $LANE_NR"
echo "Clear Startlist:                $REACT_APP_CLEAR_START_LIST_ON_START"
echo "Wait on stop:                   $REACT_APP_WAIT_ON_STOP"
echo "Base:                           $BASE_DIR"
echo "Remote:                         $REMOTE_SERVER_USER@$REMOTE_SERVER_NAME"

APP_DIR=$APP_NAME

if [[ $APP_MODE -gt 0 ]]; then
   APP_DIR="mode/${APP_MODE}" 
fi

if [[ $LANE_NR -gt 0 ]]; then
   APP_DIR="mode/${APP_MODE}-${LANE_NR}" 
   ./manipulate_json.sh $APP_MODE $ROUND_LENGTH $LANE_NR
else
   if [[ $APP_MODE -gt 0 ]]; then
     APP_DIR="mode/${APP_MODE}"
   fi
   ./manipulate_json.sh $APP_MODE $ROUND_LENGTH
fi

echo "APP_DIR:                        $APP_DIR"

cp out_package.json $BASE_DIR/package.json

#echo "set APP_DIR to $APP_DIR"

#read -p "Go on (y/n)? " answer
#case ${answer:0:1} in
#    y|Y )
#        echo ...
#    ;;
#    * )
#        exit 0
#    ;;
#esac

# linux set time
ACTUAL_TIME=$(date)
echo "Time $ACTUAL_TIME"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo date --set=\"${ACTUAL_TIME}\"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo timedatectl

if [[ $APP_MODE -gt 0 ]]; then
    echo "add detail index.html"
    scp index.html ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
    scp combine_1.html ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
    scp combine_2.html ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
fi

cd $BASE_DIR || exit 1

# build
npm run build  >> /dev/null 2>&1

cd build || exit 1

tar -czf $TEMP_DIR/${APP_NAME}.tar.gz * 
scp $TEMP_DIR/${APP_NAME}.tar.gz ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
rm $TEMP_DIR/${APP_NAME}.tar.gz

# ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo ls ${REMOTE_TMP}/${APP_NAME}.tar.gz
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm -rf ${NGINX_DIR}/${APP_DIR}

echo "generate ${NGINX_DIR}/${APP_DIR}"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo mkdir -p ${NGINX_DIR}/${APP_DIR}

if [[ $APP_MODE -gt 0 ]]; then
    echo "add details page ${NGINX_DIR}/${APP_DIR} (${REMOTE_TMP}/index.html)"
    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo cp ${REMOTE_TMP}/index.html ${NGINX_DIR}/mode
    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/index.html

    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo cp ${REMOTE_TMP}/combine_1.html ${NGINX_DIR}/mode
    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/combine_1.html

    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo cp ${REMOTE_TMP}/combine_2.html ${NGINX_DIR}/mode
    ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/combine_2.html
fi

echo "extract app ${APP_DIR}"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo tar -xvzf ${REMOTE_TMP}/${APP_NAME}.tar.gz -C ${NGINX_DIR}/${APP_DIR} > /dev/null
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/${APP_NAME}.tar.gz

# cp $BASE_DIR/package.json_org $BASE_DIR/package.json

echo "Deployed ${APP_DIR}"