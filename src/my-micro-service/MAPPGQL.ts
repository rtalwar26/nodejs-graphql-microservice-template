import Product from "./db-schemas/Product";
import Student from "./db-schemas/Student";
// import { MyClass } from "@cuterajat26/my-first-npm-module";

import * as assert from 'assert';
export default class MAPPGQL {
    params: any
    constructor(params: any) {
        this.params = params;
    }
    async health() {
        return { status: "ok" }
    }
    async get_student(args: any) {

        return Student.find({ ...args }).lean().exec();
    }
    async update_student(args: any, req: any) {

        let obj = await Student.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
        obj = await Student.findOne(args).lean().exec();
        console.log(`Saved student value is :`, obj);
        return { success: true, ...obj };


    }
    async add_product(args: any, req: any) {
        await this.assert_nonempty(args, 'product,model,brand,shape,size,color,body_color'.split(','))

        let obj = await Product.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
        obj = await Product.findOne(args).lean().exec();
        return { success: true, ...obj };
    }
    private async assert_nonempty(obj: any, required_fields: string[]) {
        for (let key of required_fields) {
            assert.ok(obj[key], `Invalid value for - ${key} `);
        }
    }

    async get_products(args: any, req: any) {
        return Product.find({ ...args }).lean().exec();
    }

    async test_mongo_queries(args: any, req: any) {

        // Chapter 6.3
        // let myClassObject = new MyClass();
        // let message = myClassObject.create_hello_message('rajat');
        // console.log('message:', message);

        // return { success: true };
    }
}