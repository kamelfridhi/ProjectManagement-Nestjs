import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: '11@MY@24',
          signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
