import React, {Component} from 'react';
import Box from '../Box/Box'
import './BoxGame.css'

class BoxGame extends Component {
  static defaultProps = {
    boardSize: 25
  }

  state = {
    boxStates: Array(this.props.boardSize).fill(false),
    buttonVisible: true,
    isWinner: false
  }

  winGame() {
    let ifTrue = (this.state.boxStates.every(boxState => boxState === false));
    return(ifTrue);
  }
  
  componentDidMount() {
    let a = [];
    for (let i=1; i <= this.props.boardSize; i++) {
      a.push(i);
    };
    let n;
    let ranFive=[];
    for (n=1; n<=5; n++) {
      let i = Math.floor((Math.random() * (this.props.boardSize-n)) + 1);
      ranFive.push(a[i]);
      a[i] = a[this.props.boardSize-n];
    }

    let randomBoxStates = this.state.boxStates.slice();
    for (let j=0; j<ranFive.length; j++) {
      randomBoxStates[ranFive[j]-1] = true
    }
    this.setState({boxStates: randomBoxStates, buttonVisible: false});
  }

  render() {

    let boardSizeArray = [];
    for (let i=1; i <= this.props.boardSize; i++) {
      boardSizeArray.push(i);
    };

    // const winGame = () => {
    //   this.state.boxStates.every(boxState => boxState === false) ? this.setState({isWinner: true}) : this.setState({isWinner: false});
    // }

    const toggleHandler = (p) => {
      let newBoxStates = this.state.boxStates.slice();
      let boxPosition = p-1;
      newBoxStates[boxPosition] ? newBoxStates[boxPosition]= false : newBoxStates[boxPosition]= true;
      if(boxPosition % 5 !== 0 ) {
        newBoxStates[boxPosition-1] ? newBoxStates[boxPosition-1]= false : newBoxStates[boxPosition-1]= true;
      }
      if(p % 5 !== 0) {
        newBoxStates[boxPosition+1] ? newBoxStates[boxPosition+1]= false : newBoxStates[boxPosition+1]= true;
      }
      if(p > 5) {
        newBoxStates[boxPosition-5] ? newBoxStates[boxPosition-5]= false : newBoxStates[boxPosition-5]= true;
      }
      if(p <= this.props.boardSize-5) {
        newBoxStates[boxPosition+5] ? newBoxStates[boxPosition+5]= false : newBoxStates[boxPosition+5]= true;
      }
      this.setState({boxStates: newBoxStates});
      // winGame();
    }

    const style = {
        gridTemplateRows: `repeat(${this.props.boardSize/5}, 75px)`, 
        gridTemplateColumns: "repeat(5, 75px)", 
        gridGap: "0",
    };
    
    return(
      <div>
        <div className="flex flex-row justify-center">
          <p className="neon neon--lights">Lights</p>
          <p className="neon neon--out">Out</p>
        </div>
        <div style={style} className={`box-grid ${this.winGame() ? "hidden" : "grid"}`}>
          {boardSizeArray.map(b => <Box
           key={b}
           position={b}
           toggle={toggleHandler}
           active={this.state.boxStates[b-1] ? "bg-blue-400" : "bg-gray-800"}/>)}   
        </div>
        <div className={`text-white text-3xl text-center mt-80 ${this.winGame() ? "" : "hidden"}`}>YOU WON!!!</div>
      </div>
    )
  }
}

export default BoxGame;