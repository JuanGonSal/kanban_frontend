import { Component } from '@angular/core';
import { Team } from 'src/app/_models/team';
import { BoardService } from 'src/app/kanban/board/board.service';
import { Board } from 'src/app/kanban/board/board';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-boards-teams',
  templateUrl: './boards-teams.component.html'
})
export class BoardsTeamsComponent {
  loading = false;
  filaEditada: any;
  boards: Board[] = [];
  teams?: Team[] = [];
  backupData: any;
  name!: string;
  editando: boolean = false;

  constructor(
    private boardService: BoardService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
      this.getRows();
  }

  getRows(){
      this.loading = true;
      this.teamService.getAll().subscribe(teams => {
        teams?.forEach((team) => { team.editando = false});
        this.teams = teams;
      });
      this.boardService.getAll().subscribe(boards => {
        boards?.forEach((board) => { board.editando = false});
        this.boards = boards;
      });
      this.loading = false;
  }

  editRow(board: any) {
    this.editando = true;
    this.backupData = { ...board };
    board.editando = true;
  }

  submitForm(board: any, teams:any) {
      board.team_id = this.teams;
      this.boardService.update(board.id, board).subscribe((board: any) => {});
      this.editando = false;
      board.editando = false;
  }

  deleteRow(board: any) {
      this.boardService.delete(board).subscribe((board: any) => {});
      this.getRows();
  }

  cancelEdit(board: any) {
      this.editando = false;
      Object.assign(board, this.backupData);
      this.backupData = null;
      board.editando = false;
  }
}
