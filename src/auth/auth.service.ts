import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { compareSync } from 'bcrypt-nodejs';
import { generateMailOptionsAndSend } from 'src/helper/nodemailer';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async setConfirm(user: User) {
        console.log('setConfirm Called');
        user.isConfirmed = true;
        return await this.userService.create(user);
    }

    private async validate(userData: User): Promise<User> {
        if (userData.email) {
            return await this.userService.findByEmail(userData.email)
        }
        else if (userData.username) {
            return await this.userService.findByUsername(userData.username);
        }
        return null;
    }

    public async login(user: User): Promise<any | { status: number }> {
        return this.validate(user).then((userData) => {
            if (!userData) {
                throw new HttpException(JSON.stringify({ message: 'AccessToken Expired' }), HttpStatus.UNAUTHORIZED);
            }
            var accessToken = null;
            if (compareSync(user.password, userData.password)) {
                let payload = userData.username;
                accessToken = this.jwtService.sign(
                    { data: payload },
                    { expiresIn: '1d' });
            } else {
                throw new HttpException(JSON.stringify({ message: 'Username/Password Incorrect' }), HttpStatus.UNAUTHORIZED);
            }

            return {
                access_token: accessToken,
                username: userData.username,
                user_id: userData.id,
                status: 200
            };

        });
    }

    async confirm(webToken: string): Promise<any> {
        return this.jwtService.verifyAsync(webToken)
            .then(async verified => {
                let tokenData = await this.jwtService.decode(webToken);
                let user: User = await this.userService.findByUsername((tokenData as { [key: string]: any; }).data);
                return await this.setConfirm(user);
            })
            .catch(e => {
                console.error(e);
                return e;
            });
    }

    public async register(user: any): Promise<any> {
        let payload = user.username;
        let accessToken = this.jwtService.sign(
            { data: payload },
            { expiresIn: '1d' });
        return this.userService.create(user)
            .then(async () => {
                await generateMailOptionsAndSend(user.email, accessToken);
                return { status: 200 };
            }).catch((e) => {
                console.error(e);
                throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
            });
    }
}