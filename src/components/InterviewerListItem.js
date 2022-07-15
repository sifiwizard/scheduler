import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected});
  let name = props.selected ? props.name : '';
  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {name}
    </li>
  );
}