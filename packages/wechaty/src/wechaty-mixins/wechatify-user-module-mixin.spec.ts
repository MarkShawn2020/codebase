#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test } from "tstest"

import type {
  ProtectedPropertyWechatifyUserModuleMixin,
  WechatifyUserModuleMixin,
} from "./wechatify-user-module-mixin.js"

test("ProtectedPropertyWechatifyUserModuleMixin", async (t) => {
  type NotExistInMixin = Exclude<
    ProtectedPropertyWechatifyUserModuleMixin,
    keyof InstanceType<WechatifyUserModuleMixin>
  >
  type NotExistTest = NotExistInMixin extends never ? true : false

  const noOneLeft: NotExistTest = true
  t.ok(noOneLeft, "should match Mixin properties for every protected property")
})
