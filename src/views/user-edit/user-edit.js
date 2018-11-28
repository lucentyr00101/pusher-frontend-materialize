import axios from 'axios'
import { showUser, updateUser } from '@/utils/api'

export default {
    data() {
        return {
            user: '',
        }
    },
    mounted () {
        axios.get(showUser(this.$route.params.id))
            .then(res => {
                this.user = res.data.data
            })
            .catch(e => console.log(e))
    },
    methods: {
        updateUser() {
            axios.put(updateUser(this.$route.params.id), this.user)
                .then(res => {
                    console.log(res)
                    this.$router.push({ name: 'user-show', params: { id: this.$route.params.id } })
                })
                .catch(e => console.log(e))
        }
    }
}