#!/bin/bash

./deploy_local.sh 1 0

exit 0
for i in {1..6}
do
./deploy_local.sh 14 $i
done