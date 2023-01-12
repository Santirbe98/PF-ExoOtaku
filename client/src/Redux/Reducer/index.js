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
  UPDATE_WISH_LIST,
} from "../Actions/actionsTypes.js";

const initialState = {
  products: [],
  filterProducts: [],
  orderByRank: [],
  details: {},
  orderdetail: {},
  orderByDate: [],
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
      if (action.payload.length) {
        const productos = action.payload.filter(
          (productos) => productos.deleted === false
        );
        return {
          ...state,
          products: productos,
          filterProducts: productos,
        };
      } else return { ...state };

    case ORDER_RANK:
      const productsRank = state.filterProducts;
      const orderProductRank = productsRank.sort(function (a, b) {
        return a.r - b.r;
      });
      return {
        ...state,
        orderByRank: orderProductRank,
        filterProducts: orderProductRank.reverse(),
      };

    case ORDER_BY_DATE:
      const productsDate = state.filterProducts;
      const orderProductDate = productsDate.sort(function (a, b) {
        return a.id - b.id;
      });
      return {
        ...state,
        filterProducts: orderProductDate,
        orderByDate: orderProductDate.reverse(),
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
          : filterProducts2.filter((p) =>
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
      // console.log(filterProducts4);
      // console.log(colorSelectedArr);
      return {
        ...state,
        filterProducts: filterProducts4,
        colorSelected: colorSelectedArr,
      };

    case GET_PRODUCT_DETAIL:
      const productos1 = [];
      if (action.payload.deleted === false) {
        productos1.push(action.payload);
      }
      return {
        ...state,
        details: productos1,
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
    // case ORDER_BY_PRICE:
    //   const products = state.filterProducts;
    //   const orderProduct =
    //     action.payload === "Asc"
    //       ? products.sort((a, b) => a.price - b.price)
    //       : products.sort((a, b) => b.price - a.price);
    //   return {
    //     ...state,
    //     filterProducts: orderProduct,
    //   };

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

    case UPDATE_WISH_LIST:
      if (action.payload.add) {
        let customerWish = state.chk_customer;

        customerWish.wishList.push(action.payload.id);

        return {
          ...state,
          chk_customer: customerWish,
        };
      } else {
        const customerWish = state.chk_customer;

        let algo = customerWish.wishList.filter((e) => e !== action.payload.id);
        customerWish.wishList = algo;
        return {
          ...state,
          chk_customer: customerWish,
        };
      }
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
