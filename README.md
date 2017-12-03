Components:

- Worker middleware for Redux https://github.com/chikeichan/redux-worker

Trade-offs:
- We order by ID descending since the API only returns IDs

Known issues:
- https://github.com/webpack/webpack-dev-server/issues/1101
- https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/132