import Product from "./db-schemas/Product";
import * as assert from 'assert';
export default class MAPPGQL {
    params: any
    constructor(params: any) {
        this.params = params;
    }
    async health() {
        return { status: "ok" }
    }
    async add_product(args: any, req: any) {
        await this.assert_nonempty(args, 'product,model,brand,shape,size,color,wattage,body_color'.split(','))

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

}