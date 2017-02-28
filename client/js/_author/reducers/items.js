import _                       from 'lodash';
import guid                    from '../../utils/guid';
import { types, getQbankType } from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
const initialState = {};

function deserializeChoices(choices, answers) {
  const newChoices = {};

  _.forEach(choices, (choice, index) => {
    newChoices[choice.id] = {
      id: choice.id,
      answerId: null,
      text: choice.text,
      order: index,
      feedback: null,
      fileIds: [],
      isCorrect: false,
    };
    _.forEach(answers, (answer) => {
      if (_.includes(answer.choiceIds, choice.id)) {
        newChoices[choice.id] = {
          ...newChoices[choice.id],
          feedback: _.get(answer, 'feedback.text'),
          isCorrect: answer.genusTypeId === types.answer.rightAnswer,
          answerId: answer.id,
        };
      }
    });
  });
  return newChoices;
}

// The implementation of function is Q-Bank specific
function deserializeItem(item) {
  // If there is any extra data you need from Qbank Items, add it here
  return {
    id: item.id,
    type: getQbankType(item.genusTypeId),
    bankId: item.bankId,
    assessmentId: null, // TODO
    name: _.get(item, 'displayName.text'),
    question: {
      id: _.get(item, 'question.id'),
      type: getQbankType(_.get(item, 'question.genusTypeId')),
      text: _.get(item, 'question.text.text'),
      multipleAnswer: _.get(item, 'question.multiAnswer'),
      shuffle: _.get(item, 'question.shuffle'),
      fileIds: {},
      choices: deserializeChoices(_.get(item, 'question.choices'), item.answers)
    },
  };
}

export default function banks(state = initialState, action) {
  switch (action.type) {
    case 'GET_ASSESSMENT_ITEMS_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }

      _.each(action.payload, (item) => {
        newState[bankId][item.id] = deserializeItem(item);
      });

      return newState;
    }

    case 'UPDATE_ITEM_DONE':
    case 'CREATE_ITEM_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;
      if (!newState[bankId]) {
        newState[bankId] = {};
      }

      newState[bankId][action.payload.id] = deserializeItem(action.payload);

      return newState;
    }

    default:
      return state;
  }
}
