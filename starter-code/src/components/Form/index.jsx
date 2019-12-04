import React, { Component } from 'react'

export class Form extends Component {
  constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
	}

  
  render() {
    return (
      <div>
      <form class='m-1' onSubmit={this.props.addFoodToList}>
        <input type="text" name='name' placeholder='name' />
        <input type="number" name='calories' placeholder='calories'/>
        <input type="text" name='image' placeholder='image'/>
        <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
