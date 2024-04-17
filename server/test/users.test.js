import { register, logout } from '../controllers/authController.js';
import User from '../models/UserSchema.js';
import Mechanic from '../models/MechanicSchema.js';

jest.mock('../models/UserSchema.js');
jest.mock('../models/MechanicSchema.js');

describe('AuthController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('should create a new user and return 200', async () => {
      const req = { body: { username: 'test', email: 'test@test.com', password: 'password', role: 'user' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValueOnce(null); // Mock user not found
      Mechanic.findOne.mockResolvedValueOnce(null); // Mock mechanic not found
      User.prototype.save.mockResolvedValueOnce(); // Mock user save success

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'user created successfully' });
    });

    test('should return 400 if email already exists', async () => {
      const req = { body: { username: 'test', email: 'test@test.com', password: 'password', role: 'user' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValueOnce({ email: 'test@test.com' }); // Mock user found

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'email already exist' });
    });
  });

 
  
  
  

  describe('logout', () => {
    test('should logout successfully and clear cookie', () => {
      const req = {};
      const res = { cookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

      logout(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Logout success' });
      expect(res.cookie).toHaveBeenCalledWith('clearjwt', '', {
        httpOnly: true,
        expires: expect.any(Date),
      });
    });

    // Add more test cases for logout function
  });
});
