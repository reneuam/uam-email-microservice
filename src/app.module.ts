import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mail.uassistme.com',
        port: 465,
        secure: true,
        auth: {
          user: "unplugged@uassistme.com",
          pass: "2fjC-!@bMm[Q3$(hIg)M$p02",
        },
      },
      defaults: {
        from: '"Unplugged" <unplugged@uassistme.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ]
})
export class AppModule {}
