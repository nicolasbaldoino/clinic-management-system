import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClinicModule } from './modules/clinic/clinic.module';
import { PatientModule } from './modules/patient/patient.module';
import { ProfessionalModule } from './modules/professional/professional.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { UserModule } from './modules/user/user.module';

import './common/enums/appointment-status.enum';
import './common/enums/schedule-status.enum';
import './common/enums/user-role.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule,
    ClinicModule,
    ProfessionalModule,
    PatientModule,
    AppointmentModule,
    ScheduleModule,
  ],
})

export class AppModule {}
