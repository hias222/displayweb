#!/bin/bash

#./deploy_local.sh 0 50

./deploy_local.sh 19 50

exit 0
for i in {1..3}
do
./deploy_local.sh 15 $i
done