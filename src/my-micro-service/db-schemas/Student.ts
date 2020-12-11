/**
 * Created by rohittalwar on 01/06/16.
 */
import * as mongoose from 'mongoose';

export interface IStudent {
    name: string
    age: number
    attendance: boolean



};
let Schema = mongoose.Schema;
let mySchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    attendance: { type: Boolean }
});


export interface IStudentModel extends mongoose.Document { }

export default mongoose.model<IStudentModel>('students', mySchema);