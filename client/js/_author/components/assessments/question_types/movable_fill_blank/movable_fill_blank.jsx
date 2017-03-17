import React          from 'react';
import _              from 'lodash';
import Option         from './option';
import Add            from '../question_common/add_option';
import Feedback       from '../question_common/single_feedback';

export default class MovableFillBlank extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      bankId: React.PropTypes.string,
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      multipleAnswer: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    selectChoice: React.PropTypes.func.isRequired,
    deleteChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
    activeChoice: React.PropTypes.string,
  };

  render() {
    const { question, id } = this.props.item;
    return (
      <div className="au-c-question__answers au-c-fill-in-the-blank__answers">
        <div className="au-no-outline" onBlur={e => this.props.blurOptions(e)} tabIndex="-1">
          {
            _.map(_.orderBy(question.choices, 'order'), choice => (
              <Option
                key={`assessmentChoice_${choice.id}`}
                {...choice}
                updateChoice={newChoice => this.props.updateChoice(id, choice.id, newChoice)}
                deleteChoice={() => this.props.deleteChoice(choice)}
                setActiveChoice={this.props.selectChoice}
                isActive={this.props.isActive && choice.id === this.props.activeChoice}
              />
            ))
          }
          {
            this.props.isActive ? <Add
              createChoice={() => this.props.createChoice(id)}
            /> : null
          }
        </div>
        <div className="au-c-question__feedback">
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="correctFeedback"
            feedback={question.correctFeedback}
            labelText="Correct Feedback"
            bankId={this.props.item.bankId}
          />
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="incorrectFeedback"
            feedback={question.incorrectFeedback}
            labelText="Incorrect Feedback"
            bankId={this.props.item.bankId}
          />
        </div>
      </div>
    );
  }
}
