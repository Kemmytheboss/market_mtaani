# server/config.py

import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///market_mtaani.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_COMPACT = False