from flask import Flask, request, jsonify, session, send_from_directory
import os

app = Flask(__name__, static_folder='dist')
app.secret_key = "abc123"

users = [
    {"username": "srimathi", "password": "srimathi"},
    {"username": "anjali", "password": "anjali"},
    {"username": "smv", "password": "coffee"},
]

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            session["user"] = username
            return jsonify({"message": "Login successful!"}), 200

    return jsonify({"message": "Invalid credentials!"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully!"}), 200

@app.route("/")
@app.route("/home")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory(os.path.join(app.static_folder, "assets"), path)

if __name__ == "__main__":
    app.run(debug=True)
