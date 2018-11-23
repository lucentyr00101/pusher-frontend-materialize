import axios from 'axios'
import { users, newUser } from '@/utils/api'

const Pusher = require('pusher-js');
Pusher.logToConsole = true;

const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER
});

export default {
    data() {
        return {
            users: null,
            headers: [
                { text: 'ID', value: "id", align: 'center' },
                { text: 'Name', value: 'name', align: 'center' },
                { text: 'Email Address', value: 'email', align: 'center' },
                { text: 'Created At', value: 'created_at', align: 'center' },
                { text: 'Updated At', value: 'updated_at', align: 'center' },
                { text: 'Actions', value: '', align: 'center' }
            ],
            rowsPerPageItems: [ 10, 20, 30, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
            dialog: false,
            newUser: {
                name: null,
                email: null,
                password: null,
            }
        }
    },
    methods: {
        setUsers() {
            axios.get(users())
                .then(res => {
                    this.users = res.data.data
                })
                .catch(e => console.log(e))
        },
        save() {
            let formData = new FormData()
            formData.append('name', this.newUser.name)
            formData.append('email', this.newUser.email)
            formData.append('password', this.newUser.password)
            axios.post(newUser(), formData)
                .then(res => {
                    console.log(res)
                    this.resetFields()
                    this.dialog = false
                })
                .catch(e => console.log(e))
        },
        resetFields() {
            this.newUser = {
                name: null,
                email: null,
                password: null
            }
        }
    },
    mounted() {
        pusher.subscribe(`users-update`)
            .bind('user', () => {
                this.setUsers()
            });
        this.setUsers()
    },
}