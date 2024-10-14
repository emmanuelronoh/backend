from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import db
from routes import api_bp
import logging
from flask_bcrypt import Bcrypt
from flask_mail import Mail

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app)
    db.init_app(app)
    bcrypt = Bcrypt(app)
    migrate = Migrate(app, db)
    mail = Mail(app)
    app.register_blueprint(api_bp, url_prefix='/api')
    return app

def setup_database(app):
    with app.app_context():
        db.create_all()

def run_app(app):
    app.run() 
    
if __name__ == '__main__':
    app = create_app()
    setup_database(app)
    run_app(app)
