import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

interface StaticMethod {
  save(model: UserDocument): Promise<UserDocument>;
  isUserExisting(email: string): Promise<boolean>;
  isConfirmationCodeValid(model: UserDocument, confirmationCode: string): boolean;
}

type EntityMethod = {
  save(model: UserDocument): Promise<UserDocument>;
  isUserExisting(model: UserDocument): Promise<boolean>;
  isConfirmationCodeValid(model: UserDocument, confirmationCode: string): boolean;
}


export type UserDocument = User & Document;

export interface UserModelType extends Model<UserDocument>, StaticMethod {

}

@Schema()
export class AccountData {


  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: "a1@4123ags!" })
  hashedPassword: string;

  @Prop({ type: String })  // Explicitly set the type here
  saltPassword: any;

  @Prop({ default: Date.now })
  dateCreated: Date;
}

@Schema()
class EmailConfirmation {
  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ required: true })
  confirmationCode: string;

  @Prop({ required: true })
  expirationDate: Date;
}


@Schema()
export class User {
  constructor(email: string, password: string) {
    console.log("constructor" + email + password);
    this.accountData.email = email;
    this.accountData.password = password;
  }


  @Prop()
  accountData: AccountData;

  @Prop()
  emailConfirmation: EmailConfirmation;


}

export const UserSchema = SchemaFactory.createForClass(User);

const customStatics: StaticMethod = {

  async save(model: UserDocument): Promise<UserDocument> {
    console.log(model, "model");
    return await model.save();
  },
  isUserExisting: async function(email: string): Promise<boolean> {
    const user = await this.findOne({ "accountData.email": email });
    return user !== null;
  },
  isConfirmationCodeValid: function(model: UserDocument, confirmationCode) {
    return model.emailConfirmation.confirmationCode === confirmationCode;
  }
};
const customMethods = {
  createConfirmationCode: function() {
    this.emailConfirmation.confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.emailConfirmation.expirationDate = new Date();
    this.emailConfirmation.expirationDate.setDate(this.emailConfirmation.expirationDate.getDate() + 1);
  },
  isConfirmationCodeExpired: function() {
    return this.emailConfirmation.expirationDate < new Date();
  }
};


UserSchema.virtual("id").get(function() {
  return this?._id?.toHexString();
});


UserSchema.set("toJSON", {
  virtuals: true
});


UserSchema.methods = {
  ...UserSchema.methods,
  ...customMethods
};
UserSchema.statics = {
  ...UserSchema.statics,
  ...customStatics
};




