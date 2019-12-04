import React, { Component } from "react";
import "./App.scss";
import FoodBox from "./components/FoodBox/index";
import Form from "./components/Form/index";

import foodList from "./foods.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      foodList: foodList,
      foodToAdd: { name: "", calories: "", image: "" },
      showPopup: false,
      filtered: foodList,
      todayfood: [],
      totalCalories: 0
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.addFoodToList = this.addFoodToList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFood = this.addFood.bind(this);
    this.delete = this.delete.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  addFoodToList(event) {
    event.preventDefault();
    const foodToAdd = {
      name: event.target.children.name.value,
      image: event.target.children.image.value,
      calories: event.target.children.calories.value
    };
    const foodListUpdated = [...this.state.foodList, foodToAdd];
    this.setState({
      foodList: foodListUpdated,
      foodToAdd: "",
      showPopup: !this.state.showPopup
    });
  }

  handleChange(e) {
    let currentList = this.state.foodList;

    let newList = [];

    if (e.target.value !== "") {
      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      newList = currentList;
    }

    this.setState({
      filtered: newList
    });
  }

  addFood(e) {
    e.preventDefault();
    let list = [...this.state.todayfood];
    const name = e.target.children.food.children.name.innerText;
    const calories = e.target.children.food.children.calories.innerText;
    const quantity = e.target.children.quantityBox.children.quantity.value;
    const totalCalories =
      this.state.totalCalories * 1 + calories * 1 * quantity;

    if (list.find(food => (food.name === name))) {

      for (let i = 0; i <= list.length; i++) {
        if (list[i].name == name) {
          list[i].quantity = list[i].quantity * 1 + quantity * 1;
          break;
        }
      }
    } else {
      list.push({ name: name, calories: calories, quantity: quantity });
    }

    this.setState({
      todayfood: list,
      totalCalories: totalCalories
    });
  }

  delete(id) {
    this.setState(prevState => ({
      todayfood: prevState.todayfood.filter(el => el != id)
    }));
  }

  render() {
    return (
      <div>
        <h2>Food List</h2>
        <div>
          <button
            className="btn btn-primary mb-1 ml-2"
            onClick={this.togglePopup}
          >
            Add new foods
          </button>
          <div>
            <input
              type="text"
              className="input w-50 mb-1"
              placeholder="Search..."
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-row w-100">
          <div className="w-50 mr-3">
            {this.state.showPopup ? (
              <div>
                <Form
                  addFoodToList={this.addFoodToList}
                  togglePopup={this.togglePopup}
                />
              </div>
            ) : null}{" "}
            {this.state.filtered.map(food => {
              return (
                <FoodBox {...food} addFood={this.addFood} key={food.name} />
              );
            })}
          </div>
          <div className="w-40">
            <h2>Today's Food</h2>
            <ul>
              {this.state.todayfood.map(food => {
                return (
                  <li key={Math.random()}>
                    Quantity: {food.quantity}, Name: {food.name}, Calories:{" "}
                    {food.calories} - <button onClick={this.delete}>🗑</button>
                  </li>
                );
              })}
            </ul>
            <div>Total Calories: {this.state.totalCalories}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
