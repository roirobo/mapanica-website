#!/usr/bin/env python
# -*- coding: utf-8 -*- #

from __future__ import unicode_literals

AUTHOR = u'OpenStreetMap Nicaragua'
SITENAME = u'MapaNica.net - OpenStreetMap Nicaragua'
SITETITLE = u'MapaNica.net'
SITESUBTITLE = 'OpenStreetMap Nicaragua'
SITEDESCRIPTION = 'Sitio web de la comunidad nacional de OpenStreetMap en Nicaragua'
SITEKEYWORDS = 'CpenStreetMap, Nicaragua, Mapas, Transporte público, Datos Abuertos, Open Data, Software Libre'

USE_LESS = True
SITEURL = 'http://localhost:8000'
SITELOGO = '/images/mapanica.png'
THEME = 'themes/zanate'

FAVICON = SITEURL + '/theme/img/favicon.ico'
ROBOTS = 'index, follow'

PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'

AUTHOR_SAVE_AS = False
CATEGORY_SAVE_AS = False
TAG_SAVE_AS = False
ARCHIVES_SAVE_AS = False
DIRECT_TEMPLATES = ('index', 'embedd', 'rutas-managua')

CC_LICENSE = { 'name': 'Creative Commons Attribution-ShareAlike', 'version':'4.0', 'slug': 'by-sa' }

PATH = 'content'

TIMEZONE = 'America/Managua'

DEFAULT_LANG = u'es'
OG_LOCALE = u'es_NI'
DEFAULT_DATE_FORMAT = ('%d %B %Y')

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Social widget
SOCIAL = (('envelope-o', 'mailto:contacto@mapanica.net'),
          ('facebook', 'http://www.facebook.com/mapanica'),
          ('twitter', 'http://www.twitter.com/osm_ni'),
          )

MENUITEMS = (('Mapa de Nicaragua', '/index.html', 'map'),
             ('Rutas Managua', '/rutas-managua.html', 'public-transport'),
             ('Mapas para móviles', '/mapas-moviles.html', 'mobile'),
             ('Comunidad', '/comunidad.html', 'community'),)

DEFAULT_PAGINATION = False
