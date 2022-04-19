import Controller from '../core/controller.js';

class Login extends Controller {
    login() {
        return this.resApi(true, '', {
            status: true
        });
    }
}

export default Login;