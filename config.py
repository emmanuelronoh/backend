import os

class Config:
    """Base configuration."""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'postgresql://members:4444@localhost/group5'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY') or 'b938eed8627bfeb4563583f22d78e727'
    
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
