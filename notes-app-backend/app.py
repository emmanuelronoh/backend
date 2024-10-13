from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import db  # Import the database
from routes import api_bp
import logging
from flask_bcrypt import Bcrypt
from flask_mail import Mail

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Load configuration from the config module
    app.config.from_object('config.Config')

    # Initialize CORS for cross-origin resource sharing
    CORS(app)

    # Initialize the database with the app context
    db.init_app(app)

    # Initialize Bcrypt for password hashing
    bcrypt = Bcrypt(app)

    # Initialize Flask-Migrate for database migrations
    migrate = Migrate(app, db)

    # Initialize Flask-Mail for sending emails
    mail = Mail(app)

    # Register the API blueprint
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

def setup_database(app):
    """Create database tables if they don't exist."""
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

def run_app(app):
    """Run the Flask application."""
    try:
        app.run(debug=True)  # Run the app in debug mode
    except Exception as e:
        logging.error(f"Error starting the application: {e}")

if __name__ == '__main__':
    app = create_app()  # Create the app instance
    setup_database(app)  # Set up the database
    run_app(app)  # Run the app
