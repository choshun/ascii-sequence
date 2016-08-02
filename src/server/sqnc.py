# All the imports.
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash

# Create application.
app = Flask(__name__)
app.config.from_object(__name__)

# Load default config from environment variable.
app.config.update(dict(
  DATABASE = os.path.join(app.root_path, 'sqnc.db'),
  SECRET_KEY='development key',
  USERNAME='admin',
  PASSWORD='default'
))

app.config.from_envvar('SQNC_SETTINGS', silent = True)

def connect_db():
  """ Connects to a specific database. """
  rv = sqlite3.connect(app.config['DATABASE'])
  rv.row_factory = sqlite3.row_factory
  return rv