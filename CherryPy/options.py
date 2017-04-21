import cherrypy
import json
import requests

class OptionsController(object):
	def OPTIONS(self, *args, **kwargs):
		return ""
