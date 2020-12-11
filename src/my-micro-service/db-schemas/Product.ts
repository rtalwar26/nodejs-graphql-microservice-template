/**
 * Created by rohittalwar on 01/06/16.
 */
import * as mongoose from 'mongoose';

export interface IProduct {
    product: string
    model: string
    brand: string
    shape: string
    color: string
    body_color: string
    size: string
    data?: any
    amount: number


};
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
    },
    amount: { type: mongoose.SchemaTypes.Number }
});


export interface IProductModel extends mongoose.Document { }

export default mongoose.model<IProductModel>('products', mySchema);