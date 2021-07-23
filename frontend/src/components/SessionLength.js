import React from 'react';

function SessionLength(props) {
	function increaseSession() {
		if (props.sessionLength === 180) {
			return;
		}
		props.increaseSession();
	}

	function decreaseSession() {
		if (props.sessionLength === 1) {
			return;
		}
		props.decreaseSession();
	}

	return (
		<section>
		  <h4>Session Length</h4>
		  <section className="interval-container">
			<button 
				className="custom-button"
				disabled={props.isPlay === true ? "disabled" : ""}  
				onClick={decreaseSession}
			>
				Down
			</button>
			<p className="interval-length">{props.sessionLength}</p>
			<button 
				className="custom-button"
				disabled={props.isPlay === true ? "disabled" : ""}  
				onClick={increaseSession}
			>
				Up
			</button>
		  </section>
		</section>
		
	);
}

export default SessionLength;