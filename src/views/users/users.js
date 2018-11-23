import axios from 'axios'
import { users, newUser, deleteUser } from '@/utils/api'

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
            },
            snackbar: {
                show: false,
                text: null,
                color: 'success'
            },
            rules: [
                v => !!v || 'Field is required',
            ]
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
            if(this.$refs.newUser.validate()) {
                let formData = new FormData()
                formData.append('name', this.newUser.name)
                formData.append('email', this.newUser.email)
                formData.append('password', this.newUser.password)
                axios.post(newUser(), formData)
                    .then(() => {
                        this.resetFields()
                        this.dialog = false
                        this.snackbar.show = true
                        this.snackbar.text = 'User saved succesfully.'
                    })
                    .catch(e => console.log(e))
            }
        },
        resetFields() {
            this.newUser = {
                name: null,
                email: null,
                password: null
            }
        },
        deleteUser(id) {
            if(confirm('Are you sure you want to delete?')) {
                axios.delete(deleteUser(id))
                    .then(() => {
                        this.setUsers()
                        this.snackbar.show = true
                        this.snackbar.text = 'User deleted succesfully.'
                    })
                    .catch(e => console.log(e))
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