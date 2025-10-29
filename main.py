from flask import Flask
#rotas
from controller import app as routes_app

app = Flask(__name__)
app.register_blueprint(routes_app)

if __name__ == '__main__':
    app.run(debug=True)