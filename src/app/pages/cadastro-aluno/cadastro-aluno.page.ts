import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.page.html',
  styleUrls: ['./cadastro-aluno.page.scss'],
  standalone: false
})
export class CadastroAlunoPage {
  usuario: any = null;

  aluno = {
    nome: '',
    email: '',
    idade: null,
    turma: '',
    data_cadastro: ''
  };

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    const data = localStorage.getItem('usuario');
    if (!data) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.usuario = JSON.parse(data);
    }
  }

  salvar() {
    if (
      !this.aluno.nome ||
      !this.aluno.email ||
      !this.aluno.idade ||
      !this.aluno.turma ||
      !this.aluno.data_cadastro
    ) {
      this.showToast('Preencha todos os campos');
      return;
    }

    const payload = {
      ...this.aluno,
      usuario_id: this.usuario.id
    };

    this.http.post('http://localhost:3000/alunos', payload).subscribe({
      next: () => {
        this.showToast('Aluno cadastrado com sucesso', 'success');
        this.aluno = { nome: '', email: '', idade: null, turma: '', data_cadastro: '' };
      },
      error: () => this.showToast('Erro ao salvar aluno'),
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.navCtrl.navigateRoot('/login');
  }

  async showToast(msg: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
