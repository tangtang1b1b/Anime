import mongoose from "mongoose";

// people schema
const schema = new mongoose.Schema({
 name: {
   type: String,
 },
 email: {
   type: String,
 },
 age: {
   type: String,
 },
});

const people = mongoose.model("Eric", schema, "test1");

// people model
export default people;