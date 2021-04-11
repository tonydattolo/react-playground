class ProductList extends React.Component {
  // state is owned by the component. when state or props updates,
  // the component re-renders
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: [], // component mounts with empty products array
  //   };
  //   // bind the custom method, so it references this component
  //   this.handleProductUpVote = this.handleProductUpVote.bind(this);
  // }
  state = {
    products: [], // component mounts with empty products array
  };

  // state changes must take place using this.setState()
  componentDidMount() {
    // after loading, state.products is updated with data, and re-renders
    this.setState({ products: Seed.products });
  }

  // children communicate events with their parent component
  // through functions that are passed down
  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, { // .assign clones product to a new {} with vote updated
          votes: product.votes + 1,
        });
      } else {
        // if product id doesnt match, we return it unmodified
        return product;
      }
    });

    this.setState({
      products: nextProducts,
    });
  }
  
  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product
        key={"product-" + product.id} // DONT FORGET UNIQUE KEY
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  // NOTE: this is only bound to the component for special methods
  //       such as render() or componentDidMount()
  //       when defining custom methods, manual binding is required.
  //       this is done using constructor method
  // constructor(props) {
  //   super(props);
  //   this.handleUpVote = this.handleUpVote.bind(this);
  // }

  // this.props.onVote was passed down from the parent
  // we can now call this childs function, which will call the
  // onVote function prop that was passed down, which calls a function
  handleUpVote = () => (
    this.props.onVote(this.props.id)
  );

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
