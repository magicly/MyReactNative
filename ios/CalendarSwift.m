//
//  CalendarSwift.m
//  MyReactNative
//
//  Created by Li Yan on 16/3/8.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CalendarSwift, NSObject)

RCT_EXTERN_METHOD(sayHello:(NSString *)name age:(nonnull NSNumber *)age callback:(RCTResponseSenderBlock)callback)

@end