#!/bin/bash

REMOTE_SERVER_NAME=rockpi-4b.fritz.box
REMOTE_SERVER_USER=rock
BASE_DIR=/Users/matthiasfuchs/Projects/schwimmen/displayweb
APP_MODE=10

TEMP_DIR=/tmp
REMOTE_TMP=/tmp
NGINX_DIR=/usr/share/nginx/html
APP_NAME=display

# need ssh certs
#REMOTE_SERVER_NAME=jetson.fritz.box
#REMOTE_SERVER_USER=jetson

APP_DIR=$APP_NAME

if [[ $APP_MODE -gt 0 ]]; then
   APP_DIR="mode/${APP_MODE}" 
fi

echo "set APP_DIR to $APP_DIR"

#REMOTE_SERVER_NAME=swim.fritz.box
#REMOTE_SERVER_USER=pi

# linux set time
ACTUAL_TIME=$(date)
echo "Time $ACTUAL_TIME"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo date --set=\"${ACTUAL_TIME}\"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo timedatectl

if [[ $APP_MODE -gt 0 ]]; then
    echo "add detail index.html"
    scp index.html ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME}:${REMOTE_TMP}
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
fi

echo "extract app ${APP_DIR}"
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo tar -xvzf ${REMOTE_TMP}/${APP_NAME}.tar.gz -C ${NGINX_DIR}/${APP_DIR} > /dev/null
ssh ${REMOTE_SERVER_USER}@${REMOTE_SERVER_NAME} sudo rm ${REMOTE_TMP}/${APP_NAME}.tar.gz


echo "Deployed ${APP_DIR}"