#!/bin/bash

./deploy_local.sh 16

exit 0
for i in {1..3}
do
./deploy_local.sh 15 $i
done