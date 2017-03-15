import React from 'react';

export default function Option(props) {
  const activeClass = props.isActive ? 'is-active' : '';
  const { id } = props.choice;

  return (
    <div
      onFocus={props.selectChoice}
      onClick={props.selectChoice}
      className={`au-c-answer au-o-flex-center ${activeClass}`}
    >
      <div className="au-c-input">
        <label htmlFor="option1" />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
            id={id}
            type="text"
            defaultValue={props.choice.text}
            placeholder={`Option ${props.index + 1}`}
            onBlur={e => props.updateChoice({
              id: props.choice.id,
              text: e.target.value
            })}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
      <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
        <label htmlFor />
        <select name id>
          <option value>Verb</option>
          <option value>Adverb</option>
          <option value>Noun</option>
          <option value>Pronoun</option>
          <option value>Adjective</option>
          <option value>Preposition</option>
        </select>
      </div>
      <button className="au-c-answer--delete">
        <i className="material-icons">close</i>
      </button>
    </div>
  );

}

Option.propTypes = {
  selectChoice: React.PropTypes.func.isRequired,

};
