// const faker = require('faker');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const UsersService = require('./users.service');
const userService = new UsersService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized('Wrong credentials');
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async signToken(user) {
    const secret = config.jwtSecret;

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, secret);
    return token;
  }

  async sendRecoveryMail(email) {
    const user = await userService.getUserByEmail(email);

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });

    const link = `http://myfrontend.com/recovery?token=${token}`;

    await userService.updateUser(user.id, { recoveryToken: token });

    const mailInfo = {
      from: config.nodemailerEmail, // sender address
      to: email, // list of receivers
      subject: 'Password Recovery from MyStore', // Subject line
      html: `<b>Please enter to this link to reset your password: ${link}</b>`, // html body
    };

    const response = await this.sendEmail(mailInfo);
    return response;
  }

  async sendEmail(mailInfo) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.nodemailerEmail, // generated ethereal user
        pass: config.nodemailerPassword, // generated ethereal password
      },
    });

    await transporter.sendMail(mailInfo);
    return 'Mail sent';
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await userService.getUserById(payload.sub);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized('You are not allowed to change the password');
    }
    const hash = await bcrypt.hash(newPassword, 10);

    await userService.updateUser(user.id, {
      recoveryToken: null,
      password: hash,
    });
    return { message: 'Password Changed' };
  }
}

module.exports = AuthService;
