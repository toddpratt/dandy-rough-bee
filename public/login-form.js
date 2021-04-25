Vue.component('login-form', {
    template: `
        <form>
            <label for="email">email</label>
            <input id="email" type="text" v-model="email" placeholder="email">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" placeholder="password">
            <button type="button" v-on:click="submit">Login</button>
        </form>
    `,
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        submit: async event => {
            const response = await fetch('/api/v1/login', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    email: this.email.value,
                    password: this.password.value
                })
            });
            const data = await response.json();
            app.user_id = data.user_id;
            app.token = data.token;
            app.page = 'home';
        }
    }
});
