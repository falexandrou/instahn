[![CircleCI](https://circleci.com/gh/falexandrou/instahn.svg?style=svg)](https://circleci.com/gh/falexandrou/instahn)

### InstaHN
#### HackerNews reader on steroids

#### What is InstaHN
InstaHN is a blazing fast, offline-first HackerNews reader

#### Getting Started
If you wish to build and run this project, all you need to do is clone this repository, then run
```
npm install
```
inside the cloned project directory. This will install the project's dependencies, build the app and serve through a static file server.

After that, point your browser at [http://127.0.0.1:3000](http://127.0.0.1:3000) and enjoy

##### Alternatively
You can run our [Docker container](https://hub.docker.com/r/falexandrou/instahn/) via
```
docker run --rm -it falexandrou/instahn
```
and then visit [http://127.0.0.1:3000](http://127.0.0.1:3000)

#### App Outline
- The app is a Single Page Application served through a static file
- In order to dramatically improve performance, all actions are delegated to a Web Worker.
- The app is supports offline usage
- All results are cached into `CacheStorage`

#### Credits
- UI Framework: [Bulma](https://bulma.io)
- Worker middleware for Redux: [chikeichan/redux-worker](https://github.com/chikeichan/redux-worker)

#### Known Issues
- https://github.com/webpack/webpack-dev-server/issues/1101
- https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/132

#### Contributions
Contributions are welcome but please make sure you've read our [Contributing Guide](https://github.com/falexandrou/instahn/blob/master/CONTRIBUTING.md)

#### Issues
In the unlikely event of air pressure or a bug, report an issue on our [Issue tracker](https://github.com/falexandrou/instahn/issues)

#### TODOs
- ~~Write a README file~~
- Write tests
- ~~Integrate CircleCI~~
- Integrate eslint

#### License
The Project is available under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)
