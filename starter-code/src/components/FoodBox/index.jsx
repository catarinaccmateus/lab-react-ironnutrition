import React, { Component } from "react";

export class FoodBox extends Component {
  render() {
    const { name, image, calories } = this.props;

    return (
      <div className="media border mb-1"  style={{height: 140}}>
        <form className="row align-self-center" onSubmit={this.props.addFood}>
          <img
            src={image}
            className="img-thumbnail mr-3 w-25 border-0"
            style={{
              maxWidth: 1600,
              maxHeight: 130
            }}
            alt={name}
          />
          <div className="media-body align-self-center" name="food">
            <h5 className="mt-0 mb-1" name="name">
              {name}
            </h5>
            <small name="calories">{calories}</small>
          </div>
          <div className="d-flex w-20 align-items-center justify-content-end pr-5" name='quantityBox'>
            <input className="form-control col-4" name='quantity' type="number" min='1' required/>
            <button className="btn btn-primary ml-2">+</button>
          </div>
        </form>
      </div>
    );
  }
}

export default FoodBox;
