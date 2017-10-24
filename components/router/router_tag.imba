global:Router = require('pro-router')
require './ref/ref'
require './switch/switch'
require './not_found/not_found'

tag router

	def setup
		@r = R
		@t = Imba:TAGS

	def render
		self:__:A = self:__:A || {}
		<self> ( self:__:A[@r:view] || self:__:A[@r:view] = @t[@r:view.toUpperCase]() ).end
