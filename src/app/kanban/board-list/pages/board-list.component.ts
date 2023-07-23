import { Component, OnInit } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from '../../board/board';
import { BoardService } from '../../board/board.service';
@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})

export class BoardListComponent implements OnInit {
  boards!: any[];
  selectedBoard: any;

  constructor(
              private boardListService: BoardListService, 
              private boardService: BoardService, 
              private router: Router,
            ) { }

  ngOnInit(): void {
    this.boardListService.getAll().subscribe((board: any) => {
        this.boards = board;
    });
  }
  
  createBoard(){
    const newBoard: Board = {
      id: 0,
      name: prompt('Ingrese el título del nuevo tablero'),
      description: prompt('Ingrese la descripción del nuevo tablero'),
      columns: []
    };
    if (newBoard) {
      this.boards.push(newBoard);
      this.boardService.create(newBoard).subscribe((board: any) => {});
    }
  }

  selectBoard(board: any) {
    this.selectedBoard = board;
    this.router.navigate(['/board', board.id]);
  }

  deleteBoard(board: any, event: any){
    event.stopPropagation();
    this.boardService.delete(board.id).subscribe((board: any) => {
        window.location.reload();
    });

  }
}
