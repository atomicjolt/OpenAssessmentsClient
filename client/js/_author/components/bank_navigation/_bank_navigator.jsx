import React                  from 'react';
import _                      from 'lodash';
import { connect }            from 'react-redux';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';
import Heading                from '../common/heading';
import BankList               from './bank_list';

function select(state) {
  const path = state.bankNavigation.location;
  const currentBankId = !_.isEmpty(path) ? _.last(path).id : null;
  let banks = state.banks;

  _.forEach(path, (folder) => {
    const currentBank = _.find(banks, { id: folder.id });
    banks = currentBank.childNodes;
  });

  return {
    path,
    currentBankId,
    banks: _.merge(state.assessments[currentBankId], banks),
  };
}

export class BankNavigator extends React.Component {
  static propTypes = {
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    path               : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    updatePath         : React.PropTypes.func.isRequired,
    getBanks           : React.PropTypes.func.isRequired,
    getAssessments     : React.PropTypes.func.isRequired,
    getItems           : React.PropTypes.func.isRequired,
    createAssessment   : React.PropTypes.func.isRequired,
    deleteAssessment   : React.PropTypes.func.isRequired,
    currentBankId      : React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      sortName      : null,
      sortPublished : null,
    };
  }

  componentWillMount() {
    this.props.getBanks();
  }

  getBankChildren(bank) {
    this.props.updatePath(bank.id, bank.displayName.text);
    this.props.getAssessments(bank.id);
    this.props.getItems(bank.id);
  }

  sortBy(type) {
    const sortVal = this.state[type];
    if (!sortVal) {
      this.setState({ [type]: 'asc' });
    } else if (sortVal === 'asc') {
      this.setState({ [type]: 'desc' });
    } else {
      this.setState({ [type]: null });
    }
  }

  sortBanks() {
    const { sortName, sortPublished } = this.state;
    if (!sortName && !sortPublished) { return this.props.banks; }

    let sortedBanks = this.props.banks;
    if (sortName) {
      sortedBanks = _.orderBy(sortedBanks, bank => bank.displayName.text, sortName);
    }
    if (sortPublished) {
      sortedBanks = _.orderBy(sortedBanks, bank => _.find(bank.assignedBankIds, { id: 'the publishedBankId' }), sortPublished);
    }

    return sortedBanks;
  }

  deleteAssessment(bankId, assessmentId) {
    this.props.deleteAssessment(bankId, assessmentId);
  }

  render() {
    return (
      <div>
        <Heading
          view="banks"
          path={this.props.path}
          createAssessment={this.props.createAssessment}
          currentBankId={this.props.currentBankId}
          updatePath={this.props.updatePath}
        />
        <BankList
          banks={this.sortBanks()}
          getBankChildren={bank => this.getBankChildren(bank)}
          sortBy={type => this.sortBy(type)}
          sortName={this.state.sortName}
          sortPublished={this.state.sortPublished}
          deleteAssessment={(bankId, assessmentId) => this.deleteAssessment(bankId, assessmentId)}
        />
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(BankNavigator);
