import React            from 'react';
import _                from 'lodash';

import appHistory       from '../../history';
import ListItem         from './list_item';
import PublishButton    from './buttons/publish_button';
import EmbedButton      from './buttons/embed_button';
import EditButton       from './buttons/edit_button';
import DeleteButton     from './buttons/delete_button';
import PreviewButton    from './buttons/preview_button';
import DotLoader        from '../common/dot_loader';

export default class BankAssessment extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.shape({
      isPublished: React.PropTypes.bool.isRequired,
      bankId: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
    }).isRequired,
    togglePublishAssessment: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    deleteAssessment: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      deleting: false,
    };
  }

  deleteAssessment(...args) {
    this.setState({ deleting: true });
    this.props.deleteAssessment(...args);
  }

  selectItem() {
    const { assessment } = this.props;
    if (assessment.isPublished) {
      appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}/preview`);
      return;
    }
    appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}`);
  }

  render() {
    const { assessment, togglePublishAssessment } = this.props;
    const displayName = _.get(assessment, 'displayName.text');
    if (this.state.deleting) {
      return  (
        <ListItem
          {...this.props}
          selectItem={() => this.selectItem()}
          onFocus={this.props.onFocus}
        >
          <div className="au-deleting-assessment">
            <DotLoader />
          </div>
        </ListItem>
      );
    }
    // als;djkfha;lskdjf;laskdjf;laksdjfl;askjdf;lkasjdf;lkajsd;lfkjas;dlfkjas;ldkfja;lskdjf;alskdjf;laskdjf;laskdjfl;askdjf;laskdjf;laksjd
    return (
      <ListItem
        {...this.props}
        bank={this.props.assessment}
        selectItem={() => this.selectItem()}
        onFocus={this.props.onFocus}
      >
        <td>
          <i className="material-icons">description</i>
        </td>
        <td>{displayName}</td>
        <td>
          <PublishButton
            assessment={assessment}
            togglePublishAssessment={togglePublishAssessment}
            onFocus={this.props.onFocus}
          />
        </td>
        <td>
          <div className="au-c-table__icons">
            <EmbedButton {...this.props} />
            <EditButton {...this.props} />
            <PreviewButton {...this.props} />
            <DeleteButton
              {...this.props}
              deleteAssessment={(...args) => this.deleteAssessment(...args)}
            />
          </div>
        </td>
      </ListItem>
    );
  }
}
