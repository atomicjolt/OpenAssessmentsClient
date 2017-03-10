import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';
import genusTypes     from '../../../../constants/genus_types';
import guid           from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes) {
  let inlineRegionId = _.get(_.values(originalChoices), '[0].blankId', guid());

  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order: _.get(updateValues, 'order') || choice.order,
      delete: _.get(updateValues, 'delete'),
    };
  });

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: '',
      order: choices.length,
    });
  }

  return { [inlineRegionId]: { choices } };
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.inlineRegions = serializeChoices(
      originalQuestion.choices,
      newQuestionAttributes.choices
    );
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, newChoiceAttributes, oldAnswers, correctFeedback, incorrectFeedback) {
  const answers = [];
  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
    fileIds: _.get(correctFeedback, 'fileIds'),
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
    fileIds: _.get(incorrectFeedback, 'fileIds'),
  };

  _.forEach(originalChoices, (choice) => {
    const newCorrectness = _.get(newChoiceAttributes, `[${choice.id}].isCorrect`);
    if (!_.isNil(newCorrectness)) {
      if (newCorrectness) {
        correctAnswer.choiceIds.push(choice.id);
      } else { incorrectAnswer.choiceIds.push(choice.id); }
    } else if (choice.isCorrect) {
      correctAnswer.choiceIds.push(choice.id);
    } else {
      incorrectAnswer.choiceIds.push(choice.id);
    }
  });

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };
    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.choices,
        _.get(originalItem, 'originalItem.answers'),
        _.get(question, 'correctFeedback'),
        _.get(question, 'incorrectFeedback')
      );
    }
  }

  return scrub(newItem);
}
