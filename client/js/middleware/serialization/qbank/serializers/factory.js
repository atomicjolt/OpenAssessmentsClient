import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';
import survey           from './reflection';
import multipleAnswer   from './multiple_answer';
import fileUpload       from './file_upload';
import dragAndDrop      from './drag_and_drop';
import types            from '../../../../constants/question_types.js';

export default function factory(type) {
  switch (type) {
    case types.multipleChoice:
      return multipleChoice;

    case types.shortAnswer:
      return shortAnswer;

    case types.audioUpload:
      return audioUpload;

    case types.reflection:
    case types.multipleReflection:
      return survey;

    case types.multipleAnswer:
      return multipleAnswer;

    case types.fileUpload:
      return fileUpload;

    case types.dragAndDrop:
      return dragAndDrop;

    default:
      throw 'We could not find a type for serializing';
  }
}
