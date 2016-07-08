import $                   from "jquery";
import { createSelector }  from "reselect";

import { transformItem }  from "./clix";


export function questions(state, props) {
  return state.assessment.items.map(transformItem);
}

export function outcomes() {
  return {};
}

export function questionCount(state, props) {
  return state.assessment.items.length;
}

export function questionResults(state, props) {

  // TODO Currently we are setting the same response for all choiceIds.
  // When we have an example of multi answer feedback we should figure out
  // how to assign feedback to each answer.
  const questionIndexes = _.range(
    state.progress.get('currentItemIndex'),
    state.progress.get('currentItemIndex') + state.settings.questions_per_page
  );

  let questionResponses = {};

  _.each(questionIndexes, (index) => {
    const response = state.assessmentResults.getIn(['questionResults', index, 0]) || {};
    questionResponses[index] = {};
    questionResponses[index].correct = response.correct;
    questionResponses[index].answerIds = response.choiceIds;
    questionResponses[index].feedback = response.feedback;
  });

  return questionResponses;
}
