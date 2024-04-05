import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import * as path from 'path';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the nodemailer transporter with hardcoded values
    this.transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,//true for 465, false for other ports
      auth: {
        user: 'yassinejalloulitech@gmail.com',
        pass: 'czxh qenn nbhz bvzi',
      },
    });
  }

  // Method to send the actual email
  async send(template: string, subject: string, user?: any, url?: string, randomCode?: string,myRandomPaswword?:string) {
    try {


// Inside the send method of EmailService

      const html = pug.renderFile(path.join('src','modules','user','views', `${template}.pug`), {
        name: user.firstName,
        url: url,
        subject: subject,
        randomCode: randomCode,
        myRandomPaswword:myRandomPaswword,
      });


      // Define email options
      const mailOptions: nodemailer.SendMailOptions = {
        from: {
          name: "TeamSphere",
          address: "yassinejalloulitech@gmail.com"
        },
        to: user.email,
        subject: subject,
        html: html, // html: html
      };

      // Create a transport and send the email
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }


  // Method to send password reset email
  async sendPasswordReset(user: any, url: string, randomCode: string) {
    try {
      await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)', user, url, randomCode);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendPassword(user: any, password: string) {
    try {
      await this.send('sendPassword', 'Your Random Password', user,null,null,password);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
// Method to send email verification email
}
