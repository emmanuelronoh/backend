from flask import Blueprint, request, session, jsonify
from flask_restful import Api, Resource
from models import db, User, Note, ContactMessage
from schemas import UserSchema, NoteSchema, ContactMessageSchema
import logging
from flask_cors import cross_origin

# Set up logging
logging.basicConfig(level=logging.INFO)

# Create a Blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

user_schema = UserSchema()
note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)
contact_message_schema = ContactMessageSchema()

def respond_with_error(message, status_code):
    response = {'error': message}
    return jsonify(response), status_code

def get_current_user():
    user_id = session.get('user_id')
    return User.query.get(user_id) if user_id else None

class Signup(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return respond_with_error('Username and password required', 400)

        if User.query.filter_by(username=data['username']).first():
            return respond_with_error('Username already exists', 400)

        new_user = User(username=data['username'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user), 201

class Login(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return respond_with_error('Username and password required', 400)

        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return respond_with_error('User not found', 404)

        if user.check_password(data['password']):
            session['user_id'] = user.id
            return user_schema.dump(user), 200
        return respond_with_error('Invalid password', 401)

class Logout(Resource):
    @cross_origin()
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

class CheckSession(Resource):
    @cross_origin()
    def get(self):
        user = get_current_user()
        if user:
            return user_schema.dump(user), 200
        return respond_with_error('Unauthorized', 401)

class Notes(Resource):
    @cross_origin()
    def get(self):
        user = get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)

        notes = Note.query.filter_by(user_id=user.id).all()
        return notes_schema.dump(notes), 200

    @cross_origin()
    def post(self):
        user = get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)

        data = request.get_json()
        if not data or 'title' not in data or 'content' not in data:
            return respond_with_error('Title and content required', 400)

        new_note = Note(title=data['title'], content=data['content'], user_id=user.id)
        db.session.add(new_note)

        try:
            db.session.commit()
            return {
                "id": new_note.id,
                "title": new_note.title,
                "content": new_note.content,
                "user_id": new_note.user_id
            }, 201
        except Exception as e:
            db.session.rollback()
            logging.error(f'Error creating note: {e}')
            return respond_with_error('Failed to create note', 500)

class NoteResource(Resource):
    @cross_origin()
    def get(self, note_id):
        user = get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)

        note = Note.query.get(note_id)
        if note and note.user_id == user.id:
            return note_schema.dump(note), 200
        return respond_with_error('Note not found or forbidden', 404)

    @cross_origin()
    def patch(self, note_id):
        user = get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)

        note = Note.query.get(note_id)
        if not note or note.user_id != user.id:
            return respond_with_error('Note not found or forbidden', 404)

        data = request.get_json()
        note.title = data.get('title', note.title)
        note.content = data.get('content', note.content)  # Update content as well

        try:
            db.session.commit()
            return note_schema.dump(note), 200
        except Exception as e:
            db.session.rollback()
            logging.error(f'Error updating note: {e}')
            return respond_with_error('Failed to update note', 500)

    @cross_origin()
    def delete(self, note_id):
        user = get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)

        note = Note.query.get(note_id)
        if note and note.user_id == user.id:
            db.session.delete(note)
            db.session.commit()
            return {}, 204
        return respond_with_error('Note not found or forbidden', 404)
class NoteByTitle(Resource):
    @cross_origin()
    def get(self, title):
        """Get a note by title."""
        user=get_current_user()
        if not user:
            return respond_with_error('Unauthorized', 401)
        note =Note.query.filter_by(title)
        if note and note.user_id == user.id:
            return note_schema.dump(note), 200
        return respond_with_error('Note not found or forbidden', 404)

class Contact(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'subject' not in data or 'message' not in data:
            return respond_with_error('All fields are required', 400)

        contact_message = ContactMessage(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )

        db.session.add(contact_message)

        try:
            db.session.commit()
            return contact_message_schema.dump(contact_message), 201
        except Exception as e:
            db.session.rollback()
            logging.error(f'Error saving contact message: {e}')
            return respond_with_error('Failed to send message', 500)

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Notes, '/notes')
api.add_resource(NoteResource, '/notes/<int:note_id>')
api.add_resource(NoteByTitle, '/notes/title/<string:title>')  
api.add_resource(Contact, '/contact')

@api_bp.errorhandler(Exception)
def handle_exception(e):
    logging.error(f'Unhandled exception: {str(e)}')
    return respond_with_error('Internal Server Error', 500)
