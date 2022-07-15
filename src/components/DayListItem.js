import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': !props.spots});
  let spots = props.spots ? props.spots + ' spots remaining': 'no spots remaining';
  if (props.spots == 1){
    spots = spots.replace('spots', 'spot');
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}