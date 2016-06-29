import wrapper from '../constants/wrapper';

const constants = [
  "ASSESSMENT_START",
  "ANSWER_SELECTED",
  "QUESTION_SELECTED",
  "ASSESSMENT_CHECK_ANSWER",
  "LEVEL_SELECTED",
  "ASSESSMENT_NEXT_QUESTIONS",
  "ASSESSMENT_PREVIOUS_QUESTIONS",
  "RETAKE_ASSESSMENT",
  "ASSESSMENT_VIEWED"
];

const requests = ["ASSESSMENT_SUBMITTED"];

export const Constants = wrapper(constants, requests);

export const start = (assessmentId) => ({
  type: Constants.ASSESSMENT_START,
  assessmentId
});

export const answerSelected = (questionIndex, answerId, exclusive) => ({
  type: Constants.ANSWER_SELECTED,
  questionIndex,
  answerId,
  exclusive
});

export const selectQuestion = (index) => ({
  type: Constants.QUESTION_SELECTED, index
});

export const checkAnswer = (questionIndex) => ({
  type: Constants.ASSESSMENT_CHECK_ANSWER,
  questionIndex
});

export const selectConfidenceLevel = (level, index) => ({
  type: Constants.LEVEL_SELECTED,
  level,
  index
});

export const submitAssessment = (
  identifier,
  assessmentId,
  questions,
  answers,
  settings,
  outcomes) => ({
    type:Constants.ASSESSMENT_SUBMITTED,
    identifier, assessmentId, questions, answers, settings, outcomes
  });

export const nextQuestions = (pageSize = 1) => ({
  type: Constants.ASSESSMENT_NEXT_QUESTIONS,
  pageSize
});

export const previousQuestions = (pageSize = 1) => ({
  type: Constants.ASSESSMENT_PREVIOUS_QUESTIONS,
  pageSize
});

export const retakeAssessment = () => ({
  type: Constants.RETAKE_ASSESSMENT
});

export const assessmentViewed = (settings, assessment) => ({
  type: Constants.ASSESSMENT_VIEWED,
  settings,
  assessment
});

// { TODO andd functionality to component
//     var body = {
//       assessment_result : {
//         offline          : settings.offline,
//         assessment_id    : settings.assessment_id,
//         identifier       : assessment.id,
//         eId              : settings.eId,
//         external_user_id : settings.external_user_id,
//         external_context_id : settings.external_context_id,
//         resultsEndPoint  : settings.resultsEndPoint,
//         keywords         : settings.keywords,
//         objectives       : assessment.objectives,
//         src_url          : settings.src_url
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/assessment_results', body);
//   }



export const itemViewed = (body) => ({
  type: Constants.ASSESSMENT_VIEWED, //Two actions have the same type?
  body
});

// { TODO add functionality in component
//     var body = {
//       item_result : {
//         offline              : settings.offline,
//         assessment_result_id : assessment_result.id,
//         assessment_id        : settings.assessment_id,
//         identifier           : assessment.id,
//         eId                  : settings.eId,
//         external_user_id     : settings.external_user_id,
//         resultsEndPoint      : settings.resultsEndPoint,
//         keywords             : settings.keywords,
//         objectives           : assessment.objectives,
//         src_url              : settings.src_url
//       }
//     };
//     Api.post(Constants.ASSESSMENT_VIEWED, '/api/item_results', body);
//   }
