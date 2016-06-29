"use strict";

import { Constants as AssessmentMetaConstants }   from '../actions/assessment_meta';

const initialState = {};

export default (state = initialState, action) => {

  switch(action.type){
    case AssessmentMetaConstants.LOAD_ASSESSMENT_META:
      return action.payload;
    default:
      return state;
  }
};
