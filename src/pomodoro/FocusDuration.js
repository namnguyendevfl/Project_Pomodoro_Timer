import React from "react"
import { minutesToDuration } from "../utils/duration";

function FocusDuration ( {activeSession, focusDuration, setFocusDuration}) {

  //Create event handlers for the incrementing and decrementing buttons and update the state variable focusDuration
  const handleIncrease = () => setFocusDuration(Math.min(60,focusDuration + 5));
  const handleDecrease = () => setFocusDuration(Math.max(5,focusDuration - 5));

  //Connverting the duration to the mm:ss format
  const durationInMinute = minutesToDuration(focusDuration);

  return <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
      {/* TODO: Update this text to display the current focus session duration */}
        Focus Duration: {durationInMinute}
      </span>
      <div className="input-group-append">
      {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button onClick ={handleDecrease} 
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            disabled = {activeSession}
              >
          <span className="oi oi-minus" />
        </button>
      {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button onClick ={handleIncrease}
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            disabled = {activeSession}
            >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
}

export default FocusDuration