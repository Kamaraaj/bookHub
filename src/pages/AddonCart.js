// import React, { useEffect, useState } from "react";

// const AddonCart = () => {
//   const [tableMenuList, setTableMenuList] = useState([]);
//   const [categoryDishes, setCategoryDishes] = useState([]);
//   const [isLoading, setisLoading] = useState(true);
//   const [totalCount,setTotalCount] = useState (0)
//   useEffect(() => {
//     const apiHandler = async () => {
//       const restResponse = await fetch(
//         "https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc"
//       );
//       if (restResponse.ok == true) {
//         const restData = await restResponse.json();
//         const test = restData[0].table_menu_list.map((ele) => ({
//           ...ele,
//           category_dishes: ele.category_dishes.map((el) => ({
//             ...el,
//             dish_quantity: 0,
//           })),
//         }));
//         setTableMenuList(test);
//         setCategoryDishes(test[0].category_dishes);
//         setisLoading(false);
//       }
//     };
//     apiHandler();
//   }, []);

//   const categoryDishesHandler = (slectedElement) => {
//     tableMenuList.map((ele) => {
//       if (ele === slectedElement) {
//         setCategoryDishes(ele.category_dishes);
//       }
//     });
//   };
//   const orderHandler = (itemid, operate) => {
//     const tempCategoryDishes = categoryDishes.map((EachDish) => {
//       if (EachDish.dish_id === itemid) {
//         if (EachDish.dish_quantity === 0 && operate === "dec") {
//           EachDish.dish_quantity = 0;
//         } else {
//           if (operate === "inc") {
//             EachDish.dish_quantity++;
//             setTotalCount(totalCount+1);
//           } else if (operate === "dec") {
//             EachDish.dish_quantity--;
//             setTotalCount(totalCount-1);

//           }
//         }
//       }
//       return EachDish;
//     });
//     setCategoryDishes(tempCategoryDishes);
//   };
//   return (
//     <div>
//       <div>
//         Total {totalCount}
//       </div>
//       <div className="flex flex-row space-x-4 overflow-scroll max-w-[375px]">
//         {/* <div> */}
//         {tableMenuList.map((ele) => (
//           <button
//             type="button"
//             onClick={() => categoryDishesHandler(ele)}
//             className="block whitespace-nowrap"
//             key={ele.menu_category_id}
//           >
//             {ele.menu_category}
//           </button>
//         ))}
//         {/* </div> */}
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         {isLoading ? (
//           <div>Loading ...</div>
//         ) : (
//           categoryDishes.map((dish) => (
//             <div
//               className="w-[200px] h-[150px] border border-[#475569]"
//               key={dish.dish_id}
//             >
//               <p className="text-center">{dish.dish_name}</p>
//               <div className="flex justify-center items-center">
//                 <div className=" bg-sky-500 rounded-full w-[80px] text-white">
//                   <button
//                     className="p-3"
//                     onClick={() => orderHandler(dish.dish_id, "dec")}
//                   >
//                     -
//                   </button>
//                   <span className="m-1">{dish.dish_quantity}</span>
//                   <button
//                     className="p-3"
//                     onClick={() => orderHandler(dish.dish_id, "inc")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddonCart;

import {Component} from 'react'
import Category from './Category'

class AddonCart extends Component {
  state = {
    listMenu: [],
    value: 'Salads and Soup',
    totalCartCount:0,
    isValue: '',
  }

  componentDidMount() {
    this.getApi()
  }

  getApi = async () => {
    const dishesApiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(dishesApiUrl)
    const data = await response.json()
    const menuList = data.map(each => ({
      tableMenuList: each.table_menu_list,
    }))
    const {tableMenuList} = menuList[0]
    const dishQuantityAdd = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(cate => ({
        ...cate,
        dish_quantity: 0,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
    }))
    this.setState({listMenu: dishQuantityAdd})
  }

  onChooseList = event => {
    const chosenMenu = event.target.innerText
    this.setState({value: chosenMenu})
  }

  //   totalCounter = operator => {
  //     if (operator === 'increment') {
  //       this.setState(prevs => ({
  //         count: prevs.count + 1,
  //       }))
  //     } else {
  //       this.setState(prevs => ({
  //         count: prevs.count - 1,
  //       }))
  //     }
  //   }

  onDecreaseCount = (dishId, operator) => {
    let checktype ='';
    this.setState(prev => ({
      listMenu: prev.listMenu.map(each => ({
        ...each,
        categoryDishes: each.categoryDishes.map(eachDish => {
          if (eachDish.dish_id === dishId) {
            if (operator === 'decrement' && eachDish.dish_quantity > 0) {
              checktype = 'decrement';
              return {
                ...eachDish,
                dish_quantity: eachDish.dish_quantity - 1,
              }
            }
            if (operator === 'increment') {              
              checktype = 'increment';
              return {
                ...eachDish,
                dish_quantity: eachDish.dish_quantity + 1,
              }
            }
          }
          return eachDish
        }),
      })),
    }))
    setTimeout(()=>{
      if (checktype ==='increment' ) {
        this.setState(prevs => ({
          totalCartCount: prevs.totalCartCount + 1,
      }))
      }
      else if (checktype === 'decrement') {
        this.setState(prevs => ({
          totalCartCount: prevs.totalCartCount - 1,
      }))
      }
      checktype ='';
    },0)
  }

  render() {
    const {listMenu, value, count,totalCartCount} = this.state
    const filteredDishes = listMenu.filter(each => each.menuCategory === value)

    return (
      <>
      <p>TotalCount  ={totalCartCount}</p>
        {/* <Header count={count} /> */}
        <ul className="menu_container">
          {listMenu.map(each => (
            <li key={each.menuCategoryId} onClick={this.onChooseList}>
              <button
                type="button"
                className={
                  each.menuCategory === value
                    ? 'chosen-button'
                    : 'category-button'
                }
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        {filteredDishes.map(each => (
          <Category
            nextComponent={each.categoryDishes}
            key={each.menuCategoryId}
            onDecrease={this.onDecreaseCount}
          />
        ))}
      </>
    )
  }
}

export default AddonCart