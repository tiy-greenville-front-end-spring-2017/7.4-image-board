var React = require('react');
var Backbone = require('backbone');

var ImageCollection = require('../models/image').ImageCollection;
var Image = require('../models/image').Image;

var ImageBoardContainer = React.createClass({
  getInitialState: function(){
    var imageCollection = new ImageCollection();

    // imageCollection.add([
    //   {url: '', description: ''},
    //   {url: '', description: ''}
    // ]);
    return {
      imageCollection: imageCollection,
      showForm: false,
      imageToEdit: new Image()
    }
  },
  componentWillMount: function(){
    var newImageCollection = this.state.imageCollection;

    newImageCollection.add([
      {id: 1, url: 'http://unsplash.it/300/300', description: 'Cool photo... i think.'},
      {id: 2, url: 'http://unsplash.it/300/301', description: 'Nice cat!'}
    ]);

    this.setState({imageCollection: newImageCollection});
  },
  handleToggleForm: function(event){
    event.preventDefault();
    this.setState({showForm: !this.state.showForm});
  },
  addImage: function(image){
    var images = this.state.imageCollection;
    images.add(image);
    this.setState({imageCollection: images, showForm: false});
  },
  editImage: function(model, imageData){
    console.log(model);
    console.log(imageData);
    model.set(imageData);
    this.setState({imageCollection: this.state.imageCollection});
  },
  showEditForm: function(imageToEdit){
    this.setState({showForm: true, imageToEdit: imageToEdit});
  },
  render: function(){
    return (
      <div className="container">

        <ul className="nav nav-pills">
          <li role="presentation" className="active">
            <a onClick={this.handleToggleForm} href="#">+</a>
          </li>
        </ul>

        {this.state.showForm ? <ImageForm
                                imageToEdit={this.state.imageToEdit}
                                addImage={this.addImage}
                                editImage={this.editImage}
                              /> : null}

        <ImageList
          imageCollection={this.state.imageCollection}
          showEditForm={this.showEditForm}
        />
      </div>
    )
  }
});

var ImageForm = React.createClass({
  propTypes: {
    addImage: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return this.props.imageToEdit.toJSON();
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(nextProps.imageToEdit.toJSON());
  },
  handleUrlChange: function(event){
    this.setState({'url': event.target.value});
  },
  handleDescriptionChange: function(event){
    this.setState({'description': event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    if(this.props.imageToEdit.isNew()){
      this.props.addImage(this.state);
    }else{
      this.props.editImage(this.props.imageToEdit, this.state);  
    }

    this.setState({url: '', description: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="well">
        <div className="form-group">
          <label htmlFor="url">Image URL</label>
          <input onChange={this.handleUrlChange} value={this.state.url} type="text" className="form-control" id="url" placeholder="http://..." />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="Say something nice..." />
        </div>
        <button type="submit" className="btn btn-success">Add Image</button>
      </form>
    )
  }
});

var ImageList = React.createClass({
  propTypes: {
    imageCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
    showEditForm: React.PropTypes.func.isRequired
  },
  render: function(){
    var self = this;
    var imageBoardList = this.props.imageCollection.map(function(image){
      return (
        <div key={image.cid} className="thumbnail">
          <img src={image.get('url')} alt={image.get('description')} />
          <div className="caption">
            {/*<h3>Thumbnail label</h3>*/}
            <p>{image.get('description')}</p>
            <p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  self.props.showEditForm(image);
                }}
                href="#"
                className="btn btn-warning"
                role="button"
              >
                Edit
              </a>
              <a href="#" className="btn btn-danger" role="button">Delete</a>
            </p>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">

          {imageBoardList}

        </div>
      </div>
    )
  }
});

module.exports = {
  ImageBoardContainer
};
