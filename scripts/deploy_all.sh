#!/bin/bash

for i in {1..13}
do
   ./deploy_local.sh $i
done

for i in {1..6}
do
   ./deploy_local.sh 14 $i
done


for i in {1..3}
do
   ./deploy_local.sh 15 $i
done

