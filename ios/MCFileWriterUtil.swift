//
//  MCFileWriterUtil.swift
//  MyReactNative
//
//  Created by Li Yan on 16/3/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation

@objc(MCFileWriterUtil2)
class MCFileWriterUtil: NSObject {
  
  @objc func writeFile(fileName: String?, withContents contents: String, errorCallback failureCallback: NSObject -> Void, callback successCallback: NSObject -> Void) -> Void {
    
    // Check if fileName is nil or empty
    if (fileName ?? "").isEmpty {
      // Craft a failure message
      let resultsDict = [
        "success": false,
        "errMsg": "Filename is empty"
      ]
      
      // Execute the JavaScript failure callback handler
      failureCallback([resultsDict])
      
      return; // Halt execution of this function
    }
    
    // Create an array of directory Paths, to allow us to get the documents directory
    let paths = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true)
    
    // The documents directory is the first item - Swift complains here if we don't specify AnyObject as the type.
    let documentsDirectory: AnyObject = paths[0]
    
    // Create a string that prepends the documents directory path to a text file name
    let fileNameWithPath = "\(documentsDirectory)/\(fileName!)"
    NSLog("Writing to \(fileNameWithPath)")
    
    // Here we save contents to disk by executing the writeToFile method of
    // the contents String, which is the second argument to this function.
    do {
      try contents.writeToFile(fileNameWithPath, atomically: false, encoding: NSUTF8StringEncoding)
    } catch {
      // Craft a failure message
      let resultsDict = [
        "success" : false,
        "errMsg"  : "write file error"
      ];
      
      // Execute the JavaScript failure callback handler
      failureCallback([resultsDict]);

      NSLog("write file error!!!")
    }
    
      // Craft a success return message
      let resultsDict = [
        "success" : true
      ];
      
      // Call the JavaScript sucess handler
      successCallback([resultsDict]);
    
  }
  
  @objc func readFile(fileName: String?, errorCallback failureCallback: NSObject -> Void, callback successCallback: NSObject -> Void) -> Void {
    
    // Check if fileName is nil or empty
    if (fileName ?? "").isEmpty {
      // Craft a failure message
      let resultsDict = [
        "success": false,
        "errMsg": "Filename is empty"
      ]
      
      // Execute the JavaScript failure callback handler
      failureCallback([resultsDict])
      
      return; // Halt execution of this function
    }
    
    // Create an array of directory Paths, to allow us to get the documents directory
    let paths = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true)
    
    // The documents directory is the first item
    let documentsDirectory: AnyObject = paths[0]
    
    // Create a string that prepends the documents directory path to a text file name
    let fileNameWithPath = "\(documentsDirectory)/\(fileName!)"
    
    // Allocate a string and initialize it with the contents of the file via
    // the contentsOfFile convenience init.
    do {
       let fileContents = try NSString(contentsOfFile: fileNameWithPath, encoding: NSUTF8StringEncoding)
      NSLog("Reading from \(fileNameWithPath)")
      // Craft a success return message
      let resultsDict = [
        "success"  : true,
        "contents" : fileContents
      ];
      
      // Call the JavaScript sucess handler
      successCallback([resultsDict]);

    } catch {
      // Craft a failure message
      let resultsDict = [
        "success" : false,
        "errMsg"  : "read file error"
      ];
      
      // Execute the JavaScript failure callback handler
      failureCallback([resultsDict]);
    }
    
  }
}
