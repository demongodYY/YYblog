import axios from 'axios';
import sha256 from 'sha256';

let instance = {};

const module = {
    userApi: {
        username: '',
        password: '',
        token: '',
        set (username, password) {
            this.username = username;
            this.password = sha256(password);
        },
        signUp (username, password, email = '') {
            username ? null : username = this.username;
            password ? null : password = this.password;
            const ctx = {
                'Data': {
                    'Password': sha256(password),
                    'UserId': username,
                    'Email': email
                },
                'Type': 'general'
            };
            return instance.post('/1/users', ctx);
        },
        signIn (username, password) {
            username ? null : username = this.username;
            password ? null : password = this.password;
            const ctx = {
                'Data': {
                    'Password': sha256(password),
                    'UserId': username
                },
                'Type': 'general'
            };
            return instance.get('/1/login', ctx);
        }
    }
};

export default {
    ApiKey: '',
    AppId: '',
    init (AppId, ApiKey) {
        this.ApiKey = ApiKey;
        this.AppId = AppId;
        instance = axios.create({
            baseURL: 'https://api.bmob.cn/',
            timeout: 1000,
            headers: {
                'X-Bmob-Application-Id': this.AppId,
                'X-Bmob-REST-API-Key': this.ApiKey,
                'Content-Type': 'text/plain',
                dataType: 'jsonp'
            }
        });
    },
    user: module.userApi
};

