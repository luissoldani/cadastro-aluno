import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  register() {
    if (!this.nome || !this.email || !this.senha) {
      this.showToast('Preencha todos os campos');
      return;
    }

    this.http.post('http://localhost:3000/api/register', {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.showToast('Conta criada com sucesso', 'success');
        this.navCtrl.navigateRoot('/login');
      },
      error: () => this.showToast('Erro ao criar conta'),
    });
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
