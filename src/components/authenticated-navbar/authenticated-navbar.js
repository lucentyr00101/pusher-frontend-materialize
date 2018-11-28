export default {
    data() {
        return {
            drawer: null
        }
    },
    methods: {
        logout(){
            this.$auth.destroyToken()
            this.$router.go('/')
        }
    }
}