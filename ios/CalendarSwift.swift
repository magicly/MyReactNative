//
//  CalendarSwift.swift
//  MyReactNative
//
//  Created by Li Yan on 16/3/8.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation

@objc(CalendarSwift)
class CalendarSwift2: NSObject {
  var bridge: RCTBridge!
  
  @objc func sayHello(name: String, age: NSNumber, callback: NSObject -> ()) -> Void {
    NSLog("Bridge: %@", self.bridge);
    NSLog("name %@, age %@", name, age);
    callback(["this is from swift", "second string", 1]);
    self.bridge.eventDispatcher.sendAppEventWithName("event from swift", body: ["name": "swfit", "age": 19, "sex": true])
  }
  
  func constantsToExport() -> NSObject {
    return [
      "x": 1,
      "two": 2,
      "z": "string...."
    ]
  }
}