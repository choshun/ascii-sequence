## Flask

* `workon ascii-sequence`
* From root of project `python sequence/routes.py`

##### Resources
* [Uncle bill's repo](https://github.com/bllfrnch/fvp)
* [pip bug](https://github.com/pypa/pip/issues/3165)
* [virtualenv](http://virtualenvwrapper.readthedocs.io/en/latest/install.html)
* [Intro to flask/super quick setup](https://code.tutsplus.com/tutorials/an-introduction-to-pythons-flask-framework--net-28822)
* [Flask official](http://flask.pocoo.org/)
* [Flask totorial with sqllite](http://flask.pocoo.org/docs/0.12/tutorial/introduction/)
* [Flask tutoral with postgres](https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/)

[`flask` not found](https://github.com/pallets/flask/issues/1278)

No clue why this worked for `flask initdb`
```sh
(seq) Choshuns-MBP:ascii-sequence choshun$ export FLASK_APP=sequence/sequence.py 
(seq) Choshuns-MBP:ascii-sequence choshun$ flask run
```
Then `flask initdb` worked :/.

from http://flask.pocoo.org/docs/0.11/cli/#basic-usage
from stackoverflow: http://stackoverflow.com/questions/40696761/cannot-initialize-flask-initdb-flask-tutorial-step4

So I added 
```sh 
export FLASK_APP=sequence/sequence.py
```
to
/Users/choshun/Projects/ascii-sequence/bin/activate

to try and not need to do this over and over

Heroku:
* [installation/postgres connection with py](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)

To update:

```sh
git push stage master

git push pro master
```