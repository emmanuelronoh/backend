from marshmallow import Schema, fields, validate, post_load, ValidationError
from models import User, Note, ContactMessage  # Import the new model

# User Schema
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=50))
    password = fields.Str(load_only=True, required=True, validate=validate.Length(min=6))

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

# Note Schema
class NoteSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    content = fields.Str(required=True, validate=validate.Length(min=1))
    user_id = fields.Int(dump_only=True)
    tags = fields.List(fields.Str(), missing=[])

    @post_load
    def create_note(self, data, **kwargs):
        return Note(**data)

# Contact Message Schema
class ContactMessageSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Str(required=True, validate=validate.Email())
    subject = fields.Str(required=True, validate=validate.Length(min=1, max=150))
    message = fields.Str(required=True, validate=validate.Length(min=1))
    date_created = fields.DateTime(dump_only=True)  # Automatically filled by the database

    @post_load
    def create_contact_message(self, data, **kwargs):
        return ContactMessage(**data)

# Example of custom validation for future use
def validate_message_length(length):
    if length < 10:
        raise ValidationError("Message must be at least 10 characters long.")

# Update message field to include custom validation
class ContactMessageSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Str(required=True, validate=validate.Email())
    subject = fields.Str(required=True, validate=validate.Length(min=1, max=150))
    message = fields.Str(required=True, validate=[validate.Length(min=1), validate_message_length])
    date_created = fields.DateTime(dump_only=True)  # Automatically filled by the database

    @post_load
    def create_contact_message(self, data, **kwargs):
        return ContactMessage(**data)
