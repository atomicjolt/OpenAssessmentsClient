import React           from 'react';
import _               from 'lodash';
import AssessmentItems from './assessment_items';
import NewItem         from './new_item_form';
import AddQuestion     from './add_question_button';

export default class AssessmentForm extends React.Component {
  static propTypes = {
    items: React.PropTypes.oneOfType(
      [React.PropTypes.shape({}), React.PropTypes.arrayOf(React.PropTypes.shape({}))]
    ),
    name: React.PropTypes.string,
    updateAssessment: React.PropTypes.func.isRequired,
    updateItemOrder: React.PropTypes.func,
    publishedAndOffered: React.PropTypes.bool,
    createItem: React.PropTypes.func,
    updateItem: React.PropTypes.func,
    updateSingleItemOrPage: React.PropTypes.func,
    updateChoice: React.PropTypes.func,
    deleteAssessmentItem: React.PropTypes.func,
    createChoice: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingItem: false,
      activeItem: '',
      reorderActive: false,
      title: 'start'
    };
  }
  componentWillUpdate(nextProps) {
    if (this.props.items && this.props.items.length + 1 === nextProps.items.length) {
      this.setState({ activeItem: _.last(nextProps.items).id });
    }
  }

  createItem(newItem) {
    this.props.createItem(newItem);
    this.setState({ addingItem: false });
  }

  showNewModal() {
    return this.props.name && (this.state.addingItem || _.isEmpty(this.props.items));
  }

  activateItem(itemId) {
    if (itemId !== this.state.activeItem && !this.state.reorderActive) {
      this.setState({ activeItem: itemId, reorderActive: false });
    }
  }

  moveItem(oldIndex, newIndex) {
    const itemIds = _.map(this.props.items, 'id');
    const temp = itemIds[newIndex];
    itemIds[newIndex] = itemIds[oldIndex];
    itemIds[oldIndex] = temp;
    this.props.updateItemOrder(itemIds);
  }

  showSinglePageOption() {
    if (this.props.publishedAndOffered) {
      return (
        <div className="au-o-item__top">
          <div className="au-c-checkbox au-u-right">
            <input type="checkbox" id="assessmentFormCheck01" name="check" onChange={e => this.props.updateSingleItemOrPage(e.target.checked)} />
            <label htmlFor="assessmentFormCheck01">Single page assessment</label>
          </div>
        </div>
      );
    }
    return null;
  }

  newItem() {
    return (
      <NewItem
        cancel={() => this.setState({ addingItem: false })}
        create={newItem => this.createItem(newItem)}
      />
    );
  }

  updateAssessment(e) {
    if (e.target.value) {
      this.props.updateAssessment({ name: e.target.value });
    }
  }

  render() {
    const reorderActive = this.state.reorderActive;
    const canAddItem = !this.state.addingItem && this.props.name;

    return (
      <div className="au-o-contain">
        <div className="au-o-item">
          {this.showSinglePageOption()}
          <div className="au-c-assessment-title">
            <label htmlFor="title_field" className="au-c-input test_label">
              <div className="au-c-input__contain">
                <input
                  key={this.props.name}
                  defaultValue={this.props.name}
                  className="au-c-text-input au-c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder="Untitled Assessment"
                  onChange={e => this.setState({ title: e.target.value })}
                  onBlur={e => this.updateAssessment(e)}
                />
                { _.isEmpty(this.state.title) ?
                  <div>
                    <div className="au-c-input__bottom has-error" />
                    <div className="au-c-error-text">Name is required in order to edit</div>
                  </div> :
                  <div className="au-c-input__bottom" />
                }
              </div>
            </label>
          </div>
        </div>
        { this.props.name ?
          <AssessmentItems
            items={this.props.items}
            activeItem={this.state.activeItem}
            reorderActive={reorderActive}
            activateItem={itemId => this.activateItem(itemId)}
            toggleReorder={() => this.setState({ reorderActive: !reorderActive })}
            updateItem={this.props.updateItem}
            updateChoice={this.props.updateChoice}
            deleteAssessmentItem={this.props.deleteAssessmentItem}
            moveItem={(oldIndex, newIndex) => this.moveItem(oldIndex, newIndex)}
            createChoice={this.props.createChoice}
          /> : null
        }
        {this.showNewModal() ? this.newItem() : null }
        {canAddItem ? <AddQuestion newItem={() => this.setState({ addingItem: true })} /> : null}
      </div>
    );
  }
}
