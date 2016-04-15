//
//  MyMapManager.m
//  MyReactNative
//
//  Created by Li Yan on 16/3/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <MapKit/MapKit.h>
#import "RCTViewManager.h"

@interface MyMapManager: RCTViewManager

@end

@implementation MyMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)
//RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MyMapManager)
//{
//  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
//}
//
//RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MyMapManager)
//{
//  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
//}
//

@end