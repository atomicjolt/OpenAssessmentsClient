import _                from 'lodash';
import genusTypes       from '../../../../constants/genus_types';
import { scrub }        from '../../serializer_utils';
import { languages, getLanguage } from '../../../../constants/language_types';

function serializeQuestionString(originalItem, item) {
  const simpleLanguage = getLanguage(item.language);
  // create
  // debugger
  // TODO: Maybe default create in english..
  let text = _.get(item, 'question.text', '');
  if (!_.isEmpty(originalItem.question) && _.isEmpty(text)) {
    text = originalItem.question.text;
  }
  item.question = {
    text,
    languageTypeId: item.language,
    formatTypeId: languages.formatTypeId,
    scriptTypeId: languages.scriptTypeId[simpleLanguage]
  };
  return item.question;
}

export function baseSerializeQuestion(originalItem, newAttributes, item) {
  return {
    id: _.get(originalItem, 'question.id'),
    genusTypeId: genusTypes.question[_.get(newAttributes, 'type') || originalItem.type],
    questionString: serializeQuestionString(originalItem, item),
    fileIds: newAttributes.fileIds
  };
}

export function baseSerializeItem(originalItem, newAttributes) {
  const newItem = {
    id: originalItem.id,
    genusTypeId: genusTypes.item[_.get(newAttributes, 'type') || originalItem.type],
    name: _.get(newAttributes, 'name', originalItem.name),
    question: scrub(
      baseSerializeQuestion(originalItem, _.get(newAttributes, 'question', {}), newAttributes)
    ),
    answers: null,
  };
  return newItem;
}

export function baseItem(originalItem, newAttributes) {
  return scrub(baseSerializeItem(originalItem, newAttributes));
}

export default baseSerializeItem;
