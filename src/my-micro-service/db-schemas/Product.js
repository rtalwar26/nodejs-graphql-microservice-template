"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rohittalwar on 01/06/16.
 */
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    product: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String },
    shape: { type: String },
    color: { type: String },
    size: { type: String },
    body_color: { type: String },
    data: {
        type: mongoose.SchemaTypes.Mixed
    }
});
exports.default = mongoose.model('products', mySchema);
