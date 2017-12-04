[![CircleCI](https://circleci.com/gh/falexandrou/instahn.svg?style=svg)](https://circleci.com/gh/falexandrou/instahn)

### InstaHN
#### HackerNews reader on steroids

#### What is InstaHN
InstaHN is a blazing fast, offline-first HackerNews reader

#### Getting Started

##### First time run
If you wish to build and run this project, all you need to do is clone this repository, then run
```
npm install
```
inside the cloned project directory. This will install the project's dependencies, build the app and serve through a static file server.

After that, point your browser at [http://127.0.0.1:3000](http://127.0.0.1:3000) and enjoy

##### Subsequent runs
You can have the serve the project by running
```
npm run build && npm run serve
```
This will build & serve the project

##### Development server
If you want to contribute to the project, you can run the development server by running
```
npm run dev
```
Then point your favorite browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

##### Alternatively
You can run our [Docker container](https://hub.docker.com/r/falexandrou/instahn/) via
```
docker run --rm -it falexandrou/instahn
```
and then visit [http://127.0.0.1:3000](http://127.0.0.1:3000)

##### Tests
You can run the test suite by hitting `npm run test` or `npm run test-watch` if you want to see how your changes impact your tests

#### App Outline
- The app is a Single Page Application served through a static file
- In order to dramatically improve performance, all actions are delegated to a Web Worker.
- The app is supports offline usage
- All results are cached into `CacheStorage`

#### Credits
- UI Framework: [Bulma](https://bulma.io)
- Worker middleware for Redux: [chikeichan/redux-worker](https://github.com/chikeichan/redux-worker)

#### Known Issues
- Jest tests sometimes fail: https://github.com/jefflau/jest-fetch-mock/issues/13#issuecomment-299413329
- https://github.com/webpack/webpack-dev-server/issues/1101
- https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/132

#### Contributions
Contributions are welcome but please make sure you've read our [Contributing Guide](https://github.com/falexandrou/instahn/blob/master/CONTRIBUTING.md)
PS. Tests are mandatory

#### Issues
In the unlikely event of sudden loss of cabin pressure or a bug, report an issue on our [Issue tracker](https://github.com/falexandrou/instahn/issues)

#### TODOs
- ~~Write a README file~~
- Write tests
- ~~Integrate CircleCI~~
- Integrate eslint

#### License
The Project is available under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)
