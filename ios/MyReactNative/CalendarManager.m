//
//  CalendarManager.m
//  MyReactNative
//
//  Created by Li Yan on 16/3/8.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalendarManager.h"
#import "RCTLog.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"

@implementation CalendarManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *)details date:(NSDate *)date2)
{
  NSString *location = [RCTConvert NSString:details[@"location"]];
  NSDate *date = [RCTConvert NSDate:details[@"time" ]];
  RCTLogInfo(@"this is from oc addEvent %@ at %@ %@ ====%@", name, location, date, date2);
}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], @"result from oc..."]);
//  callback(@[[NSNull null], @"result from oc2..."]);
//  callback(@[[NSNull null], @"result from oc3..."]);
}

RCT_REMAP_METHOD(findEventsWithPromise,
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = [[NSError alloc] initWithDomain:@"err msg" code:10 userInfo:nil];
//  [error set]
//  NSArray *arr = [NSArray arrayWithObjects:@"12", "2", "3", nil];
  
  NSArray *arr2 = @[@1, @2, @3];
  NSArray *arr3 = @[@"this is from oc promise ok中文支持"];
  resolve(arr3);
//  resolve(@"this is from oc promise ok中文支持");
//    resolve(@"ABCD");
//  reject(@"error info", @"this is another error info", error);
}

RCT_EXPORT_METHOD(doSthExpensive:(NSString *)param callback:(RCTResponseSenderBlock) callback)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),
                 ^{
                   NSLog(@"expensive...%@", param);
                   callback(@[[NSNull null], @"result from expensive..."]);
                   
                 });
}

- (NSDictionary *)constantsToExport
{
  return @{ @"firstDay": @"Monday" };
}

RCT_EXPORT_METHOD(sendEvent:(NSString *)param)
{
  NSLog(@"sendEvent %@", param);
  [self.bridge.eventDispatcher sendAppEventWithName:@"this is from native module" body:@{@"name": param}];
}
@end