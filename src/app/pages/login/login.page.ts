import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  login() {
    this.http.post('http://localhost:3000/api/login', {
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.user));
        this.navCtrl.navigateRoot('/cadastro-aluno');
      },
      error: () => this.showToast('Credenciais inválidas'),
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
