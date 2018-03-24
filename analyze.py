import sys, json, os
data = json.load(open('data.json'))
print data['images'][0]['classifiers'][0]['classes'][0]
if 'black' in data['images'][0]['classifiers'][0]['classes'][0]['class']:
	if float(data['images'][0]['classifiers'][0]['classes'][0]['score']) > 0.9:
		file = open("alert.txt","w")
		file.close() 
	else:
		os.remove("alert.txt")
else:
	os.remove("alert.txt")