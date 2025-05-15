import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroAlunoPage } from './cadastro-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroAlunoPageRoutingModule {}
