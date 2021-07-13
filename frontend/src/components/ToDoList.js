import React from 'react';

class ToDoList extends React.Component {
	render() {
		return (
			<section className="container">
			  <h1 className="text-black text-uppercase text-center my-4">ToDo List</h1>
			  <div className="row">
			    <div className="col-md-6 col-sm-10 mx-auto p-0">
			      <div className="card p-3"> 
			        <div className="mb-4">
			          <button
			            className="btn btn-primary"
			            onClick={this.props.createItem}
			          >
			            Add task
			          </button>
			        </div>
			        {this.props.renderTabList()}
			        <ul className="list-group list-group-flush border-top-0">
			          {this.props.renderItems()}
			        </ul>
			      </div>
			    </div>
			  </div>
			</section>
		);
	}
}

export default ToDoList;