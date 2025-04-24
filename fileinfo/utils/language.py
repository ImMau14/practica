import json
from flask import request

def getLang(datafile):
	with open(f"static/{datafile}", "r", encoding="utf-8") as data:
		langs = json.load(data)
	lang = request.headers.get('Accept-Language', 'en').split(',')[0][:2]
	if lang not in langs:
		lang = "en"
	return langs[lang]