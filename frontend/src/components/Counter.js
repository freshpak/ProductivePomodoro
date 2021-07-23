import React from 'react';

class Counter extends React.Component {
	render() {
		return (
		  <section>
			<section className="counter-container">
		      <h3>Completed Focus Sessions</h3>
		        <span className="counter">{this.props.count}</span>
		    </section>
		    <section className="counter-actions">
		      <button
		      	className="custom-button"
		    	onClick={this.props.resetCounter}
		      >
		    	Reset Count
		      </button>
		    </section>
		    <hr className="section-divider"></hr>
	      </section>
		);
	}
};


export default Counter;
