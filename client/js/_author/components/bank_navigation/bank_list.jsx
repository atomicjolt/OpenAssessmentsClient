import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import Spinner    from '../common/spinner';
import BankAssessment from './bank_assessment';
import BankFolder from './bank_folder';
import EmptyBankList from './empty_bank_list';

export default class BankList extends React.Component {
  static propTypes = {
    assessments: React.PropTypes.shape({}),
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    banksLoaded: React.PropTypes.bool.isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    sortName: React.PropTypes.string,
    sortPublished: React.PropTypes.string,
    deleteAssessment: React.PropTypes.func,
    togglePublishAssessment: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      focusedItem: null
    };
  }

  content() {
    const isEmpty = _.isEmpty(this.props.banks) && _.isEmpty(this.props.assessments);
    if (!this.props.banksLoaded) { return <Spinner />; }
    if (isEmpty) { return <EmptyBankList />; }
    return (
      <table className="au-c-table">
        <tbody>
          {
          _.map(this.props.banks, bank => (
            <BankFolder
              key={`bank_${bank.id}`}
              bank={bank}
              getBankChildren={this.props.getBankChildren}
              onFocus={(shouldFocus, item) => this.focusItem(shouldFocus, item)}
            />
          ))
          } {
            _.map(this.props.assessments, assessment => (
              <BankAssessment
                baseEmbedUrl={this.props.baseEmbedUrl}
                getEmbedCode={this.props.getEmbedCode}
                key={`bank_${assessment.id}`}
                bank={assessment}
                assessment={assessment}
                publishedBankId={this.props.publishedBankId}
                getBankChildren={this.props.getBankChildren}
                deleteAssessment={this.props.deleteAssessment}
                togglePublishAssessment={this.props.togglePublishAssessment}
                onFocus={(shouldFocus, item) => this.focusItem(shouldFocus, item)}
              />
            ))
          }
        </tbody>
      </table>
    );
  }


  focusItem(shouldFocus, item) {
    if (shouldFocus) {
      this.setState({ focusedItem: item });
    } else {
      this.setState({ focusedItem: null });
    }
  }

  render() {
    return (
      <div className="au-o-contain">
        <div className="au-o-item">
          <Header
            sortBy={this.props.sortBy}
            sortName={this.props.sortName}
            sortPublished={this.props.sortPublished}
          />
          <div className="au-c-scrollable">
            { this.content() }
          </div>
        </div>
      </div>
    );
  }
}
