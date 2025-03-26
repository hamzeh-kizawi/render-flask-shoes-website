from flask import Flask, render_template, request, redirect, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "web project"

# Configure MySQL database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://root:0000@localhost/users_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(250), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# Login Route
@app.route("/login", methods=["GET", "POST"])
def login():
    # If user is already logged in, to show logout option
    if "username" in session:
        return render_template("login.html", logged_in=True, username=session['username'])

    # to handle login form submission
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['username'] = username
            return redirect(url_for('home'))
        return render_template("login.html", error="Invalid username or password")

    # to show login form
    return render_template("login.html", logged_in=False)


# Register Route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # to check if username or email exists
        if User.query.filter_by(username=username).first():
            return render_template("register.html", error="Username already exists")
        if User.query.filter_by(email=email).first():
            return render_template("register.html", error="Email already exists")

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        session['username'] = username
        return redirect(url_for('home'))

    return render_template("register.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")


@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
