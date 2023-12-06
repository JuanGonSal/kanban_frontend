import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from '../../board/board';
import { BoardService } from '../../board/board.service';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { ModalService } from 'src/app/_services/modal.service';
import { Team } from 'src/app/_models/team';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})

export class BoardListComponent implements OnInit, OnDestroy {
  boards!: Board[];
  selectedBoard?: Board;
  loading = false;
  user?: User | null;
  name? :string;
  description? :string | null;
  team? :Team;
  teams? :Team[];
  modalNoValid = false;

  private authenticationSuscription?: Subscription;
  private boardListSuscription?: Subscription;
  private boardSuscription?: Subscription;

  constructor(
              private boardListService: BoardListService, 
              private boardService: BoardService, 
              private authenticationService: AuthenticationService,
              private router: Router,
              protected modalService: ModalService
            ) { }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationSuscription = this.authenticationService.profile().pipe(first()).subscribe(user => {
      this.user =  user;
      this.teams = this.user?.teams;
      this.loading = false;
    });
    this.boardListSuscription = this.boardListService.getAll().subscribe((boards: any) => {
        this.boards = boards;
    });
  }
  
  ngOnDestroy(): void {
    // Se llama cuando el componente está a punto de ser destruido
    // Desvincular la suscripción para evitar problemas de memoria
    this.authenticationSuscription?.unsubscribe();
    this.boardListSuscription?.unsubscribe();
    this.boardSuscription?.unsubscribe();
  }

  createBoard(){
    if(!this.name || !this.team) {
      this.modalNoValid = true
      return;
    }
    const newBoard: Board = {
      id: 0,
      name: this.name,
      description: this.description ?? null,
      columns: [],
      team: this.team
    };

    if (newBoard) {
      this.boardSuscription = this.boardService.create(newBoard).subscribe((board: any) => {
        this.boards.push(board);
      });
    }

    this.modalService.close();
  }

  selectBoard(board: any) {
    this.selectedBoard = board;
    this.router.navigate(['/board', board.id]);
  }

  deleteBoard(board: any, event: any){
    event.stopPropagation();
    this.boardSuscription = this.boardService.delete(board.id).subscribe((board: any) => {
        this.boardListService.getAll().subscribe((boards: any) => {
          this.boards = boards;
        });
    });
  }
  
  get isGestor(): boolean {
    return this.user?.roles.some(rol => rol.name === 'gestor') || false;
  }

  get isAdmin(): boolean {
    return this.user?.roles.some(rol => rol.name === 'admin') || false;
  }
}
