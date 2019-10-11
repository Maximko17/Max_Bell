import { combineReducers } from "redux";
import itemReducer from "./item-reducer";
import errorReducer from "./error-reducer";
import additionalReducer from "./additional-reducer";
import orderReducer from "./order-reducer";
import securityReducer from "./security-reducer";
import adminReducer from "./admin-reducer";
import reviewReducer from "./review-reducer";

export default combineReducers({
  item: itemReducer,
  review: reviewReducer,
  errors: errorReducer,
  additional: additionalReducer,
  order: orderReducer,
  security: securityReducer,
  admin: adminReducer
});
