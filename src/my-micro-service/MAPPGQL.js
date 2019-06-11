"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./db-schemas/Product");
const assert = require("assert");
class MAPPGQL {
    constructor(params) {
        this.params = params;
    }
    async health() {
        return { status: "ok" };
    }
    async add_product(args, req) {
        await this.assert_nonempty(args, 'product,model,brand,shape,size,color,body_color'.split(','));
        let obj = await Product_1.default.updateOne(args, { $set: Object.assign({}, args) }, { upsert: true }).exec();
        obj = await Product_1.default.findOne(args).lean().exec();
        return Object.assign({ success: true }, obj);
    }
    async assert_nonempty(obj, required_fields) {
        for (let key of required_fields) {
            assert.ok(obj[key], `Invalid value for - ${key} `);
        }
    }
    async get_products(args, req) {
        return Product_1.default.find(Object.assign({}, args)).lean().exec();
    }
}
exports.default = MAPPGQL;
