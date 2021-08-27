import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration"
import FocusDuration from "./FocusDuration"
import BreakDuration from "./BreakDuration"
import TimerSessionDisplay from "./TimerSessionDisplay";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  // timeRemaining = secondsToDuration(timeRemaining)
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  // ToDo: Allow the user to adjust the focus and break duration.
  const defaultFocusDuration = 25
  const defaultBreakDuration = 5
  const [focusDuration, setFocusDuration] = useState(defaultFocusDuration); 
  const [breakDuration, setBreakDuration] = useState(defaultBreakDuration); 
  const [pause, setPause] = useState(true);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */

  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    //Switch the "pause" state variable when the playPause button is clicked 
    setPause(!pause)
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {            
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });        
      }
      return nextState;
    });
  }

  //Converting the time remainer to the mm:ss format
  const timeRemainingInMinutes = secondsToDuration(session?.timeRemaining);
  
  //Reset all state variables to the initial values of so the initial screen appears when the stop button is clicked 
  const stop = (event) => {
    event.preventDefault();
    setFocusDuration(defaultFocusDuration);
    setBreakDuration(defaultBreakDuration);
    setIsTimerRunning(false);
    setSession(null);
    setPause(true);  
  }
  
  //Create a holder variable and assign it to a boolean value when the session is running or not
  const activeSession = (() => session ? true : false )();

  const label = session?.label;

  //Create a holder variable for the progressing percentage
  let progressPercent = null;
  //Calculate the percentage of elapsed time of either "focusing" or "on break" and assign it to the "progressPercent" variable according to the label of the active session
  //Assign 0 to "progressPercent" if the session is inactive
  activeSession === true 
    ? label === "Focusing"
      ? progressPercent = (1 - session?.timeRemaining/(focusDuration*60))*100
      : progressPercent = (1 - session?.timeRemaining/(breakDuration*60))*100
    : progressPercent = 0;

  //Add a sound when time is expired
  if (progressPercent === 100)
    new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play()


  return (
    <div className="pomodoro">
      <div className="row" >
        <div className="col" >
           {/* Create FocusDuration component to adjust the duration of "focusing" and disable any buttons when the session is active*/}
            <FocusDuration  activeSession = {activeSession} 
                            focusDuration = {focusDuration} 
                            setFocusDuration = {setFocusDuration}/>
        </div>
        <div className="col">
          <div className="float-right">
            {/* Create BreakDuration component to adjust the duration of "on break" and disable any buttons when the session is active*/}
            <BreakDuration  activeSession = {activeSession} 
                            breakDuration = {breakDuration} 
                            setBreakDuration = {setBreakDuration} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
    type="button"
    className="btn btn-secondary"
    data-testid="stop"
    title="Stop the session"
    onClick = {stop}
    disabled = {!activeSession}
  >
    <span className="oi oi-media-stop" />
  </button>
          </div>
        </div>
      </div>
      <div>
         {/* Create the "TimerSessionDisplay" component to display the timer session when the session is active */}
        <TimerSessionDisplay  activeSession = {activeSession} 
                              pause = {pause} 
                              timeRemainingInMinutes ={timeRemainingInMinutes} 
                              focusDuration = {focusDuration} 
                              breakDuration = {breakDuration}  
                              label = {label} 
                              />
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow= {progressPercent} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressPercent}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
