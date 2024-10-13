"""Initial migration

Revision ID: 406b707d1050
Revises: 
Create Date: 2024-10-11 17:27:40.652194

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func  # Import func for server_default

# revision identifiers, used by Alembic.
revision = '406b707d1050'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create the editor_content table
    op.create_table(
        'editor_content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('note_id', sa.Integer(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('images', sa.ARRAY(sa.String()), nullable=True),
        sa.Column('videos', sa.ARRAY(sa.String()), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=func.now()),
        sa.ForeignKeyConstraint(['note_id'], ['notes.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Add tags column to notes
    op.add_column('notes', sa.Column('tags', sa.ARRAY(sa.String()), nullable=True))

    # Add date_created column to notes
    op.add_column('notes', sa.Column('date_created', sa.DateTime(), nullable=False))

    # Update existing rows to set a default value for date_created
    op.execute("UPDATE notes SET date_created = NOW()")

    # Set the server_default for the date_created column
    op.alter_column('notes', 'date_created', server_default=func.now())

    # Remove content column from notes
    op.drop_column('notes', 'content')

def downgrade():
    # Re-add content column to notes
    op.add_column('notes', sa.Column('content', sa.TEXT(), autoincrement=False, nullable=False))
    
    # Drop date_created and tags columns
    op.drop_column('notes', 'date_created')
    op.drop_column('notes', 'tags')
    
    # Drop editor_content table
    op.drop_table('editor_content')
