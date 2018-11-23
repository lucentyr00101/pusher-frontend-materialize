import axios from 'axios'
import { showUser } from '@/utils/api'

const Pusher = require('pusher-js');
Pusher.logToConsole = true;

const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER
});

export default {
    data() {
        return {
            user: null
        }
    },
    methods: {
        getUser(){
            axios.get(showUser(this.$route.params.id))
                .then(res => {
                    console.log(res)
                    this.user = res.data.data
                })
                .catch(e => console.log(e))
        }
    },
    mounted () {
        this.getUser()
        pusher.subscribe(`users-update`)
            .bind('user', () => {
                this.getUser()
            });
    }
}