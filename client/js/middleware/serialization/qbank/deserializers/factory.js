import audioUpload      from './audio_upload';
import base             from './base';
import fileUpload       from './file_upload';
import genusTypes       from '../../../../constants/genus_types';
import movableFillBlank from './movable_fill_blank';
import moveableWordSandbox from './moveable_words_sandbox';
import multipleAnswer   from './multiple_answer';
import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import wordSentence     from './moveable_word_sentence';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
      return multipleChoice;

    case genusTypes.item.multipleAnswer:
    case genusTypes.item.reflection:
    case genusTypes.item.multipleReflection:
      return multipleAnswer;

    case genusTypes.item.audioUpload:
      return audioUpload;

    case genusTypes.item.shortAnswer:
      return shortAnswer;

    case genusTypes.item.fileUpload:
      return fileUpload;

    case genusTypes.item.movableFillBlank:
      return movableFillBlank;

    case genusTypes.item.moveableWordSandbox:
      return moveableWordSandbox;

    case genusTypes.item.moveableWordSentence:
      return wordSentence;

    default:
      return base;
  }
}
