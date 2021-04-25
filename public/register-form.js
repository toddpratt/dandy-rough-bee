Vue.component('register-form', {
    template: `
        <form>
            <label for="email">email</label>
            <input id="email" type="text" v-model="email" placeholder="E-Mail">
            <label for="password1">Password</label>
            <input id="password1" type="password" v-model="password1" placeholder="Password">
            <label for="password">Password</label>
            <input id="password2" type="password" v-model="password2" placeholder="Confirm Password">
            <div v-if="password1 !== password2" class="error">Passwords Must Match!</div>
            <button type="button" v-on:click="submit">Register</button>
        </form>
        <div>
            <div>Registration Succeeded!</div>
            <login-form></login-form>
        </div>
    `,
    data: () => ({
        email: '',
        password1: '',
        password2: '',
        success: false
    }),
    methods: {
        submit: async event => {
            if (this.password1.value === this.password2.value) {
                const response = await fetch('/api/v1/register', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.email.value,
                        password: this.password1.value
                    })
                });
                const data = await response.json();
                app.page = 'login';
            }
        }
    }
});
