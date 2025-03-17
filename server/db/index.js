import mongoose from "mongoose";

export default async (_nitroApp) => {
 try {
   mongoose.set("strictQuery", true);  // 嚴格模式
   await mongoose.connect(
     "mongodb+srv://eric:Vjrj62ZpVQi9Uroc@cluster0.7eixj.mongodb.net/Eric"
   );
   console.log("連接 MongoDB");
 } catch (e) {
   console.error("Error MongoDB =>", e);
 }
};