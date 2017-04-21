# Nikolas Dean Brooks
# 3/20/2017
# Big cherrypy assignment
import cherrypy
import json
import requests
from movies import MoviesController
from users import UsersController
from recommendations import RecommendationsController
from ratings import RatingsController
from reset import ResetController
from options import OptionsController
from _movie_database import _movie_database

def CORS():
	cherrypy.response.headers['Access-Control-Allow-Origin'] = "*"
	cherrypy.response.headers['Access-Control-Allow-Credentials'] = "true"
	cherrypy.response.headers['Access-Control-Allow-Methods'] = "GET, PUT, POST, DELETE, OPTIONS"

def start_service():

	mdb = _movie_database()

	moviesController = MoviesController(mdb)
	usersController = UsersController(mdb)
	recommendationsController = RecommendationsController(mdb)
	ratingsController = RatingsController(mdb)
	resetController = ResetController(mdb)
	optionsController = OptionsController()

	dispatcher = cherrypy.dispatch.RoutesDispatcher()

	dispatcher.connect('dict_movies_get_index', '/movies/', controller = moviesController, action = 'GET_INDEX', conditions=dict(method=['GET']))
	dispatcher.connect('dict_movies_post_index', '/movies/', controller = moviesController, action = 'POST_INDEX', conditions=dict(method=['POST']))
	dispatcher.connect('dict_movies_delete_index', '/movies/', controller = moviesController, action = 'DELETE_INDEX', conditions=dict(method=['DELETE']))
	dispatcher.connect('dict_movies_get', '/movies/:movie_id', controller = moviesController, action = 'GET', conditions=dict(method=['GET']))
	dispatcher.connect('dict_movies_put', '/movies/:movie_id', controller = moviesController, action = 'PUT', conditions=dict(method=['PUT']))
	dispatcher.connect('dict_movies_delete', '/movies/:movie_id', controller = moviesController, action = 'DELETE', conditions=dict(method=['DELETE']))
	dispatcher.connect('dict_users_get_index', '/users/', controller = usersController, action = 'GET_INDEX', conditions=dict(method=['GET']))
	dispatcher.connect('dict_users_post_index', '/users/', controller = usersController, action = 'POST_INDEX', conditions=dict(method=['POST']))
	dispatcher.connect('dict_users_delete_index', '/users/', controller = usersController, action = 'DELETE_INDEX', conditions=dict(method=['DELETE']))
	dispatcher.connect('dict_users_get', '/users/:user_id', controller = usersController, action = 'GET', conditions=dict(method=['GET']))
	dispatcher.connect('dict_users_put', '/users/:user_id', controller = usersController, action = 'PUT', conditions=dict(method=['PUT']))
	dispatcher.connect('dict_users_delete', '/users/:user_id', controller = usersController, action = 'DELETE', conditions=dict(method=['DELETE']))
	dispatcher.connect('dict_recommendations_delete_index', '/recommendations/', controller = recommendationsController, action = 'DELETE_INDEX', conditions=dict(method=['DELETE']))
	dispatcher.connect('dict_recommendations_get', '/recommendations/:user_id', controller = recommendationsController, action = 'GET', conditions=dict(method=['GET']))
	dispatcher.connect('dict_recommendations_put', '/recommendations/:user_id', controller = recommendationsController, action = 'PUT', conditions=dict(method=['PUT']))
	dispatcher.connect('dict_ratings_get', '/ratings/:movie_id', controller = ratingsController, action = 'GET', conditions=dict(method=['GET']))
	dispatcher.connect('dict_reset_put_index', '/reset/', controller = resetController, action = 'PUT_INDEX', conditions=dict(method=['PUT']))
	dispatcher.connect('dict_reset_put', '/reset/:movie_id', controller = resetController, action = 'PUT', conditions=dict(method=['PUT']))
	dispatcher.connect('dict_options_users', '/users/', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))
	dispatcher.connect('dict_options_users_uid', '/users/:user_id', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))
	dispatcher.connect('dict_options_movies', '/movies/', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))
	dispatcher.connect('dict_options_movies_uid', '/movies/:movie_id', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))
	dispatcher.connect('dict_options_reset', '/reset/', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))
	dispatcher.connect('dict_options_recommendations', '/recommendations/1', controller = optionsController, action = 'OPTIONS', conditions=dict(method=['OPTIONS']))

	conf = { 'global' : {
		'server.socket_host' : 'localhost',
		'server.socket_port' : 40013,
		},
		'/' : {'request.dispatch' : dispatcher, 'tools.CORS.on' : True}
	 }

	cherrypy.config.update(conf)
	app = cherrypy.tree.mount(None, config=conf)
	cherrypy.quickstart(app)

if __name__ == '__main__':
	cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS)
	start_service()
