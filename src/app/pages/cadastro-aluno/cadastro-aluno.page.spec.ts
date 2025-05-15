import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAlunoPage } from './cadastro-aluno.page';

describe('CadastroAlunoPage', () => {
  let component: CadastroAlunoPage;
  let fixture: ComponentFixture<CadastroAlunoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
