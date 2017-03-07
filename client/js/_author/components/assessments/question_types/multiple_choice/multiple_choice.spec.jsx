import React            from 'react';
import { shallow }      from 'enzyme';
import MultipleChoice   from './multiple_choice';

describe('multiple choice component', () => {
  let props;
  let result;
  let choiceUpdated;

  beforeEach(() => {
    choiceUpdated = false;
    props = {
      item: {
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        type: '',
        index: 1,
        question: {
          shuffle: true,
          choices: {
            '15': {
              id: '15',
              order: 0,
              isCorrect: false,
            },
            'bob': {
              id: 'bob',
              order: 1,
              isCorrect: false,
            },
            'taco': {
              id: 'taco',
              order: 2,
              isCorrect: false,
            },
          },
        },
        answers: [{}],
      },
      updateItem: () => { choiceUpdated = true; },
      updateChoice: () => { choiceUpdated = true; },
      isActive: false,
    };
    result = shallow(<MultipleChoice {...props} />);
  });

  it('renders', () => {
    const divs = result.find('.author--c-question__answers--maintain');
    expect(divs.length).toBe(1);
  });

  it('calls updateChoice', () => {
    expect(choiceUpdated).toBeFalsy();
    result.instance().addNewChoice(props.item.id);
    expect(choiceUpdated).toBeTruthy();
  });

  it('the props.updateChoice function', () => {
    expect(choiceUpdated).toBeFalsy();
    result.instance().moveChoice(props.item.question.choices['bob']);
    expect(choiceUpdated).toBeTruthy();
  });
});