import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  squares!: any[];
  xIsNext!:boolean;
  winner!:string | null;

  constructor(){}
  ngOnInit(){
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X':'O'
  }

  makeMove(i:number){
    if(!this.squares[i] && !this.winner){
      this.squares.splice(i,1,this.player);
      this.winner = this.calculateWinner();
    }
    if(!this.winner){
      this.xIsNext = !this.xIsNext;
    }
  }

  calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i]
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]){
        return this.squares[a]
      }
    }
    return null;
  }
}
