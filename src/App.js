import React from 'react';
import Maths from './Math';
import './App.css'

var action

class App extends React.Component{
	constructor(){
		super()
		this.state = {
			started:false,
			isError:false,
			number1:'',
			number2:'',
			jawaban1:'',
			jawaban2:'',
			jawaban3:'',
			jawaban4:'',
			count : 100,
			score : 0
		}
	}
	
	restart = () => {
		let theReal = Math.floor(Math.random()* Maths.length)
		let theFalse1 = Math.floor(Math.random()* Maths.length)
		let theFalse2 = Math.floor(Math.random()* Maths.length)
		let theFalse3 = Math.floor(Math.random()* Maths.length)
		if(theFalse1 === theReal){
			theFalse1 = Math.floor(Math.random()* Maths.length)
		}
		if(theFalse2 === theReal){
			theFalse2 = Math.floor(Math.random()* Maths.length)
		}
		if(theFalse3 === theReal){
			theFalse3 = Math.floor(Math.random()* Maths.length)
		}
		let jawaban = Math.floor(Math.random()*4+1)
		console.log(jawaban);
		if(jawaban === 1){
			this.setState({ 
				number1:Maths[theReal].number1,
				number2:Maths[theReal].number2,
				jawaban1:Maths[theReal].hasil,
				jawaban2:Maths[theFalse1].hasil,
				jawaban3:Maths[theFalse2].hasil,
				jawaban4:Maths[theFalse3].hasil
			})
		}else if(jawaban === 2){
			this.setState({ 
				number1:Maths[theReal].number1,
				number2:Maths[theReal].number2,
				jawaban1:Maths[theFalse1].hasil,
				jawaban2:Maths[theReal].hasil,
				jawaban3:Maths[theFalse2].hasil,
				jawaban4:Maths[theFalse3].hasil
			})
		}else if(jawaban === 3){
			this.setState({ 
				number1:Maths[theReal].number1,
				number2:Maths[theReal].number2,
				jawaban1:Maths[theFalse1].hasil,
				jawaban2:Maths[theFalse2].hasil,
				jawaban3:Maths[theReal].hasil,
				jawaban4:Maths[theFalse3].hasil
			})
		}else if(jawaban === 4){
			this.setState({ 
				number1:Maths[theReal].number1,
				number2:Maths[theReal].number2,
				jawaban1:Maths[theFalse1].hasil,
				jawaban2:Maths[theFalse2].hasil,
				jawaban3:Maths[theFalse3].hasil,
				jawaban4:Maths[theReal].hasil
			})
		}else{
			this.setState({isError : true})
		}
	}
	
	start = () => {
		this.setState({started:true,count:1})
		this.restart()
		this.timer()
	}
	timer = () => {
		action = setInterval(() => {
			this.setState({count:this.state.count - 1})
		},1000)

	}
	pilih = (value) => {
		const k_jawaban = this.state.number1 * this.state.number2
		if(value === k_jawaban){
			this.setState({score:this.state.score + 1})
			this.restart()
			console.log('Benar')
		}else{
			this.setState({score:this.state.score - 1})
			this.restart()
			console.log('Salah Goblog')
		}
	}
	
	
	render(){
		if(!this.state.isError) {
			if(this.state.count === 0){
				clearInterval(action);
				return(
					<div>
						<span className='score'>Score : {this.state.score}</span>
					</div>
				)
				
			}
			if(this.state.started){
				return(
					<div>
						<div id='topbar'>
							<span className='time'>Time : {this.state.count}</span>
							<span className='score'>Score : {this.state.score}</span>
						</div>
						<br /><br /><br />
						<h1 id='petunjuk'>SELESAIKAN PERTANYAAN BERIKUT INI</h1>
						<div className='soal'>
							<h2 className='tulisanSoal'>{this.state.number1} X {this.state.number2}</h2>
						</div>
						<div className='jawaban'>
							<button onClick={() => this.pilih(this.state.jawaban1)}>A. {this.state.jawaban1}</button><br />
							<button onClick={() => this.pilih(this.state.jawaban2)}>B. {this.state.jawaban2}</button><br />
							<button onClick={() => this.pilih(this.state.jawaban3)}>C. {this.state.jawaban3}</button><br />
							<button onClick={() => this.pilih(this.state.jawaban4)}>D. {this.state.jawaban4}</button>
						</div>
						<div className='restart'>
							<br /><button onClick={this.restart}>Restart</button>
						</div>
					</div>
				)
			}
			else{
				return(
					<div className='startPage'>
						<h1> WELCOME TO THE TOP MATH GAME</h1>
						<button onClick={this.start}>Start</button>
					</div>
				)
			}
		}else{
			return(
				<div>
					<h1>Error Occurred</h1>
				</div>
			)
		}
		
	}
	
}
export default App;