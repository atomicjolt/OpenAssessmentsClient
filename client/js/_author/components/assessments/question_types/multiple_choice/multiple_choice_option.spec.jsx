import React        from 'react';
import { shallow }  from 'enzyme';
import OeaEditor    from '../../../common/oea_editor';
import Option       from './multiple_choice_option';

describe('Multiple Choice Option', () => {
  let result;
  let props;
  let updatedChoice = {};
  let moveChoice = '';

  beforeEach(() => {
    props = {
      isCorrect: true,
      key: 'assessmentChoice_1',
      updateChoice: (attr) => { updatedChoice = attr; },
      text: 'This is dummy text',
      deleteChoice: (e) => { moveChoice = e.target.innerText; },
      shuffle: false,
      moveUp: (e) => { moveChoice = e.target.innerText; },
      moveDown: (e) => { moveChoice = e.target.innerText; },
      isActive: true,
      itemType: '',
      bankId: '',
    };
    result = shallow(<Option {...props} />);
  });

  it('checks defaultValue of question text', () => {
    expect(result.find(OeaEditor).nodes[0].props.text).toBe('This is dummy text');
  });

  it('blurring the quesiton text calls updateChoice', () => {
    const inputs = result.find(OeaEditor);
    inputs.at(0).props().onBlur('lasers are neat');
    expect(updatedChoice.text).toBe('lasers are neat');
  });

  it('isActive??', () => {
    let div = result.find('.au-c-answer');
    expect(div.props().className).toContain('is-active');

    props.isActive = false;
    result = shallow(<Option {...props} />);
    div = result.find('.au-c-answer');
    expect(div.props().className).not.toContain('is-active');
  });
});
