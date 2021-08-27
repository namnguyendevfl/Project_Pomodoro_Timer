import React from "react"
import PauseDisplay from "./PauseDisplay"
import { minutesToDuration } from "../utils/duration";

function TimerSessionDisplay (props) {
{/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}           

  //Create a holder variable, then assign it to either the props.focusDuration or props.breakDuration depending on the props.label
  let duration = null;

  props.label === "Focusing"
  ? duration = props.focusDuration
  : duration = props.breakDuration;

  //Converting the duration to the mm:ss format
  duration = minutesToDuration(duration);

  //Display the timer if the session is active
  return props.activeSession === null && <div className="row mb-2">
      <div className="col">
      {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}    
      <h2 data-testid="session-title">
        {props.label} for {duration} minutes
      </h2>
      {/* TODO: Update message below correctly format the time remaining in the current session */}    
      <p className="lead" data-testid="session-sub-title">
        {props.timeRemainingInMinutes} remaining
      </p>
      {/* Create the PauseDisplay component to display "PAUSED" when the pause button is clicked */}    
      <PauseDisplay pause = {props.pause } />
    </div>
  </div>
}

export default TimerSessionDisplay