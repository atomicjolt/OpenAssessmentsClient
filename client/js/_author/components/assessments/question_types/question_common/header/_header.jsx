import React            from 'react';
import _                from 'lodash';
import DefaultHeader    from './default';
import ReorderHeader    from './reorder';
import PreviewHeader    from './preview';
import localize         from '../../../../../locales/localize';

function questionHeader(props) {
  const strings = props.localizeStrings();
  // i think typeName is already localized by the time it gets here.
  const typeName = _.words(_.upperFirst(props.type)).join(' ');

  let currentHeader = <DefaultHeader {...props} />;
  if (props.reorderActive) {
    currentHeader =  <ReorderHeader {...props} />;
  }
  if (props.preview) {
    currentHeader =  <PreviewHeader {...props} />;
  }

  return (
    <div className="au-o-item__top">
      <div className="au-o-left">
        <h3 className="au-c-question__number">{strings.question} {props.index + 1}</h3>
        <div className="au-c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; {typeName}</div>
      </div>
      { currentHeader }
    </div>
  );
}

questionHeader.propTypes = {
  reorderActive: React.PropTypes.bool,
  type: React.PropTypes.string,
  index: React.PropTypes.number,
  preview: React.PropTypes.bool,
  localizeStrings: React.PropTypes.func.isRequired
};

export default localize(questionHeader);
