import request from 'supertest'
import mongoose from 'mongoose'
import {app} from "../src/setting";
import {User} from "../src/models/user";
import {JwtReturnData} from "../src/jwt-service";
import {CodeResponsesEnum} from "../src/utils/constants";

const DB_NAME = 'myNewDatabaseTest'
const mongoURI = `mongodb://127.0.0.1:27017/${DB_NAME}`


describe('Auth Endpoints', () => {
  const credentials = {
    email: 'testuser@test.com',
    password: 'testpassword'
  }
  let createdUser: User | undefined
  let loggedInUser: {
    user: User,
    token: JwtReturnData
  } | undefined
  let emailConfirmationToken: string | undefined

  beforeAll(async () => {
    /* Connecting to the database. */
    await mongoose.connect(mongoURI)
  })

  afterAll(async () => {
    /* Closing database connection after each test. */
    await mongoose.connection.close()
  })
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: credentials.email,
        password: credentials.password
      });
    createdUser = res.body as User | undefined
    emailConfirmationToken = createdUser?.emailConfirmation.confirmationCode

    expect(res.statusCode).toEqual(CodeResponsesEnum.CREATED);
    expect(createdUser).toHaveProperty('_id');
    expect(createdUser?.emailConfirmation.isConfirmed).toBe(false);
    expect(new Date(createdUser!.emailConfirmation.expirationDate)).toBeInstanceOf(Date);
    expect(new Date(createdUser!.accountData.dateCreated)).toBeInstanceOf(Date);
    expect(createdUser?.accountData.email).toBe(credentials.email);
  });

  it('should get email confirmation token', async function () {

    const res = await request(app)
      .get(`/auth/confirmation/${emailConfirmationToken}`)
    const user = res.body as User | undefined

    expect(res.statusCode).toEqual(CodeResponsesEnum.SUCCESS);
    expect(user?.emailConfirmation.isConfirmed).toBe(true);
    expect(user).toHaveProperty("_id", createdUser?._id)
    expect(user?.accountData.email).toBe(createdUser?.accountData.email)
  });

  it('should auth a user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: credentials.email,
        password: credentials.password
      });
    expect(res.statusCode).toEqual(CodeResponsesEnum.SUCCESS);
    expect(res.body).toHaveProperty('token');
  });


  it('should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: credentials.email,
        password: credentials.password
      });

    loggedInUser = res.body

    expect(res.statusCode).toEqual(CodeResponsesEnum.SUCCESS);
    expect(loggedInUser).toHaveProperty('token');
    expect(loggedInUser?.user.accountData.email).toBe(credentials.email);
    expect(res.statusCode).not.toBe(CodeResponsesEnum.UNAUTHORIZED);

  })


  it('should Delete user', async () => {
    const res = await request(app)
      .delete(`/users/${loggedInUser?.user._id}`)

    expect(res.statusCode).toEqual(CodeResponsesEnum.SUCCESS);
  });

});
