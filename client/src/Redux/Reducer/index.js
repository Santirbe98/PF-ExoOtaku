import {
  GET_PRODUCTS,
  FILTER_ALL,
  GET_PRODUCT_DETAIL,
  ORDER_BY_PRICE,
  ORDER_DETAIL,
  ORDER_RANK,
  ORDER_BY_DATE,
  GET_USER_CREDENTIALS,
  CUSTOMER_BY_EMAIL,
} from "../Actions/actionsTypes.js";

const initialState = {
  products: [],
  filterProducts: [],
  orderByRank: [],
  details: {},
  orderdetail: {},
  orderByDate:[],
  colorSelected: [],
  customer: {},
  chk_customer: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_DETAIL:
      return {
        ...state,
        orderdetail: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filterProducts: action.payload,
      };

    case ORDER_RANK:
      const productsRank = state.filterProducts;
      const orderProductRank = productsRank.sort((a, b) => a.price - b.price);
      return {
        ...state,
        orderByRank: orderProductRank,
      };

    case ORDER_BY_DATE:
      const productsDate = state.filterProducts;
      const orderProductDate = productsDate.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
      // const orderProductDate = productsDate.sort(
      //   (a, b) => Number(a.date_added) - Number(b.date_added));
      return {
        ...state,
        orderByDate: orderProductDate,
      };

    case FILTER_ALL:
      const allProducts = state.products;
      const { color, type, category } = action.payload;

      const filterProducts =
        category === "All"
          ? allProducts
          : allProducts.filter((p) => p.category === category);

      const filterProducts2 =
        type === "All"
          ? filterProducts
          : filterProducts.filter((p) => p.type.find((t) => t === type));
      let colorSelectedArr = [];
      const filterProducts3 =
        color === "All"
          ? filterProducts2
          : // : filterProducts2.filter((p) => p.color.find((c) => c === color));
            filterProducts2.filter((p) =>
              p.imagesDb.find((c, index) => {
                if (c.color === color) {
                  colorSelectedArr.push(index);
                  return c;
                }
              })
            );
      const filterProducts4 = filterProducts3.map((p, index, arr) => {
        if (colorSelectedArr.length > 0) {
          let newImage = colorSelectedArr[index];
          return { ...p, images: p.imagesDb[newImage].images };
        } else return p;
      });
      console.log(filterProducts4);
      console.log(colorSelectedArr);
      return {
        ...state,
        filterProducts: filterProducts4,
        colorSelected: colorSelectedArr,
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        details: action.payload,
      };
    case ORDER_BY_PRICE:
      const products = state.filterProducts;
      const orderProduct =
        action.payload === "Asc"
          ? products.sort((a, b) => a.price - b.price)
          : products.sort((a, b) => b.price - a.price);
      return {
        ...state,
        filterProducts: orderProduct,
      };

    case GET_USER_CREDENTIALS:
      return {
        ...state,
        user_credential: action.payload,
      };

    case CUSTOMER_BY_EMAIL:
      return {
        ...state,
        chk_customer: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
