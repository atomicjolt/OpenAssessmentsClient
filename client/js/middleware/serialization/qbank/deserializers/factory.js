import audioUpload      from './audio_upload';
import multipleChoice   from './multiple_choice';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
    case genusTypes.item.reflection:
    case genusTypes.item.multipleReflection:
      return multipleChoice;

    case genusTypes.item.audioUpload:
      return audioUpload;

    default:
      throw `invalid type: ${type}`;
  }
}
