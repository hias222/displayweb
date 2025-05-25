#!/bin/bash

#./deploy_local.sh 0 50

./deploy_local.sh 25 100

# ./deploy_local.sh 19 100

exit 0
for i in {1..3}
do
./deploy_local.sh 15 $i
done