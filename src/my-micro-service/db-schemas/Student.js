"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rohittalwar on 01/06/16.
 */
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    attendance: { type: Boolean }
});
exports.default = mongoose.model('students', mySchema);
