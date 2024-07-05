from app import db, User
from flask_bcrypt import Bcrypt
from app import create_app

# Create the application context
app = create_app()
app.app_context().push()

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Create a dummy user
username = 'syed'
password = 'syedsyedsyed'

# Hash the password
hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

# Check if the user already exists
existing_user = User.query.filter_by(username=username).first()
if existing_user:
    print(f"User '{username}' already exists.")
else:
    # Create and add the new user
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    print(f"User '{username}' created successfully.")
