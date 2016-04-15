//
//  MCFWriteUtil.m
//  MyReactNative
//
//  Created by Li Yan on 16/3/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MCFWriteUtil.h"

@implementation MCFWriteUtil
RCT_EXPORT_MODULE()

//RCT_EXPORT_METHOD(writeFile:(NSString *)fileName
//                  withContents:(NSString *)contents
//                  errorCallback:(RCTResponseSenderBlock)failCallback
//                  successCallback:(RCTResponseSenderBlock)successCallback) {
//  NSLog(@"===%@====%@===", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
//  successCallback(@[@"write method called"]);
//}
//
//RCT_EXPORT_METHOD(readFile:(NSString *)fileName
//                  errorCallback:(RCTResponseSenderBlock)failCallback
//                  successCallback:(RCTResponseSenderBlock)successCallback) {
//  NSLog(@"===%@===%@===", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
//  successCallback(@[@"write method called"]);
//}

// Expose our method signature to JavaScript :: Persist data
RCT_EXPORT_METHOD(writeFile:(NSString *)fileName
                  withContents:(NSString *)contents
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  NSLog(@"=========%@ %@", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
  
  if ([fileName length] < 1) {
    // Craft a failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"No file name."
                                  };
    
    // Execute the JavaScript failure callback handler
    failureCallback(@[resultsDict]);
    
    return; // Halt execution of this function
  }
  
  // Create an array of directory Paths, to allow us to get the documents directory
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  
  // The documents directory is the first item
  NSString *documentsDirectory = [paths objectAtIndex:0];
  
  // Create a string that prepends the documents directory path to a text file name
  // using NSString's stringWithFormat method.
  fileName = [NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
  NSLog(@"Writing to %@", fileName);
  
  // Initialize an NSError variable
  NSError *writeError;
  
  // Here we save contents to disk by executing the writeToFile method of
  // the contents String, which is the second argument to this function.
  [contents writeToFile : fileName
             atomically : NO
             encoding   : NSStringEncodingConversionAllowLossy
             error      : &writeError];
  
  
  // Error Condition handling
  if (writeError) {
    // Craft a failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : [writeError localizedDescription]
                                  };
    
    // Execute the JavaScript failure callback handler
    failureCallback(@[resultsDict]);
  }
  // Success handling
  else {
    
    // Craft a success return message
    NSDictionary *resultsDict = @{
                                  @"success" : @YES
                                  };
    
    // Call the JavaScript sucess handler
    successCallback(@[resultsDict, @"hahha"]);
  }
}




// // Expose our method signature to JavaScript :: Load data from disk and return the String.
RCT_EXPORT_METHOD(readFile:(NSString *)fileName
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  NSLog(@"%@ %@", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
  
  if ([fileName length] < 1) {
    // Craft a failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"No file name."
                                  };
    
    // Execute the JavaScript failure callback handler
    failureCallback(@[resultsDict]);
    
    return; // Halt execution of this function
  }
  
  // Create an array of directory Paths, to allow us to get the documents directory
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  
  // The documents directory is the first item
  NSString *documentsDirectory = [paths objectAtIndex:0];
  
  // Create a string that prepends the documents directory path to a text file name
  // using NSString's stringWithFormat method.
  fileName = [NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
  NSLog(@"Writing to %@", fileName);
  
  // Initialize an NSError variable
  NSError *readError;
  
  // Allocate a string and initialize it with the contents of the file via
  // the initWithContentsOfFile instance method.
  NSString *fileContents = [[NSString alloc]
                            initWithContentsOfFile : fileName
                            encoding               :  NSUTF8StringEncoding
                            error                  : &readError
                            ];
  
  // Error Condition handling
  if (readError) {
    // Craft a failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : [readError localizedDescription]
                                  };
    
    // Execute the JavaScript failure callback handler
    failureCallback(@[resultsDict]);
  }
  // Success handling
  else {
    // Craft a success return message
    NSDictionary *resultsDict = @{
                                  @"success"  : @YES,
                                  @"contents" : fileContents
                                  };
    
    NSLog(@"success.....");
    // Call the JavaScript sucess handler
    successCallback(@[resultsDict, @(133)]);
  }
}


@end
