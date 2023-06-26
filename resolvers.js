import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

// this is brain of our graphql server
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () =>
      await Quote.find({}).populate("by", "_id firstName lastName"),
    iquote: async (_, { by }) =>
      await Quote.find({ by }).populate("by", "_id firstName lastName"),
    myprofile: async (_, __, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
    quoteById: async (_, { _id }, { userId }) => {
      return await Quote.findOne({ _id, by: userId }).populate(
        "by",
        "_id firstName lastName"
      );
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User does not exist with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("invalid credentials");
      }
      const token = jwt.sign({ userId: user._id }, process.env.APP_JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in to create a quote");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote created successfully";
    },
    updateQuote: async (_, { _id, name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in to create a quote");
      }
      await Quote.updateOne(
        { _id, by: userId },
        {
          $set: {
            name,
          },
        }
      );
      return "Quote updated successfully";
    },
    deleteQuote: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in to create a quote");
      }
      await Quote.deleteOne({ _id, by: userId });
      return "Quote deleted successfully";
    },
  },
};

export default resolvers;
