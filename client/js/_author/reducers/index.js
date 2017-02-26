import { combineReducers } from 'redux';
import settings            from './settings';
import application         from './application';
import jwt                 from './jwt';
import banks               from './banks';
import bankNavigation      from './bank_navigation';
import assessments         from './assessments';
import items               from './items';
import assessmentItems     from './assessment_items';
import preview             from './preview';

const rootReducer = combineReducers({
  settings,
  jwt,
  application,
  banks,
  bankNavigation,
  assessments,
  items,
  assessmentItems,
  preview,
});

export default rootReducer;
