Vue.component('login-form', {
    template: `
        <div>
            <form>
                <input type="text" v-model="email" placeholder="email">
                <input type="password" v-model="password" placeholder="password">
                <button type="button" v-on:click="submit">Login</button>
            </form>
            <div class="error" v-if="error != null">
                {{error}}
            </div>
        </div>
    `,
    data: () => ({
        email: '',
        password: '',
        error: null
    }),
    methods: {
        submit: async event => {
            try {
                const response = await fetch('/api/v1/login', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.email.value,
                        password: this.password.value
                    })
                });
            } catch (e) {
                this.error = e;
            }
            const data = await response.json();
            app.user_id = data.user_id;
            app.token = data.token;
            app.page = 'home';
        }
    }
});
