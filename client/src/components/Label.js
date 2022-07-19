import React from 'react';

export default class Label extends React.Component {
	render() {
		return <h2>{this.props.name}</h2>;
	}
}
