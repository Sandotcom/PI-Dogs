import { combineReducers } from "redux";
import dogs from './dogs'
import dogDetail from './dogDetail'
import page from './page'
import temperament from "./temperament";

export default combineReducers({ dogs, dogDetail, page, temperament })