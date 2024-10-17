from flask import Flask, jsonify
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

    # Set your secret key here
    app.config['SECRET_KEY'] = '2e9f96ec78c527bdfa802cc82ae90be67b947bf00c956ab9'

    # Configure logging
    logging.basicConfig(level=logging.INFO)

    # Set up CORS with credentials support
    cors = CORS(app, supports_credentials=True)

    db.init_app(app)
    bcrypt = Bcrypt(app)
    migrate = Migrate(app, db)
    mail = Mail(app)

    # Register the API blueprint
    app.register_blueprint(api_bp, url_prefix='/api')

    # Add a simple homepage route
    @app.route('/')
    def home():
        logging.info("Home route accessed")
        return "Welcome to the Note Taking App! The app is currently running."

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        logging.error(f"Internal error: {error}")
        return jsonify({"error": "Internal Server Error"}), 500

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
