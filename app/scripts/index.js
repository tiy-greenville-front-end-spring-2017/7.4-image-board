var React = require('react');
var ReactDOM = require('react-dom');

// var MainContainer = require('./components/propTypes.jsx').MainContainer;
//
// ReactDOM.render(
//   React.createElement(MainContainer),
//   document.getElementById('app')
// );

var ImageBoardContainer = require('./components/image_board.jsx').ImageBoardContainer;

ReactDOM.render(
  React.createElement(ImageBoardContainer),
  document.getElementById('app')
);
