import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  Log_UUID: String,
  Log_Scenario_ID: String,
  Log_Environment: String,
  Log_Json: mongoose.Schema.Types.Mixed,
});


export default mongoose.model("Data", dataSchema);
