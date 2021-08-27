import React from "react"
import { minutesToDuration } from "../utils/duration";

function BreakDuration({breakDuration, setBreakDuration, activeSession}) {

  //Create event handlers for the incrementing and decrementing buttons and update the state variable breakDuration
  const handleIncrease = () => setBreakDuration(Math.min(15,breakDuration + 1));
  const handleDecrease = () => setBreakDuration(Math.max(1,breakDuration- 1));

  //Connverting the duration to the mm:ss format
  const durationInMinutes = minutesToDuration(breakDuration);

  return <div className="input-group input-group-lg mb-2">
    <span className="input-group-text" data-testid="duration-break">
    {/* TODO: Update this text to display the current break session duration */}
      Break Duration: {durationInMinutes}
    </span>
    <div className="input-group-append">
      {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
      <button
        type="button" onClick ={handleDecrease}
        className="btn btn-secondary"
        data-testid="decrease-break"
        disabled = {activeSession}
                >
        <span className="oi oi-minus" />
      </button>
      {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
      <button
        type="button" onClick ={handleIncrease}
        className="btn btn-secondary"
        data-testid="increase-break"
        disabled = {activeSession}
                >
        <span className="oi oi-plus" />
      </button>
    </div>
  </div>
}

export default BreakDuration