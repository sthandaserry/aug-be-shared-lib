/**
 * @file credential.interface.ts - Credential interface
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 13/07/2018
 * lastModified: 13/07/2018
 */
import { Document } from 'mongoose';
export interface UserCredential extends Document {
  readonly email: string; // Username
  readonly pwd: string; // Password
}