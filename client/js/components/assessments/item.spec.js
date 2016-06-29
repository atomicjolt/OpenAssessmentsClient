import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Item               from './item';

describe('item', function() {

  var question = {
    title:"Test Question Title"
  };
  var checkedResponse = {};
  var currentItemIndex = 0;
  var assessment = {};
  var questionCount = 10;

  var result;
  var subject;

  var renderItem = () => {
    result = TestUtils.renderIntoDocument(<Item
      question={question}
      checkedResponse={checkedResponse}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
    />);
    subject = ReactDOM.findDOMNode(result);
  };

  // Reset variables to default and render an item
  beforeEach(() => {
    question = {
      title:"Test Question Title"
    };
    currentItemIndex = 0;
    assessment = {};
    questionCount = 10;

    renderItem();
  });



  it('renders an item', () => {
    expect(subject.textContent).toContain("Test Question Title");
  });

  describe('feedback', () => {
    it('renders correct when item is correct', () => {
      checkedResponse = {correct:true, feedback:'Correct answer'};
      renderItem();

      expect(subject.textContent).toContain("Correct");
      expect(subject.textContent).toContain("Correct answer");
      expect(subject.textContent).not.toContain("Incorrect");
      expect(subject.textContent).not.toContain("Incorrect answer");
    });

    it('renders incorrect when item is incorrect', () => {
      checkedResponse = {correct:false, feedback:'Incorrect answer'};
      renderItem();

      expect(subject.textContent).toContain("Incorrect");
      expect(subject.textContent).toContain("Incorrect answer");
      expect(subject.textContent).not.toContain("Correct");
      expect(subject.textContent).not.toContain("Correct answer");

    });

    it('renders without feedback when item is unchecked', () => {
      checkedResponse = {};
      renderItem();

      expect(subject.textContent).not.toContain("Incorrect");
      expect(subject.textContent).not.toContain("incorrect answer");
      expect(subject.textContent).not.toContain("Correct");
      expect(subject.textContent).not.toContain("Correct answer");
    });
  });

});
