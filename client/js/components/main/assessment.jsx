"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import AssessmentActions                      from "../../actions/assessment";
import appHistory                             from "../../history";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import { questionCount, questions, outcomes } from "../../selectors/assessment";

export const select = (state, props) => {
  return {
    settings             : state.settings,
    assessment           : state.assessment,
    isStarted            : state.progress.istarted,
    isSubmitted          : state.progress.isSubmitted,
    question             : state.progress.currentQuestion,
    currentItemIndex     : state.progress.currentItemIndex,
    assessmentResult     : state.progress.assessmentResult,
    messageIndex         : state.progress.answerMessageIndex,
    studentAnswers       : state.progress.allStudentAnswers,
    questionCount        : questionCount(state, props),
    allQuestions         : questions(state, props),
    outcomes             : outcomes(state, props)
  };
};

export class Assessment extends React.Component{

  componentWillMount(){
    if(this.props.assessmentResult != null){
      appHistory.push("assessment-result");
    }
  }

  componentDidMount(){
    // Trigger action to indicate the assessment was viewed
    this.props.assessmentViewed(this.props.settings, this.props.assessment);
  }

  popup(){
    return "Don’t leave!\n If you leave now your quiz won't be scored, but it will still count as an attempt.\n\n If you want to skip a question or return to a previous question, stay on this quiz and then use the \"Progress\" drop-down menu";
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  // getStyles(){
  //   const theme = this.props.theme;
  //   var minWidth = this.props.settings.assessment_type && this.props.settings.assessment_type.toUpperCase() == "FORMATIVE" ? "480px" : "635px";
  //
  //   return {
  //     progressBar: {
  //       backgroundColor: theme.progressBarColor,
  //       height: theme.progressBarHeight,
  //     },
  //     progressDiv: {
  //       height: theme.progressBarHeight
  //     },
  //     assessment: {
  //       padding: this.props.settings.assessment_type.toUpperCase() == "FORMATIVE" ? "" : theme.assessmentPadding,
  //       backgroundColor: theme.assessmentBackground,
  //       minWidth: minWidth
  //     },
  //     progressContainer: {
  //       padding: "10px 20px 10px 20px",
  //       position: "absolute",
  //       left: "0px",
  //       top: "44px",
  //       width: "100%",
  //       minWidth: minWidth,
  //       backgroundColor: theme.titleBarBackgroundColor,
  //     },
  //     titleBar: {
  //       position: "absolute",
  //       top: "0px",
  //       left: "0px",
  //       width: "100%",
  //       padding: "10px 20px 10px 20px",
  //       backgroundColor: theme.primaryBackgroundColor,
  //       color: "white",
  //       fontSize: "130%",
  //       minWidth: minWidth,
  //       //fontWeight: "bold"
  //     }
  //   };
  // }

  render(){
    window.onbeforeunload = this.popup;
    // // if(AssessmentStore.assessmentResult() != null || this.props.settings.assessment_type.toUpperCase() != "SUMMATIVE"){
    //   // window.onbeforeunload = null;
    // // }

    var showStart = this.props.settings.enable_start && !this.props.assessment.isStarted;
    // var styles = this.getStyles();
    var content;
    var progressBar;
    var titleBar;

    if(!this.props.ed || this.props.isSubmitted){
      content = <Loading />;
    } else if(showStart){

      content = <CheckUnderstanding
        title           = {this.props.assessment.title}
        name            = {this.props.question.name}
        maxAttempts     = {this.props.settings.allowed_attempts}
        userAttempts    = {this.props.settings.user_attempts}
        eid             = {this.props.settings.lis_user_id}
        isLti           = {this.props.settings.is_lti}
        assessmentId    = {this.props.assessment.assessment_id}
        assessmentKind  = {this.props.settings.assessment_type}
        primaryOutcome  = {this.props.outcomes[0]}
        ltiRole         = {this.props.settings.lti_role}
        icon            = {this.props.settings.images.quiz_icon_svg}/>;

      //TODO progress bar sytles
      progressBar = <div>
                    {/*<div style={ styles.progressContainer}>*/}
                      {progressText}
                      <ProgressDropdown disabled={true} questions={this.props.allQuestions} currentQuestion={this.props.currentItemIndex + 1} questionCount={this.props.questionCount} />
                    </div>;

    } else {
      content = <Item
        question         = {this.props.question}
        assessment       = {this.props.assessment}
        currentItemIndex = {this.props.currentItemIndex}
        settings         = {this.props.settings}
        questionCount    = {this.props.questionCount}
        assessmentResult = {this.props.assessmentResult}
        messageIndex     = {this.props.messageIndex}
        allQuestions     = {this.props.allQuestions}
        studentAnswers   = {this.props.studentAnswers}
        confidenceLevels = {this.props.settings.confidence_levels}
        outcomes         = {this.props.outcomes}/>;

      //TODO progress bar styles
      progressBar = <div>
                      {progressText}
                      <ProgressDropdown settings={this.props.settings} questions={this.props.allQuestions} currentQuestion={this.props.currentItemIndex + 1} questionCount={this.props.questionCount} />
                    </div>;
    // // TODO figure out when to mark an item as viewed. assessmentResult must be valid before this call is made.
    //   // AssessmentActions.itemViewed(this.props.settings, this.props.assessment, this.props.assessmentResult);
    }

    var percentCompleted = this.checkProgress(this.props.currentItemIndex, this.props.questionCount);
    var progressStyle = {width:percentCompleted+"%"};
    var progressText = "";
    var quizType = this.props.settings.assessment_type.toUpperCase() === "SUMMATIVE" ? "Quiz" : "Show What You Know";
    var titleBar = this.props.settings.assessment_type.toUpperCase() === "FORMATIVE" ? "" : <div>{/*<div style={styles.titleBar}>*/}{this.props.assessment ? this.props.assessment.title : ""}</div>;
    if(this.props.assessment){
      progressText = this.props.settings.shouldShowProgressText ? <div><b>{this.props.assessment.title + " Progress"}</b>{" - You are on question " + (this.props.currentItemIndex + 1) + " of " + this.props.questionCount}</div> : "";
    }
    progressBar = this.props.settings.assessment_type.toUpperCase() === "FORMATIVE" ? "" : progressBar;
    return<div className="assessment" style={{ /*styles.assessment */}}>
      {titleBar}
      {progressBar}
      <div className="section_list">
        <div className="section_container">
          {content}
        </div>
      </div>
    </div>;
  }

}

export default connect(select, {...AssessmentActions}, null, {withRef: true})(Assessment);
