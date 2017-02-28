import React      from 'react';
import Editor     from '../../../common/oea_editor';

export default class questionText extends React.Component {
  render() {
    return (
      <div className="c-input c-question-text">
        <label htmlFor={`question_text_${this.props.id}`} />
        <div className="c-input__contain">
          <Editor
            text={this.props.text}
            onBlur={val => this.props.updateItem({ question: { text: val } })}
            bankId={this.props.bankId}
            id={this.props.id}
          />
          <div className="c-input__bottom" />
        </div>
      </div>
    );
  }
}

questionText.propTypes = {
  id: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
};
