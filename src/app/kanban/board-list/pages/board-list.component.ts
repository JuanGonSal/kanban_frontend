import { Component, OnInit } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from '../../board/board';
import { BoardService } from '../../board/board.service';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})

export class BoardListComponent implements OnInit {
  boards!: any[];
  selectedBoard: any;
  loading = false;
  user?: User | null;

  constructor(
              private boardListService: BoardListService, 
              private boardService: BoardService, 
              private authenticationService: AuthenticationService,
              private router: Router,
            ) { }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.profile().pipe(first()).subscribe(user => {
      this.user =  user;
      this.loading = false;
    });
    this.boardListService.getAll().subscribe((board: any) => {
        this.boards = board;
    });
  }
  
  createBoard(){
    const newBoard: Board = {
      id: 0,
      name: prompt('Ingrese el título del nuevo tablero'),
      description: prompt('Ingrese la descripción del nuevo tablero'),
      columns: [],
      team: {
        id: 1,
        name: ''
      }
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

  get isGestor() {
    let isGestor: boolean = false;
    this.user?.roles.forEach(rol => {
      if ( rol.name === 'gestor'){
        isGestor = true;
      };
      return isGestor;
    });
    return isGestor;
  }

  get isAdmin() {
    let isAdmin: boolean = false;
    this.user?.roles.forEach(rol => {
      if ( rol.name === 'admin'){
        isAdmin = true;
      };
      return isAdmin;
    });
    return isAdmin;
  }
}
