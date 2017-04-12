import React      from 'react';
import AddZone    from './add_zone_dropdown';
import localize   from '../../../../locales/localize';

export function targetMenu(props) {
  const strings = props.localizeStrings('targetMenu');

  return (
    <div className="au-o-item__top">
      <div className="au-o-left">
        <div className="au-c-question__type">{strings.targetImage}</div>
      </div>
      <div className="au-o-right">
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--gray"
          onClick={props.openModal}
        >
          {props.hasTarget ? strings.replace : strings.addImage}
        </button>
        <AddZone
          active={props.addType === 'snap'}
          text={strings.addSnap}
          toggle={() => props.toggleAdd('snap')}
          addByRegion={props.addByRegion}
          addByImage={props.openModal}
        />
        <AddZone
          active={props.addType === 'drop'}
          text={strings.addDrop}
          toggle={() => props.toggleAdd('drop')}
          addByRegion={props.addByRegion}
          addByImage={props.openModal}
        />
      </div>
    </div>
  );
}

targetMenu.propTypes = {
  localizeStrings: React.PropTypes.func.isRequired,
  openModal: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired,
  addByRegion: React.PropTypes.func.isRequired,
  hasTarget: React.PropTypes.bool,
  addType: React.PropTypes.string,
};

export default localize(targetMenu);
