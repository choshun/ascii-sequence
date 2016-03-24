import path from 'path';
import Express from 'express';

var app = Express();
var server;

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const IMAGE_PATHS = path.resolve(__dirname, '../client/images');
const PATH_DIST = path.resolve(__dirname, '../../dist');

app.use('/styles', Express.static(PATH_STYLES));
app.use('/images', Express.static(IMAGE_PATHS));
app.use(Express.static(PATH_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

server = app.listen(process.env.PORT || 1337, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
