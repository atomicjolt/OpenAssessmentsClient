import React    from 'react';
import _          from 'lodash';
import genusTypes from '../../../../constants/genus_types';
import Feedback from './question_common/single_feedback';

export default class AudioUpload extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object
  }

  static getAudioLimit(item) {
    const original = _.get(item, ['question', 'timeValue']);

    const time = _.mapValues(original, t => parseInt(t, 10));
    const seconds = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
    return seconds;
  }

  handleBlur(e) {
    this.props.updateItem({
      question:{
        genusTypeId: genusTypes.question.audioUpload,
        timeValue: {
          hours: 0,
          minutes: 0,
          seconds: parseInt(e.target.value, 10)
        }
      }
    });
  }

  static rangeWarning(){
    return (
      <span className="c-inline-error">Please enter a number under 240</span>
    );
  }

  render() {
    const audioLimit = AudioUpload.getAudioLimit(this.props.item);
    const warning = audioLimit >= 240 ? AudioUpload.rangeWarning() : null;
    return (
      <div>
        <div className="c-question__answers o-row" role="radiogroup">
          <div className="c-file-upload__audio-settings is-active">
            <span>Audio record limit</span>
            <div className="c-input c-input--inline">
              <label htmlFor="audio-limit" />
              <div className="c-input__contain">
                <input
                  className="c-text-input c-text-input--smaller"
                  id="audio-limit"
                  type="text"
                  maxLength="3"
                  defaultValue={audioLimit}
                  onBlur={e => this.handleBlur(e)}
                />
                <div className="c-input__bottom has-error" />
              </div>
            </div>
            <span>seconds. (240 maximum)</span>
            {warning}
          </div>
        </div>
        <Feedback
          item={this.props.item}
          updateItem={this.props.updateItem}
        />
      </div>
    );
  }
}
