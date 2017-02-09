import os
from flask import Flask, render_template
 
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route('/')
def home():
  return render_template('app.html')

if __name__ == '__main__':
  app.run()

