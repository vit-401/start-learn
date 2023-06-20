import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;


@Schema()
export class AccountData {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ type: String })  // Explicitly set the type here
  saltPassword: any;

  @Prop({ required: true, default: Date.now })
  dateCreated: Date;
}

@Schema()
class EmailConfirmation {
  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ required: true })
  confirmationCode: string;

  @Prop()
  expirationDate: Date;
}



@Schema()
export class User {

  @Prop()
  _id?: Types.ObjectId;

  @Prop()
  accountData: AccountData;

  @Prop()
  emailConfirmation: EmailConfirmation;

  get id() {
    return this._id.toString();
  }
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});


UserSchema.set('toJSON', {
  virtuals: true
});


