import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { USER_ROLE } from '@/config';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 8,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: 'user',
      required: true,
    },
    //profileImage
  },
  {
    timestamps: true,
  },
);

// UserSchema.pre('save', async function () {
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
// }

// UserSchema.methods.comparePassword = async function (caandidatePassword) {
//   const isMatch = await bcrypt.compare(caandidatePassword, this.password)
//   return isMatch
// }

export const UserModel = model<User & Document>('User', UserSchema);
