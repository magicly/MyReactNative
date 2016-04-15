//
//  MCFileWriterUtil.m
//  MyReactNative
//
//  Created by Li Yan on 16/3/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MCFileWriterUtil2, NSObject)

RCT_EXTERN_METHOD(writeFile:(NSString *)fileName withContents:(NSString *)contents errorCallback:(RCTResponseSenderBlock *)failureCallback callback:(RCTResponseSenderBlock *)successCallback)

RCT_EXTERN_METHOD(readFile:(NSString *)fileName errorCallback:(RCTResponseSenderBlock *)failureCallback callback:(RCTResponseSenderBlock *)successCallback)

@end
