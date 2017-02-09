import _ from 'lodash';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

export default function banks(state = initialState, action) {
  switch (action.type) {

    case 'GET_ASSESSMENT_ITEMS_DONE':
    case 'CREATE_ITEM_IN_ASSESSMENT_DONE': {
      const newState = _.cloneDeep(state);
      const assessmentId = action.original.assessmentId;

      newState[assessmentId] = _.map(action.payload, 'id');
      return newState;
    }

    default:
      return state;
  }
}
