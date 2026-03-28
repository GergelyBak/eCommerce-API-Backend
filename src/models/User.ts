import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // 🔥 fontos!
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// password dont show up when we do res.json(user)
userSchema.set('toJSON', {
  transform: (_, ret: any) => {
    delete ret.password;

    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const User = model('User', userSchema);
