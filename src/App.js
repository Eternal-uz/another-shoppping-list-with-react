import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { name: "item1", quantity: 1, isSelected: false },
    { name: "item2", quantity: 3, isSelected: false },
    { name: "item3", quantity: 2, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [totalCount, setTotalCount] = useState(6);

  const addToItems = () => {
    const newItem = {
      name: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
  };

  const increaseItemQuantity = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };
  const decreaseItemQuantity = (index) => {
    const newItems = [...items];
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
	
    }, 0);
    setTotalCount(totalItemCount);
  };
  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon onClick={() => addToItems()} icon={faPlus} />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div key={index} className="item-container">
              <div onClick={() => toggleComplete(index)} className="item-name">
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.name}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.name}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    onClick={() => decreaseItemQuantity(index)}
                    icon={faChevronLeft}
                  />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon
                    onClick={() => increaseItemQuantity(index)}
                    icon={faChevronRight}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalCount}</div>
      </div>
    </div>
  );
};

export default App;
