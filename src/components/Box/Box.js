import React, {Component} from 'react';

class Box extends Component {
  render() {

    const clickHandler = () => {
      this.props.toggle(this.props.position);
    }

    return(
      <div className={`
      hover:bg-yellow-400 
      cursor-pointer
      border-0
      border-solid 
      ${this.props.active}`} 
      onClick={clickHandler}>
      </div>
    )
  }
}

export default Box;
// 'bg-blue-400'