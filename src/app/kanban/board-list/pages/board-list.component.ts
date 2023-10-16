import { Component, OnInit } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from '../../board/board';
import { BoardService } from '../../board/board.service';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { ModalService } from 'src/app/_services/modal.service';
import { Team } from 'src/app/_models/team';

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
  name? :any;
  description? :any;
  team? :any;
  teams? :any;

  constructor(
              private boardListService: BoardListService, 
              private boardService: BoardService, 
              private authenticationService: AuthenticationService,
              private router: Router,
              protected modalService: ModalService
            ) { }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.profile().pipe(first()).subscribe(user => {
      this.user =  user;
      this.teams = this.user?.teams;
      this.loading = false;
    });
    this.boardListService.getAll().subscribe((board: any) => {
        this.boards = board;
    });
  }
  
  createBoard(){
    const newBoard: Board = {
      id: 0,
      name: this.name,
      description: this.description,
      columns: [],
      team: this.team
    };
    if (newBoard) {
      this.boards.push(newBoard);
      this.boardService.create(newBoard).subscribe((board: any) => {});
    }
    this.modalService.close();
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
