import { Component } from '@angular/core';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent {
  loading = false;
  filaEditada: any;
  teams: Team[] = [];
  backupData: any;
  name!: string;
  editando: boolean = false;

  constructor(
    private teamService: TeamService,
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
      this.loading = false;
  }

  newRow(){
    const newTeam: Team = {
      id: 0,
      name: prompt('Ingrese un nombre para el equipo')
    };

    if (newTeam) {
      this.teamService.store(newTeam).subscribe((column: any) => {});
      this.getRows();
    }
  }

  editRow(team: any) {
    this.editando = true;
    this.backupData = { ...team };
    team.editando = true;
  }

  submitForm(team: any) {
      this.teamService.update(team).subscribe((team: any) => {});
      this.editando = false;
      team.editando = false;
  }

  deleteRow(team: any) {
      this.teamService.delete(team).subscribe((team: any) => {});
      this.getRows();
  }

  cancelEdit(team: any) {
      this.editando = false;
      Object.assign(team, this.backupData);
      this.backupData = null;
      team.editando = false;
  }
}
