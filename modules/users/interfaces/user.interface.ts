/**
 * @file user.interface.ts - User interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 20/07/2018
 * lastModified: 20/07/2018
 */
import { Document } from 'mongoose';
export interface User extends Document {
  name?: string;
  email?: string; // Email Id
  uname?: string; // Username
  role?: number;
  profile?: object;
  pwd?: string; // Password
  salt: string; // Salt string
  hpwd: string; // hashed password
  token?: string; // Reset token
  status?: number;
  isIn?: string;
  readonly fname?: string; // First Name
  readonly lname?: string; // Last Name
  readonly cAt?: Date; // Created At
  readonly mAt?: Date; // Modified At
}