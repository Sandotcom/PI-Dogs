import { combineReducers } from "redux";
import dogDetail from './dogDetail'
import dogs from './dogs'
import filter from './filter'
import order from './order'
import page from './page'
import temperament from "./temperament";

export default combineReducers({ dogDetail, dogs, filter, order, page, temperament })