import React from "react"
const Category = props => {
    const {nextComponent, onDecrease} = props
  
    const eachDish = nextComponent.map(each => ({
      addonCat: each.addonCat,
      dishAvailability: each.dish_Availability,
      dishType: each.dish_Type,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishImage: each.dish_image,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
      dishQuantity: each.dish_quantity,
    }))
  
    const onAddToCart = (dishId, operator) => {
      onDecrease(dishId, operator)
    }
  
    return (
      <ul className="dish">
        {eachDish.map(each => (
          <li key={each.dishId} className="list_dish">
            <div className="item_details">
              {each.dishType === 2 ? (
                // <BiFoodTag className="veg" />
                <div></div>
              ) : (
                <div></div>
                // <BiFoodTag className="non_veg" />
              )}
              <div className="sub_details">
                <h1 className="heading">{each.dishName}</h1>
                <div className="price_details">
                  <p>{each.dishCurrency}</p>
                  <p>{each.dishPrice}</p>
                </div>
                <p className="description_details">{each.dishDescription}</p>
                {each.dishAvailability === false ? (
                  <p className="not_available">Not available</p>
                ) : (
                  <div className="button_style">
                    <button
                      type="button"
                      className="button_value"
                      onClick={() => onAddToCart(each.dishId, 'decrement')}
                    >
                      -
                    </button>
                    <p>{each.dishQuantity}</p>
                    <button
                      type="button"
                      className="button_value"
                      onClick={() => onAddToCart(each.dishId, 'increment')}
                    >
                      +
                    </button>
                  </div>
                )}
                {each.addonCat.length === 0 ? null : (
                  <p className="customise">Customizations available</p>
                )}
              </div>
            </div>
            <div className="image_list">
              <p className="calories">{`${each.dishCalories} calories`}</p>
              <img
                src={each.dishImage}
                alt={each.dishName}
                className="dish_image"
              />
            </div>
          </li>
        ))}
      </ul>
    )
  }
  export default Category