// import axios from 'axios'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            loading: false,
            notification: {
                type: 'error',
                message: '',
                hasNotification: false,
            },
            rules: [
                v => !!v || 'Field is required',
            ],
        }
    },
    methods: {
        submit() {

            if(this.$refs.loginForm.validate()) {
                this.switchLoadingState()

                let formData = new FormData()
                formData.append('username', this.user.email)
                formData.append('password', this.user.password)
                formData.append('client_id', clientID())
                formData.append('client_secret', clientSecret())
                formData.append('grant_type', 'password')

                this.showAlert('info', 'Logging in...')
                
                // axios.post(login(), formData)
                //     .then(res => {
                //         this.switchLoadingState()
                //         this.$auth.setToken(res.data.access_token, res.data.expires_in + Date.now())
                //         this.showAlert('success', 'Successfully logged in. Redirecting to dashboard.')
                //         setTimeout(() => {
                //             this.$router.go('/dashboard')
                //         },1800)
                //     }).catch(err => {
                //         this.switchLoadingState()
                //         console.log(err)
                //         this.showAlert('error', err)
                //     })
            }
        },
        switchLoadingState() {
            this.loading = !this.loading
        },
        showAlert(type, message) {
            this.notification.type = type
            this.notification.message = message
            this.notification.hasNotification = type
        },
    }
}