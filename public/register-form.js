Vue.component('register-form', {
    template: `
        <div>
            <form>
                <input type="text" v-model="email" placeholder="E-Mail">
                <input type="password" v-model="password1" placeholder="Password">
                <input type="password" v-model="password2" placeholder="Confirm Password">
                <div v-if="password1 !== password2" class="error">Passwords Must Match!</div>
                <button type="button" v-on:click="submit">Register</button>
            </form>
            <div class="error" v-if="error != null">
                {{error}}
            </div>
        </div>
    `,
    data: () => ({
        email: '',
        password1: '',
        password2: '',
        success: false,
        error: null
    }),
    methods: {
        submit: async event => {
            if (this.password1.value === this.password2.value) {
                try {
                    const response = await fetch('/api/v1/register', {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify({
                            email: this.email.value,
                            password: this.password1.value
                        })
                    });
                } catch (e) {
                    this.error = e;
                }
                const data = await response.json();
                app.page = 'login';
            }
        }
    }
});
