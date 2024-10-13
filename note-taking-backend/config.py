import os
class Config:
    """Base configuration."""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'postgresql://members:12345@localhost/group5'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY') or 'b938eed8627bfeb4563583f22d78e727'
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or '7ff23fa50c936af6f5f4f467d3862e26'
    CORS_HEADERS = 'Content-Type'

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL') or 'postgresql://members:12345@localhost/group5'

class ProductionConfig(Config):
    """Production configuration."""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

# Example of how to use the configurations in your app
# app.config.from_object('config.DevelopmentConfig')
