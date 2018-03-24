#!/bin/sh
while [ 1 ]
do
  ffmpeg -y -i rtmp://10.0.0.66:1935/live/stream1234 -f image2 -vframes 1 snapshot.png
  curl -X POST -F "images_file=@snapshot.png" "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=cdfd69125b782cda5c7c46062068f6c4047bcd57&version=2016-05-20&classifier_ids=DefaultCustomModel_1022977103" -o data.json
  python analyze.py
  sleep 5s
done
