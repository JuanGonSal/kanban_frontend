import { Component, OnInit } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})

export class BoardListComponent implements OnInit {
  boards!: any[];
  selectedBoard: any;

  constructor(private boardListService: BoardListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boardListService.getAll().subscribe((board: any) => {
        this.boards = board;
    });
  }

  selectBoard(board: any) {
    this.selectedBoard = board;
    this.router.navigate(['/board', board.id]);
  }
}
