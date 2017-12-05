[![CircleCI](https://circleci.com/gh/falexandrou/instahn.svg?style=svg)](https://circleci.com/gh/falexandrou/instahn)

### InstaHN
#### HackerNews reader on steroids

#### What is InstaHN
InstaHN is an offline-first HackerNews reader for the impatient hacker

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
docker run --rm -it -p 3000:3000 falexandrou/instahn:latest
```
and then visit [http://127.0.0.1:3000](http://127.0.0.1:3000)

##### Tests
You can run the test suite by hitting `npm run test` or `npm run test-watch` if you want to see how your changes impact your tests

#### App Outline
- The app is a Single Page Application served through a static file
- In order to dramatically improve performance, all actions are delegated to a Web Worker.
- The app is supports offline usage.
- It uses Bulma as a UI framework & a custom offcanvas implementation
- All results are cached into `CacheStorage`

#### Credits
- UI Framework: [Bulma](https://bulma.io)
- Worker middleware for Redux: [chikeichan/redux-worker](https://github.com/chikeichan/redux-worker)

#### Known Issues
- We need to `import 'isomorphic-fetch';` on our tests so that `Request` and `Response` globals are defined https://github.com/jefflau/jest-fetch-mock/issues/13

#### Contributions
Contributions are welcome but please make sure you've read our [Contributing Guide](https://github.com/falexandrou/instahn/blob/master/CONTRIBUTING.md)
PS. Tests are mandatory

#### Issues
In the unlikely event of sudden loss of cabin pressure or a bug, report an issue on our [Issue tracker](https://github.com/falexandrou/instahn/issues)

#### License
The Project is available under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)
