import React from "react"

function PauseDisplay ({pause}) {
return pause  && <div disabled = {pause}><h2>PAUSED</h2></div>
}
export default PauseDisplay