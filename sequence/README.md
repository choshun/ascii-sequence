## Flask

* `workon ascii-sequence`
* From root of project `python sequence/routes.py`

##### Resources
* [Uncle bill's repo](https://github.com/bllfrnch/fvp)
* [pip bug](https://github.com/pypa/pip/issues/3165)
* [virtualenv](http://virtualenvwrapper.readthedocs.io/en/latest/install.html)
* [Intro to flask/super quick setup](https://code.tutsplus.com/tutorials/an-introduction-to-pythons-flask-framework--net-28822) Good at POC get an app up in as little time as possible.
* [Flask official](http://flask.pocoo.org/)
* [Flask totorial with sqllite](http://flask.pocoo.org/docs/0.12/tutorial/introduction/) This sort of broke my everything, but it's helpful (requirements.txt was a disaster)
* [Flask tutoral with postgres](https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/) Really good though sparse. Just try to do the spirit of the steps and you'll get there (some of the steps are insanely vague).

*Deprecate after I get further in non-shitty postgres tut:*

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

##### Heroku:
* [installation/postgres connection with py](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)
* `heroku run npm install --remote stage`, use heroku run to run commands remotely.
* To update:
```sh
git push stage master

git push pro master
```
* [Holy shit, it only serves master](https://devcenter.heroku.com/articles/multiple-environments#advanced-linking-local-branches-to-remote-apps)
```sh
git push staging development:master
```
Pushes local dev to staging remotes master. Fuck me.
* [gunicorn and procfiles with nested stuff](http://stackoverflow.com/questions/16416172/how-can-i-modify-procfile-to-run-gunicorn-process-in-a-non-standard-folder-on-he)
* [When pip is not installed](https://github.com/heroku/heroku-buildpack-python)
```sh
heroku buildpacks:set heroku/python --remote pro
```
Then delete all requirements and add them back. I know that sucks, but it forces a python rebuild.
Also, you should see `Python app detected` or something like that.