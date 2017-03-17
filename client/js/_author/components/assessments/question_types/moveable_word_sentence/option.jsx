import React    from 'react';
import _        from 'lodash';
import WordType from '../question_common/word_type_dropdown';

export default function option(props) {
  return (
    <div
      onFocus={props.selectChoice}
      onClick={props.selectChoice}
      className={`au-c-answer au-o-flex-center ${props.isActive ? 'is-active' : ''}`}
    >
      <div className={`au-c-dropdown au-c-dropdown--tiny au-u-mr-sm ${!_.isNil(props.order) ? 'is-ordered' : ''}`}>
        <label htmlFor={`option_order_${props.id}`} />
        <select
          name=""
          id={`option_order_${props.id}`}
          value={props.order}
          onChange={e => props.updateChoice({ order: e.target.value })}
        >
          <option value={null}>N/A</option>
          {
            _.map(_.range(0, props.itemCount), index => (
              <option value={index}>{index + 1}</option>
            ))
          }
        </select>
      </div>

      <div className="au-c-input">
        <label htmlFor={`option_text_${props.id}`} />
        <div className="au-c-input__contain">
          <input
            defaultValue={props.text}
            onBlur={e => props.updateChoice({ text: e.target.value })}
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
            id={`option_text_${props.id}`}
            type="text"
            placeholder="New Option"
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>

      <WordType
        id={props.id}
        wordType={props.wordType}
        updateChoice={props.updateChoice}
      />

      <button className="au-c-answer--delete">
        <i className="material-icons">close</i>
      </button>
    </div>
  );
}

option.propTypes = {
  id: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  wordType: React.PropTypes.string,
  order: React.PropTypes.number,
  itemCount: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool,
  selectChoice: React.PropTypes.func.isRequired,
  updateChoice: React.PropTypes.func.isRequired,
};
