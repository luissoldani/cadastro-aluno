import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroAlunoPageRoutingModule } from './cadastro-aluno-routing.module';

import { CadastroAlunoPage } from './cadastro-aluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroAlunoPageRoutingModule
  ],
  declarations: [CadastroAlunoPage]
})
export class CadastroAlunoPageModule {}
