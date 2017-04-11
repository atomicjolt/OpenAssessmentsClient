import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { shallow, mount }       from 'enzyme';
import renderer                 from 'react-test-renderer';
import DragArea                 from './drag_area';
import DropObject               from './drop_object';

jest.mock('../../../../../libs/assets.js');

describe('drag area component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      dropObjects: {
        object: {
          id: '7',
        },
      },
      zones: {},
      images: {},
      uploadMedia: () => {},
      updateDropObject: () => {},
      loadingMedia: false,
    };
    result = shallow(<DragArea {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('sets state via setActive attr in DropObject', () => {
    const nonShallow = mount(<DragArea {...props} />);
    expect(nonShallow.instance().state.activeObject).toBe(null);
    const button = nonShallow.find('.au-set-active');
    button.simulate('click');
    expect(nonShallow.instance().state.activeObject).toBe('7');
  });

  it('sets state via show modal button', () => {
    expect(result.instance().state.showModal).toBeFalsy();
    const button = result.find('button');
    button.simulate('click');
    expect(result.instance().state.showModal).toBeTruthy();
  });
});
